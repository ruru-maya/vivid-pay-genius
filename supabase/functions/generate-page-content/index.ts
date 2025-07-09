import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessData } = await req.json();

    const prompt = `Generate compelling content for a payment page based on this business information:

Business Name: ${businessData.businessName}
Industry: ${businessData.industry}
Description: ${businessData.description}
Price: ${businessData.currency} ${businessData.price}
Availability: ${businessData.availability}

Please generate:
1. A compelling headline (max 60 characters)
2. An enhanced description (2-3 sentences that build on the original description)
3. 4 key features/benefits
4. A strong call-to-action button text
5. 4 trust signals relevant to the industry
6. 4 FAQ items with questions and answers

Format the response as JSON with this structure:
{
  "headline": "string",
  "description": "string", 
  "features": ["string", "string", "string", "string"],
  "callToAction": "string",
  "trustSignals": ["string", "string", "string", "string"],
  "faq": [
    {"question": "string", "answer": "string"},
    {"question": "string", "answer": "string"},
    {"question": "string", "answer": "string"},
    {"question": "string", "answer": "string"}
  ]
}

Make the content persuasive, professional, and tailored to the ${businessData.industry} industry.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert copywriter specializing in high-converting payment pages. Always respond with valid JSON only.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    const generatedContent = JSON.parse(data.choices[0].message.content);

    // Generate accent color
    const generateAccentColor = (primaryColor: string): string => {
      const hex = primaryColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      const accentR = Math.min(255, r + 50);
      const accentG = Math.min(255, g + 30);
      const accentB = Math.min(255, b + 20);
      
      return `#${accentR.toString(16).padStart(2, '0')}${accentG.toString(16).padStart(2, '0')}${accentB.toString(16).padStart(2, '0')}`;
    };

    const pageContent = {
      title: `${businessData.businessName} - ${generatedContent.headline}`,
      headline: generatedContent.headline,
      description: generatedContent.description,
      features: generatedContent.features,
      callToAction: generatedContent.callToAction,
      trustSignals: generatedContent.trustSignals,
      faq: generatedContent.faq,
      template: 'modern',
      colors: {
        primary: businessData.colors.primary,
        secondary: businessData.colors.secondary,
        accent: generateAccentColor(businessData.colors.primary)
      }
    };

    return new Response(JSON.stringify(pageContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-page-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});