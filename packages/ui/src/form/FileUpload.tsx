"use client";

import * as React from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, X, File, Image, FileText, Film, Music, Archive, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type FileUploadVariant = "default" | "minimal" | "card";

export interface UploadedFile {
  /** Unique identifier */
  id: string;
  /** Original file object */
  file: File;
  /** Preview URL for images */
  preview?: string;
  /** Upload progress (0-100) */
  progress: number;
  /** Upload status */
  status: "pending" | "uploading" | "success" | "error";
  /** Error message if status is error */
  error?: string;
}

export interface FileUploadProps {
  /** Visual variant */
  variant?: FileUploadVariant;
  /** Accepted file types (e.g., { 'image/*': ['.png', '.jpg'] }) */
  accept?: Accept;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Allow multiple files */
  multiple?: boolean;
  /** Whether the dropzone is disabled */
  disabled?: boolean;
  /** Current files */
  value?: UploadedFile[];
  /** Called when files change */
  onChange?: (files: UploadedFile[]) => void;
  /** Called when files are dropped/selected (for custom upload handling) */
  onFilesAdded?: (files: File[]) => void;
  /** Called when a file is removed */
  onFileRemove?: (file: UploadedFile) => void;
  /** Custom upload function - if provided, handles upload automatically */
  onUpload?: (file: File, onProgress: (progress: number) => void) => Promise<void>;
  /** Placeholder text */
  placeholder?: string;
  /** Description text */
  description?: string;
  /** Show file list */
  showFileList?: boolean;
  /** Group files by status (Uploading / Completed sections) */
  showStatusSections?: boolean;
  /** Additional class name */
  className?: string;
}

// ============================================================================
// Helpers
// ============================================================================

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(file: File): React.ReactNode {
  const type = file.type;
  if (type.startsWith("image/")) return <Image className="h-5 w-5" />;
  if (type.startsWith("video/")) return <Film className="h-5 w-5" />;
  if (type.startsWith("audio/")) return <Music className="h-5 w-5" />;
  if (type.includes("pdf") || type.includes("document") || type.includes("text")) {
    return <FileText className="h-5 w-5" />;
  }
  if (type.includes("zip") || type.includes("rar") || type.includes("tar") || type.includes("gz")) {
    return <Archive className="h-5 w-5" />;
  }
  return <File className="h-5 w-5" />;
}

function getAcceptDescription(accept?: Accept): string {
  if (!accept) return "All files";
  const types: string[] = [];
  for (const [mimeType, extensions] of Object.entries(accept)) {
    if (mimeType.includes("image")) types.push("Images");
    else if (mimeType.includes("video")) types.push("Videos");
    else if (mimeType.includes("audio")) types.push("Audio");
    else if (mimeType.includes("pdf")) types.push("PDF");
    else if (extensions.length > 0) types.push(extensions.join(", ").toUpperCase());
  }
  return [...new Set(types)].join(", ") || "All files";
}

// ============================================================================
// File Item Component
// ============================================================================

