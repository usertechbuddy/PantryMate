import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

export const IngredientInput = ({ ingredients, onIngredientsChange }: IngredientInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!ingredients.includes(inputValue.trim())) {
        onIngredientsChange([...ingredients, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter((i) => i !== ingredient));
  };

  return (
    <div className="w-full space-y-3">
      <Input
        type="text"
        placeholder="Type an ingredient and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full"
      />
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <Badge
              key={ingredient}
              variant="secondary"
              className="px-3 py-1 text-sm flex items-center gap-1"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-1 hover:text-destructive"
                aria-label={`Remove ${ingredient}`}
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
