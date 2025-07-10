import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Monitor, Smartphone, Edit, RefreshCw, Eye, Star, Shield, Clock, Users, CreditCard, Check, ChevronDown, ChevronUp, Palette, Maximize, Minimize, Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink, Menu, X } from 'lucide-react';
import { BusinessData, GeneratedPage } from '../PageGenerator';
import { InlineEditor } from './InlineEditor';
import { ColorCustomizer } from './ColorCustomizer';
import { CreditCardForm, CreditCardData } from './CreditCardForm';

interface PagePreviewProps {
  generatedPage: GeneratedPage;
  businessData: BusinessData;
  onEdit: () => void;
  onRegenerate: () => void;
}

export const PagePreview = ({
  generatedPage,
  businessData,
  onEdit,
  onRegenerate
}: PagePreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showInlineEditor, setShowInlineEditor] = useState(false);
  const [showColorCustomizer, setShowColorCustomizer] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSocialEditor, setShowSocialEditor] = useState(false);
  const [currentContent, setCurrentContent] = useState({
    headline: generatedPage.headline,
    description: generatedPage.description,
    features: generatedPage.features,
    callToAction: generatedPage.callToAction,
    trustSignals: generatedPage.trustSignals,
    faq: generatedPage.faq
  });
  const [currentColors, setCurrentColors] = useState(generatedPage.colors);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const {
    toast
  } = useToast();
  
  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'CAD': 'C$',
      'AUD': 'A$',
      'JPY': '¥',
      'CHF': 'Fr'
    };
    return symbols[currency] || '$';
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleContentChange = (newContent: any) => {
    setCurrentContent(newContent);
    toast({
      title: "Content Updated",
      description: "Your page content has been updated successfully."
    });
  };

  const handleColorsChange = (newColors: {
    primary: string;
    secondary: string;
    accent: string;
  }) => {
    setCurrentColors(newColors);
    toast({
      title: "Colors Updated",
      description: "Your page colors have been updated successfully."
    });
  };

  const handlePaymentSubmit = async (paymentData: CreditCardData) => {
    setIsProcessingPayment(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessingPayment(false);
    setShowPaymentDialog(false);
    toast({
      title: "Payment Successful!",
      description: "Your landing page has been published successfully."
    });
  };

  const handleSocialLinksUpdate = (newSocialLinks: typeof socialLinks) => {
    setSocialLinks(newSocialLinks);
    setShowSocialEditor(false);
    toast({
      title: "Social Links Updated",
      description: "Your social media links have been updated successfully."
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return Facebook;
      case 'twitter':
        return Twitter;
      case 'instagram':
        return Instagram;
      case 'linkedin':
        return Linkedin;
      case 'youtube':
        return Youtube;
      default:
        return ExternalLink;
    }
  };

  const displayedContent = {
    ...generatedPage,
    ...currentContent,
    colors: currentColors
  };

  return <div className="min-h-screen bg-background">
      {/* Control Panel */}
      <div className="border-b bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">Preview Your Landing Page</h2>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button variant={viewMode === 'desktop' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('desktop')} className="h-8">
                  <Monitor className="h-4 w-4 mr-1" />
                  Desktop
                </Button>
                <Button variant={viewMode === 'mobile' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('mobile')} className="h-8">
                  <Smartphone className="h-4 w-4 mr-1" />
                  Mobile
                </Button>
              </div>

              {/* Action Buttons */}
              <Button variant="outline" onClick={() => setIsFullscreen(!isFullscreen)} className="text-purple/60 border-purple/50 hover:bg-purple/60 hover:text-white">
                {isFullscreen ? <Minimize className="h-4 w-4 mr-2" /> : <Maximize className="h-4 w-4 mr-2" />}
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
              <Button variant="outline" onClick={() => setShowInlineEditor(true)} className="text-purple/60 border-purple/50 hover:bg-purple/60 hover:text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Content
              </Button>
              <Button variant="outline" onClick={onRegenerate} className="text-purple/60 border-purple/50 hover:bg-purple/60 hover:text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogTrigger asChild>
                  <Button variant="premium" style={{
                  backgroundColor: displayedContent.colors.primary,
                  color: 'white'
                }}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Publish Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* Fullscreen Overlay */}
                {isFullscreen && <div className="fixed inset-0 z-50 bg-black">
                    <div className="w-full h-full overflow-auto bg-white">
                      <div className="min-h-screen" style={{
                  background: `linear-gradient(135deg, ${displayedContent.colors.primary}15, ${displayedContent.colors.secondary}10)`
                }}>
                        {/* Generated Payment Page Content in Fullscreen */}
                        {/* Header Navigation */}
                         <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                           <div className="w-full px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                {/* Logo */}
                                {businessData.images.find(img => img.type === 'logo') && (
                                  <img 
                                    src={URL.createObjectURL(businessData.images.find(img => img.type === 'logo')!.file)} 
                                    alt="Company logo" 
                                    className="h-10 w-10 sm:h-16 sm:w-16 object-contain rounded"
                                  />
                                )}
                                {/* Business Name */}
                                <div className="font-bold text-lg sm:text-xl" style={{
                                  color: displayedContent.colors.primary
                                }}>
                                  {businessData.companyName}
                                </div>
                              </div>
                              
                              {/* Navigation and mobile menu */}
                              <div className="flex items-center space-x-2 sm:space-x-4">
                                {/* Desktop Navigation */}
                                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                                  <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                    Home
                                  </button>
                                  <button onClick={() => scrollToSection('features')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                    What's Included
                                  </button>
                                  <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                    FAQ
                                  </button>
                                  <button onClick={() => scrollToSection('cta')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                    Get Started
                                  </button>
                                </nav>
                                
                                {/* Mobile Menu Button */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                                  className="md:hidden"
                                  style={{
                                    borderColor: displayedContent.colors.primary,
                                    color: displayedContent.colors.primary
                                  }}
                                >
                                  {showMobileMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                                </Button>
                                
                                {/* Exit fullscreen button - icon only with color theme */}
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setIsFullscreen(false)}
                                  style={{
                                    borderColor: displayedContent.colors.primary,
                                    color: displayedContent.colors.primary,
                                    width: '36px',
                                    height: '36px',
                                    padding: '0'
                                  }}
                                  className="hover:bg-opacity-0 flex-shrink-0"
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <Minimize className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {/* Mobile Menu Dropdown */}
                            {showMobileMenu && (
                              <div className="md:hidden bg-white border-t border-gray-200 shadow-lg z-50">
                                <nav className="px-4 py-3 space-y-2">
                                  <button
                                    onClick={() => {
                                      scrollToSection('home');
                                      setShowMobileMenu(false);
                                    }}
                                    className="block w-full text-left py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                                    style={{ color: displayedContent.colors.primary }}
                                  >
                                    Home
                                  </button>
                                  <button
                                    onClick={() => {
                                      scrollToSection('features');
                                      setShowMobileMenu(false);
                                    }}
                                    className="block w-full text-left py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                                    style={{ color: displayedContent.colors.primary }}
                                  >
                                    What's Included
                                  </button>
                                  <button
                                    onClick={() => {
                                      scrollToSection('faq');
                                      setShowMobileMenu(false);
                                    }}
                                    className="block w-full text-left py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                                    style={{ color: displayedContent.colors.primary }}
                                  >
                                    FAQ
                                  </button>
                                  <button
                                    onClick={() => {
                                      scrollToSection('cta');
                                      setShowMobileMenu(false);
                                    }}
                                    className="block w-full text-left py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                                    style={{ color: displayedContent.colors.primary }}
                                  >
                                    Get Started
                                  </button>
                                </nav>
                              </div>
                            )}
                          </div>
                        </header>

                        {/* Hero Section */}
                        <section id="home" className="relative overflow-hidden">
                          {/* Background Image or Gradient */}
                          {businessData.images.length > 0 ? (
                            <div 
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${URL.createObjectURL(businessData.images.find(img => img.type === 'home-bg')?.file || businessData.images[0].file)})`
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 opacity-20" style={{
                              background: `linear-gradient(135deg, ${displayedContent.colors.primary}, ${displayedContent.colors.secondary})`
                            }} />
                          )}
                          {/* Dark overlay for text readability */}
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="relative px-4 sm:px-6 py-8 sm:py-12 text-center text-white">
                            
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                              {displayedContent.headline}
                            </h1>
                            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                              {displayedContent.description}
                            </p>
                            
                            {/* Pricing */}
                            <div className="mb-6 sm:mb-8">
                              <div className="text-3xl sm:text-4xl font-bold mb-2">
                                {getCurrencySymbol(businessData.currency)}{businessData.price}
                              </div>
                              {businessData.availability && <div className="text-sm text-orange-400 font-medium">
                                  🔥 {businessData.availability}
                                </div>}
                            </div>

                            {/* CTA Button */}
                            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                              <DialogTrigger asChild>
                                <button 
                                  className="mb-6 sm:mb-8 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg w-full sm:w-auto max-w-sm mx-auto"
                                  style={{
                                    background: `linear-gradient(135deg, ${displayedContent.colors.primary}, ${displayedContent.colors.secondary})`,
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: `0 4px 15px 0 ${displayedContent.colors.primary}40`
                                  }}
                                >
                                  {displayedContent.callToAction}
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md mx-4">
                                <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                              </DialogContent>
                            </Dialog>

                            {/* Trust Signals */}
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
                              {displayedContent.trustSignals.map((signal, index) => <Badge key={index} variant="secondary" className="text-xs">
                                  {signal}
                                </Badge>)}
                            </div>
                          </div>
                        </section>

                        {/* Features Section */}
                        <section id="features" className="px-4 sm:px-6 py-8 sm:py-12 bg-white/50">
                          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">What's Included</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
                            {displayedContent.features.map((feature, index) => <div key={index} className="flex items-start space-x-3">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                          backgroundColor: displayedContent.colors.primary
                        }}>
                                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                </div>
                                <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
                              </div>)}
                          </div>
                        </section>

                        {/* Social Proof */}
                        <section className="px-4 sm:px-6 py-8 sm:py-12">
                          <div className="text-center mb-6 sm:mb-8">
                            <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-1 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />)}
                              </div>
                              <span className="text-sm text-muted-foreground">4.9/5 from 200+ customers</span>
                            </div>
                            <p className="text-muted-foreground italic text-sm sm:text-base px-4">
                              "Absolutely exceeded my expectations. Professional, reliable, and outstanding results!"
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">— Sarah M., Verified Customer</p>
                          </div>
                        </section>

                        {/* FAQ Section */}
                        <section id="faq" className="px-4 sm:px-6 py-8 sm:py-12 bg-white/30">
                          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Frequently Asked Questions</h2>
                          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
                            {displayedContent.faq.map((item, index) => <div key={index} className="border border-gray-200 rounded-lg bg-white">
                                <button onClick={() => toggleFAQ(index)} className="w-full px-3 sm:px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                                  <span className="font-medium text-sm sm:text-base pr-2">{item.question}</span>
                                  {expandedFAQ === index ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />}
                                </button>
                                {expandedFAQ === index && <div className="px-3 sm:px-4 pb-3 text-sm text-muted-foreground">
                                    {item.answer}
                                  </div>}
                              </div>)}
                          </div>
                        </section>

                        {/* Final CTA */}
                        <section id="cta" className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                          <h3 className="text-lg sm:text-xl font-bold mb-4">Ready to Get Started?</h3>
                          <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                            <DialogTrigger asChild>
                              <button 
                                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg w-full sm:w-auto max-w-sm mx-auto"
                                style={{
                                  background: `linear-gradient(135deg, ${displayedContent.colors.primary}, ${displayedContent.colors.secondary})`,
                                  color: 'white',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: `0 4px 15px 0 ${displayedContent.colors.primary}40`
                                }}
                              >
                                {displayedContent.callToAction}
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md mx-4">
                              <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                            </DialogContent>
                          </Dialog>
                          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mt-6 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 mr-1" />
                              Secure Payment
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Instant Confirmation
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              24/7 Support
                            </div>
                          </div>
                        </section>

                        {/* Footer with Social Media */}
                        <footer className="bg-gray-900 text-white px-6 py-8">
                          <div className="max-w-6xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                              <div className="mb-4 md:mb-0">
                                 <h3 className="font-bold text-lg mb-2" style={{
                                 color: displayedContent.colors.primary
                               }}>
                                   {businessData.companyName}
                                 </h3>
                                  <p className="text-gray-500 text-xs mb-1">
                                    Powered by <span className="font-medium" style={{ color: displayedContent.colors.primary }}>Vivid Money</span>
                                  </p>
                                  <p className="text-gray-400 text-sm">
                                    © 2025 {businessData.companyName}. All rights reserved.
                                  </p>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-400 mr-2">Follow us:</span>
                                {Object.entries(socialLinks).map(([platform, url]) => {
                            const IconComponent = getSocialIcon(platform);
                            return url ? <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                      <IconComponent className="h-5 w-5" />
                                    </a> : null;
                          })}
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setShowSocialEditor(true)} 
                                  className="ml-4 text-xs"
                                  style={{
                                    borderColor: displayedContent.colors.primary,
                                    color: displayedContent.colors.primary
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = displayedContent.colors.primary;
                                    e.currentTarget.style.color = 'white';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = displayedContent.colors.primary;
                                  }}
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit Social Links
                                </Button>
                              </div>
                            </div>
                          </div>
                        </footer>
                      </div>
                    </div>
                  </div>}

                {/* Regular Preview (Non-fullscreen) */}
                {!isFullscreen && <div className={`transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-md mx-auto border-8 border-gray-300 rounded-3xl bg-gray-300 p-2' : 'w-full'}`}>
                    <div className={`${viewMode === 'mobile' ? 'rounded-2xl overflow-hidden bg-white' : 'rounded-lg overflow-hidden border'} shadow-medium`}>
                      {/* Generated Payment Page */}
                      <div className="min-h-screen" style={{
                  background: `linear-gradient(135deg, ${displayedContent.colors.primary}15, ${displayedContent.colors.secondary}10)`
                }}>
                    {/* Header Navigation */}
                    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                      <div className={`mx-auto ${viewMode === 'mobile' ? 'px-3 py-2' : 'max-w-6xl px-4 sm:px-6 py-3 sm:py-4'}`}>
                         <div className="flex items-center justify-between">
                           <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-2' : 'space-x-2 sm:space-x-3'}`}>
                             {/* Logo */}
                             {businessData.images.find(img => img.type === 'logo') && (
                               <img 
                                 src={URL.createObjectURL(businessData.images.find(img => img.type === 'logo')!.file)} 
                                 alt="Company logo" 
                                 className={viewMode === 'mobile' ? 'h-8 w-8 object-contain rounded' : 'h-10 w-10 sm:h-16 sm:w-16 object-contain rounded'}
                               />
                             )}
                             {/* Business Name */}
                             <div className={`font-bold ${viewMode === 'mobile' ? 'text-sm' : 'text-lg sm:text-xl'}`} style={{
                               color: displayedContent.colors.primary
                             }}>
                               {businessData.companyName}
                             </div>
                           </div>
                           
                           {/* Navigation and mobile menu */}
                           <div className="flex items-center space-x-2">
                             {/* Show hamburger menu only in mobile view mode */}
                             {viewMode === 'mobile' ? (
                               <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => setShowMobileMenu(!showMobileMenu)}
                                 style={{
                                   borderColor: displayedContent.colors.primary,
                                   color: displayedContent.colors.primary,
                                   width: '32px',
                                   height: '32px',
                                   padding: '0'
                                 }}
                               >
                                 {showMobileMenu ? <X className="h-3 w-3" /> : <Menu className="h-3 w-3" />}
                               </Button>
                             ) : (
                               /* Desktop Navigation */
                               <nav className="flex items-center space-x-6 lg:space-x-8">
                                 <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                   Home
                                 </button>
                                 <button onClick={() => scrollToSection('features')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                   What's Included
                                 </button>
                                 <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                   FAQ
                                 </button>
                                 <button onClick={() => scrollToSection('cta')} className="text-sm font-medium hover:opacity-75 transition-opacity">
                                   Get Started
                                 </button>
                               </nav>
                             )}
                           </div>
                         </div>
                         
                         {/* Mobile Menu Dropdown - only show in mobile view mode */}
                         {showMobileMenu && viewMode === 'mobile' && (
                           <div className="bg-white border-t border-gray-200 shadow-lg z-50">
                             <nav className="px-3 py-2 space-y-1">
                               <button
                                 onClick={() => {
                                   scrollToSection('home');
                                   setShowMobileMenu(false);
                                 }}
                                 className="block w-full text-left py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                                 style={{ color: displayedContent.colors.primary }}
                               >
                                 Home
                               </button>
                               <button
                                 onClick={() => {
                                   scrollToSection('features');
                                   setShowMobileMenu(false);
                                 }}
                                 className="block w-full text-left py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                                 style={{ color: displayedContent.colors.primary }}
                               >
                                 What's Included
                               </button>
                               <button
                                 onClick={() => {
                                   scrollToSection('faq');
                                   setShowMobileMenu(false);
                                 }}
                                 className="block w-full text-left py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                                 style={{ color: displayedContent.colors.primary }}
                               >
                                 FAQ
                               </button>
                               <button
                                 onClick={() => {
                                   scrollToSection('cta');
                                   setShowMobileMenu(false);
                                 }}
                                 className="block w-full text-left py-2 text-sm font-medium hover:opacity-75 transition-opacity"
                                 style={{ color: displayedContent.colors.primary }}
                               >
                                 Get Started
                               </button>
                             </nav>
                           </div>
                         )}
                       </div>
                     </header>
                         
                         {/* Hero Section */}
                         <section id="home" className="relative overflow-hidden">
                           {/* Background Image or Gradient */}
                           {businessData.images.length > 0 ? (
                             <div 
                               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                               style={{
                                 backgroundImage: `url(${URL.createObjectURL(businessData.images.find(img => img.type === 'home-bg')?.file || businessData.images[0].file)})`
                               }}
                             />
                           ) : (
                             <div className="absolute inset-0 opacity-20" style={{
                               background: `linear-gradient(135deg, ${displayedContent.colors.primary}, ${displayedContent.colors.secondary})`
                             }} />
                           )}
                           {/* Dark overlay for text readability */}
                           <div className="absolute inset-0 bg-black/40" />
                           <div className={`relative text-center text-white ${viewMode === 'mobile' ? 'px-4 py-8' : 'px-4 sm:px-6 py-8 sm:py-12'}`}>
                             
                             
                             <h1 className={`font-bold mb-3 sm:mb-4 ${viewMode === 'mobile' ? 'text-xl' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>{displayedContent.headline}</h1>
                             <p className={`text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 ${viewMode === 'mobile' ? 'text-sm' : 'text-base sm:text-lg'}`}>{displayedContent.description}</p>
                             
                             {/* Pricing */}
                             <div className="mb-6 sm:mb-8">
                               <div className={`font-bold mb-2 ${viewMode === 'mobile' ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>{getCurrencySymbol(businessData.currency)}{businessData.price}</div>
                               {businessData.availability && <div className="text-sm text-orange-400 font-medium">
                                   🔥 {businessData.availability}
                                 </div>}
                             </div>

                             {/* CTA Button */}
                             <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                               <DialogTrigger asChild>
                                 <button 
                                   className={`mb-6 sm:mb-8 font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg w-full max-w-sm mx-auto ${viewMode === 'mobile' ? 'px-4 py-3 text-sm' : 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg'}`}
                                   style={{
                                     background: `linear-gradient(135deg, ${displayedContent.colors.primary}, ${displayedContent.colors.secondary})`,
                                     color: 'white',
                                     border: 'none',
                                     cursor: 'pointer',
                                     boxShadow: `0 4px 15px 0 ${displayedContent.colors.primary}40`
                                   }}
                                 >
                                   {displayedContent.callToAction}
                                 </button>
                               </DialogTrigger>
                               <DialogContent className="max-w-md mx-4">
                                 <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                               </DialogContent>
                             </Dialog>

                             {/* Trust Signals */}
                             <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
                               {displayedContent.trustSignals.map((signal, index) => <Badge key={index} variant="secondary" className="text-xs">
                                   {signal}
                                 </Badge>)}
                             </div>
                           </div>
                         </section>

                         {/* Features Section */}
                         <section id="features" className={`bg-white/50 ${viewMode === 'mobile' ? 'px-4 py-6' : 'px-4 sm:px-6 py-8 sm:py-12'}`}>
                           <h2 className={`font-bold text-center mb-6 sm:mb-8 ${viewMode === 'mobile' ? 'text-lg' : 'text-xl sm:text-2xl'}`}>What's Included</h2>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
                             {displayedContent.features.map((feature, index) => <div key={index} className="flex items-start space-x-3">
                                 <div className={`rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${viewMode === 'mobile' ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'}`} style={{ backgroundColor: displayedContent.colors.primary }}>
                                   <Check className={`text-white ${viewMode === 'mobile' ? 'h-2 w-2' : 'h-3 w-3 sm:h-4 sm:w-4'}`} />
                                 </div>
                                 <span className={`leading-relaxed ${viewMode === 'mobile' ? 'text-xs' : 'text-sm sm:text-base'}`}>{feature}</span>
                               </div>)}
                           </div>
                         </section>

                         {/* Social Proof */}
                         <section className={viewMode === 'mobile' ? 'px-4 py-6' : 'px-4 sm:px-6 py-8 sm:py-12'}>
                           <div className="text-center mb-6 sm:mb-8">
                             <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-1 mb-2">
                               <div className="flex items-center">
                                 {[...Array(5)].map((_, i) => <Star key={i} className={`fill-yellow-400 text-yellow-400 ${viewMode === 'mobile' ? 'h-3 w-3' : 'h-4 w-4 sm:h-5 sm:w-5'}`} />)}
                               </div>
                               <span className="text-sm text-muted-foreground">4.9/5 from 200+ customers</span>
                             </div>
                             <p className={`text-muted-foreground italic ${viewMode === 'mobile' ? 'text-xs' : 'text-sm sm:text-base'}`}>
                               "Absolutely exceeded my expectations. Professional, reliable, and outstanding results!"
                             </p>
                             <p className="text-sm text-muted-foreground mt-2">— Sarah M., Verified Customer</p>
                           </div>
                         </section>

                         {/* FAQ Section */}
                         <section id="faq" className={`bg-white/30 ${viewMode === 'mobile' ? 'px-4 py-6' : 'px-4 sm:px-6 py-8 sm:py-12'}`}>
                           <h2 className={`font-bold text-center mb-6 sm:mb-8 ${viewMode === 'mobile' ? 'text-lg' : 'text-xl sm:text-2xl'}`}>Frequently Asked Questions</h2>
                           <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
                             {displayedContent.faq.map((item, index) => <div key={index} className="border border-gray-200 rounded-lg bg-white">
                                 <button onClick={() => toggleFAQ(index)} className={`w-full text-left flex items-center justify-between hover:bg-gray-50 ${viewMode === 'mobile' ? 'px-3 py-2' : 'px-3 sm:px-4 py-3'}`}>
                                   <span className={`font-medium pr-2 ${viewMode === 'mobile' ? 'text-xs' : 'text-sm sm:text-base'}`}>{item.question}</span>
                                   {expandedFAQ === index ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />}
                                 </button>
                                 {expandedFAQ === index && <div className={`text-muted-foreground ${viewMode === 'mobile' ? 'px-3 pb-2 text-xs' : 'px-3 sm:px-4 pb-3 text-sm'}`}>
                                     {item.answer}
                                   </div>}
                               </div>)}
                           </div>
                         </section>

                         {/* Final CTA */}
                         <section id="cta" className={`text-center ${viewMode === 'mobile' ? 'px-4 py-6' : 'px-4 sm:px-6 py-8 sm:py-12'}`}>
                           <h3 className={`font-bold mb-4 ${viewMode === 'mobile' ? 'text-base' : 'text-lg sm:text-xl'}`}>Ready to Get Started?</h3>
                           <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                             <DialogTrigger asChild>
                               <button 
                                 className={`font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg w-full max-w-sm mx-auto ${viewMode === 'mobile' ? 'px-4 py-3 text-sm' : 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg'}`}
                                 style={{
                                   background: `linear-gradient(135deg, ${displayedContent.colors.primary}, ${displayedContent.colors.secondary})`,
                                   color: 'white',
                                   border: 'none',
                                   cursor: 'pointer',
                                   boxShadow: `0 4px 15px 0 ${displayedContent.colors.primary}40`
                                 }}
                               >
                                 {displayedContent.callToAction}
                               </button>
                             </DialogTrigger>
                             <DialogContent className="max-w-md mx-4">
                               <CreditCardForm onSubmit={handlePaymentSubmit} isLoading={isProcessingPayment} />
                             </DialogContent>
                           </Dialog>
                           <div className={`flex flex-col sm:flex-row items-center justify-center mt-6 text-muted-foreground ${viewMode === 'mobile' ? 'space-y-1 text-xs' : 'space-y-2 sm:space-y-0 sm:space-x-6 text-sm'}`}>
                             <div className="flex items-center">
                               <Shield className="h-4 w-4 mr-1" />
                               Secure Payment
                             </div>
                             <div className="flex items-center">
                               <Clock className="h-4 w-4 mr-1" />
                               Instant Confirmation
                             </div>
                             <div className="flex items-center">
                               <Users className="h-4 w-4 mr-1" />
                               24/7 Support
                             </div>
                           </div>
                         </section>

                         {/* Footer with Social Media */}
                         <footer className="bg-gray-900 text-white px-6 py-8">
                           <div className="max-w-6xl mx-auto">
                             <div className="flex flex-col md:flex-row justify-between items-center">
                               <div className="mb-4 md:mb-0">
                                 <h3 className="font-bold text-lg mb-2" style={{
                                 color: displayedContent.colors.primary
                               }}>
                                   {businessData.companyName}
                                 </h3>
                                 <p className="text-gray-500 text-xs mb-1">
                                   Powered by <span className="font-medium" style={{ color: displayedContent.colors.primary }}>Vivid Money</span>
                                 </p>
                                 <p className="text-gray-400 text-sm">
                                   © 2025 {businessData.companyName}. All rights reserved.
                                 </p>
                               </div>
                               
                               <div className="flex items-center space-x-4">
                                 <span className="text-sm text-gray-400 mr-2">Follow us:</span>
                                 {Object.entries(socialLinks).map(([platform, url]) => {
                                   const IconComponent = getSocialIcon(platform);
                                   return url ? <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                     <IconComponent className="h-5 w-5" />
                                   </a> : null;
                                 })}
                                 <Button 
                                   variant="outline" 
                                   size="sm" 
                                   onClick={() => setShowSocialEditor(true)} 
                                   className="ml-4 text-xs"
                                   style={{
                                     borderColor: displayedContent.colors.primary,
                                     color: displayedContent.colors.primary
                                   }}
                                   onMouseEnter={(e) => {
                                     e.currentTarget.style.backgroundColor = displayedContent.colors.primary;
                                     e.currentTarget.style.color = 'white';
                                   }}
                                   onMouseLeave={(e) => {
                                     e.currentTarget.style.backgroundColor = 'transparent';
                                     e.currentTarget.style.color = displayedContent.colors.primary;
                                   }}
                                 >
                                   <Edit className="h-3 w-3 mr-1" />
                                   Edit Social Links
                                 </Button>
                               </div>
                             </div>
                           </div>
                         </footer>
                       </div>
                     </div>
                   </div>}
             </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {/* Conversion Score */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-xl font-bold text-green-700">94%</div>
                  <div className="text-xs text-green-600 mt-1">Conversion Score</div>
                </div>

                {/* SEO Rating */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-xl font-bold text-emerald-700">A+</div>
                  <div className="text-xs text-emerald-600 mt-1">SEO Rating</div>
                </div>

                {/* Load Time */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-xl font-bold text-blue-700">1.2s</div>
                  <div className="text-xs text-blue-600 mt-1">Load Time</div>
                </div>

                {/* Mobile Score */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-xl font-bold text-green-700">98%</div>
                  <div className="text-xs text-green-600 mt-1">Mobile Score</div>
                </div>
              </div>

              <Separator />

              {/* Trust Signals */}
              <div className="space-y-3">
                
              </div>
            </CardContent>
          </Card>

          {/* Color Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Color Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Custom Color Inputs */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      id="primary-color"
                      type="color"
                      value={currentColors.primary}
                      onChange={(e) => handleColorsChange({ ...currentColors, primary: e.target.value })}
                      className="w-12 h-10 rounded border border-input cursor-pointer"
                    />
                    <div className="flex-1 text-sm font-mono text-muted-foreground">
                      {currentColors.primary}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      id="secondary-color"
                      type="color"
                      value={currentColors.secondary}
                      onChange={(e) => handleColorsChange({ ...currentColors, secondary: e.target.value })}
                      className="w-12 h-10 rounded border border-input cursor-pointer"
                    />
                    <div className="flex-1 text-sm font-mono text-muted-foreground">
                      {currentColors.secondary}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      id="accent-color"
                      type="color"
                      value={currentColors.accent}
                      onChange={(e) => handleColorsChange({ ...currentColors, accent: e.target.value })}
                      className="w-12 h-10 rounded border border-input cursor-pointer"
                    />
                    <div className="flex-1 text-sm font-mono text-muted-foreground">
                      {currentColors.accent}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Color Presets */}
              <div className="space-y-3">
                <Label>Color Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Blue', primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' },
                    { name: 'Purple', primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
                    { name: 'Green', primary: '#10B981', secondary: '#047857', accent: '#34D399' },
                    { name: 'Orange', primary: '#F59E0B', secondary: '#D97706', accent: '#FBB040' },
                    { name: 'Pink', primary: '#EC4899', secondary: '#DB2777', accent: '#F472B6' },
                    { name: 'Red', primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' },
                  ].map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => handleColorsChange(preset)}
                      className="flex items-center gap-2 justify-start border-2 transition-all hover:bg-transparent"
                      style={{
                        borderColor: preset.primary,
                        color: preset.primary
                      }}
                    >
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: preset.secondary }}
                        />
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <span className="text-xs">{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template:</span>
                  <Badge variant="outline">{generatedPage.template}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary Color:</span>
                  <span className="font-mono">{currentColors.primary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Secondary Color:</span>
                  <span className="font-mono">{currentColors.secondary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Features:</span>
                  <span>{currentContent.features.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">FAQ Items:</span>
                  <span>{currentContent.faq.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trust Signals:</span>
                  <span>{currentContent.trustSignals.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showInlineEditor} onOpenChange={setShowInlineEditor}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <InlineEditor
            content={currentContent}
            onContentChange={handleContentChange}
            onExit={() => setShowInlineEditor(false)}
          />
        </DialogContent>
      </Dialog>


      <Dialog open={showSocialEditor} onOpenChange={setShowSocialEditor}>
        <DialogContent className="max-w-md">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Edit Social Media Links</h3>
            {Object.entries(socialLinks).map(([platform, url]) => (
              <div key={platform} className="space-y-2">
                <Label htmlFor={platform} className="capitalize">{platform}</Label>
                <Input
                  id={platform}
                  value={url}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, [platform]: e.target.value }))}
                  placeholder={`Enter your ${platform} URL`}
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSocialEditor(false)}>Cancel</Button>
              <Button onClick={() => handleSocialLinksUpdate(socialLinks)}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
