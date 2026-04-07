import { Target, FileText, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingPosts: 0,
    approvedPosts: 0
  });

useEffect(() => {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // 🔐 Not logged in
  if (!userId) {
    navigate("/login");
    return;
  }

  // 🔐 Not admin
  if (role !== "Admin") {
    navigate("/dashboard");
    return;
  }

  // ✅ If admin → fetch data
  fetch("http://localhost:5000/admin/stats")
    .then(res => res.json())
    .then(data => setStats(data))
    .catch(err => console.error(err));

}, [navigate]);
  return (
    <AdminLayout>
      <div className="space-y-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <StatCard
            icon={Target}
            label="Total Registered Users"
            value={stats.totalUsers.toLocaleString()}
          />

          <StatCard
            icon={FileText}
            label="Pending Community Posts"
            value={stats.pendingPosts}
          />

          <StatCard
            icon={CheckCircle}
            label="Approved Posts"
            value={stats.approvedPosts}
          />

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

