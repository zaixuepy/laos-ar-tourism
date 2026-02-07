import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createFileRecord, getUserFiles, getFileById, deleteFileRecord, updateFileDescription, getAllFiles } from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    /** List current user's files, optionally filtered by category */
    list: protectedProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ ctx, input }) => {
        return getUserFiles(ctx.user.id, input?.category);
      }),

    /** Get a single file by ID (must belong to user or user is admin) */
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const file = await getFileById(input.id);
        if (!file) throw new Error("File not found");
        if (file.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new Error("Access denied");
        }
        return file;
      }),

    /** Upload a file: receives base64-encoded data, stores to S3, saves metadata to DB */
    upload: protectedProcedure
      .input(z.object({
        filename: z.string(),
        mimeType: z.string(),
        base64Data: z.string(),
        category: z.enum(["image", "document", "video", "audio", "other"]).optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const buffer = Buffer.from(input.base64Data, "base64");
        const size = buffer.length;

        // Max 16MB
        if (size > 16 * 1024 * 1024) {
          throw new Error("File size exceeds 16MB limit");
        }

        // Determine category from MIME type if not provided
        let category = input.category;
        if (!category) {
          if (input.mimeType.startsWith("image/")) category = "image";
          else if (input.mimeType.startsWith("video/")) category = "video";
          else if (input.mimeType.startsWith("audio/")) category = "audio";
          else if (input.mimeType.includes("pdf") || input.mimeType.includes("document") || input.mimeType.includes("text")) category = "document";
          else category = "other";
        }

        // Generate unique S3 key
        const ext = input.filename.split(".").pop() || "bin";
        const fileKey = `${ctx.user.id}-files/${nanoid()}.${ext}`;

        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        // Save metadata to DB
        const fileId = await createFileRecord({
          fileKey,
          url,
          filename: input.filename,
          mimeType: input.mimeType,
          size,
          category,
          description: input.description || null,
          userId: ctx.user.id,
        });

        return { id: fileId, url, fileKey };
      }),

    /** Update file description */
    updateDescription: protectedProcedure
      .input(z.object({
        id: z.number(),
        description: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const file = await getFileById(input.id);
        if (!file) throw new Error("File not found");
        if (file.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new Error("Access denied");
        }
        await updateFileDescription(input.id, input.description);
        return { success: true };
      }),

    /** Delete a file (metadata only; S3 objects persist) */
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const file = await getFileById(input.id);
        if (!file) throw new Error("File not found");
        if (file.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new Error("Access denied");
        }
        await deleteFileRecord(input.id);
        return { success: true };
      }),

    /** Admin: list all files */
    listAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Admin access required");
        }
        return getAllFiles();
      }),
  }),
});

export type AppRouter = typeof appRouter;
