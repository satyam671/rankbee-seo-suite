import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Target, 
  Award, 
  Link, 
  FileText, 
  TrendingUp, 
  ExternalLink, 
  Users, 
  Tags,
  BarChart3,
  Youtube,
  ShoppingCart,
  Globe2,
  MapPin,
  Zap
} from "lucide-react";

const seoTools = [
  {
    id: 'keyword-research',
    title: 'Keyword Research',
    description: 'Discover high-volume keywords and analyze search trends',
    icon: Search,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    available: true,
    category: 'Research'
  },
  {
    id: 'keyword-density',
    title: 'Keyword Density',
    description: 'Analyze keyword frequency and density percentages',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    available: true,
    category: 'Analysis'
  },
  {
    id: 'domain-authority',
    title: 'Domain Authority',
    description: 'Check domain and page authority scores',
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    available: true,
    category: 'Authority'
  },
  {
    id: 'backlink-analyzer',
    title: 'Backlink Analyzer',
    description: 'Discover and analyze backlinks for any domain',
    icon: Link,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    available: false,
    category: 'Links'
  },
  {
    id: 'meta-extractor',
    title: 'Meta Tags Extractor',
    description: 'Extract and analyze meta titles, descriptions, and tags',
    icon: Tags,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    available: true,
    category: 'Analysis'
  },
  {
    id: 'sitemap-generator',
    title: 'Sitemap Generator',
    description: 'Create and validate XML sitemaps',
    icon: FileText,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    available: false,
    category: 'Technical'
  },
  {
    id: 'search-queries',
    title: 'Top Search Queries',
    description: 'Identify trending search terms and queries',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    available: false,
    category: 'Research'
  },
  {
    id: 'link-analysis',
    title: 'Link Analysis',
    description: 'Analyze internal and external links structure',
    icon: ExternalLink,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    available: true,
    category: 'Links'
  },
  {
    id: 'referrers',
    title: 'Top Referrers',
    description: 'Track traffic sources and referral domains',
    icon: Users,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    available: false,
    category: 'Traffic'
  },
  {
    id: 'traffic-checker',
    title: 'Traffic Checker',
    description: 'Estimate website traffic and visitor analytics',
    icon: BarChart3,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    available: false,
    category: 'Traffic'
  },
  {
    id: 'youtube-keywords',
    title: 'YouTube Keywords',
    description: 'Find trending keywords for YouTube optimization',
    icon: Youtube,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    available: false,
    category: 'Platform'
  },
  {
    id: 'amazon-keywords',
    title: 'Amazon Keywords',
    description: 'Discover profitable Amazon product keywords',
    icon: ShoppingCart,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    available: false,
    category: 'Platform'
  },
  {
    id: 'google-keywords',
    title: 'Google Keywords',
    description: 'Advanced Google keyword research and analysis',
    icon: Globe2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    available: false,
    category: 'Platform'
  },
  {
    id: 'bing-keywords',
    title: 'Bing Keywords',
    description: 'Bing-specific keyword research and optimization',
    icon: Globe2,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    available: false,
    category: 'Platform'
  },
  {
    id: 'rank-tracker',
    title: 'Rank Tracker',
    description: 'Monitor keyword rankings across search engines',
    icon: MapPin,
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
    available: false,
    category: 'Tracking'
  }
];

const categories = ['All', 'Research', 'Analysis', 'Authority', 'Links', 'Traffic', 'Platform', 'Technical', 'Tracking'];

interface ToolsGridProps {
  onToolSelect?: (toolId: string) => void;
}

export const ToolsGrid = ({ onToolSelect }: ToolsGridProps) => {
  const handleToolClick = (toolId: string, available: boolean) => {
    if (available && onToolSelect) {
      onToolSelect(toolId);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            <Zap className="w-4 h-4" />
            Free SEO Tools
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete SEO Toolkit
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade SEO tools to analyze, optimize, and track your website's performance. 
            Everything you need to improve your search rankings.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button 
              key={category} 
              variant="outline" 
              size="sm"
              className="hover:border-primary/50"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {seoTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.id}
                className="group relative overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-card to-card/80"
                onClick={() => handleToolClick(tool.id, tool.available)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${tool.bgColor} ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      {tool.available ? (
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Soon
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {tool.description}
                  </CardDescription>
                  <Button 
                    variant="tool" 
                    size="sm" 
                    className="w-full mt-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground"
                    disabled={!tool.available}
                  >
                    {tool.available ? 'Use Tool' : 'Coming Soon'}
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-secondary border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">
                Need More Advanced Features?
              </CardTitle>
              <CardDescription className="text-lg">
                Get notified when new tools become available and unlock premium features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <TrendingUp className="w-5 h-5" />
                  Get Updates
                </Button>
                <Button variant="outline" size="lg">
                  Request Feature
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};