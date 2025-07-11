import { useNavigate } from 'react-router-dom';
import { PageGenerator } from "@/components/PageGenerator";
import { useAuth } from "@/contexts/AuthContext";

const Generate = () => {
  const { loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <PageGenerator onBack={() => navigate('/')} />;
};

export default Generate;