import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageGenerator } from "@/components/PageGenerator";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Remove authentication check - allow all users

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <PageGenerator onBack={() => navigate('/dashboard')} />;
};

export default Index;