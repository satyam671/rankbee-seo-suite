import { useState } from "react";
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
  Zap,
  Filter,
  Download
} from "lucide-react";

type ToolCategory = 'all' | 'research' | 'analysis' | 'authority' | 'links' | 'traffic' | 'platform' | 'technical' | 'tracking';

const filterCategories = [
  { id: 'all' as ToolCategory, label: 'All', count: 15 },
  { id: 'research' as ToolCategory, label: 'Research', count: 3 },
  { id: 'analysis' as ToolCategory, label: 'Analysis', count: 4 },
  { id: 'authority' as ToolCategory, label: 'Authority', count: 2 },
  { id: 'links' as ToolCategory, label: 'Links', count: 2 },
  { id: 'traffic' as ToolCategory, label: 'Traffic', count: 2 },
  { id: 'platform' as ToolCategory, label: 'Platform', count: 4 },
  { id: 'technical' as ToolCategory, label: 'Technical', count: 1 },
  { id: 'tracking' as ToolCategory, label: 'Tracking', count: 1 }
];

const seoTools = [
  {
    id: 'keyword-research',
    title: 'Keyword Research',
    description: 'Discover high-volume keywords and analyze search trends with real-time data scraping',
    icon: Search,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    available: true,
    category: 'research' as ToolCategory
  },
  {
    id: 'keyword-density',
    title: 'Keyword Density',
    description: 'Analyze keyword frequency and density percentages with real content analysis',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    available: true,
    category: 'analysis' as ToolCategory
  },
  {
    id: 'domain-authority',
    title: 'Domain Authority',
    description: 'Check domain and page authority scores with comprehensive metrics',
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    available: true,
    category: 'authority' as ToolCategory
  },
  {
    id: 'backlink-analyzer',
    title: 'Backlink Analyzer',
    description: 'Discover and analyze backlinks for any domain with detailed reports',
    icon: Link,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    available: true,
    category: 'links' as ToolCategory
  },
  {
    id: 'meta-extractor',
    title: 'Meta Tags Extractor',
    description: 'Extract and analyze meta titles, descriptions, and tags from any webpage',
    icon: Tags,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    available: true,
    category: 'analysis' as ToolCategory
  },
  {
    id: 'sitemap-generator',
    title: 'Sitemap Generator',
    description: 'Create and validate XML sitemaps for better search engine indexing',
    icon: FileText,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    available: true,
    category: 'technical' as ToolCategory
  },
  {
    id: 'search-queries',
    title: 'Top Search Queries',
    description: 'Identify trending search terms and queries with real-time analytics',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    available: true,
    category: 'research' as ToolCategory
  },
  {
    id: 'link-analysis',
    title: 'Link Analysis',
    description: 'Analyze internal and external links structure for SEO optimization',
    icon: ExternalLink,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    available: true,
    category: 'links' as ToolCategory
  },
  {
    id: 'referrers',
    title: 'Top Referrers',
    description: 'Track traffic sources and referral domains with detailed analytics',
    icon: Users,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    available: true,
    category: 'traffic' as ToolCategory
  },
  {
    id: 'traffic-checker',
    title: 'Traffic Checker',
    description: 'Estimate website traffic and visitor analytics with comprehensive data',
    icon: BarChart3,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    available: true,
    category: 'traffic' as ToolCategory
  },
  {
    id: 'youtube-keywords',
    title: 'YouTube Keywords',
    description: 'Find trending keywords for YouTube optimization and video SEO',
    icon: Youtube,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    available: true,
    category: 'platform' as ToolCategory
  },
  {
    id: 'amazon-keywords',
    title: 'Amazon Keywords',
    description: 'Discover profitable Amazon product keywords for e-commerce success',
    icon: ShoppingCart,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    available: true,
    category: 'platform' as ToolCategory
  },
  {
    id: 'google-keywords',
    title: 'Google Keywords',
    description: 'Advanced Google keyword research and analysis with real data',
    icon: Globe2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    available: true,
    category: 'platform' as ToolCategory
  },
  {
    id: 'bing-keywords',
    title: 'Bing Keywords',
    description: 'Bing-specific keyword research and optimization tools',
    icon: Globe2,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    available: true,
    category: 'platform' as ToolCategory
  },
  {
    id: 'rank-tracker',
    title: 'Rank Tracker',
    description: 'Monitor keyword rankings across search engines with real-time updates',
    icon: MapPin,
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
    available: true,
    category: 'tracking' as ToolCategory
  }
];

interface ToolsGridProps {
  onToolSelect?: (toolId: string) => void;
}

export const ToolsGrid = ({ onToolSelect }: ToolsGridProps) => {
  const [activeFilter, setActiveFilter] = useState<ToolCategory>('all');

  const filteredTools = activeFilter === 'all' 
    ? seoTools 
    : seoTools.filter(tool => tool.category === activeFilter);

  const handleToolClick = (toolId: string, available: boolean) => {
    if (available && onToolSelect) {
      onToolSelect(toolId);
    }
  };

  const handleGetUpdates = () => {
    // Scroll to footer newsletter section
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestFeature = () => {
    // Open feedback form or redirect to contact
    window.open('mailto:support@rankbee.com?subject=Feature Request', '_blank');
  };

  return (
    <section id="tools" className="py-16 bg-gradient-to-b from-background to-muted/20">
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
            Everything you need to improve your search rankings with real-time web scraping.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterCategories.map((category) => (
            <Button 
              key={category.id} 
              variant={activeFilter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category.id)}
              className="hover:border-primary/50"
            >
              <Filter className="w-3 h-3 mr-1" />
              {category.label}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Active Filter Display */}
        {activeFilter !== 'all' && (
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-primary">{filteredTools.length}</span> tools 
              in <span className="font-semibold">{filterCategories.find(c => c.id === activeFilter)?.label}</span> category
            </p>
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredTools.map((tool) => {
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
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        Available
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {tool.description}
                  </CardDescription>
                  <Button 
                    variant="tool" 
                    size="sm" 
                    className="w-full group-hover:bg-gradient-primary group-hover:text-primary-foreground"
                  >
                    Use Tool
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </Card>
            );
          })}
        </div>

        {/* Export and Advanced Features */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-secondary border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">
                Advanced SEO Features & Export Options
              </CardTitle>
              <CardDescription className="text-lg">
                Get more insights and export your data for comprehensive SEO analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-left">Export & Save Results</h3>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export to CSV
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export to PDF Report
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Save to Dashboard
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-left">Get Updates & Support</h3>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="hero" 
                      size="sm"
                      onClick={handleGetUpdates}
                      className="justify-start"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Get Updates
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRequestFeature}
                      className="justify-start"
                    >
                      Request Feature
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};