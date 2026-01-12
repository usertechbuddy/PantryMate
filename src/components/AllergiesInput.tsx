import { useState } from "react";
import { X, Plus, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const commonAllergies = [
  "Peanuts",
  "Tree Nuts",
  "Milk",
  "Eggs",
  "Wheat",
  "Soy",
  "Fish",
  "Shellfish",
  "Sesame",
  "Gluten",
];

interface AllergiesInputProps {
  allergies: string[];
  onAllergiesChange: (allergies: string[]) => void;
}

export const AllergiesInput = ({ allergies, onAllergiesChange }: AllergiesInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addAllergy = (allergy: string) => {
    const trimmed = allergy.trim();
    if (trimmed && !allergies.some(a => a.toLowerCase() === trimmed.toLowerCase())) {
      onAllergiesChange([...allergies, trimmed]);
    }
    setInputValue("");
  };

  const removeAllergy = (allergy: string) => {
    onAllergiesChange(allergies.filter((a) => a !== allergy));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addAllergy(inputValue);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type allergy and press Enter..."
          className="flex-1"
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => addAllergy(inputValue)}
          disabled={!inputValue.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Common allergies quick-add */}
      <div className="flex flex-wrap gap-2">
        {commonAllergies
          .filter((a) => !allergies.some(al => al.toLowerCase() === a.toLowerCase()))
          .slice(0, 6)
          .map((allergy) => (
            <Badge
              key={allergy}
              variant="outline"
              className="cursor-pointer hover:bg-destructive/10 hover:border-destructive/50 transition-colors"
              onClick={() => addAllergy(allergy)}
            >
              <Plus className="h-3 w-3 mr-1" />
              {allergy}
            </Badge>
          ))}
      </div>

      {/* Selected allergies */}
      {allergies.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
          <AlertTriangle className="h-4 w-4 text-destructive mt-1" />
          {allergies.map((allergy) => (
            <Badge
              key={allergy}
              variant="destructive"
              className="gap-1 pr-1"
            >
              {allergy}
              <button
                type="button"
                onClick={() => removeAllergy(allergy)}
                className="ml-1 rounded-full p-0.5 hover:bg-destructive-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
