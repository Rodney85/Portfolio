import { ReactNode, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

function getConvexUrl(): string {
  const rawUrl = import.meta.env.VITE_CONVEX_URL;
  console.log('Raw Convex URL:', rawUrl);
  
  if (!rawUrl) {
    throw new Error("VITE_CONVEX_URL is not defined in environment variables");
  }

  // Clean the URL: remove quotes and trim whitespace
  const url = rawUrl.replace(/["']/g, '').trim();
  console.log('Cleaned URL:', url);

  // Handle deployment key format (prod:name|key)
  if (url.startsWith('prod:')) {
    const deploymentId = url.split('|')[0].replace('prod:', '');
    const finalUrl = `https://${deploymentId}.convex.cloud`;
    console.log('Final URL from deployment key:', finalUrl);
    return finalUrl;
  }

  // If URL already has protocol, use it as is
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url;
  }

  // Add https:// if missing
  return `https://${url}`;
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
      console.log('Final Convex URL:', url);
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
          <p className="text-gray-500 mt-2 text-sm">Environment: {import.meta.env.MODE}</p>
          <p className="text-gray-500 mt-2 text-xs break-all">
            Raw URL: {import.meta.env.VITE_CONVEX_URL}
          </p>
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
