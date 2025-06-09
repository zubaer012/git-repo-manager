import { useState, useEffect } from "react";
import { initializeGitHub } from "../services/github";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Load existing token from localStorage
    const savedToken = localStorage.getItem("github_token");
    if (savedToken) {
      setToken(savedToken);
      // Initialize GitHub with the saved token
      initializeGitHub(savedToken);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSaveToken = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (!token.trim()) {
        throw new Error("Please enter a GitHub token");
      }

      // Test the token by making a simple API call
      const testOctokit = initializeGitHub(token);
      await testOctokit.users.getAuthenticated();

      // If successful, save the token
      localStorage.setItem("github_token", token);
      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save token");
      // Clear the octokit instance if token is invalid
      localStorage.removeItem("github_token");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearToken = () => {
    setToken("");
    localStorage.removeItem("github_token");
    setSuccess(false);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h1>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Appearance
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              darkMode ? "bg-primary-600" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          GitHub Integration
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="github-token"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              GitHub Personal Access Token
            </label>
            <input
              type="password"
              id="github-token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="input mt-1"
              placeholder="Enter your GitHub token (ghp_...)"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Create a token with 'repo' scope at{" "}
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                GitHub Settings
              </a>
            </p>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 dark:text-green-400 text-sm">
              Token saved successfully! You can now use all GitHub features.
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={handleSaveToken}
              disabled={isSaving}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Validating..." : "Save Token"}
            </button>

            {token && (
              <button
                onClick={handleClearToken}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-500"
              >
                Clear Token
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
