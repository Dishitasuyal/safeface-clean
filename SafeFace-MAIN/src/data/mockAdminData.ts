// Mock data for Admin Dashboard

export interface AdminStats {
  totalUsers: number;
  pendingPosts: number;
  approvedPosts: number;
  avgConfidenceScore: number;
  apiResponseTime: number;
}

export interface PendingPost {
  id: string;
  title: string;
  summary: string;
  submittedAt: string;
  status: "Pending";
  mediaThumbnail: string;
}

export interface AdminUser {
  userId: string;
  email: string;
  status: "Active" | "Suspended" | "BPI";
}

export const mockAdminStats: AdminStats = {
  totalUsers: 1245,
  pendingPosts: 32,
  approvedPosts: 876,
  avgConfidenceScore: 91.3,
  apiResponseTime: 120,
};

export const mockPendingPosts: PendingPost[] = [
  {
    id: "post-001",
    title: "Celebrity Endorsement Deepfake",
    summary: "User Story Summary",
    submittedAt: "2024-01-15",
    status: "Pending",
    mediaThumbnail: "/placeholder.svg",
  },
  {
    id: "post-002",
    title: "Political Figure Manipulation",
    summary: "User Story Summary",
    submittedAt: "2024-01-14",
    status: "Pending",
    mediaThumbnail: "/placeholder.svg",
  },
  {
    id: "post-003",
    title: "Forged Video Call Scam",
    summary: "User Story Summary",
    submittedAt: "2024-01-13",
    status: "Pending",
    mediaThumbnail: "/placeholder.svg",
  },
  {
    id: "post-004",
    title: "Fake News Anchor Video",
    summary: "User Story Summary",
    submittedAt: "2024-01-12",
    status: "Pending",
    mediaThumbnail: "/placeholder.svg",
  },
  {
    id: "post-005",
    title: "Social Media Impersonation",
    summary: "User Story Summary",
    submittedAt: "2024-01-11",
    status: "Pending",
    mediaThumbnail: "/placeholder.svg",
  },
  {
    id: "post-006",
    title: "Corporate Executive Deepfake",
    summary: "User Story Summary",
    submittedAt: "2024-01-10",
    status: "Pending",
    mediaThumbnail: "/placeholder.svg",
  },
];

export const mockAdminUsers: AdminUser[] = [
  { userId: "user1", email: "user1@email.com", status: "Active" },
  { userId: "user1", email: "user1@email.com", status: "Suspended" },
  { userId: "user20", email: "user2@email.com", status: "Suspended" },
  { userId: "user1", email: "user1@email.com", status: "BPI" },
  { userId: "user1", email: "user1@email.com", status: "Active" },
];


