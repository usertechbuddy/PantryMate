import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Beef, Wheat, Droplet } from "lucide-react";

interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroGoalsInputProps {
  goals: MacroGoals;
  onGoalsChange: (goals: MacroGoals) => void;
}

export const MacroGoalsInput = ({ goals, onGoalsChange }: MacroGoalsInputProps) => {
  const handleChange = (key: keyof MacroGoals, value: string) => {
    const numValue = parseInt(value) || 0;
    onGoalsChange({ ...goals, [key]: numValue });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <Label htmlFor="calories" className="flex items-center gap-1.5 text-sm">
          <Flame className="h-3.5 w-3.5 text-orange-500" />
          Calories
        </Label>
        <div className="relative">
          <Input
            id="calories"
            type="number"
            placeholder="2000"
            value={goals.calories || ""}
            onChange={(e) => handleChange("calories", e.target.value)}
            className="pr-12"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            kcal
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="protein" className="flex items-center gap-1.5 text-sm">
          <Beef className="h-3.5 w-3.5 text-red-500" />
          Protein
        </Label>
        <div className="relative">
          <Input
            id="protein"
            type="number"
            placeholder="150"
            value={goals.protein || ""}
            onChange={(e) => handleChange("protein", e.target.value)}
            className="pr-8"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="carbs" className="flex items-center gap-1.5 text-sm">
          <Wheat className="h-3.5 w-3.5 text-amber-500" />
          Carbs
        </Label>
        <div className="relative">
          <Input
            id="carbs"
            type="number"
            placeholder="200"
            value={goals.carbs || ""}
            onChange={(e) => handleChange("carbs", e.target.value)}
            className="pr-8"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            g
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fat" className="flex items-center gap-1.5 text-sm">
          <Droplet className="h-3.5 w-3.5 text-yellow-500" />
          Fat
        </Label>
        <div className="relative">
          <Input
            id="fat"
            type="number"
            placeholder="65"
            value={goals.fat || ""}
            onChange={(e) => handleChange("fat", e.target.value)}
            className="pr-8"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            g
          </span>
        </div>
      </div>
    </div>
  );
};
