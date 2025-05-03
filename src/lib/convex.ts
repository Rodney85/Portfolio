import { ConvexProvider, ConvexReactClient } from "convex/react";

// Initialize the Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export { convex, ConvexProvider };
