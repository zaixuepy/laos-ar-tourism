import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Upload,
  Trash2,
  FileImage,
  FileText,
  FileVideo,
  FileAudio,
  File,
  Eye,
  Copy,
  ArrowLeft,
  Loader2,
  Search,
  Filter,
  Download,
  Edit3,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = [
  { value: "all", label: "全部文件", icon: File },
  { value: "image", label: "图片", icon: FileImage },
  { value: "document", label: "文档", icon: FileText },
  { value: "video", label: "视频", icon: FileVideo },
  { value: "audio", label: "音频", icon: FileAudio },
  { value: "other", label: "其他", icon: File },
];

function getCategoryIcon(category: string) {
  switch (category) {
    case "image": return <FileImage className="w-5 h-5 text-emerald-600" />;
    case "document": return <FileText className="w-5 h-5 text-blue-600" />;
    case "video": return <FileVideo className="w-5 h-5 text-purple-600" />;
    case "audio": return <FileAudio className="w-5 h-5 text-orange-600" />;
    default: return <File className="w-5 h-5 text-gray-600" />;
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FileManager() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewFile, setPreviewFile] = useState<any>(null);
  const [editingFile, setEditingFile] = useState<any>(null);
  const [editDescription, setEditDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();

  const { data: filesList, isLoading: filesLoading } = trpc.files.list.useQuery(
    { category: selectedCategory === "all" ? undefined : selectedCategory },
    { enabled: isAuthenticated }
  );

  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
      toast.success("文件上传成功");
      setIsUploading(false);
      setUploadProgress(0);
    },
    onError: (error) => {
      toast.error("上传失败: " + error.message);
      setIsUploading(false);
      setUploadProgress(0);
    },
  });

  const deleteMutation = trpc.files.delete.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
      toast.success("文件已删除");
    },
    onError: (error) => {
      toast.error("删除失败: " + error.message);
    },
  });

  const updateDescMutation = trpc.files.updateDescription.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
      toast.success("描述已更新");
      setEditingFile(null);
    },
    onError: (error) => {
      toast.error("更新失败: " + error.message);
    },
  });

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    const totalFiles = selectedFiles.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = selectedFiles[i];
      setUploadProgress(Math.round(((i) / totalFiles) * 100));

      if (file.size > 16 * 1024 * 1024) {
        toast.error(`${file.name} 超过16MB限制，已跳过`);
        continue;
      }

      try {
        const base64 = await fileToBase64(file);
        await uploadMutation.mutateAsync({
          filename: file.name,
          mimeType: file.type || "application/octet-stream",
          base64Data: base64,
        });
      } catch (err) {
        // Error handled by mutation onError
      }
    }

    setUploadProgress(100);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [uploadMutation]);

  const fileToBase64 = (file: globalThis.File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:...;base64, prefix
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL已复制到剪贴板");
  };

  const handleDelete = (fileId: number, filename: string) => {
    if (confirm(`确定要删除 "${filename}" 吗？`)) {
      deleteMutation.mutate({ id: fileId });
    }
  };

  const handleEditDescription = (file: any) => {
    setEditingFile(file);
    setEditDescription(file.description || "");
  };

  const handleSaveDescription = () => {
    if (editingFile) {
      updateDescMutation.mutate({
        id: editingFile.id,
        description: editDescription,
      });
    }
  };

  // Filter files by search term
  const filteredFiles = filesList?.filter((f: any) =>
    f.filename.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A45C]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF8E7]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
              <Upload className="w-10 h-10 text-[#C8A45C]" />
            </div>
            <h2 className="text-2xl font-bold text-[#3D2B1F] mb-3">文件管理中心</h2>
            <p className="text-[#6B5744] mb-6">请先登录以访问文件管理功能，上传和管理您的旅行照片、文档等文件。</p>
            <a href={getLoginUrl()}>
              <Button className="bg-[#C8A45C] hover:bg-[#B8944C] text-white px-8 py-3 text-lg">
                登录 / 注册
              </Button>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#3D2B1F] to-[#5A3E2B] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <a href="/" className="text-white/70 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-3xl font-bold">文件管理中心</h1>
          </div>
          <p className="text-white/70 ml-8">管理您的旅行照片、文档和多媒体文件</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索文件名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-[#C8A45C]/20 focus:border-[#C8A45C]"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 bg-white border-[#C8A45C]/20">
              <Filter className="w-4 h-4 mr-2 text-[#C8A45C]" />
              <SelectValue placeholder="筛选分类" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <span className="flex items-center gap-2">
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Upload Button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-[#C8A45C] hover:bg-[#B8944C] text-white w-full md:w-auto"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  上传中 {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  上传文件
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#C8A45C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-[#C8A45C]/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#C8A45C]">{filteredFiles.length}</p>
              <p className="text-sm text-[#6B5744]">总文件数</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#C8A45C]/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {filteredFiles.filter((f: any) => f.category === "image").length}
              </p>
              <p className="text-sm text-[#6B5744]">图片</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#C8A45C]/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {filteredFiles.filter((f: any) => f.category === "document").length}
              </p>
              <p className="text-sm text-[#6B5744]">文档</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#C8A45C]/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {formatFileSize(filteredFiles.reduce((sum: number, f: any) => sum + (f.size || 0), 0))}
              </p>
              <p className="text-sm text-[#6B5744]">总大小</p>
            </CardContent>
          </Card>
        </div>

        {/* File Grid */}
        {filesLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#C8A45C]" />
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#C8A45C]/5 flex items-center justify-center">
              <Upload className="w-12 h-12 text-[#C8A45C]/40" />
            </div>
            <h3 className="text-xl font-semibold text-[#3D2B1F] mb-2">暂无文件</h3>
            <p className="text-[#6B5744] mb-6">点击上方"上传文件"按钮开始上传</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#C8A45C] hover:bg-[#B8944C] text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              上传第一个文件
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file: any) => (
              <Card
                key={file.id}
                className="bg-white border-[#C8A45C]/10 hover:shadow-lg transition-shadow group overflow-hidden"
              >
                {/* Preview Area */}
                <div
                  className="relative h-40 bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => setPreviewFile(file)}
                >
                  {file.category === "image" ? (
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      {getCategoryIcon(file.category)}
                      <span className="text-xs text-gray-500 uppercase">
                        {file.mimeType.split("/")[1] || file.category}
                      </span>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewFile(file);
                      }}
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(file.url);
                      }}
                    >
                      <Copy className="w-4 h-4 text-gray-700" />
                    </button>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-4 h-4 text-gray-700" />
                    </a>
                  </div>
                </div>

                {/* File Info */}
                <CardContent className="p-3">
                  <div className="flex items-start gap-2 mb-2">
                    {getCategoryIcon(file.category)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#3D2B1F] truncate" title={file.filename}>
                        {file.filename}
                      </p>
                      <p className="text-xs text-[#6B5744]">
                        {formatFileSize(file.size)} · {formatDate(file.createdAt)}
                      </p>
                    </div>
                  </div>

                  {file.description && (
                    <p className="text-xs text-[#6B5744] mb-2 line-clamp-2">{file.description}</p>
                  )}

                  <div className="flex items-center gap-1 justify-end">
                    <button
                      className="p-1.5 text-gray-400 hover:text-[#C8A45C] transition"
                      onClick={() => handleEditDescription(file)}
                      title="编辑描述"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1.5 text-gray-400 hover:text-red-500 transition"
                      onClick={() => handleDelete(file.id, file.filename)}
                      title="删除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      {previewFile && (
        <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getCategoryIcon(previewFile.category)}
                {previewFile.filename}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {previewFile.category === "image" ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.filename}
                  className="w-full rounded-lg"
                />
              ) : previewFile.category === "video" ? (
                <video controls className="w-full rounded-lg">
                  <source src={previewFile.url} type={previewFile.mimeType} />
                </video>
              ) : previewFile.category === "audio" ? (
                <audio controls className="w-full">
                  <source src={previewFile.url} type={previewFile.mimeType} />
                </audio>
              ) : (
                <div className="text-center py-10">
                  <File className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">此文件类型不支持预览</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">文件大小：</span>
                  <span className="text-[#3D2B1F]">{formatFileSize(previewFile.size)}</span>
                </div>
                <div>
                  <span className="text-gray-500">文件类型：</span>
                  <span className="text-[#3D2B1F]">{previewFile.mimeType}</span>
                </div>
                <div>
                  <span className="text-gray-500">上传时间：</span>
                  <span className="text-[#3D2B1F]">{formatDate(previewFile.createdAt)}</span>
                </div>
                <div>
                  <span className="text-gray-500">分类：</span>
                  <span className="text-[#3D2B1F]">{previewFile.category}</span>
                </div>
              </div>

              {previewFile.description && (
                <div>
                  <span className="text-gray-500 text-sm">描述：</span>
                  <p className="text-[#3D2B1F] text-sm mt-1">{previewFile.description}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleCopyUrl(previewFile.url)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  复制链接
                </Button>
                <a
                  href={previewFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    下载文件
                  </Button>
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Description Dialog */}
      {editingFile && (
        <Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑文件描述</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">文件：{editingFile.filename}</p>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="输入文件描述..."
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingFile(null)}>
                取消
              </Button>
              <Button
                className="bg-[#C8A45C] hover:bg-[#B8944C] text-white"
                onClick={handleSaveDescription}
                disabled={updateDescMutation.isPending}
              >
                {updateDescMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                保存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
}
