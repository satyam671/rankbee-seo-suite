import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, TrendingUp, BarChart3, Globe } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
                <TrendingUp className="w-4 h-4" />
                Free SEO Tools
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent leading-tight">
                Rank Higher with
                <br />
                <span className="text-primary">RankBee</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Comprehensive SEO toolkit with keyword research, domain analysis, backlink checking, and more. 
                Boost your search rankings with our professional-grade tools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={() => {
                  const toolsSection = document.getElementById('tools');
                  if (toolsSection) {
                    toolsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Analyzing
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const toolsSection = document.getElementById('tools');
                  if (toolsSection) {
                    toolsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <BarChart3 className="w-5 h-5" />
                View Tools
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">SEO Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Free to Use</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Unlimited</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Card className="relative overflow-hidden shadow-card-hover border-0 bg-gradient-secondary">
              <img 
                src={heroImage} 
                alt="SEO Analytics Dashboard" 
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </Card>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-2 rounded-lg shadow-button animate-bounce">
              <Globe className="w-4 h-4 inline mr-1" />
              SEO Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};