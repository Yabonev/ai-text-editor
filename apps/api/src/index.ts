import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Configure CORS securely
app.use(
  "/api/*",
  cors({
    origin: (origin, c) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return null;

      // Development: allow localhost
      if (process.env.NODE_ENV !== "production") {
        if (origin.startsWith("http://localhost:")) {
          return origin;
        }
      }

      // Production: only allow the specific frontend URL from environment variable
      if (process.env.NODE_ENV === "production") {
        const allowedOrigin = process.env.FRONTEND_URL;
        if (allowedOrigin && origin === allowedOrigin) {
          return origin;
        }
      }

      // Reject all other origins
      return null;
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/api/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello from Hono API!" });
});

app.get("/api/users", (c) => {
  return c.json([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);
});

// Catch-all for 404
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error("API Error:", err);
  return c.json({ error: "Internal Server Error" }, 500);
});

export default {
  port: parseInt(process.env.PORT || "3001"),
  fetch: app.fetch,
};
