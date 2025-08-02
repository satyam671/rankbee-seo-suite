import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Zap, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  Heart
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: "About Us", href: "#about" },
    { title: "Disclaimer", href: "#disclaimer" },
    { title: "Privacy Policy", href: "#privacy" },
    { title: "Terms of Service", href: "#terms" },
    { title: "Contact", href: "#contact" }
  ];

  const toolCategories = [
    { title: "Keyword Tools", tools: ["Keyword Research", "Keyword Density", "Google Keywords"] },
    { title: "Analysis Tools", tools: ["Domain Authority", "Meta Extractor", "Link Analysis"] },
    { title: "Platform Tools", tools: ["YouTube Keywords", "Amazon Keywords", "Bing Keywords"] },
    { title: "Tracking Tools", tools: ["Rank Tracker", "Traffic Checker", "Top Referrers"] }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border/40">
      <div className="container px-4 mx-auto">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  RankBee
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Professional SEO tools to help you rank higher, analyze better, and grow faster. 
                Everything you need for successful digital marketing.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tool Categories */}
            {toolCategories.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold text-foreground">{category.title}</h3>
                <ul className="space-y-2">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex}>
                      <a 
                        href={`#${tool.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                      >
                        {tool}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/60" />

        {/* Quick Links Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-sm font-medium text-foreground">Quick Links:</span>
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4" />
              Newsletter
            </Button>
          </div>
        </div>

        <Separator className="bg-border/60" />

        {/* Bottom Section */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} RankBee. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for SEO professionals</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Powered by modern web technologies
              </span>
              <Card className="px-3 py-1 bg-primary/10 border-primary/20">
                <span className="text-xs text-primary font-medium">100% Free</span>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};