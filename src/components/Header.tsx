import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Menu, Zap } from "lucide-react";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps = {}) => {
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // Smooth scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                <Zap className="w-5 h-5" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                RankBee
              </span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('tools')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Tools
            </button>
            <button 
              onClick={() => handleNavClick('seo-importance')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex"
              onClick={() => handleNavClick('tools')}
            >
              <Search className="w-4 h-4" />
              Quick Search
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleNavClick('tools')}
            >
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};