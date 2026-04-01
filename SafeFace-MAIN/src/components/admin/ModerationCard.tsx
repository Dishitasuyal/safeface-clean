import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";


interface ModerationCardProps {
  post: {
    id: string;
    content: string;
    image: string;
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ModerationCard = ({ post, onApprove, onReject }: ModerationCardProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="bg-card shadow-card overflow-hidden">
      <CardContent className="p-4">
        {/* Blurred Media Preview */}
          
            <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
  <img
    src={post.image}
    alt="post"
    className="w-full h-full object-cover"
    onClick={() => setIsOpen(true)}
  />
</div>

<p className="text-sm text-muted-foreground mb-4">
  {post.content}
</p>
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={() => onApprove(post.id)}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Approve
          </Button>
          <Button 
            onClick={() => onReject(post.id)}
            variant="outline"
            className="flex-1"
          >
            Reject
          </Button>
        </div>
      </CardContent>
      {isOpen && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

    {/* Close Button */}
    <button
      onClick={() => setIsOpen(false)}
      className="absolute top-5 right-5 text-white text-3xl font-bold"
    >
      ✕
    </button>

    {/* Image */}
    <img
      src={post.image}
      alt="full"
      className="max-w-[90%] max-h-[90%] rounded-lg"
    />

  </div>
)}

    </Card>
  );
};

export default ModerationCard;
