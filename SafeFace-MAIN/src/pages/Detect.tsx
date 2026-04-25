import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { UploadBox } from "../components/UploadBox";
import AnalysisResult from "../components/AnalysisResult";
import { Disclaimer } from "../components/Disclaimer";


type AnalysisState = "idle" | "processing" | "complete";
// interface MockResult {
//   score: number;
//   result: "manipulated" | "authentic" | "uncertain";
//   explanation: string;
//   confidenceLevel: "high" | "medium" | "low";
// }

interface MockResult {
  score: number;
  result: "manipulated" | "authentic" | "uncertain";
  explanation: string;
  confidenceLevel: "high" | "medium" | "low";
  heatmapUrl?: string;
}

// Mock analysis function - simulates AI processing
     
export const Detect = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState(null);
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
    const formData = new FormData();
    formData.append("file", selectedFile);

    const endpoint = "https://safeface-clean-bl8z.onrender.com/predict-image";

    if (selectedFile.type.startsWith("video/")) {
    alert("Video analysis is currently not supported");
    return;
   }
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    console.log("Response Status:", res.status);
    const data = await res.json();
    console.log("Backend result:", data);

    if (!res.ok || data.error) {
      console.error("Backend error:", data.error || "Unknown error");
      setAnalysisState("idle");
      return;
    }

    let confidence = Number(data.confidence);
    if (isNaN(confidence)) confidence = 0;

    confidence = Math.max(0, Math.min(100, confidence));


    const mappedResult: MockResult = {
  score: confidence,
  result: data.result === "FAKE" ? "manipulated" : "authentic",
  explanation:
    data.result === "FAKE"
      ? (data.explanation || "The model found suspicious facial regions in this image.")
      : "Media appears authentic.",
  confidenceLevel:
    confidence >= 80
      ? "high"
      : confidence >= 60
        ? "medium"
        : "low",
  heatmapUrl: data.result === "FAKE" ? data.heatmap_url : undefined,
  };

    setAnalysisResult(mappedResult);
    setAnalysisState("complete");
  } catch (error) {
    console.error("Analysis failed:", error);
    setAnalysisState("idle");
  }
};

// 🔴 FIX 1: make sure confidence is valid number

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
  onAnalyzeResult={setResult}
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
  heatmapUrl={analysisResult.heatmapUrl}
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
