import { useState } from "react";
import { Fingerprint } from "lucide-react";

interface AuthOverlayProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AuthOverlay({ onSuccess, onCancel }: AuthOverlayProps) {
  const [authMethod, setAuthMethod] = useState<"biometric" | "password">("biometric");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleBiometricAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onSuccess();
    }, 1500);
  };

  const handlePasswordAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      if (email && password) {
        onSuccess();
      }
    }, 1000);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onCancel}
      />

      {/* Drawer */}
      <div className="relative w-full bg-background rounded-t-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
        {/* Drag Handle */}
        <div
          className="flex justify-center pt-3 pb-1 cursor-pointer"
          onClick={onCancel}
        >
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b border-border">
          <p className="font-semibold text-center">Sign In</p>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Info */}
          <p className="text-sm text-muted-foreground mb-4">
            Authentication required to access JSWIFT features.
          </p>

          {/* Mock Credentials */}
          <div className="bg-muted/50 px-3 py-2 mb-6 text-xs">
            <p className="text-muted-foreground mb-1">Demo credentials:</p>
            <p><span className="text-muted-foreground">Email:</span> demo@jswift.gov.jm</p>
            <p><span className="text-muted-foreground">Password:</span> demo123</p>
          </div>

          {/* Auth Method Tabs */}
          <div className="flex border-b border-border mb-6">
            <button
              onClick={() => setAuthMethod("biometric")}
              className={`flex-1 py-3 text-sm transition-colors ${
                authMethod === "biometric"
                  ? "text-primary border-b-2 border-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              Biometric
            </button>
            <button
              onClick={() => setAuthMethod("password")}
              className={`flex-1 py-3 text-sm transition-colors ${
                authMethod === "password"
                  ? "text-primary border-b-2 border-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              Password
            </button>
          </div>

          {/* Biometric Auth */}
          {authMethod === "biometric" && (
            <div className="text-center py-6">
              <Fingerprint
                className={`w-16 h-16 mx-auto mb-6 text-muted-foreground ${
                  isAuthenticating ? "animate-pulse text-primary" : ""
                }`}
              />
              <p className="font-medium mb-1">
                {isAuthenticating ? "Authenticating..." : "Touch to Continue"}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Use fingerprint or Face ID
              </p>
              <button
                onClick={handleBiometricAuth}
                disabled={isAuthenticating}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {isAuthenticating ? "Authenticating..." : "Authenticate"}
              </button>
            </div>
          )}

          {/* Password Auth */}
          {authMethod === "password" && (
            <form onSubmit={handlePasswordAuth} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email / JSWIFT ID
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  required
                />
              </div>
              <button
                type="button"
                className="text-sm text-primary"
              >
                Forgot password?
              </button>
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {isAuthenticating ? "Signing In..." : "Sign In"}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary">Register</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
