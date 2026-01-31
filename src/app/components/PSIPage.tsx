import { useState } from "react";
import { Search, QrCode, X, CheckCircle, AlertCircle, Camera, Download, ChevronRight } from "lucide-react";

interface PSICertificate {
  chassisNumber: string;
  certificateNumber: string;
  status: "valid" | "expired" | "pending";
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  inspectionDate: string;
  expiryDate: string;
  inspectionLocation: string;
  inspector: string;
  result: "pass" | "fail" | "conditional";
  notes: string;
}

export default function PSIPage() {
  const [chassisNumber, setChassisNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [searchResult, setSearchResult] = useState<PSICertificate | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Mock database of PSI certificates
  const mockCertificates: Record<string, PSICertificate> = {
    "JTMBD31V405123456": {
      chassisNumber: "JTMBD31V405123456",
      certificateNumber: "PSI-2024-78542",
      status: "valid",
      vehicleMake: "Toyota",
      vehicleModel: "RAV4",
      vehicleYear: "2020",
      inspectionDate: "2024-11-15",
      expiryDate: "2025-11-15",
      inspectionLocation: "Kingston Port PSI Center",
      inspector: "J. Williams",
      result: "pass",
      notes: "Vehicle passed all inspection criteria. No defects found.",
    },
    "1HGBH41JXMN109186": {
      chassisNumber: "1HGBH41JXMN109186",
      certificateNumber: "PSI-2024-65321",
      status: "expired",
      vehicleMake: "Honda",
      vehicleModel: "Accord",
      vehicleYear: "2019",
      inspectionDate: "2023-08-20",
      expiryDate: "2024-08-20",
      inspectionLocation: "Montego Bay Freeport",
      inspector: "M. Brown",
      result: "pass",
      notes: "Certificate has expired. Renewal required.",
    },
    "WVWZZZ3CZWE123789": {
      chassisNumber: "WVWZZZ3CZWE123789",
      certificateNumber: "PSI-2025-00123",
      status: "pending",
      vehicleMake: "Volkswagen",
      vehicleModel: "Golf",
      vehicleYear: "2021",
      inspectionDate: "2025-01-08",
      expiryDate: "2026-01-08",
      inspectionLocation: "Kingston Port PSI Center",
      inspector: "R. Campbell",
      result: "conditional",
      notes: "Minor repairs required. Re-inspection scheduled.",
    },
  };

  const handleSearch = () => {
    if (!chassisNumber.trim()) return;

    setIsSearching(true);
    setNotFound(false);
    setSearchResult(null);

    setTimeout(() => {
      const result = mockCertificates[chassisNumber.toUpperCase()];
      if (result) {
        setSearchResult(result);
      } else {
        setNotFound(true);
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleScanResult = (scannedValue: string) => {
    setChassisNumber(scannedValue);
    setShowScanner(false);
    setTimeout(() => {
      setIsSearching(true);
      setNotFound(false);
      setSearchResult(null);
      setTimeout(() => {
        const result = mockCertificates[scannedValue.toUpperCase()];
        if (result) {
          setSearchResult(result);
        } else {
          setNotFound(true);
        }
        setIsSearching(false);
      }, 1000);
    }, 300);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "valid":
        return "text-green-600";
      case "expired":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-muted-foreground";
    }
  };

  const clearSearch = () => {
    setChassisNumber("");
    setSearchResult(null);
    setNotFound(false);
  };

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h1 className="text-lg font-semibold">PSI Lookup</h1>
        <p className="text-sm text-muted-foreground">
          Verify certificate by chassis number
        </p>
      </div>

      {/* Search Section */}
      <div className="px-4 py-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={chassisNumber}
              onChange={(e) => setChassisNumber(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter chassis number..."
              className="w-full pl-10 pr-10 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
            />
            {chassisNumber && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-full"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowScanner(true)}
            className="p-3 glass rounded-xl hover:brightness-105 transition-all"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleSearch}
          disabled={!chassisNumber.trim() || isSearching}
          className="w-full mt-3 py-3 gradient-primary text-white rounded-xl font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              onClick={() => setChassisNumber("JTMBD31V405123456")}
              className="text-xs text-primary hover:underline"
            >
              Valid
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              onClick={() => setChassisNumber("1HGBH41JXMN109186")}
              className="text-xs text-primary hover:underline"
            >
              Expired
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              onClick={() => setChassisNumber("WVWZZZ3CZWE123789")}
              className="text-xs text-primary hover:underline"
            >
              Pending
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
            No certificate for <span className="font-mono">{chassisNumber}</span>
          </p>
        </div>
      )}

      {/* Certificate Result */}
      {searchResult && (
        <div className="divide-y divide-border">
          {/* Status Header */}
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-6 h-6 ${getStatusStyle(searchResult.status)}`} />
              <div>
                <p className="font-mono text-sm">{searchResult.certificateNumber}</p>
                <p className={`text-sm font-medium capitalize ${getStatusStyle(searchResult.status)}`}>
                  {searchResult.status}
                </p>
              </div>
            </div>
            <span className={`text-sm capitalize ${getStatusStyle(searchResult.result)}`}>
              {searchResult.result}
            </span>
          </div>

          {/* Vehicle Info */}
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-2">Vehicle</p>
            <p className="font-medium">
              {searchResult.vehicleYear} {searchResult.vehicleMake} {searchResult.vehicleModel}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {searchResult.chassisNumber}
            </p>
          </div>

          {/* Inspection Info */}
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-2">Inspection</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">{new Date(searchResult.inspectionDate).toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">Inspected</p>
              </div>
              <div>
                <p className={`text-sm ${searchResult.status === "expired" ? "text-red-600" : ""}`}>
                  {new Date(searchResult.expiryDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-muted-foreground">Expires</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-2">Location</p>
            <p className="text-sm">{searchResult.inspectionLocation}</p>
            <p className="text-xs text-muted-foreground mt-1">Inspector: {searchResult.inspector}</p>
          </div>

          {/* Notes */}
          <div className="px-4 py-4">
            <p className="text-xs text-muted-foreground mb-2">Notes</p>
            <p className="text-sm text-muted-foreground">{searchResult.notes}</p>
          </div>

          {/* Download */}
          <div className="px-4 py-4">
            <button
              onClick={() => alert(`Downloading ${searchResult.certificateNumber}...`)}
              className="w-full py-3 flex items-center justify-between text-primary hover:bg-muted rounded-xl px-4 -mx-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <span className="font-medium">Download Certificate</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold text-white">Scan QR Code</h2>
            <button
              onClick={() => setShowScanner(false)}
              className="p-2 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="relative w-64 h-64 mb-8">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white/20" />
              </div>
              <div className="absolute inset-x-0 top-1/2 h-px bg-white/50 animate-pulse" />
            </div>

            <p className="text-white/60 text-sm text-center mb-8">
              Align QR code within frame
            </p>

            <div className="w-full max-w-xs space-y-2">
              <p className="text-white/40 text-xs text-center mb-2">Demo scan</p>
              <button
                onClick={() => handleScanResult("JTMBD31V405123456")}
                className="w-full py-3 text-white/80 text-sm hover:text-white transition-colors"
              >
                Valid certificate
              </button>
              <button
                onClick={() => handleScanResult("1HGBH41JXMN109186")}
                className="w-full py-3 text-white/80 text-sm hover:text-white transition-colors"
              >
                Expired certificate
              </button>
              <button
                onClick={() => handleScanResult("WVWZZZ3CZWE123789")}
                className="w-full py-3 text-white/80 text-sm hover:text-white transition-colors"
              >
                Pending certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
