import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  name: string;
  review: string;
  rating: number;
  avatar: string;
  delay?: number;
}

export const ReviewCard = ({ name, review, rating, avatar, delay = 0 }: ReviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "bg-card/90 backdrop-blur-sm rounded-2xl p-6 border border-border/30",
        "transition-all duration-500 ease-out cursor-pointer",
        isHovered 
          ? "scale-105 shadow-[0_20px_50px_-12px_hsl(var(--primary)/0.4)] z-20 -translate-y-3" 
          : "scale-100 shadow-[0_10px_30px_-10px_hsl(var(--foreground)/0.15)] z-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
          {avatar}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < rating ? "text-primary fill-primary" : "text-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{review}</p>
    </div>
  );
};
