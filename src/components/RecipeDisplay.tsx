import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Clock, Users, ChefHat, Sparkles, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateRecipePdf } from "@/lib/generateRecipePdf";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
  cookingTime?: string;
  servings?: string;
  difficulty?: string;
}

interface RecipeDisplayProps {
  recipe: Recipe | null;
  isLoading: boolean;
  onRegenerate: () => void;
}

export const RecipeDisplay = ({ recipe, isLoading, onRegenerate }: RecipeDisplayProps) => {
  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">Creating your recipe...</p>
              <p className="text-sm text-muted-foreground">Our AI chef is working on something delicious</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recipe) return null;

  return (
    <Card className="w-full overflow-hidden animate-fade-in">
      {/* Recipe Image */}
      {recipe.imageUrl && (
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground drop-shadow-lg">
              {recipe.name}
            </h2>
          </div>
        </div>
      )}
      
      <CardHeader className={cn(!recipe.imageUrl && "pb-4")}>
        {!recipe.imageUrl && (
          <CardTitle className="text-2xl md:text-3xl font-serif">{recipe.name}</CardTitle>
        )}
        
        {/* Recipe Meta */}
        <div className="flex flex-wrap gap-3 mt-3">
          {recipe.cookingTime && (
            <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
              <Clock className="h-3.5 w-3.5" />
              {recipe.cookingTime}
            </Badge>
          )}
          {recipe.servings && (
            <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
              <Users className="h-3.5 w-3.5" />
              {recipe.servings} servings
            </Badge>
          )}
          {recipe.difficulty && (
            <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
              <ChefHat className="h-3.5 w-3.5" />
              {recipe.difficulty}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Ingredients Section */}
        <div className="bg-muted/50 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">1</span>
            </span>
            Ingredients
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li 
                key={index} 
                className="flex items-center gap-2 text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Instructions Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">2</span>
            </span>
            Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li 
                key={index} 
                className="flex gap-4 group"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {index + 1}
                </span>
                <p className="text-muted-foreground pt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => generateRecipePdf(recipe)}
            variant="default"
            className="flex-1 gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button
            onClick={onRegenerate}
            variant="outline"
            className="flex-1 gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Generate Another Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
