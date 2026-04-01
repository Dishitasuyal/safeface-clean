import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  suffix?: string;
}

export const StatCard = ({ icon: Icon, label, value, suffix = "" }: StatCardProps) => {
  return (
    <Card className="bg-card shadow-card card-hover">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Icon className="h-8 w-8 text-primary mb-4" />
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        <p className="text-3xl font-heading font-bold text-foreground">
          {value}{suffix}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
