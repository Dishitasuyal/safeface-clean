import { AlertTriangle } from "lucide-react";

interface DisclaimerProps {
  variant?: "default" | "compact";
  className?: string;
}

export const Disclaimer = ({ variant = "default", className = "" }: DisclaimerProps) => {
  if (variant === "compact") {
    return (
      <div className={`flex items-start gap-2 rounded-md bg-warning/10 p-3 text-sm text-warning ${className}`}>
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          SafeFace provides AI-based detection. Results may not be 100% accurate and should not be treated as legal proof.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-warning/30 bg-warning/5 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-warning/20 p-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground">Important Disclaimer</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            SafeFace provides AI-based detection. Results may not be 100% accurate and should not be treated as legal proof. 
            Legal authorities should be consulted for confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
