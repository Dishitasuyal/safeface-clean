export interface CommunityPost {
  post_id: string;
  title: string;
  description: string;
  full_content: string;
  category: "Political" | "Celebrity" | "Scam" | "Forged Call";
  media_thumbnail: string;
  confidence_score: number;
  analysis_result: "Fake" | "Likely Manipulated" | "Suspicious";
  detection_tool: string;
  created_at: string;
  status: "Approved";
  submitted_by: {
    name: string;
    avatar: string;
  };
}

export const mockCommunityPosts: CommunityPost[] = [
  {
    post_id: "1",
    title: "Politician's Fake Speech",
    description: "Viral video showing politician making controversial statements was created using AI voice cloning.",
    full_content: "This deepfake video circulated widely on social media, purportedly showing a well-known politician making inflammatory statements about economic policy. Our analysis revealed clear signs of AI manipulation including lip-sync inconsistencies and unnatural facial movements. The original audio was synthesized using advanced voice cloning technology.",
    category: "Political",
    media_thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face",
    confidence_score: 94,
    analysis_result: "Fake",
    detection_tool: "SafeFace Neural Detector v2.1",
    created_at: "2024-01-15T10:30:00Z",
    status: "Approved",
    submitted_by: { name: "Alex M", avatar: "AM" }
  },
  {
    post_id: "2",
    title: "Celebrity's Fake Speech",
    description: "Viral video showing celebrity making controversial statements was created using AI voice synthesis.",
    full_content: "A fabricated video showing a popular celebrity endorsing fraudulent cryptocurrency investment went viral. Analysis revealed sophisticated face-swapping technology combined with voice synthesis. The video was designed to deceive viewers into making financial decisions based on false celebrity endorsement.",
    category: "Celebrity",
    media_thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&crop=face",
    confidence_score: 89,
    analysis_result: "Fake",
    detection_tool: "SafeFace Audio-Visual Analyzer",
    created_at: "2024-01-14T15:45:00Z",
    status: "Approved",
    submitted_by: { name: "Alex M", avatar: "AM" }
  },
  {
    post_id: "3",
    title: "Celebrity Endorsement",
    description: "Fraudulent endorsement video showing celebrity promoting unauthorized products.",
    full_content: "This deepfake showed a famous actor appearing to endorse weight loss supplements. The manipulation was detected through analysis of micro-expressions and audio spectral patterns inconsistent with authentic recordings. This type of scam has defrauded consumers of millions of dollars.",
    category: "Celebrity",
    media_thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop&crop=face",
    confidence_score: 92,
    analysis_result: "Fake",
    detection_tool: "SafeFace Deep Analysis Suite",
    created_at: "2024-01-13T09:20:00Z",
    status: "Approved",
    submitted_by: { name: "Alex M", avatar: "AM" }
  },
  {
    post_id: "4",
    title: "Forged Video Call",
    description: "Scammers used real-time deepfake to impersonate executive in video conference fraud attempt.",
    full_content: "In this sophisticated attack, criminals used real-time deepfake technology during a video call to impersonate a company CFO, attempting to authorize a large wire transfer. Our detection identified temporal inconsistencies and lighting artifacts that revealed the deception before any funds were transferred.",
    category: "Forged Call",
    media_thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
    confidence_score: 97,
    analysis_result: "Fake",
    detection_tool: "SafeFace Real-Time Detector",
    created_at: "2024-01-12T14:00:00Z",
    status: "Approved",
    submitted_by: { name: "Alex M", avatar: "AM" }
  },
  {
    post_id: "5",
    title: "Catware Scam Video",
    description: "Romance scam using AI-generated profile and deepfake video calls to deceive victims.",
    full_content: "This case involved elaborate romance fraud using AI-generated profile pictures and deepfake video calls. The perpetrators used this technology to establish trust with victims before requesting money. Detection revealed the synthetic nature of both the profile images and video communications.",
    category: "Scam",
    media_thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&crop=face",
    confidence_score: 88,
    analysis_result: "Likely Manipulated",
    detection_tool: "SafeFace Identity Verifier",
    created_at: "2024-01-11T11:30:00Z",
    status: "Approved",
    submitted_by: { name: "Sarah K", avatar: "SK" }
  },
  {
    post_id: "6",
    title: "Colitician's Fake State",
    description: "Fake video of political figure making statements they never made during campaign season.",
    full_content: "During a critical election period, this fabricated video emerged showing a candidate making divisive statements. Our analysis detected characteristic artifacts of face-swap technology and audio synthesis. This demonstrates the growing threat of deepfakes to democratic processes.",
    category: "Political",
    media_thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
    confidence_score: 91,
    analysis_result: "Fake",
    detection_tool: "SafeFace Political Media Scanner",
    created_at: "2024-01-10T16:45:00Z",
    status: "Approved",
    submitted_by: { name: "Mike R", avatar: "MR" }
  },
  {
    post_id: "7",
    title: "Forged Video Call",
    description: "Business email compromise enhanced with deepfake video to impersonate company leadership.",
    full_content: "This sophisticated attack combined traditional business email compromise with deepfake video technology. Criminals impersonated a CEO to authorize fraudulent payments. The deepfake was detected through analysis of blinking patterns and skin texture inconsistencies.",
    category: "Forged Call",
    media_thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    confidence_score: 95,
    analysis_result: "Fake",
    detection_tool: "SafeFace Corporate Shield",
    created_at: "2024-01-09T08:15:00Z",
    status: "Approved",
    submitted_by: { name: "Alex M", avatar: "AM" }
  },
  {
    post_id: "8",
    title: "Forged Video",
    description: "Manipulated video evidence submitted in legal proceedings detected before causing harm.",
    full_content: "In this concerning case, manipulated video was submitted as evidence in civil litigation. Our forensic analysis revealed frame-level manipulations and audio splicing. This case highlights the importance of deepfake detection in legal and judicial contexts.",
    category: "Scam",
    media_thumbnail: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=300&fit=crop&crop=face",
    confidence_score: 86,
    analysis_result: "Likely Manipulated",
    detection_tool: "SafeFace Forensic Analyzer",
    created_at: "2024-01-08T12:00:00Z",
    status: "Approved",
    submitted_by: { name: "Lisa T", avatar: "LT" }
  },
  {
    post_id: "9",
    title: "Forged Video Call",
    description: "Investment scam using fake video testimonials from cloned celebrity faces.",
    full_content: "This investment fraud used deepfake technology to create fake testimonial videos featuring well-known business figures. The synthetic videos promoted fraudulent trading platforms. Our detection identified subtle facial asymmetries and audio artifacts characteristic of AI generation.",
    category: "Scam",
    media_thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face",
    confidence_score: 93,
    analysis_result: "Fake",
    detection_tool: "SafeFace Financial Fraud Detector",
    created_at: "2024-01-07T09:30:00Z",
    status: "Approved",
    submitted_by: { name: "James W", avatar: "JW" }
  },
  {
    post_id: "10",
    title: "Wayae Video Scam",
    description: "Voice cloning combined with manipulated video for sophisticated impersonation attack.",
    full_content: "This attack combined voice cloning with video manipulation to create a highly convincing impersonation. The target received what appeared to be a video message from a family member requesting emergency funds. Our analysis detected subtle inconsistencies in lip synchronization and voice spectral patterns.",
    category: "Scam",
    media_thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop&crop=face",
    confidence_score: 90,
    analysis_result: "Fake",
    detection_tool: "SafeFace Voice-Video Analyzer",
    created_at: "2024-01-06T14:20:00Z",
    status: "Approved",
    submitted_by: { name: "Emma C", avatar: "EC" }
  }
];

export const categories = ["All", "Political", "Celebrity", "Scam", "Forged Call"] as const;
export type CategoryFilter = typeof categories[number];

export const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "confidence", label: "Highest Confidence Score" }
] as const;
export type SortOption = typeof sortOptions[number]["value"];
