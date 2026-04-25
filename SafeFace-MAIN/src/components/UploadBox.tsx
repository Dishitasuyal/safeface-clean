import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, FileVideo, Image as ImageIcon, X } from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File | null) => void;
  onAnalyzeResult: (data: any) => void;
  selectedFile: File | null;
  isDisabled?: boolean;
}

export const UploadBox = ({
  onFileSelect,
  onAnalyzeResult,   // ✅ ADD THIS
  selectedFile,
  isDisabled
}: UploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
      handleUpload(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", localStorage.getItem("userId") || "");

  try {
    const res = await fetch("https://safeface-clean-bl8z.onrender.com/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Backend result:", data);

    onAnalyzeResult(data);
       
    // ❌ REMOVE THIS PART
    // onFileSelect({ ... });

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
        } ${isDisabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp4,.mov,.avi,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
          disabled={isDisabled}
        />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-primary/10 p-4">
              {selectedFile.type.startsWith("video") ? (
                <FileVideo className="h-8 w-8 text-primary" />
              ) : (
                <ImageIcon className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
  onClick={(e) => {
    e.stopPropagation();
    handleClearFile();
  }}
  className="text-destructive hover:text-destructive flex items-center gap-1"
>
  <X className="h-4 w-4" />
  Remove
</button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-heading text-xl font-semibold text-foreground">Upload File</p>
              <p className="text-muted-foreground">or browse to upload</p>
            </div>
          </div>
        )}
      </div>

      {/* URL Input */}
      {/* <div className="flex gap-3">
        <Input
          type="url"
          placeholder="Paste Media URL"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          disabled={isDisabled}
          className="flex-1"
        />
        <Button 
          onClick={handleUrlSubmit} 
          disabled={!mediaUrl.trim() || isDisabled}
        >
          Submit
        </Button>
      </div> */}

      {/* Supported Formats */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Supported Formats:</p>
        <div className="flex items-center gap-2">
  <FileVideo className="h-4 w-4 text-primary" />
  <span>.mp4, .mov, .avi</span>
</div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-primary" />
            <span>.png, .jpg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
