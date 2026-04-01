import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UploadBox } from "@/components/UploadBox";
import { AnalysisResult } from "@/components/AnalysisResult";
import { Disclaimer } from "@/components/Disclaimer";

type AnalysisState = "idle" | "processing" | "complete";

interface MockResult {
  score: number;
  result: "manipulated" | "authentic" | "uncertain";
  explanation: string;
  confidenceLevel: "high" | "medium" | "low";
}

// Mock analysis function - simulates AI processing
const performMockAnalysis = (): Promise<MockResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Random result for demonstration
      const scenarios: MockResult[] = [
        {
          score: 87,
          result: "manipulated",
          explanation: "Facial texture inconsistencies detected across multiple frames. The analysis identified unnatural blending artifacts around the facial boundaries and temporal discontinuities in lip movements that suggest digital manipulation.",
          confidenceLevel: "high",
        },
        {
          score: 92,
          result: "manipulated",
          explanation: "High probability of face-swap manipulation detected. Key indicators include mismatched lighting conditions on the face compared to the background and subtle distortions in the ear region.",
          confidenceLevel: "high",
        },
        {
          score: 15,
          result: "authentic",
          explanation: "No significant manipulation indicators found. The media appears to be authentic based on facial consistency analysis, temporal coherence checks, and artifact detection.",
          confidenceLevel: "high",
        },
      ];
      
      const randomResult = scenarios[Math.floor(Math.random() * scenarios.length)];
      resolve(randomResult);
    }, 3000); // 3 second simulated processing time
  });
};

export const Detect = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [analysisResult, setAnalysisResult] = useState<MockResult | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setAnalysisState("idle");
    setAnalysisResult(null);
  };

  const handleUrlSubmit = (url: string) => {
    // For mock purposes, treat URL submission same as file
    console.log("URL submitted:", url);
    setAnalysisState("idle");
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setAnalysisState("processing");
    
    try {
      const result = await performMockAnalysis();
      setAnalysisResult(result);
      setAnalysisState("complete");
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisState("idle");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysisState("idle");
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Deepfake Detection
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Upload an image or video to analyze its authenticity using our AI models.
            </p>
          </div>

          {/* Main Content */}
          {analysisState === "idle" && (
            <div className="space-y-8">
              <UploadBox
                onFileSelect={handleFileSelect}
                onUrlSubmit={handleUrlSubmit}
                selectedFile={selectedFile}
              />
              
              {selectedFile && (
                <div className="text-center">
                  <Button 
                    size="lg" 
                    onClick={handleAnalyze}
                    className="px-12"
                  >
                    Analyze Media
                  </Button>
                </div>
              )}

              <div className="max-w-2xl mx-auto">
                <Disclaimer variant="compact" />
              </div>
            </div>
          )}

          {analysisState === "processing" && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-primary/20" />
                <Loader2 className="absolute inset-0 h-24 w-24 text-primary animate-spin" />
              </div>
              <p className="mt-8 font-heading text-xl font-semibold text-foreground">
                Analyzing media using AI models…
              </p>
              <p className="mt-2 text-muted-foreground">
                This may take a few moments
              </p>
            </div>
          )}

          {analysisState === "complete" && analysisResult && (
            <div className="space-y-8">
              <AnalysisResult
                score={analysisResult.score}
                result={analysisResult.result}
                explanation={analysisResult.explanation}
                confidenceLevel={analysisResult.confidenceLevel}
              />
              
              <div className="text-center">
                <Button variant="outline" onClick={handleReset}>
                  Analyze Another File
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detect;
