import { ReactNode, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

function getConvexUrl(): string {
  const url = import.meta.env.VITE_CONVEX_URL;
  if (!url) {
    throw new Error("VITE_CONVEX_URL is not defined in environment variables");
  }

  // If it's already a valid URL, return it
  try {
    new URL(url);
    return url;
  } catch (e) {
    // If it's not a valid URL, try to construct it
    if (url.includes('convex.cloud')) {
      return `https://${url}`;
    }
    // For development URLs
    return `https://${url}.convex.cloud`;
  }
}

export function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const url = getConvexUrl();
      console.log('Connecting to Convex URL:', url);
      const convexClient = new ConvexReactClient(url);
      setClient(convexClient);
    } catch (err) {
      console.error('Error initializing Convex client:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize Convex client');
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-red-600 text-xl font-semibold mb-4">Connection Error</h2>
          <p className="text-gray-700">{error}</p>
          <p className="text-gray-500 mt-2 text-sm">Current environment: {import.meta.env.MODE}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
