import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MealTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const mealTypes = ["Any", "Breakfast", "Lunch", "Dinner", "Beverage"];

export const MealTypeSelector = ({ value, onChange }: MealTypeSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id="meal-type" className="bg-background">
        <SelectValue placeholder="Select meal type" />
      </SelectTrigger>
      <SelectContent className="bg-background z-50">
        {mealTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
