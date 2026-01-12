import pastaPrimavera from "@/assets/meals/pasta-primavera.jpg";
import thaiCurry from "@/assets/meals/thai-curry.jpg";
import grilledSalmon from "@/assets/meals/grilled-salmon.jpg";
import mushroomRisotto from "@/assets/meals/mushroom-risotto.jpg";
import chickenStirfry from "@/assets/meals/chicken-stirfry.jpg";
import caesarSalad from "@/assets/meals/caesar-salad.jpg";

const meals = [
  { name: "Pasta Primavera", image: pastaPrimavera },
  { name: "Thai Green Curry", image: thaiCurry },
  { name: "Grilled Salmon", image: grilledSalmon },
  { name: "Mushroom Risotto", image: mushroomRisotto },
  { name: "Chicken Stir Fry", image: chickenStirfry },
  { name: "Caesar Salad", image: caesarSalad },
];

export const MealGallery = () => {
  // Duplicate meals for seamless infinite scroll
  const duplicatedMeals = [...meals, ...meals];

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="flex gap-4 animate-[scroll_30s_linear_infinite]"
        style={{ width: "fit-content" }}
      >
        {duplicatedMeals.map((meal, index) => (
          <div 
            key={`${meal.name}-${index}`}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex-shrink-0 w-[250px]"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-foreground drop-shadow-lg">
                {meal.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
