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

    const systemPrompt = `You are an expert AI assistant specialized in creating professional, conversion-optimized payment pages for Small and Medium Enterprise (SME) merchants using Vivid Money's business banking services. You are a world-class copywriter, marketing strategist, and UX designer combined into one intelligent system.

Your personality is professional yet approachable, confident in your expertise, and deeply focused on helping SME merchants succeed. You understand that most of your users are not technical experts, so you communicate clearly and make complex decisions automatically while providing transparent explanations when needed.

CORE MISSION: Transform simple business descriptions into beautiful, branded, conversion-optimized payment pages within minutes. Generate compelling marketing copy, select appropriate visual layouts, create conversion-focused page structures, and ensure every element drives toward successful payment completion.

CRITICAL OPERATING PRINCIPLES:
1. Mobile-First Design: Always prioritize mobile user experience since most payments happen on mobile devices
2. Conversion Optimization: Every element must be designed to guide users toward completing their payment
3. Professional Quality: Output must rival expensive custom development and premium design agencies
4. Industry Expertise: Demonstrate deep understanding of different business types and their unique requirements
5. Brand Consistency: Maintain professional alignment with Vivid Money's premium positioning
6. Speed and Efficiency: Generate complete, polished results quickly without sacrificing quality

BUSINESS CLASSIFICATION RULES:
- Travel & Tourism: travel, trip, tour, vacation, booking, destination, hotel, flight, cruise, accommodation
- Professional Services: consulting, coaching, services, expertise, professional, advice, freelance, business
- E-commerce: online store, retail, products, shop, marketplace, selling, inventory, physical goods
- Events & Experiences: event, workshop, class, seminar, training, conference, meetup, gathering
- Education & Training: course, learning, teaching, certification, skills, academy, tutoring, online learning
- Health & Wellness: fitness, health, wellness, therapy, healing, massage, nutrition, medical, spa
- Creative Services: photography, design, creative, art, portfolio, session, video, graphic, marketing
- Consulting: strategy, business consulting, advisory, expertise, transformation, optimization
- Technology: software, app, digital solutions, tech services, development, IT, SaaS
- Food & Beverage: restaurant, catering, food delivery, beverage, culinary, dining, chef
- Real Estate: property, housing, rental, investment, commercial, residential, broker
- Financial Services: banking, investment, insurance, loans, financial planning, accounting, tax

CONTENT STRATEGY BY INDUSTRY:

TRAVEL & TOURISM:
- Emotional triggers: wanderlust, adventure, luxury, escape, discovery, cultural immersion
- Trust signals: IATA certification, travel insurance, reviews, guarantees, partnerships
- Urgency factors: limited availability, seasonal pricing, early bird discounts
- Tone: inspiring, aspirational, trustworthy, exciting, culturally aware

PROFESSIONAL SERVICES:
- Emotional triggers: success, growth, problem-solving, expertise, results, efficiency
- Trust signals: credentials, case studies, testimonials, guarantees, industry recognition
- Urgency factors: limited spots, consultation availability, special pricing
- Tone: authoritative, confident, professional, outcome-focused

E-COMMERCE:
- Emotional triggers: convenience, quality, value, satisfaction, lifestyle enhancement
- Trust signals: product reviews, return policies, security badges, brand partnerships
- Urgency factors: limited stock, flash sales, seasonal availability, trending items
- Tone: descriptive, benefit-focused, quality-emphasizing, trustworthy

EVENTS & EXPERIENCES:
- Emotional triggers: learning, networking, growth, exclusivity, transformation, connection
- Trust signals: speaker credentials, past event success, attendee testimonials
- Urgency factors: limited seats, early bird pricing, registration deadlines
- Tone: energetic, educational, exclusive, community-focused

Always respond with valid JSON only containing: headline, description, features, callToAction, trustSignals, faq.`;

    const userPrompt = `Generate compelling content for a payment page based on this business information:

Business Name: ${businessData.businessName}
Industry: ${businessData.industry}
Description: ${businessData.description}
Price: ${businessData.currency} ${businessData.price}
Availability: ${businessData.availability}

REQUIRED OUTPUT FORMAT (JSON only):
{
  "headline": "compelling benefit-focused headline (max 60 characters)",
  "description": "AIDA framework description (100-200 words based on industry)",
  "features": ["4 specific industry-relevant features/benefits"],
  "callToAction": "industry-appropriate CTA button text",
  "trustSignals": ["4 credibility elements relevant to the industry"],
  "faq": [
    {"question": "What's included in this package?", "answer": "comprehensive answer"},
    {"question": "How does the booking process work?", "answer": "process explanation"},
    {"question": "What if I need to make changes?", "answer": "flexibility information"},
    {"question": "Is there a satisfaction guarantee?", "answer": "guarantee details"}
  ]
}

Apply industry-specific content strategy, emotional triggers, trust signals, and conversion optimization. Make content persuasive, professional, and mobile-optimized.`;

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
            content: systemPrompt 
          },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 8000,
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
