import { PageGenerator } from "@/components/PageGenerator";

const Index = () => {
  return <PageGenerator onBack={() => window.history.back()} />;
};

export default Index;