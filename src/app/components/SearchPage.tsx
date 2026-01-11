import { useState } from "react";
import { Search, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"lpc" | "dealers">("lpc");

  const lpcResults = [
    {
      id: 1,
      code: "LPC-2024-001",
      product: "Blue Mountain Coffee",
      localContent: "95%",
      category: "Agriculture",
      status: "Certified",
    },
    {
      id: 2,
      code: "LPC-2024-002",
      product: "Jamaican Rum",
      localContent: "90%",
      category: "Manufacturing",
      status: "Certified",
    },
    {
      id: 3,
      code: "LPC-2024-003",
      product: "Tropical Fruits",
      localContent: "100%",
      category: "Agriculture",
      status: "Certified",
    },
  ];

  const dealers = [
    {
      id: 1,
      name: "Caribbean Export Solutions Ltd.",
      license: "DEL-2024-045",
      specialization: "Agricultural Products",
      phone: "+1-876-555-0123",
      email: "info@caribexport.com",
      location: "Kingston",
    },
    {
      id: 2,
      name: "Jamaica Trade Facilitators",
      license: "DEL-2024-067",
      specialization: "Manufacturing & Industrial",
      phone: "+1-876-555-0456",
      email: "contact@jtfacilitators.com",
      location: "Montego Bay",
    },
    {
      id: 3,
      name: "Island Commodities Group",
      license: "DEL-2024-089",
      specialization: "Mining & Minerals",
      phone: "+1-876-555-0789",
      email: "sales@islandcommodities.com",
      location: "Ocho Rios",
    },
  ];

  const tabs = [
    { id: "lpc" as const, label: "Products" },
    { id: "dealers" as const, label: "Dealers" },
  ];

  return (
    <div className="min-h-full bg-background">
      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products or dealers..."
            className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div>
        {/* LPC Results */}
        {activeTab === "lpc" && (
          <>
            <div className="px-4 py-3 text-xs text-muted-foreground">
              {lpcResults.length} certified products
            </div>
            <div className="divide-y divide-border">
              {lpcResults.map((item) => (
                <button
                  key={item.id}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{item.product}</p>
                      <span className="text-xs text-green-600">{item.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.code}</p>
                    <div className="flex gap-4 mt-2 text-xs">
                      <span>
                        <span className="text-muted-foreground">Content: </span>
                        <span className="text-primary font-medium">{item.localContent}</span>
                      </span>
                      <span className="text-muted-foreground">{item.category}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* Dealer Results */}
        {activeTab === "dealers" && (
          <>
            <div className="px-4 py-3 text-xs text-muted-foreground">
              {dealers.length} certified dealers
            </div>
            <div className="divide-y divide-border">
              {dealers.map((dealer) => (
                <div key={dealer.id} className="px-4 py-4">
                  <p className="font-medium mb-1">{dealer.name}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {dealer.specialization}
                  </p>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{dealer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{dealer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{dealer.email}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                    License: {dealer.license}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
