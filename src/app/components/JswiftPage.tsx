import { useState } from "react";
import {
  Search,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Download,
  ChevronRight,
} from "lucide-react";

interface Permit {
  reference: string;
  type: string;
  status: "approved" | "pending" | "processing" | "rejected";
  product: string;
  destination: string;
  submittedDate: string;
  expiryDate?: string;
  value: string;
  applicant: string;
  notes?: string;
}

export default function JswiftPage() {
  const [permitNumber, setPermitNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<Permit | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Mock database of permits
  const mockPermits: Record<string, Permit> = {
    "EP-2024-0892": {
      reference: "EP-2024-0892",
      type: "Export Permit",
      product: "Blue Mountain Coffee",
      destination: "United States",
      status: "approved",
      submittedDate: "2024-12-15",
      expiryDate: "2025-06-15",
      value: "$45,000",
      applicant: "Jamaica Coffee Traders Ltd",
      notes: "Approved for export to US markets. All documentation verified.",
    },
    "IL-2024-1456": {
      reference: "IL-2024-1456",
      type: "Import License",
      product: "Industrial Equipment",
      destination: "China",
      status: "processing",
      submittedDate: "2025-01-05",
      value: "$125,000",
      applicant: "Caribbean Manufacturing Co.",
      notes: "Under review. Additional documentation requested.",
    },
    "EP-2024-0901": {
      reference: "EP-2024-0901",
      type: "Export Permit",
      product: "Jamaican Rum",
      destination: "United Kingdom",
      status: "pending",
      submittedDate: "2025-01-08",
      value: "$32,500",
      applicant: "Island Spirits Distillery",
      notes: "Awaiting health certificate verification.",
    },
    "TP-2024-0234": {
      reference: "TP-2024-0234",
      type: "Transit Permit",
      product: "Electronic Components",
      destination: "Panama",
      status: "approved",
      submittedDate: "2024-11-28",
      expiryDate: "2025-02-28",
      value: "$78,000",
      applicant: "Global Transit Solutions",
      notes: "Transit approved via Kingston port.",
    },
    "EP-2024-0789": {
      reference: "EP-2024-0789",
      type: "Export Permit",
      product: "Tropical Fruits",
      destination: "Canada",
      status: "rejected",
      submittedDate: "2024-12-01",
      value: "$18,500",
      applicant: "Fresh Produce Jamaica Ltd",
      notes: "Rejected due to incomplete phytosanitary documentation. Please resubmit with valid certificates.",
    },
  };

  const handleSearch = () => {
    if (!permitNumber.trim()) return;

    setIsSearching(true);
    setNotFound(false);
    setSearchResult(null);

    setTimeout(() => {
      const result = mockPermits[permitNumber.toUpperCase()];
      if (result) {
        setSearchResult(result);
      } else {
        setNotFound(true);
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "pending":
        return <Clock className="w-6 h-6 text-yellow-600" />;
      case "processing":
        return <RefreshCw className="w-6 h-6 text-blue-600" />;
      case "rejected":
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <FileText className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusStyle = (status: string) => {
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

  const clearSearch = () => {
    setPermitNumber("");
    setSearchResult(null);
    setNotFound(false);
  };

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h1 className="text-lg font-semibold">JSWIFT Lookup</h1>
        <p className="text-sm text-muted-foreground">
          Check permit status by reference number
        </p>
      </div>

      {/* Search Section */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={permitNumber}
            onChange={(e) => setPermitNumber(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter permit reference..."
            className="w-full pl-10 pr-10 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
          />
          {permitNumber && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-full"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={!permitNumber.trim() || isSearching}
          className="w-full mt-3 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSearching ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </button>

        {/* Test Values */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Quick test:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPermitNumber("EP-2024-0892")}
              className="text-xs text-primary hover:underline"
            >
              Approved
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              onClick={() => setPermitNumber("EP-2024-0901")}
              className="text-xs text-primary hover:underline"
            >
              Pending
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              onClick={() => setPermitNumber("IL-2024-1456")}
              className="text-xs text-primary hover:underline"
            >
              Processing
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              onClick={() => setPermitNumber("EP-2024-0789")}
              className="text-xs text-primary hover:underline"
            >
              Rejected
            </button>
          </div>
        </div>
      </div>

      {/* Not Found State */}
      {notFound && (
        <div className="px-4 py-8 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium mb-1">Not Found</p>
          <p className="text-sm text-muted-foreground">
            No permit found for <span className="font-mono">{permitNumber}</span>
          </p>
        </div>
      )}

      {/* Permit Result */}
      {searchResult && (
        <div className="divide-y divide-border">
          {/* Status Header */}
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(searchResult.status)}
              <div>
                <p className="font-mono text-sm">{searchResult.reference}</p>
                <p className={`text-sm font-medium capitalize ${getStatusStyle(searchResult.status)}`}>
                  {searchResult.status}
                </p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {searchResult.type}
            </span>
          </div>

          {/* Permit Details */}
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-2">Details</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Product</span>
                <span>{searchResult.product}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Destination</span>
                <span>{searchResult.destination}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Value</span>
                <span>{searchResult.value}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Applicant</span>
                <span className="text-right max-w-[60%]">{searchResult.applicant}</span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-2">Dates</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">{new Date(searchResult.submittedDate).toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">Submitted</p>
              </div>
              {searchResult.expiryDate && (
                <div>
                  <p className="text-sm">{new Date(searchResult.expiryDate).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">Expires</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {searchResult.notes && (
            <div className="px-4 py-4">
              <p className="text-xs text-muted-foreground mb-2">Notes</p>
              <p className="text-sm text-muted-foreground">{searchResult.notes}</p>
            </div>
          )}

          {/* Actions */}
          {searchResult.status === "approved" && (
            <div className="px-4 py-4">
              <button
                onClick={() => alert(`Downloading ${searchResult.reference}...`)}
                className="w-full py-3 flex items-center justify-between text-primary hover:bg-muted rounded-xl px-4 -mx-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Download Certificate</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {searchResult.status === "rejected" && (
            <div className="px-4 py-4">
              <button
                onClick={() => alert("Opening appeal form...")}
                className="w-full py-3 flex items-center justify-between text-muted-foreground hover:bg-muted rounded-xl px-4 -mx-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Submit Appeal</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
