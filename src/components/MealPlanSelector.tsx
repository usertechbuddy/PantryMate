import { cn } from "@/lib/utils";
import { Calendar, Utensils } from "lucide-react";

interface MealPlanSelectorProps {
  value: "single" | "weekly";
  onChange: (value: "single" | "weekly") => void;
}

export const MealPlanSelector = ({ value, onChange }: MealPlanSelectorProps) => {
  const options = [
    { 
      id: "single" as const, 
      label: "Single Recipe", 
      icon: Utensils, 
      description: "Get one perfect recipe" 
    },
    { 
      id: "weekly" as const, 
      label: "Weekly Diet Plan", 
      icon: Calendar, 
      description: "Healthy meals for the week" 
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
            value === option.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <option.icon className={cn(
            "h-6 w-6",
            value === option.id ? "text-primary" : "text-muted-foreground"
          )} />
          <span className="font-medium text-sm">{option.label}</span>
          <span className="text-xs text-muted-foreground text-center">
            {option.description}
          </span>
        </button>
      ))}
    </div>
  );
};
