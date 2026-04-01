import { AlertTriangle, CheckCircle, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Disclaimer } from "./Disclaimer";

interface AnalysisResultProps {
  score: number;
  result: "manipulated" | "authentic" | "uncertain";
  explanation: string;
  confidenceLevel: "high" | "medium" | "low";
}

export const AnalysisResult = ({ score, result, explanation, confidenceLevel }: AnalysisResultProps) => {
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
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
    }
  };

  const config = getResultConfig();
  const Icon = config.icon;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Main Result Card */}
      <div className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-6`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className={`rounded-full ${config.bgColor} p-4`}>
            <Icon className={`h-12 w-12 ${config.color}`} />
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Authenticity Score</p>
            <p className={`font-heading text-4xl font-bold ${getConfidenceColor()}`}>
              {score}% {config.label}
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
                  result === "manipulated" ? "bg-destructive" : 
                  result === "authentic" ? "bg-success" : "bg-warning"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Explanation Placeholder */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Visual Explanation
        </h3>
        <div className="aspect-video rounded-lg bg-secondary/50 flex items-center justify-center border border-border">
          <div className="text-center">
            <div className="mx-auto mb-3 rounded-full bg-primary/10 p-4 w-fit">
              <Info className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Manipulated Regions Highlighted</p>
            <p className="text-xs text-muted-foreground mt-1">(Heatmap visualization)</p>
          </div>
        </div>
      </div>

      {/* Textual Explanation */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
          Analysis Summary
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Disclaimer */}
      <Disclaimer />

      {/* Legal Guidance CTA */}
      {result === "manipulated" && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            Need Legal Assistance?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you believe you are a victim of deepfake manipulation, learn about your legal options.
          </p>
          <Button asChild>
            <Link to="/legal">
              View Legal Guidance
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
