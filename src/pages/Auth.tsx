import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signIn, signUp } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Home, Facebook } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [currentView, setCurrentView] = useState<'signin' | 'signup'>('signin');
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const {
    toast
  } = useToast();
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {
        error
      } = await signIn(signInData.email, signInData.password);
      if (error) {
        toast({
          title: "Prijava neuspješna",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Dobrodošli!",
          description: "Uspješno ste se prijavili."
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Dogodila se neočekivana greška.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast({
        title: "Greška",
        description: "Morate se složiti s odredbama i uvjetima.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const fullName = `${signUpData.firstName} ${signUpData.lastName}`;
      const {
        error
      } = await signUp(signUpData.email, signUpData.password, fullName);
      if (error) {
        toast({
          title: "Registracija neuspješna",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Račun kreiran!",
          description: "Molimo provjerite svoj email da biste verificirali račun."
        });
        setCurrentView('signin');
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Dogodila se neočekivana greška.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>;
  }
  return <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-cover bg-center bg-no-repeat" style={{
    backgroundImage: 'url(/lovable-uploads/c62d60c2-e0c9-4847-9110-fd8d0777c050.png)'
  }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        

        <div className="bg-card rounded-lg shadow-soft p-8">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button type="button" variant="outline" className="w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600 h-12" disabled={isLoading}>
              <Facebook className="w-5 h-5 mr-2" />
              {currentView === 'signin' ? 'Prijavite se koristeći Facebook' : 'Registrirajte se koristeći Facebook'}
            </Button>
            <Button type="button" variant="outline" className="w-full bg-red-500 hover:bg-red-600 text-white border-red-500 h-12" disabled={isLoading}>
              <span className="w-5 h-5 mr-2 font-bold">G</span>
              {currentView === 'signin' ? 'Prijavite se koristeći Google' : 'Registrirajte se koristeći Google'}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">--- ili koristite email ---</span>
            </div>
          </div>

          {currentView === 'signin' ? (/* Sign In Form */
        <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Input type="email" placeholder="Korisničko ime ( email )" value={signInData.email} onChange={e => setSignInData({
              ...signInData,
              email: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" required />
              </div>
              <div>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Lozinka" value={signInData.password} onChange={e => setSignInData({
                ...signInData,
                password: e.target.value
              })} className="w-full h-12 bg-muted border-0 rounded-md pr-10" required />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked as boolean)} />
                  <Label htmlFor="remember" className="text-muted-foreground cursor-pointer">
                    Zapamti me
                  </Label>
                </div>
                <button type="button" className="text-primary hover:underline">
                  Zaboravljena lozinka?
                </button>
              </div>
              <Button type="submit" variant="default" className="w-full h-12 font-medium rounded-md mt-6" disabled={isLoading}>
                {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Prijava'}
              </Button>
            </form>) : (/* Sign Up Form */
        <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Input type="text" placeholder="Ime" value={signUpData.firstName} onChange={e => setSignUpData({
              ...signUpData,
              firstName: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" required />
              </div>
              <div>
                <Input type="text" placeholder="Prezime" value={signUpData.lastName} onChange={e => setSignUpData({
              ...signUpData,
              lastName: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" required />
              </div>
              <div>
                <Input type="email" placeholder="Email" value={signUpData.email} onChange={e => setSignUpData({
              ...signUpData,
              email: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" required />
              </div>
              <div>
                <Input type="tel" placeholder="Telefon" value={signUpData.phone} onChange={e => setSignUpData({
              ...signUpData,
              phone: e.target.value
            })} className="w-full h-12 bg-muted border-0 rounded-md" />
              </div>
              <div>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Lozinka" value={signUpData.password} onChange={e => setSignUpData({
                ...signUpData,
                password: e.target.value
              })} className="w-full h-12 bg-muted border-0 rounded-md pr-10" required />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" checked={agreeTerms} onCheckedChange={checked => setAgreeTerms(checked as boolean)} />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  Slažem se s{' '}
                  <button type="button" className="text-primary hover:underline">
                    odredbama i uvjetima
                  </button>
                  .
                </Label>
              </div>
              <Button type="submit" variant="default" className="w-full h-12 font-medium rounded-md mt-6" disabled={isLoading || !agreeTerms}>
                {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'registriraj me!'}
              </Button>
            </form>)}

          {/* Toggle between sign in/up */}
          <div className="text-center mt-6 pt-6 border-t border-border">
            {currentView === 'signin' ? <p className="text-muted-foreground">
                Prvi put ste ovdje i nemate račun?{' '}
                <button type="button" onClick={() => setCurrentView('signup')} className="text-primary hover:underline font-medium">
                  Registriraj me!
                </button>
              </p> : <p className="text-muted-foreground">
                Već imate račun?{' '}
                <button type="button" onClick={() => setCurrentView('signin')} className="text-primary hover:underline font-medium">
                  Prijavite se!
                </button>
              </p>}
          </div>

          {/* Home link */}
          <div className="text-center mt-4">
            <button type="button" onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground text-sm flex items-center justify-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Naslovnica</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
};