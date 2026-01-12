import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IngredientInput } from "@/components/IngredientInput";
import { CuisineSelector } from "@/components/CuisineSelector";
import { MealTypeSelector } from "@/components/MealTypeSelector";
import { MealPlanSelector } from "@/components/MealPlanSelector";
import { AllergiesInput } from "@/components/AllergiesInput";
import { MacroGoalsInput } from "@/components/MacroGoalsInput";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { WeeklyPlanDisplay } from "@/components/WeeklyPlanDisplay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, AlertTriangle, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
  cookingTime?: string;
  servings?: string;
  difficulty?: string;
}

interface DietRecipe extends Recipe {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  nutritionTip?: string;
}

interface WeeklyPlan {
  [day: string]: DietRecipe;
}

interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const Pantry = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<string>("Any");
  const [mealType, setMealType] = useState<string>("Any");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [planType, setPlanType] = useState<"single" | "weekly">("single");
  const [macroGoals, setMacroGoals] = useState<MacroGoals>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients",
        description: "Please add at least one ingredient",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRecipe(null);
    setWeeklyPlan(null);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-recipe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            ingredients,
            cuisine,
            mealType,
            allergies,
            planType,
            macroGoals: planType === "weekly" ? macroGoals : undefined,
          }),
        }
      );

      if (response.status === 429) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait a moment and try again.",
          variant: "destructive",
        });
        return;
      }

      if (response.status === 402) {
        toast({
          title: "Credits required",
          description: "Please add credits to continue generating recipes.",
          variant: "destructive",
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const parsedResult = await response.json();
      
      if (planType === "weekly") {
        setWeeklyPlan(parsedResult);
        toast({
          title: "Diet plan ready!",
          description: "Your weekly diet plan is ready to help you eat healthier.",
        });
      } else {
        setRecipe(parsedResult);
        toast({
          title: "Recipe ready!",
          description: `Your ${parsedResult.name} recipe is ready to cook.`,
        });
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error",
        description: "Failed to generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl flex-1 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Recipe Generation
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            What's in your pantry?
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Add your ingredients and let our AI create the perfect recipe for you
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg mb-8 space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {/* Meal Plan Type */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">1</span>
              What do you need?
            </label>
            <MealPlanSelector value={planType} onChange={setPlanType} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">2</span>
              Add Your Ingredients
            </label>
            <IngredientInput
              ingredients={ingredients}
              onIngredientsChange={setIngredients}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">3</span>
                Cuisine Preference
              </label>
              <CuisineSelector value={cuisine} onChange={setCuisine} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">4</span>
                Meal Type
              </label>
              <MealTypeSelector value={mealType} onChange={setMealType} />
            </div>
          </div>

          {/* Allergies Section */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center">
                <AlertTriangle className="h-3 w-3" />
              </span>
              Allergies & Dietary Restrictions
            </label>
            <AllergiesInput allergies={allergies} onAllergiesChange={setAllergies} />
          </div>

          {/* Macro Goals Section - Only show for weekly diet plan */}
          {planType === "weekly" && (
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  <Target className="h-3 w-3" />
                </span>
                Daily Macro Goals (Optional)
              </label>
              <MacroGoalsInput goals={macroGoals} onGoalsChange={setMacroGoals} />
            </div>
          )}

          <Button
            onClick={generateRecipe}
            disabled={isLoading || ingredients.length === 0}
            className="w-full gap-2 h-12 text-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                {planType === "weekly" ? "Generate Diet Plan" : "Generate Recipe"}
              </>
            )}
          </Button>
        </div>

        {/* Recipe Display */}
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          {planType === "single" ? (
            <RecipeDisplay
              recipe={recipe}
              isLoading={isLoading}
              onRegenerate={generateRecipe}
            />
          ) : (
            weeklyPlan && (
              <WeeklyPlanDisplay 
                weeklyPlan={weeklyPlan}
                macroGoals={macroGoals}
                onRegenerate={generateRecipe}
              />
            )
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pantry;
