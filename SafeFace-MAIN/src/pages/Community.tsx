import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CommunityCard from "@/components/CommunityCard";
import EmptyState from "@/components/EmptyState";

const Community = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // 🔥 FETCH POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://safeface-clean-bl8z.onrender.com/community/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // 🔥 HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!content || !file) {
      alert("Please add description and file");
      return;
    }

    const formData = new FormData();
  formData.append("userId", localStorage.getItem("userId"));
    formData.append("content", content);
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:5000/community/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        setIsSubmitOpen(false);
        setContent("");
        setFile(null);

        // Refresh posts
        const updated = await fetch(
          "https://safeface-clean-bl8z.onrender.com/community/posts"
        );
        const updatedData = await updated.json();
        setPosts(updatedData);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8">
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Community Gallery</h1>

          <button
            onClick={() => setIsSubmitOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Submit Your Own Post
          </button>
        </header>

        {/* POSTS LIST */}
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <CommunityCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* SUBMIT MODAL */}
        {isSubmitOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">
                Submit a Community Post
              </h2>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe the deepfake incident or experience"
                className="w-full mb-3 p-2 border rounded"
              />

              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="mb-4"
              />

              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                Submit Post
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Community;
