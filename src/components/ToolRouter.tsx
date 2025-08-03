import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";
import { KeywordResearchTool } from "./tools/KeywordResearchToolEnhanced";
import { KeywordDensityTool } from "./tools/KeywordDensityTool";
import { DomainAuthorityTool } from "./tools/DomainAuthorityTool";

interface ToolRouterProps {
  selectedTool: string | null;
  onBackToHome: () => void;
}

const toolComponents: { [key: string]: React.ComponentType } = {
  'keyword-research': KeywordResearchTool,
  'keyword-density': KeywordDensityTool,
  'domain-authority': DomainAuthorityTool,
};

const toolTitles: { [key: string]: string } = {
  'keyword-research': 'Keyword Research Tool',
  'keyword-density': 'Keyword Density Analyzer',
  'domain-authority': 'Domain Authority Checker',
};

export const ToolRouter = ({ selectedTool, onBackToHome }: ToolRouterProps) => {
  if (!selectedTool) return null;

  const ToolComponent = toolComponents[selectedTool];
  const toolTitle = toolTitles[selectedTool];

  if (!ToolComponent) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container px-4 mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={onBackToHome}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tools
            </Button>
          </div>
          
          <Card className="shadow-card text-center py-16">
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground">
                Tool Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This SEO tool is currently under development and will be available soon.
              </p>
              <Button onClick={onBackToHome}>
                <Home className="w-4 h-4" />
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={onBackToHome}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Button>
          <div className="text-sm text-muted-foreground">
            RankBee SEO Tools / {toolTitle}
          </div>
        </div>
        
        <ToolComponent />
      </div>
    </div>
  );
};