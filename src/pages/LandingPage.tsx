import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, Target, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Content",
      description: "Generate compelling copy, headlines, and CTAs tailored to your industry"
    },
    {
      icon: Target,
      title: "Conversion Optimized",
      description: "Every element designed to maximize payment completion rates"
    },
    {
      icon: Clock,
      title: "Ready in Minutes",
      description: "From business info to live payment page in under 5 minutes"
    }
  ];

  const benefits = [
    "Professional landing pages without design skills",
    "Industry-specific content optimization",
    "Mobile-first responsive design",
    "Built-in conversion best practices",
    "No coding required"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple" />
              <h1 className="text-xl font-semibold">AI Landing Page Generator</h1>
            </div>
            <Button onClick={() => navigate('/generate')} className="bg-purple hover:bg-purple/90">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full bg-purple/10 px-3 py-1 text-sm text-purple mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Landing Pages
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Create Professional
            <span className="text-purple block">Payment Pages</span>
            in Minutes
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your business description into a conversion-optimized landing page with AI-generated content, professional design, and payment integration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/generate')}
              className="bg-purple hover:bg-purple/90 text-lg px-8 py-6"
            >
              Generate My Landing Page
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
            >
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AI Generation?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Skip the weeks of design and copywriting. Get professional results instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-none shadow-soft">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-purple" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Everything You Need to
                <span className="text-purple block">Convert Visitors</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI understands conversion psychology and creates pages that actually drive results for your business.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple/20 to-purple/5 rounded-2xl p-8 border">
                <div className="bg-background rounded-lg p-6 shadow-soft">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-purple" />
                    <span className="font-medium">AI Processing...</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple/10 to-purple/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Landing Page?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of businesses that trust AI to generate their conversion-optimized pages.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/generate')}
            className="bg-purple hover:bg-purple/90 text-lg px-8 py-6"
          >
            Start Generating Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Ready in minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple" />
            <span className="font-medium">AI Landing Page Generator</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Powered by advanced AI to create conversion-optimized landing pages
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;