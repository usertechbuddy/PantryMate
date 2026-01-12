import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Sparkles, Zap, Clock, Heart, ArrowDown, Quote } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ReviewCard } from "@/components/ReviewCard";
import { MealGallery } from "@/components/MealGallery";
import { useParallax } from "@/hooks/useParallax";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroFood from "@/assets/hero-food.jpg";
import fridgeProblem from "@/assets/fridge-problem.jpg";
import solutionMagic from "@/assets/solution-magic.jpg";
import cookingCta from "@/assets/cooking-cta.jpg";
import kitchenScene from "@/assets/kitchen-scene.jpg";
import peopleCooking from "@/assets/people-cooking.jpg";
const reviews = [{
  name: "Sarah M.",
  avatar: "S",
  rating: 5,
  review: "Finally, no more scrolling through endless blog posts! Got a delicious pasta recipe in seconds."
}, {
  name: "James K.",
  avatar: "J",
  rating: 5,
  review: "Used random veggies from my fridge and PantryMate gave me an amazing stir fry recipe."
}, {
  name: "Emily R.",
  avatar: "E",
  rating: 4,
  review: "Love how quick and simple it is. My go-to app when I don't know what to cook."
}, {
  name: "Mike T.",
  avatar: "M",
  rating: 5,
  review: "The AI actually understands flavor combinations. Every recipe has been a hit!"
}];
const Landing = () => {
  const navigate = useNavigate();
  const heroParallax = useParallax(0.3);
  const kitchenParallax = useParallax(0.4);
  const peopleParallax = useParallax(0.35);
  const ctaParallax = useParallax(0.3);
  return <div className="bg-background text-foreground overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col items-center justify-center px-4 text-center pt-16">
        <div ref={heroParallax.ref} className="absolute inset-0 z-0">
          <img src={heroFood} alt="Delicious home-cooked meal" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" style={{
          transform: `translateY(${heroParallax.offset}px) scale(1.1)`
        }} />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        
        <div className="relative z-10 animate-fade-in">
          <div className="bg-card/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-border/50 max-w-2xl mx-auto hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <ChefHat className="h-20 w-20 text-primary mx-auto mb-6 hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
              PantryMate
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-md mx-auto">
              Your AI-powered pocket kitchen assistant.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-8 z-10 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <p className="text-sm">Scroll to learn more</p>
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <AnimatedSection className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-xl group-hover:bg-primary/30 transition-all duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img src={fridgeProblem} alt="Person looking in fridge" className="w-full h-auto object-cover" />
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="order-1 lg:order-2 space-y-6" delay={200}>
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/30 hover:shadow-xl transition-shadow duration-300">
              <span className="inline-block text-primary font-medium uppercase tracking-wide text-sm mb-4 bg-primary/10 px-4 py-2 rounded-full">
                The Problem
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                We've all been there...
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Staring into the fridge, wondering what to cook. You have random
                ingredients but no idea how to combine them. The struggle is real.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: 'linear-gradient(135deg, #8BB377, #4A6B5D)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <AnimatedSection className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-shadow duration-300">
              <span className="inline-block text-primary font-medium uppercase tracking-wide text-sm mb-4 bg-primary/10 px-4 py-2 rounded-full">
                The Solution
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                Just tell us what you have.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Add your ingredients, pick your cuisine preference, and let our AI
                create the perfect recipe for you. It's that simple.
              </p>
              <Sparkles className="h-12 w-12 text-primary mt-6" />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-xl group-hover:bg-white/30 transition-all duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img alt="Fresh ingredients around a phone" className="w-full h-auto object-cover" src="/lovable-uploads/a65b164e-95a6-4814-b20e-4754e62eab98.jpg" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Kitchen Scene Section */}
      <section className="min-h-screen relative flex items-center justify-center px-4 py-16 overflow-hidden">
        <div ref={kitchenParallax.ref} className="absolute inset-0 z-0 overflow-hidden">
          <img src={kitchenScene} alt="Beautiful kitchen with fresh ingredients" className="w-full h-full object-cover" style={{
          transform: `translateY(${kitchenParallax.offset}px) scale(1.15)`
        }} />
          <div className="absolute inset-0 bg-background/50" />
        </div>
        
        <AnimatedSection className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="bg-card/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500">
            <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300" />
            <p className="text-2xl md:text-4xl font-serif italic text-foreground leading-relaxed mb-6">
              "Cooking is like love. It should be entered into with abandon or not at all."
            </p>
            <p className="text-muted-foreground">— Harriet Van Horne</p>
          </div>
        </AnimatedSection>
      </section>

      {/* Meal Gallery Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-muted/30">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block text-primary font-medium uppercase tracking-wide text-sm bg-primary/10 px-4 py-2 rounded-full mb-4">
            Endless Possibilities
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            Meals you can create
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            From quick lunches to gourmet dinners, discover recipes tailored to your pantry.
          </p>
        </AnimatedSection>
        
        <MealGallery />
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: 'linear-gradient(135deg, #8BB377, #4A6B5D)' }}>
        <AnimatedSection className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="inline-block font-medium uppercase tracking-wide text-sm bg-white/20 text-white px-4 py-2 rounded-full">
              Why PantryMate?
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Cooking made simple.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[{
            icon: Zap,
            title: "No Ads",
            desc: "Just recipes. No distractions."
          }, {
            icon: Clock,
            title: "No Blog Spam",
            desc: "Skip the life stories. Get cooking."
          }, {
            icon: Heart,
            title: "Use What You Have",
            desc: "AI-generated recipes from your ingredients."
          }, {
            icon: Sparkles,
            title: "Instant Results",
            desc: "Get a recipe in seconds, not hours."
          }].map((feature, index) => <AnimatedSection key={feature.title} delay={index * 100}>
                <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </AnimatedSection>)}
          </div>
        </AnimatedSection>
      </section>

      {/* Reviews Section */}
      <section className="min-h-screen relative flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
        <div ref={peopleParallax.ref} className="absolute inset-0 z-0 overflow-hidden">
          <img src={peopleCooking} alt="People enjoying home-cooked meal" className="w-full h-full object-cover" style={{
          transform: `translateY(${peopleParallax.offset}px) scale(1.15)`
        }} />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block text-primary font-medium uppercase tracking-wide text-sm bg-primary/10 px-4 py-2 rounded-full mb-4">
              What People Say
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Loved by home cooks
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => <AnimatedSection key={review.name} delay={index * 150}>
                <ReviewCard name={review.name} avatar={review.avatar} rating={review.rating} review={review.review} />
              </AnimatedSection>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen relative flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <div ref={ctaParallax.ref} className="absolute inset-0 z-0 overflow-hidden">
          <img src={cookingCta} alt="Happy person cooking" className="w-full h-full object-cover" style={{
          transform: `translateY(${ctaParallax.offset}px) scale(1.15)`
        }} />
          <div className="absolute inset-0 bg-background/65" />
        </div>
        
        <AnimatedSection className="relative z-10 max-w-xl mx-auto">
          <div className="bg-card/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 hover:shadow-3xl transition-shadow duration-300">
            <ChefHat className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Ready to cook?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stop wondering. Start cooking.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" onClick={() => navigate("/pantry")}>
              Start Cooking Now!
            </Button>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>;
};
export default Landing;