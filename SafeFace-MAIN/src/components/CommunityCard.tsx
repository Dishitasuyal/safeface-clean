import { useState } from "react";

interface CommunityCardProps {
  post: any;
}

 const CommunityCard = ({ post }: CommunityCardProps) => {
   const [isOpen, setIsOpen] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Political":
        return "bg-primary/10 text-primary border-primary/20";
      case "Celebrity":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "Scam":
        return "bg-warning/10 text-warning border-warning/20";
      case "Forged Call":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

return (
  <>
    {/* MAIN CARD */}
    <div className="border rounded-lg p-3 shadow-sm bg-white">
      <p className="text-sm text-gray-500 mb-2">
        Posted by: {post.userId || "Unknown"}
      </p>

      <p className="mb-3">{post.content || "No description"}</p>

      {post.filePath ? (
        <img
          src={`http://localhost:5000/${post.filePath}`}
          alt="post"
          className="w-full rounded-lg cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <p className="text-gray-400 italic">No media</p>
      )}
    </div>

{isOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    onClick={() => setIsOpen(false)}
  >
    <button
      className="absolute top-5 right-5 text-white text-3xl font-bold"
      onClick={() => setIsOpen(false)}
    >
      ✕
    </button>

    {post.filePath && (
      <img
        src={`http://localhost:5000/${post.filePath}`}
        className="max-w-[90%] max-h-[90%] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    )}
  </div>

   )}
  </>
);
};



export default CommunityCard;

