import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ModerationCard from "@/components/admin/ModerationCard";
import { useToast } from "@/hooks/use-toast";

const ModerateCommunity = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const res = await fetch("https://safeface-clean-bl8z.onrender.com/admin/posts");
      const data = await res.json();
      console.log(data);
      const formatted = data.map((post: any) => ({
  id: post._id,   // ✅ IMPORTANT FIX
  content: post.content,
  image: `http://localhost:5000/${post.filePath}`,
  userId: post.userId,
}));

      setPosts(formatted);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  useEffect(() => {
  fetchPosts();
}, []);

  const handleApprove = async (id: string) => {
  try {
    await fetch(`https://safeface-clean-bl8z.onrender.com/admin/approve/${id}`, {
      method: "PUT",
    });

    setPosts(prev => prev.filter(post => post.id !== id));

    toast({
      title: "Post Approved",
      description: "The community post has been approved and published.",
    });
  } catch (err) {
    console.error(err);
  }
};
  
const handleReject = async (id: string) => {
  try {
    await fetch(`https://safeface-clean-bl8z.onrender.com/admin/reject/${id}`, {
      method: "PUT",
    });

    setPosts(prev => prev.filter(post => post.id !== id));

    toast({
      title: "Post Rejected",
      description: "The community post has been rejected.",
      variant: "destructive",
    });
  } catch (err) {
    console.error(err);
  }
};

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Community Moderation
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pending posts to moderate.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ModerationCard
                key={post.id}
                post={post}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ModerateCommunity;
