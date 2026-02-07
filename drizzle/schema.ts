import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, bigint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * File storage metadata table.
 * Actual file bytes live in S3; this table tracks metadata for querying/authorization.
 */
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  /** S3 object key */
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  /** Public CDN URL returned by storagePut */
  url: text("url").notNull(),
  /** Original filename from the upload */
  filename: varchar("filename", { length: 512 }).notNull(),
  /** MIME type (e.g. image/png, application/pdf) */
  mimeType: varchar("mimeType", { length: 128 }).notNull(),
  /** File size in bytes */
  size: bigint("size", { mode: "number" }).notNull(),
  /** Category for organizing files: image, document, video, audio, other */
  category: mysqlEnum("category", ["image", "document", "video", "audio", "other"]).default("other").notNull(),
  /** Optional description */
  description: text("description"),
  /** Owner user ID (FK to users.id) */
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FileRecord = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;
