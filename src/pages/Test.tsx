import { useState } from "react";
import { searchRepositories, getRepository } from "../services/github";

export default function Test() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testSearchRepositories = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Testing search repositories...");
      const repos = await searchRepositories("react");
      console.log("Search result:", repos);
      setResult(repos);
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const testGetRepository = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Testing get repository...");
      const repo = await getRepository("facebook", "react");
      console.log("Repo result:", repo);
      setResult(repo);
    } catch (err) {
      console.error("Repo error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        GitHub API Test
      </h1>

      <div className="space-x-4">
        <button
          onClick={testSearchRepositories}
          disabled={loading}
          className="btn-primary"
        >
          Test Search Repositories
        </button>

        <button
          onClick={testGetRepository}
          disabled={loading}
          className="btn-primary"
        >
          Test Get Repository
        </button>
      </div>

      {loading && (
        <div className="text-blue-600 dark:text-blue-400">Loading...</div>
      )}

      {error && (
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      )}

      {result && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Result:</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
