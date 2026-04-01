import { useState } from "react";
import { X, AlertTriangle, Shield, Calendar, User } from "lucide-react";
import { CommunityPost } from "@/data/mockCommunityPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CommunityModalProps {
  post: CommunityPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityModal = ({ post, isOpen, onClose }: CommunityModalProps) => {
  const [imageError, setImageError] = useState(false);

  if (!post) return null;

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Badge className="mb-2 bg-deepfake text-deepfake-foreground border-0 text-xs font-semibold uppercase">
                {post.category}
              </Badge>
              <DialogTitle className="font-heading text-xl font-semibold text-foreground">
                {post.title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Media Preview */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
          {imageError ? (
            <div className="flex h-full w-full items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground" />
            </div>
          ) : (
            <img
              src={post.media_thumbnail}
              alt={`Media for ${post.title}`}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute right-3 top-3">
            <Badge className="bg-deepfake text-deepfake-foreground border-0 font-semibold shadow-lg">
              DEEPFAKE DETECTED
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Full Story */}
          <div>
            <h4 className="mb-2 font-heading text-sm font-semibold text-foreground">
              Full Story
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {post.full_content}
            </p>
          </div>

          {/* Analysis Summary */}
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
              <Shield className="h-4 w-4 text-primary" />
              Deepfake Analysis Summary
            </h4>
            
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-card p-3">
                <span className="text-xs font-medium text-muted-foreground">Detection Tool</span>
                <p className="mt-1 text-sm font-semibold text-foreground">{post.detection_tool}</p>
              </div>
              
              <div className="rounded-md bg-card p-3">
                <span className="text-xs font-medium text-muted-foreground">Confidence Score</span>
                <p className={`mt-1 text-sm font-bold ${
                  post.confidence_score >= 90 
                    ? "text-destructive" 
                    : post.confidence_score >= 70 
                      ? "text-warning" 
                      : "text-success"
                }`}>
                  {post.confidence_score}%
                </p>
              </div>
              
              <div className="rounded-md bg-card p-3">
                <span className="text-xs font-medium text-muted-foreground">Result</span>
                <Badge 
                  className={`mt-1 ${
                    post.analysis_result === "Fake" 
                      ? "bg-destructive text-destructive-foreground" 
                      : "bg-warning text-warning-foreground"
                  }`}
                >
                  {post.analysis_result}
                </Badge>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>Submitted by {post.submitted_by.name}</span>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {post.status}
            </Badge>
          </div>

          {/* Disclaimer */}
          <Alert className="border-warning/30 bg-warning/5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-xs text-muted-foreground">
              <strong className="text-foreground">Disclaimer:</strong> SafeFace provides AI-based detection. Results may not be 100% accurate. This analysis is for informational purposes only and should not be used as the sole basis for legal or critical decisions.
            </AlertDescription>
          </Alert>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommunityModal;
