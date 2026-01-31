import { useState, useEffect } from "react";
import { Search, MapPin, Phone, Mail, ChevronRight, Clock, Globe, Navigation } from "lucide-react";

interface SearchPageProps {
  initialTab?: "lpc" | "dealers" | "psi";
}

export default function SearchPage({ initialTab = "lpc" }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"lpc" | "dealers" | "psi">(initialTab);

  // Update tab when initialTab prop changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

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

  const psiLocations = [
    {
      id: 1,
      name: "Bureau Veritas Jamaica",
      address: "17 Ruthven Road, Kingston 10",
      parish: "Kingston",
      phone: "+1-876-968-5890",
      email: "jamaica@bureauveritas.com",
      website: "www.bureauveritas.com",
      hours: "Mon-Fri: 8:00 AM - 4:30 PM",
      services: ["Vehicle Inspection", "Cargo Inspection", "Certificate Issuance"],
    },
    {
      id: 2,
      name: "SGS Jamaica Limited",
      address: "14 Camp Road, Kingston",
      parish: "Kingston",
      phone: "+1-876-928-4416",
      email: "sgs.jamaica@sgs.com",
      website: "www.sgs.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      services: ["Vehicle Inspection", "Industrial Equipment", "Agricultural Products"],
    },
    {
      id: 3,
      name: "Intertek Jamaica",
      address: "Shop 5, Portmore Mall, Portmore",
      parish: "St. Catherine",
      phone: "+1-876-939-2156",
      email: "jamaica@intertek.com",
      website: "www.intertek.com",
      hours: "Mon-Sat: 9:00 AM - 5:00 PM",
      services: ["Vehicle Inspection", "Consumer Goods", "Electronics"],
    },
    {
      id: 4,
      name: "COTECNA Jamaica",
      address: "Newport West, Kingston",
      parish: "Kingston",
      phone: "+1-876-923-7890",
      email: "jamaica@cotecna.com",
      website: "www.cotecna.com",
      hours: "Mon-Fri: 8:30 AM - 4:00 PM",
      services: ["Vehicle Inspection", "Trade Inspection", "Conformity Assessment"],
    },
    {
      id: 5,
      name: "Bureau Veritas - Montego Bay",
      address: "Fairview Shopping Centre, Montego Bay",
      parish: "St. James",
      phone: "+1-876-953-2345",
      email: "mobay@bureauveritas.com",
      website: "www.bureauveritas.com",
      hours: "Mon-Fri: 8:00 AM - 4:00 PM",
      services: ["Vehicle Inspection", "Cargo Inspection"],
    },
  ];

  const tabs = [
    { id: "lpc" as const, label: "Products" },
    { id: "dealers" as const, label: "Dealers" },
    { id: "psi" as const, label: "PSI Locations" },
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
            className="w-full pl-10 pr-4 py-3 glass rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
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

        {/* PSI Locations */}
        {activeTab === "psi" && (
          <>
            <div className="px-4 py-3 text-xs text-muted-foreground">
              {psiLocations.length} inspection providers
            </div>
            <div className="divide-y divide-border">
              {psiLocations.map((location) => (
                <div key={location.id} className="px-4 py-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{location.name}</p>
                      <p className="text-xs text-muted-foreground">{location.parish}</p>
                    </div>
                    <button className="p-2 bg-primary/10 rounded-full text-primary">
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{location.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span>{location.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="w-4 h-4 flex-shrink-0" />
                      <span>{location.website}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {location.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-muted text-xs text-muted-foreground rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