interface FileItemProps {
  file: UploadedFile;
  onRemove: () => void;
  disabled?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove, disabled }) => {
  const isImage = file.file.type.startsWith("image/");

  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg group">
      {/* Preview or Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-background border flex items-center justify-center overflow-hidden">
        {isImage && file.preview ? (
          <img
            src={file.preview}
            alt={file.file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-muted-foreground">{getFileIcon(file.file)}</span>
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.file.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(file.file.size)}
          {file.status === "error" && file.error && (
            <span className="text-destructive ml-2">{file.error}</span>
          )}
        </p>

        {/* Progress bar */}
        {file.status === "uploading" && (
          <div className="mt-1.5 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Status Icon / Remove Button */}
      <div className="flex-shrink-0">
        {file.status === "uploading" && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
        {file.status === "success" && (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        )}
        {file.status === "error" && (
          <AlertCircle className="h-4 w-4 text-destructive" />
        )}
        {(file.status === "pending" || file.status === "success" || file.status === "error") && (
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className={cn(
              "p-1 rounded-md hover:bg-muted transition-colors",
              "opacity-0 group-hover:opacity-100",
              disabled && "pointer-events-none",
            )}
            aria-label={`Remove ${file.file.name}`}
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// File List with Status Sections Component
// ============================================================================

interface FileListWithSectionsProps {
  files: UploadedFile[];
  onRemove: (file: UploadedFile) => void;
  disabled?: boolean;
}

const FileListWithSections: React.FC<FileListWithSectionsProps> = ({
  files,
  onRemove,
  disabled,
}) => {
  const uploadingFiles = files.filter(
    (f) => f.status === "pending" || f.status === "uploading",
  );
  const completedFiles = files.filter(
    (f) => f.status === "success" || f.status === "error",
  );

  return (
    <div className="mt-4 space-y-4">
      {/* Uploading Section */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <h4 className="text-sm font-medium text-muted-foreground">
              Uploading ({uploadingFiles.length})
            </h4>
          </div>
          <div className="space-y-2">
            {uploadingFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={() => onRemove(file)}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Section */}
      {completedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <h4 className="text-sm font-medium text-muted-foreground">
              Completed ({completedFiles.length})
            </h4>
          </div>
          <div className="space-y-2">
            {completedFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={() => onRemove(file)}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      variant = "default",
      accept,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles = 10,
      multiple = true,
      disabled = false,
      value = [],
      onChange,
      onFilesAdded,
      onFileRemove,
      onUpload,
      placeholder,
      description,
      showFileList = true,
      showStatusSections = false,
      className,
    },
    ref,
  ) => {
    const [files, setFiles] = React.useState<UploadedFile[]>(value);
    const filesRef = React.useRef<UploadedFile[]>(files);

    // Keep ref in sync with state for cleanup
    React.useEffect(() => {
      filesRef.current = files;
    }, [files]);

    // Sync with controlled value
    React.useEffect(() => {
      setFiles(value);
    }, [value]);

    // Cleanup previews on unmount
    React.useEffect(() => {
      return () => {
        for (const f of filesRef.current) {
          if (f.preview) URL.revokeObjectURL(f.preview);
        }
      };
    }, []);

    const handleFilesAdded = React.useCallback(
      async (acceptedFiles: File[]) => {
        // Create UploadedFile objects
        const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
          id: generateId(),
          file,
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
          progress: 0,
          status: "pending" as const,
        }));

        const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
        setFiles(updatedFiles);
        onChange?.(updatedFiles);
        onFilesAdded?.(acceptedFiles);

        // If onUpload is provided, handle upload automatically
        if (onUpload) {
          for (const uploadFile of newFiles) {
            // Update status to uploading
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadFile.id ? { ...f, status: "uploading" as const } : f,
              ),
            );

            try {
              await onUpload(uploadFile.file, (progress) => {
                setFiles((prev) =>
                  prev.map((f) =>
                    f.id === uploadFile.id ? { ...f, progress } : f,
                  ),
                );
              });

              // Success
              setFiles((prev) => {
                const updated = prev.map((f) =>
                  f.id === uploadFile.id
                    ? { ...f, status: "success" as const, progress: 100 }
                    : f,
                );
                onChange?.(updated);
                return updated;
              });
            } catch (error) {
              // Error
              setFiles((prev) => {
                const updated = prev.map((f) =>
                  f.id === uploadFile.id
                    ? {
                        ...f,
                        status: "error" as const,
                        error: error instanceof Error ? error.message : "Upload failed",
                      }
                    : f,
                );
                onChange?.(updated);
                return updated;
              });
            }
          }
        }
      },
      [files, maxFiles, onChange, onFilesAdded, onUpload],
    );

    const handleRemove = React.useCallback(
      (fileToRemove: UploadedFile) => {
        if (fileToRemove.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        const updatedFiles = files.filter((f) => f.id !== fileToRemove.id);
        setFiles(updatedFiles);
        onChange?.(updatedFiles);
        onFileRemove?.(fileToRemove);
      },
      [files, onChange, onFileRemove],
    );

    const onDrop = React.useCallback(
      (acceptedFiles: File[], _rejectedFiles: FileRejection[]) => {
        if (acceptedFiles.length > 0) {
          handleFilesAdded(acceptedFiles);
        }
        // Could handle rejected files here (show errors)
      },
      [handleFilesAdded],
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
      onDrop,
      accept,
      maxSize,
      maxFiles: multiple ? maxFiles - files.length : 1,
      multiple,
      disabled: disabled || (!multiple && files.length >= 1) || files.length >= maxFiles,
    });

    const defaultPlaceholder = isDragActive
      ? "Drop files here..."
      : multiple
        ? "Drag & drop files here, or click to select"
        : "Drag & drop a file here, or click to select";

    const defaultDescription = `${getAcceptDescription(accept)} up to ${formatFileSize(maxSize)}${multiple ? ` (max ${maxFiles} files)` : ""}`;

    return (
      <div className={cn("w-full", className)}>
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={cn(
            "relative cursor-pointer transition-all duration-200",

            // Variant styles
            variant === "default" && [
              "border-2 border-dashed rounded-lg p-8",
              "hover:border-primary/50 hover:bg-muted/50",
              isDragActive && "border-primary bg-primary/5",
              isDragReject && "border-destructive bg-destructive/5",
              disabled && "opacity-50 cursor-not-allowed hover:border-input hover:bg-transparent",
            ],

            variant === "minimal" && [
              "border border-input rounded-md p-4",
              "hover:bg-muted/50",
              isDragActive && "border-primary bg-primary/5",
              disabled && "opacity-50 cursor-not-allowed",
            ],

            variant === "card" && [
              "border rounded-lg p-6 bg-card shadow-sm",
              "hover:shadow-md hover:border-primary/30",
              isDragActive && "border-primary shadow-md",
              disabled && "opacity-50 cursor-not-allowed hover:shadow-sm",
            ],
          )}
        >
          <input {...getInputProps()} ref={ref} />

          <div className="flex flex-col items-center justify-center text-center gap-2">
            <div
              className={cn(
                "p-3 rounded-full bg-muted",
                isDragActive && "bg-primary/10",
              )}
            >
              <Upload
                className={cn(
                  "h-6 w-6 text-muted-foreground",
                  isDragActive && "text-primary",
                )}
              />
            </div>

            <div>
              <p className="text-sm font-medium">
                {placeholder || defaultPlaceholder}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {description || defaultDescription}
              </p>
            </div>
          </div>
        </div>

        {/* File List */}
        {showFileList && files.length > 0 && !showStatusSections && (
          <div className="mt-4 space-y-2">
            {files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={() => handleRemove(file)}
                disabled={disabled}
              />
            ))}
          </div>
        )}

        {/* File List with Status Sections */}
        {showFileList && files.length > 0 && showStatusSections && (
          <FileListWithSections
            files={files}
            onRemove={handleRemove}
            disabled={disabled}
          />
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

// ============================================================================
// Preset accept configurations
// ============================================================================

export const acceptPresets = {
  images: {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"],
  },
  documents: {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "text/plain": [".txt"],
  },
  spreadsheets: {
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "text/csv": [".csv"],
  },
  videos: {
    "video/*": [".mp4", ".webm", ".mov", ".avi"],
  },
  audio: {
    "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
  },
} as const;
