import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients, cuisine, mealType, allergies, planType, macroGoals } = await req.json();

    if (!ingredients || ingredients.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No ingredients provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let prompt = '';
    
    if (planType === 'weekly') {
      prompt = `Create a healthy weekly diet meal plan (7 days: Monday to Sunday) for someone looking to eat healthier and manage their weight. Use these available ingredients: ${ingredients.join(", ")}. Focus on balanced nutrition, portion control, and include a mix of proteins, healthy carbs, and vegetables. Each meal should be calorie-conscious and nutritious.`;
      
      // Add macro goals if provided
      if (macroGoals && (macroGoals.calories || macroGoals.protein || macroGoals.carbs || macroGoals.fat)) {
        prompt += ` The user has the following daily macro goals:`;
        if (macroGoals.calories) prompt += ` ${macroGoals.calories} calories,`;
        if (macroGoals.protein) prompt += ` ${macroGoals.protein}g protein,`;
        if (macroGoals.carbs) prompt += ` ${macroGoals.carbs}g carbs,`;
        if (macroGoals.fat) prompt += ` ${macroGoals.fat}g fat.`;
        prompt += ` Try to create meals that help meet these daily goals.`;
      }
    } else {
      prompt = `Create a recipe using these ingredients: ${ingredients.join(", ")}.`;
    }
    
    if (cuisine !== "Any") {
      prompt += ` The recipes should be ${cuisine} cuisine.`;
    }
    
    if (mealType !== "Any") {
      prompt += ` These should be ${mealType.toLowerCase()} recipes.`;
    }

    if (allergies && allergies.length > 0) {
      prompt += ` IMPORTANT: The user has the following allergies/dietary restrictions: ${allergies.join(", ")}. Do NOT include any ingredients that contain or are derived from these allergens. Avoid cross-contamination risks.`;
    }
    
    if (planType === 'weekly') {
      prompt += `
      
      Return a JSON response with this exact structure (7 days):
      {
        "Monday": {
          "name": "Recipe Name",
          "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
          "instructions": ["step 1", "step 2"],
          "cookingTime": "30 minutes",
          "servings": "1",
          "difficulty": "Easy",
          "calories": "450 kcal",
          "protein": "35g",
          "carbs": "40g",
          "fat": "15g",
          "nutritionTip": "High in protein, great for muscle recovery"
        },
        "Tuesday": { ... },
        "Wednesday": { ... },
        "Thursday": { ... },
        "Friday": { ... },
        "Saturday": { ... },
        "Sunday": { ... }
      }`;
    } else {
      prompt += `
      
      Return a JSON response with this exact structure:
      {
        "name": "Recipe Name",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "instructions": ["step 1", "step 2"],
        "cookingTime": "30 minutes",
        "servings": "4",
        "difficulty": "Easy"
      }`;
    }

    console.log('Calling Lovable AI with prompt:', prompt);

    // Generate recipe text
    const recipeResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a helpful cooking assistant. Always respond with valid JSON only, no additional text.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!recipeResponse.ok) {
      if (recipeResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (recipeResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await recipeResponse.text();
      console.error('Lovable AI error:', recipeResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate recipe' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await recipeResponse.json();
    let recipeText = data.choices[0].message.content;
    
    // Remove markdown code fences if present
    recipeText = recipeText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const parsedRecipe = JSON.parse(recipeText);

    console.log('Recipe generated successfully:', parsedRecipe);

    // Generate image for the recipe
    let imageUrl = null;
    try {
      const imagePrompt = `A beautiful, appetizing photo of ${parsedRecipe.name}, professional food photography, top-down view, warm lighting, garnished beautifully, on a rustic table setting`;
      
      console.log('Generating image with prompt:', imagePrompt);
      
      const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableApiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: imagePrompt,
            },
          ],
          modalities: ["image", "text"],
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const imageContent = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        if (imageContent) {
          imageUrl = imageContent;
          console.log('Image generated successfully');
        }
      } else {
        console.error('Image generation failed:', imageResponse.status);
      }
    } catch (imageError) {
      console.error('Error generating image:', imageError);
      // Continue without image if generation fails
    }

    return new Response(
      JSON.stringify({ ...parsedRecipe, imageUrl }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
