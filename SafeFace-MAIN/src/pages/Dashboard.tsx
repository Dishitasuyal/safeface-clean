import { Link } from "react-router-dom";
import { Shield, Scan, Brain, Scale, Users, Upload, Cpu, FileSearch, Gavel, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Disclaimer } from "@/components/Disclaimer";

const features = [
  {
    icon: Scan,
    title: "Deepfake Detection",
    description: "Upload images or videos to check authenticity using advanced AI models.",
  },
  {
    icon: Brain,
    title: "Explainable AI",
    description: "Visual and textual reasoning with confidence scores for transparency.",
  },
  {
    icon: Scale,
    title: "Legal & Victim Support",
    description: "Access cyber laws, complaint procedures, and helpline information.",
  },
  {
    icon: Users,
    title: "Community Awareness",
    description: "Learn from real deepfake cases shared by the community.",
  },
];

const steps = [
  { icon: Upload, label: "Upload Media", description: "Select an image or video file" },
  { icon: Cpu, label: "AI Analysis", description: "Our models analyze the content" },
  { icon: FileSearch, label: "View Results", description: "Get detailed authenticity report" },
  { icon: Gavel, label: "Legal Guidance", description: "Access legal resources if needed" },
  { icon: Eye, label: "Community Awareness", description: "Learn from real cases" },
];

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="mb-6 rounded-full bg-primary/10 p-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              SafeFace: Your Deepfake Intelligence Platform
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Uncover the truth. Protect your digital identity.
            </p>
            
            <div className="mt-10">
              
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/detect">Start Detection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Platform Features
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Everything you need to detect, understand, and take action against deepfakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Simple steps to analyze media and get results.
            </p>
          </div>

          <div className="relative">
            {/* Connection line - hidden on mobile */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-background rounded-xl p-6 border border-border"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg">
                    {index + 1}
                  </div>
                  <step.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-foreground">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container max-w-3xl">
          <Disclaimer />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
