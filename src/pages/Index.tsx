import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Shield, BarChart3, Palette, Globe, ArrowRight, Star } from 'lucide-react';
import heroBackground from "@/assets/hero-background.jpg";
import { PageGenerator } from "@/components/PageGenerator";

const Index = () => {
  const [showGenerator, setShowGenerator] = useState(false);

  if (showGenerator) {
    return <PageGenerator onBack={() => setShowGenerator(false)} />;
  }

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Content",
      description: "Advanced AI generates compelling copy, headlines, and descriptions tailored to your business"
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Create professional payment pages in under 60 seconds with our lightning-fast AI engine"
    },
    {
      icon: Palette,
      title: "Smart Design",
      description: "Automatically selects colors, layouts, and styles that convert based on your industry"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Enterprise-grade security with PCI DSS compliance and fraud protection"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track performance with detailed analytics and conversion optimization suggestions"
    },
    {
      icon: Globe,
      title: "Multi-Currency",
      description: "Accept payments in 135+ currencies with automatic conversion and localization"
    }
  ];

  const industries = [
    "Travel & Tourism", "Professional Services", "E-commerce", "Events & Experiences",
    "Education & Training", "Health & Wellness", "Creative Services", "Consulting"
  ];

  const stats = [
    { label: "Payment Pages Created", value: "25,000+" },
    { label: "Average Conversion Rate", value: "18.5%" },
    { label: "Time Saved Per Page", value: "3.5 hrs" },
    { label: "Customer Satisfaction", value: "4.9/5" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" variant="outline">
            <Sparkles className="mr-2 h-4 w-4" />
            Powered by Advanced AI
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            AI Payment Page
            <br />
            <span className="text-primary">Generator</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your business ideas into stunning, high-converting payment pages in minutes. 
            No design skills needed – just describe your business and watch AI create magic.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="xl" 
              variant="premium"
              onClick={() => setShowGenerator(true)}
              className="group"
            >
              Generate My Payment Page
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline">
              View Examples
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Our AI Generator?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for SME merchants who need professional results without the complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:translate-y-[-4px]">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Perfect for Every Industry
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Our AI understands industry-specific needs and creates targeted content
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-hero text-white border-0 shadow-strong">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current text-yellow-400" />
                  ))}
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of SME merchants who've revolutionized their payment process
              </p>
              <Button 
                size="xl" 
                variant="outline"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setShowGenerator(true)}
              >
                Start Creating Now - It's Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Powered by Vivid Money Business Banking • Enterprise-grade security and compliance
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;