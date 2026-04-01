import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "No community posts available yet",
  description = "Be the first to contribute! Share deepfake examples you've encountered to help educate the community.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
