import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Configure CORS - allow frontend URL and Railway domains
app.use(
  "/api/*",
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            process.env.FRONTEND_URL ||
              "https://ai-text-editorweb-production.up.railway.app",
            "https://*.up.railway.app",
          ]
        : "*",
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
