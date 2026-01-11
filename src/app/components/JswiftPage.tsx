import { useState } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Download,
  RefreshCw,
} from "lucide-react";

interface Permit {
  id: string;
  type: string;
  reference: string;
  product: string;
  destination: string;
  status: "approved" | "pending" | "rejected" | "processing";
  submittedDate: string;
  expiryDate?: string;
  value: string;
}

export default function JswiftPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">("all");

  // Mock permits data
  const permits: Permit[] = [
    {
      id: "1",
      type: "Export Permit",
      reference: "EP-2024-0892",
      product: "Blue Mountain Coffee",
      destination: "United States",
      status: "approved",
      submittedDate: "Dec 15, 2025",
      expiryDate: "Jun 15, 2026",
      value: "$45,000",
    },
    {
      id: "2",
      type: "Import License",
      reference: "IL-2024-0456",
      product: "Industrial Equipment",
      destination: "China",
      status: "processing",
      submittedDate: "Jan 5, 2026",
      value: "$125,000",
    },
    {
      id: "3",
      type: "Export Permit",
      reference: "EP-2024-0901",
      product: "Jamaican Rum",
      destination: "United Kingdom",
      status: "pending",
      submittedDate: "Jan 8, 2026",
      value: "$32,500",
    },
    {
      id: "4",
      type: "Transit Permit",
      reference: "TP-2024-0234",
      product: "Electronic Components",
      destination: "Panama",
      status: "approved",
      submittedDate: "Nov 28, 2025",
      expiryDate: "Feb 28, 2026",
      value: "$78,000",
    },
    {
      id: "5",
      type: "Export Permit",
      reference: "EP-2024-0789",
      product: "Tropical Fruits",
      destination: "Canada",
      status: "rejected",
      submittedDate: "Dec 1, 2025",
      value: "$18,500",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "processing":
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "processing":
        return "text-blue-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const filteredPermits = permits.filter((permit) => {
    const matchesSearch =
      permit.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.product.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && (permit.status === "pending" || permit.status === "processing");
    if (activeTab === "approved") return matchesSearch && permit.status === "approved";
    return matchesSearch;
  });

  const stats = {
    total: permits.length,
    approved: permits.filter((p) => p.status === "approved").length,
    pending: permits.filter((p) => p.status === "pending" || p.status === "processing").length,
  };

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h1 className="text-lg font-semibold">JSWIFT Status</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track your permits and applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        <div className="px-4 py-3 text-center">
          <p className="text-xl font-semibold">{stats.total}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-xl font-semibold text-green-600">{stats.approved}</p>
          <p className="text-xs text-muted-foreground">Approved</p>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-xl font-semibold text-yellow-600">{stats.pending}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by reference or product..."
            className="w-full pl-9 pr-4 py-2.5 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {[
          { id: "all" as const, label: "All" },
          { id: "pending" as const, label: "Pending" },
          { id: "approved" as const, label: "Approved" },
        ].map((tab) => (
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

      {/* Permits List */}
      {filteredPermits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <FileText className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No permits found</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {filteredPermits.map((permit) => (
            <div key={permit.id} className="px-4 py-4">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">{permit.type}</p>
                  <p className="text-xs text-muted-foreground">{permit.reference}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {getStatusIcon(permit.status)}
                  <span className={`text-xs font-medium capitalize ${getStatusColor(permit.status)}`}>
                    {permit.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product</span>
                  <span>{permit.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destination</span>
                  <span>{permit.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Value</span>
                  <span>{permit.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted</span>
                  <span>{permit.submittedDate}</span>
                </div>
                {permit.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires</span>
                    <span>{permit.expiryDate}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {permit.status === "approved" && (
                <button className="flex items-center justify-between w-full mt-3 pt-3 border-t border-border text-sm text-primary">
                  <span>Download Certificate</span>
                  <Download className="w-4 h-4" />
                </button>
              )}
              {permit.status === "rejected" && (
                <button className="flex items-center justify-between w-full mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
                  <span>View rejection details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
