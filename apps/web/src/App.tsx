import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [apiStatus, setApiStatus] = useState<string>("Loading...");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  console.log("Environment variables:", {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    NODE_ENV: import.meta.env.NODE_ENV,
    MODE: import.meta.env.MODE,
    apiUrl,
  });

  useEffect(() => {
    // Test API connection
    fetch(`${apiUrl}/api/health`)
      .then((res) => res.json())
      .then((data) => setApiStatus(`API: ${data.status} (${data.environment})`))
      .catch(() => setApiStatus("API: Disconnected"));

    // Fetch users
    fetch(`${apiUrl}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Text Editor
        </h1>
        <p className="text-sm text-green-600 mb-6">{apiStatus}</p>

        <div className="space-y-6">
          {/* Counter Section */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-3">Counter Demo</h2>
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              count is {count}
            </button>
          </div>

          {/* Users Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Users from API</h2>
            {users.length > 0 ? (
              <div className="grid gap-2">
                {users.map((user) => (
                  <div key={user.id} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Loading users...</p>
            )}
          </div>

          <p className="text-gray-600 text-sm">
            Frontend: Vite + React + Tailwind | Backend: Hono + Bun
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
