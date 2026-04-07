import { AlertTriangle, CheckCircle, Info, ExternalLink } from "lucide-react";
import { Button } from "react-bootstrap";
// OR just remove Button if not needed
import { Link } from "react-router-dom";
import { Disclaimer } from "./Disclaimer";
import { LucideIcon } from "lucide-react";

interface AnalysisResultProps {
  score: number;
  result: "manipulated" | "authentic" | "uncertain";
  explanation: string;
  confidenceLevel: "high" | "medium" | "low";
  heatmapUrl?: string;
}

export const AnalysisResult = ({ score, result, explanation, confidenceLevel, heatmapUrl}: AnalysisResultProps) => {
  const getResultConfig = () => {
    switch (result) {
      case "manipulated":
        return {
          icon: AlertTriangle,
          label: "Likely Manipulated",
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/30",
        };
      case "authentic":
        return {
          icon: CheckCircle,
          label: "Likely Authentic",
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/30",
        };
      default:
        return {
          icon: Info,
          label: "Uncertain",
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/30",
        };
    }
  };

  const getConfidenceColor = () => {
    switch (confidenceLevel) {
      case "high":
  return "text-success";
case "medium":
  return "text-warning";
case "low":
  return "text-destructive";
    }
  };

  const config = getResultConfig();
const Icon: LucideIcon = config.icon;

 return (
  <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">

    {/* Main Result Card */}
    <div className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-6`}>
      
      <div className="flex flex-col items-center gap-4 text-center">
        
        <div className={`rounded-full p-4 ${config.bgColor}`}>
          <Icon className={`h-12 w-12 ${config.color}`} />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Authenticity Score</p>
          <p className={`font-heading text-4xl font-bold ${getConfidenceColor()}`}>
            {(score ?? 0).toFixed(1)}% • {config.label}
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Confidence Level:</span>
            <span className={`font-medium capitalize ${getConfidenceColor()}`}>
              {confidenceLevel}
            </span>
          </div>

          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                result === "manipulated"
                  ? "bg-destructive"
                  : result === "authentic"
                  ? "bg-success"
                  : "bg-warning"
              }`}
              style={{ width: `${Math.min(score || 0, 100)}%` }}
            />
          </div>
        </div>

      </div>
    </div>


    {result === "manipulated" && (
  <div className="rounded-xl border border-border bg-card p-6">
    <h3 className="font-heading text-lg font-semibold mb-4">Visual Explanation</h3>

    {heatmapUrl ? (
      <img
        src={heatmapUrl}
        alt="Grad-CAM heatmap"
        className="w-full rounded-lg border"
      />
    ) : (
      <div className="aspect-video rounded-lg bg-secondary/50 flex items-center justify-center border border-border">
        <div className="text-center">
          <div className="mx-auto mb-3 rounded-full bg-primary/10 p-4 w-fit">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Heatmap not available</p>
        </div>
      </div>
    )}
  </div>
)}

  
<div className="rounded-xl border border-border bg-card p-6">
  <h3 className="font-heading text-lg font-semibold mb-3">Analysis Summary</h3>

  <p className="text-muted-foreground leading-relaxed mb-4">
    {explanation}
  </p>

  {/* 🔍 Heatmap Reading Guide */}
  {result === "manipulated" && heatmapUrl && (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
      <h4 className="font-semibold text-sm mb-3 text-blue-800">
        🔍 How to Read the Heatmap
      </h4>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>🔴</span>
          <span><b>Red:</b> Highly manipulated regions</span>
        </div>

        <div className="flex items-center gap-2">
          <span>🟠</span>
          <span><b>Orange:</b> Likely manipulated areas</span>
        </div>

        <div className="flex items-center gap-2">
          <span>🟡</span>
          <span><b>Yellow:</b> Minor inconsistencies</span>
        </div>

    
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        The heatmap highlights regions where the model focused most while making its decision.
      </p>
    </div>
  )}
</div>
    {/* Disclaimer */}
    <Disclaimer />

    {/* Legal CTA */}
    {result === "manipulated" && (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <h3 className="font-heading text-lg font-semibold mb-2">
          Need Legal Assistance?
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          If you believe you are a victim of deepfake manipulation, learn about your legal options.
        </p>

        <Link to="/legal">
          <button className="px-4 py-2 bg-primary text-white rounded-md">
            View Legal Guidance
          </button>
        </Link>
      </div>
    )}

  </div>
);
}

export default AnalysisResult;
