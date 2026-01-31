import { useState, useEffect, useRef } from "react";
import {
  Globe,
  Package,
  Search,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  FileText,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ============ TYPE DEFINITIONS ============

interface Country {
  code: string;
  name: string;
  region: string;
  flag: string;
}

interface Product {
  hsCode: string;
  name: string;
  category: string;
}

interface AISummary {
  summary: string;
  keyInsights: string[];
  opportunities: string[];
  risks: string[];
}

interface MarketStats {
  marketSize: { value: string; change: string; trend: "up" | "down" };
  importDemand: { value: string; change: string; trend: "up" | "down" };
  avgTariff: { value: string; change: string; trend: "up" | "down" | "neutral" };
  tradeAgreement: { value: string; status: "active" | "pending" | "none" };
}

interface DemandDataPoint {
  month: string;
  demand: number;
  jamaicaExports: number;
}

interface PriceDataPoint {
  category: string;
  yourPrice: number;
  marketAvg: number;
}

interface MarketShareDataPoint {
  country: string;
  share: number;
}

interface TariffItem {
  type: string;
  rate: string;
  estimatedCost: string;
}

interface TradeBarrier {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

interface Regulation {
  title: string;
  description: string;
  agency: string;
  required: boolean;
}

type PageStatus = "idle" | "loading" | "results" | "error";
type AIStatus = "idle" | "analyzing" | "complete" | "error";
type ChartTab = "demand" | "pricing" | "competition";

// ============ MOCK DATA ============

const countries: Country[] = [
  { code: "US", name: "United States", region: "North America", flag: "US" },
  { code: "GB", name: "United Kingdom", region: "Europe", flag: "GB" },
  { code: "CA", name: "Canada", region: "North America", flag: "CA" },
  { code: "DE", name: "Germany", region: "Europe", flag: "DE" },
  { code: "JP", name: "Japan", region: "Asia", flag: "JP" },
  { code: "CN", name: "China", region: "Asia", flag: "CN" },
  { code: "FR", name: "France", region: "Europe", flag: "FR" },
  { code: "NL", name: "Netherlands", region: "Europe", flag: "NL" },
];

const products: Product[] = [
  { hsCode: "0901.21", name: "Blue Mountain Coffee", category: "Agriculture" },
  { hsCode: "2208.40", name: "Jamaican Rum", category: "Beverages" },
  { hsCode: "2606.00", name: "Bauxite", category: "Minerals" },
  { hsCode: "1701.14", name: "Raw Cane Sugar", category: "Agriculture" },
  { hsCode: "0714.30", name: "Yams", category: "Agriculture" },
  { hsCode: "0803.90", name: "Plantains", category: "Agriculture" },
  { hsCode: "1801.00", name: "Cocoa Beans", category: "Agriculture" },
];

const popularSearches = [
  { destination: "United States", product: "Blue Mountain Coffee" },
  { destination: "United Kingdom", product: "Jamaican Rum" },
  { destination: "China", product: "Bauxite" },
];

// Generate mock market data based on destination and product
function generateMockData(destination: Country, product: Product) {
  const isCoffee = product.name.toLowerCase().includes("coffee");
  const isRum = product.name.toLowerCase().includes("rum");
  const isBauxite = product.name.toLowerCase().includes("bauxite");

  const aiSummary: AISummary = {
    summary: `The ${destination.name} market presents ${isCoffee ? "strong" : "solid"} opportunities for Jamaican ${product.name}. ${
      isCoffee
        ? "Premium coffee demand is growing at 8.3% annually, with Jamaica's Blue Mountain certification providing unique positioning."
        : isRum
        ? "Craft spirits continue to gain market share, with authentic Caribbean rum seeing increased consumer interest."
        : isBauxite
        ? "Industrial demand remains steady with infrastructure investments driving growth in construction materials."
        : "Market conditions are favorable with growing consumer interest in authentic Caribbean products."
    }`,
    keyInsights: [
      `${destination.name} imported $${Math.floor(Math.random() * 5 + 2)}B of ${product.category.toLowerCase()} products last year`,
      `Jamaica currently holds ${Math.floor(Math.random() * 8 + 2)}% market share in this category`,
      `Consumer preference trending toward ${isCoffee || isRum ? "premium, authentic products" : "sustainable sourcing"}`,
    ],
    opportunities: [
      isCoffee ? "Growing specialty coffee culture" : isRum ? "Craft cocktail movement" : "Infrastructure investments",
      "Strong brand recognition for Jamaican products",
      destination.code === "US" ? "Zero tariff under trade agreement" : "Favorable trade terms",
    ],
    risks: [
      "Supply constraints from limited production capacity",
      `Competition from ${isCoffee ? "Ethiopian and Colombian" : isRum ? "Puerto Rican and Cuban" : "Australian and Brazilian"} suppliers`,
      "Currency exchange volatility",
    ],
  };

  const stats: MarketStats = {
    marketSize: {
      value: `$${(Math.random() * 10 + 2).toFixed(1)}B`,
      change: `+${(Math.random() * 8 + 2).toFixed(1)}%`,
      trend: "up"
    },
    importDemand: {
      value: `${(Math.random() * 3 + 1).toFixed(1)}M tons`,
      change: `+${(Math.random() * 10 + 3).toFixed(1)}%`,
      trend: "up"
    },
    avgTariff: {
      value: destination.code === "US" ? "0%" : `${Math.floor(Math.random() * 8 + 2)}%`,
      change: destination.code === "US" ? "CBPTA" : "MFN",
      trend: "neutral"
    },
    tradeAgreement: {
      value: destination.code === "US" ? "CBPTA" : destination.region === "Europe" ? "EPA" : "WTO",
      status: "active"
    },
  };

  const demandData: DemandDataPoint[] = [
    { month: "Jul", demand: 85 + Math.random() * 10, jamaicaExports: 12 + Math.random() * 5 },
    { month: "Aug", demand: 92 + Math.random() * 10, jamaicaExports: 14 + Math.random() * 5 },
    { month: "Sep", demand: 88 + Math.random() * 10, jamaicaExports: 13 + Math.random() * 5 },
    { month: "Oct", demand: 95 + Math.random() * 10, jamaicaExports: 15 + Math.random() * 5 },
    { month: "Nov", demand: 102 + Math.random() * 10, jamaicaExports: 18 + Math.random() * 5 },
    { month: "Dec", demand: 110 + Math.random() * 10, jamaicaExports: 20 + Math.random() * 5 },
  ];

  const priceData: PriceDataPoint[] = [
    { category: "FOB Price", yourPrice: 35 + Math.random() * 20, marketAvg: 30 + Math.random() * 15 },
    { category: "Retail Price", yourPrice: 65 + Math.random() * 30, marketAvg: 55 + Math.random() * 20 },
  ];

  const marketShareData: MarketShareDataPoint[] = isCoffee
    ? [
        { country: "Brazil", share: 35 },
        { country: "Colombia", share: 22 },
        { country: "Ethiopia", share: 15 },
        { country: "Jamaica", share: 5 },
        { country: "Others", share: 23 },
      ]
    : isRum
    ? [
        { country: "Puerto Rico", share: 28 },
        { country: "Jamaica", share: 18 },
        { country: "Cuba", share: 15 },
        { country: "Barbados", share: 12 },
        { country: "Others", share: 27 },
      ]
    : [
        { country: "Australia", share: 30 },
        { country: "Guinea", share: 22 },
        { country: "Brazil", share: 18 },
        { country: "Jamaica", share: 8 },
        { country: "Others", share: 22 },
      ];

  const tariffs: TariffItem[] = [
    { type: "Import Duty", rate: destination.code === "US" ? "0%" : `${Math.floor(Math.random() * 5 + 2)}%`, estimatedCost: destination.code === "US" ? "$0" : `$${Math.floor(Math.random() * 500 + 100)}` },
    { type: "Processing Fee", rate: "0.35%", estimatedCost: `$${Math.floor(Math.random() * 200 + 50)}` },
    { type: "Harbor Maintenance", rate: "0.125%", estimatedCost: `$${Math.floor(Math.random() * 100 + 25)}` },
  ];

  const barriers: TradeBarrier[] = [
    { title: "Phytosanitary Certificate Required", description: "All agricultural products require certification from MICAF", severity: "medium" },
    { title: "Prior Notice Requirement", description: `${destination.name} requires advance shipment notification`, severity: "low" },
  ];

  const regulations: Regulation[] = [
    { title: destination.code === "US" ? "FDA Registration" : "Import License", description: "Facility registration required before export", agency: destination.code === "US" ? "FDA" : "Customs Authority", required: true },
    { title: "Country of Origin Labeling", description: "Clear labeling of Jamaica origin required", agency: destination.code === "US" ? "USDA" : "Trade Ministry", required: true },
    { title: "Quality Standards", description: `Must meet ${destination.name} quality specifications`, agency: "Standards Bureau", required: true },
  ];

  return { aiSummary, stats, demandData, priceData, marketShareData, tariffs, barriers, regulations };
}

const CHART_COLORS = ["#0a2540", "#f5b32b", "#22c55e", "#3b82f6", "#a1a1aa"];

// ============ MAIN COMPONENT ============

export default function MarketIntelPage() {
  // Search state
  const [destinationQuery, setDestinationQuery] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<Country | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Page state
  const [status, setStatus] = useState<PageStatus>("idle");
  const [aiStatus, setAiStatus] = useState<AIStatus>("idle");
  const [activeChartTab, setActiveChartTab] = useState<ChartTab>("demand");
  const [expandedSections, setExpandedSections] = useState<string[]>(["tariffs"]);

  // Data state
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [demandData, setDemandData] = useState<DemandDataPoint[]>([]);
  const [priceData, setPriceData] = useState<PriceDataPoint[]>([]);
  const [marketShareData, setMarketShareData] = useState<MarketShareDataPoint[]>([]);
  const [tariffs, setTariffs] = useState<TariffItem[]>([]);
  const [barriers, setBarriers] = useState<TradeBarrier[]>([]);
  const [regulations, setRegulations] = useState<Regulation[]>([]);

  // Refs for click outside
  const destinationRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  // Filter countries based on query
  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(destinationQuery.toLowerCase())
  );

  // Filter products based on query
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productQuery.toLowerCase()) ||
      p.hsCode.includes(productQuery)
  );

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestinationDropdown(false);
      }
      if (productRef.current && !productRef.current.contains(event.target as Node)) {
        setShowProductDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (!selectedDestination || !selectedProduct) return;

    setStatus("loading");
    setAiStatus("analyzing");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock data
    const data = generateMockData(selectedDestination, selectedProduct);

    setAiSummary(data.aiSummary);
    setStats(data.stats);
    setDemandData(data.demandData);
    setPriceData(data.priceData);
    setMarketShareData(data.marketShareData);
    setTariffs(data.tariffs);
    setBarriers(data.barriers);
    setRegulations(data.regulations);

    setAiStatus("complete");
    setStatus("results");
  };

  // Handle clear
  const handleClear = () => {
    setSelectedDestination(null);
    setSelectedProduct(null);
    setDestinationQuery("");
    setProductQuery("");
    setStatus("idle");
    setAiStatus("idle");
    setAiSummary(null);
    setStats(null);
  };

  // Handle quick search
  const handleQuickSearch = (search: { destination: string; product: string }) => {
    const dest = countries.find((c) => c.name === search.destination);
    const prod = products.find((p) => p.name === search.product);
    if (dest && prod) {
      setSelectedDestination(dest);
      setSelectedProduct(prod);
      setDestinationQuery(dest.name);
      setProductQuery(prod.name);
      // Trigger search after state updates
      setTimeout(() => {
        setStatus("loading");
        setAiStatus("analyzing");
        setTimeout(() => {
          const data = generateMockData(dest, prod);
          setAiSummary(data.aiSummary);
          setStats(data.stats);
          setDemandData(data.demandData);
          setPriceData(data.priceData);
          setMarketShareData(data.marketShareData);
          setTariffs(data.tariffs);
          setBarriers(data.barriers);
          setRegulations(data.regulations);
          setAiStatus("complete");
          setStatus("results");
        }, 2000);
      }, 100);
    }
  };

  // Toggle accordion section
  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Get country flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="min-h-full bg-background">
      {/* Search Section */}
      <div className="border-b border-border">
        {/* Destination Input */}
        <div className="px-4 pt-4 pb-2" ref={destinationRef}>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={selectedDestination ? selectedDestination.name : destinationQuery}
              onChange={(e) => {
                setDestinationQuery(e.target.value);
                setSelectedDestination(null);
                setShowDestinationDropdown(true);
              }}
              onFocus={() => setShowDestinationDropdown(true)}
              placeholder="Search destination country..."
              className="w-full pl-10 pr-10 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            {(selectedDestination || destinationQuery) && (
              <button
                onClick={() => {
                  setSelectedDestination(null);
                  setDestinationQuery("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-full"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}

            {/* Destination Dropdown */}
            {showDestinationDropdown && !selectedDestination && destinationQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedDestination(country);
                        setDestinationQuery(country.name);
                        setShowDestinationDropdown(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <span className="text-lg">{getFlagEmoji(country.code)}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{country.name}</p>
                        <p className="text-xs text-muted-foreground">{country.region}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground">No countries found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Input */}
        <div className="px-4 pb-2" ref={productRef}>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={selectedProduct ? selectedProduct.name : productQuery}
              onChange={(e) => {
                setProductQuery(e.target.value);
                setSelectedProduct(null);
                setShowProductDropdown(true);
              }}
              onFocus={() => setShowProductDropdown(true)}
              placeholder="Search product or HS code..."
              className="w-full pl-10 pr-10 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            {(selectedProduct || productQuery) && (
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setProductQuery("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-full"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}

            {/* Product Dropdown */}
            {showProductDropdown && !selectedProduct && productQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      key={product.hsCode}
                      onClick={() => {
                        setSelectedProduct(product);
                        setProductQuery(product.name);
                        setShowProductDropdown(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">HS: {product.hsCode} · {product.category}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground">No products found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-4 flex gap-2">
          <button
            onClick={handleSearch}
            disabled={!selectedDestination || !selectedProduct || status === "loading"}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </button>
          {(selectedDestination || selectedProduct || status === "results") && (
            <button
              onClick={handleClear}
              className="px-4 py-3 bg-muted text-foreground rounded-xl font-medium text-sm hover:bg-muted/80 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Idle State */}
      {status === "idle" && (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Explore Global Markets</h3>
          <p className="text-sm text-muted-foreground max-w-xs mb-6">
            Search for a destination country and product to get AI-powered market intelligence, tariff information, and competitive analysis.
          </p>

          {/* Popular Searches */}
          <div className="w-full max-w-xs">
            <p className="text-xs text-muted-foreground mb-3 text-left">Popular searches</p>
            <div className="space-y-2">
              {popularSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickSearch(search)}
                  className="w-full px-4 py-3 bg-muted rounded-xl text-left hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{search.product}</p>
                      <p className="text-xs text-muted-foreground">to {search.destination}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {status === "loading" && (
        <div className="space-y-4 p-4">
          {/* AI Summary skeleton */}
          <div className="border-b border-border pb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="bg-muted rounded-2xl px-4 py-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>

          {/* Chart skeleton */}
          <div className="h-48 bg-muted rounded-xl animate-pulse" />
        </div>
      )}

      {/* Results State */}
      {status === "results" && (
        <>
          {/* AI Summary Section */}
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">AI Market Analysis</h3>
                <p className="text-xs text-muted-foreground">Powered by Wise</p>
              </div>
            </div>

            {aiSummary && (
              <div className="space-y-4">
                {/* Main summary */}
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <p className="text-sm leading-relaxed">{aiSummary.summary}</p>
                </div>

                {/* Key insights */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Key Insights</p>
                  {aiSummary.keyInsights.map((insight, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>

                {/* Opportunities & Risks */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-green-600">Opportunities</p>
                    {aiSummary.opportunities.map((opp, idx) => (
                      <div key={idx} className="flex gap-1.5 items-start">
                        <TrendingUp className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs">{opp}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-red-600">Risks</p>
                    {aiSummary.risks.map((risk, idx) => (
                      <div key={idx} className="flex gap-1.5 items-start">
                        <AlertTriangle className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-2 divide-x divide-y divide-border border-b border-border">
              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-muted-foreground">Market Size</p>
                  <span className={`text-xs ${stats.marketSize.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stats.marketSize.change}
                  </span>
                </div>
                <p className="text-lg font-semibold">{stats.marketSize.value}</p>
              </div>
              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-muted-foreground">Import Demand</p>
                  <span className={`text-xs ${stats.importDemand.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stats.importDemand.change}
                  </span>
                </div>
                <p className="text-lg font-semibold">{stats.importDemand.value}</p>
              </div>
              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-muted-foreground">Avg Tariff</p>
                  <span className="text-xs text-muted-foreground">{stats.avgTariff.change}</span>
                </div>
                <p className="text-lg font-semibold">{stats.avgTariff.value}</p>
              </div>
              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-muted-foreground">Trade Agreement</p>
                  <span className="text-xs text-green-600">Active</span>
                </div>
                <p className="text-lg font-semibold">{stats.tradeAgreement.value}</p>
              </div>
            </div>
          )}

          {/* Charts Section */}
          <div className="border-b border-border">
            {/* Chart Tabs */}
            <div className="flex border-b border-border">
              {(["demand", "pricing", "competition"] as ChartTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveChartTab(tab)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeChartTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "demand" ? "Demand" : tab === "pricing" ? "Pricing" : "Competition"}
                </button>
              ))}
            </div>

            {/* Chart Content */}
            <div className="px-4 py-6">
              {activeChartTab === "demand" && (
                <>
                  <p className="text-sm font-medium mb-4">Market Demand vs Jamaica Exports</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={demandData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                      <XAxis dataKey="month" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e5e5",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Line type="monotone" dataKey="demand" stroke="#0a2540" strokeWidth={2} name="Market Demand" dot={{ fill: "#0a2540", r: 3 }} />
                      <Line type="monotone" dataKey="jamaicaExports" stroke="#f5b32b" strokeWidth={2} name="JA Exports" dot={{ fill: "#f5b32b", r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              )}

              {activeChartTab === "pricing" && (
                <>
                  <p className="text-sm font-medium mb-4">Price Comparison (USD)</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={priceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                      <XAxis dataKey="category" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e5e5",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(value: number) => [`$${value.toFixed(0)}`, ""]}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Bar dataKey="yourPrice" fill="#0a2540" name="Your Price" />
                      <Bar dataKey="marketAvg" fill="#a1a1aa" name="Market Avg" />
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}

              {activeChartTab === "competition" && (
                <>
                  <p className="text-sm font-medium mb-4">Market Share by Country</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="share"
                        nameKey="country"
                        label={({ country, share }) => `${country}: ${share}%`}
                        labelLine={false}
                      >
                        {marketShareData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e5e5",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Market Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {marketShareData.map((item, index) => (
                      <div key={item.country} className="flex items-center gap-1.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                        />
                        <span className="text-xs text-muted-foreground">{item.country}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Accordion Tables */}
          <div className="divide-y divide-border">
            {/* Tariffs Section */}
            <div>
              <button
                onClick={() => toggleSection("tariffs")}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Tariffs & Duties</span>
                  <span className="text-xs text-muted-foreground">({tariffs.length})</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedSections.includes("tariffs") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSections.includes("tariffs") && (
                <div className="px-4 pb-4">
                  <div className="bg-muted/50 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-3 gap-2 px-3 py-2 border-b border-border text-xs font-medium text-muted-foreground">
                      <span>Type</span>
                      <span className="text-right">Rate</span>
                      <span className="text-right">Est. Cost</span>
                    </div>
                    {tariffs.map((tariff, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-2 px-3 py-2.5 text-sm border-b border-border last:border-0">
                        <span>{tariff.type}</span>
                        <span className="text-right">{tariff.rate}</span>
                        <span className="text-right font-medium">{tariff.estimatedCost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Trade Barriers Section */}
            <div>
              <button
                onClick={() => toggleSection("barriers")}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">Trade Barriers</span>
                  <span className="text-xs text-muted-foreground">({barriers.length})</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedSections.includes("barriers") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSections.includes("barriers") && (
                <div className="px-4 pb-4 space-y-2">
                  {barriers.map((barrier, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                      <AlertTriangle
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          barrier.severity === "high"
                            ? "text-red-500"
                            : barrier.severity === "medium"
                            ? "text-amber-500"
                            : "text-blue-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium">{barrier.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{barrier.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Regulations Section */}
            <div>
              <button
                onClick={() => toggleSection("regulations")}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Key Regulations</span>
                  <span className="text-xs text-muted-foreground">({regulations.length})</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedSections.includes("regulations") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSections.includes("regulations") && (
                <div className="px-4 pb-4 space-y-2">
                  {regulations.map((reg, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          reg.required ? "bg-green-100" : "bg-muted"
                        }`}
                      >
                        {reg.required && (
                          <div className="w-2 h-2 rounded-full bg-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{reg.title}</p>
                          <span className="text-xs text-muted-foreground">{reg.agency}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{reg.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Refresh button */}
          <div className="px-4 py-6">
            <button
              onClick={handleSearch}
              className="w-full py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Analysis
            </button>
          </div>
        </>
      )}
    </div>
  );
}
