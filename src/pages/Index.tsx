import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Footer } from "@/components/Footer";
import { ToolRouter } from "@/components/ToolRouter";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleBackToHome = () => {
    setSelectedTool(null);
  };

  // If a tool is selected, show the tool interface
  if (selectedTool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ToolRouter selectedTool={selectedTool} onBackToHome={handleBackToHome} />
      </div>
    );
  }

  // Otherwise, show the main homepage
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ToolsGrid onToolSelect={handleToolSelect} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
