import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  searchRepositories,
  isGitHubInitialized,
  initializeGitHub,
} from "../services/github";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { RestEndpointMethodTypes } from "@octokit/rest";

type SearchResponse =
  RestEndpointMethodTypes["search"]["repos"]["response"]["data"]["items"][0];

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if GitHub is already initialized
    if (isGitHubInitialized()) {
      setIsInitialized(true);
    } else {
      // Try to initialize from localStorage
      const savedToken = localStorage.getItem("github_token");
      if (savedToken) {
        initializeGitHub(savedToken);
        setIsInitialized(true);
      }
    }
  }, []);

  const {
    data: repositories,
    isLoading,
    error,
  } = useQuery<Repository[], Error>(
    ["repositories", searchQuery],
    async () => {
      if (!searchQuery.trim()) return [];
      const response = await searchRepositories(searchQuery);
      return response.map(
        (repo: SearchResponse): Repository => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          owner: {
            login: repo.owner?.login || "",
            avatar_url: repo.owner?.avatar_url || "",
          },
          html_url: repo.html_url,
        })
      );
    },
    {
      enabled: searchQuery.trim().length > 0 && isInitialized,
    }
  );

  const handleRepoClick = (owner: string, repo: string) => {
    navigate(`/repository/${owner}/${repo}`);
  };

  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome to GitHub Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please add your GitHub Personal Access Token in Settings to get
            started
          </p>
          <button onClick={() => navigate("/settings")} className="btn-primary">
            Go to Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          GitHub Dashboard
        </h1>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search repositories (e.g., 'react', 'vue', 'typescript')..."
          className="input pl-10 w-full"
        />
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400">
          Error: {error.message || "Failed to fetch repositories"}
          {error.message.includes("not initialized") && (
            <div className="mt-2">
              <button
                onClick={() => navigate("/settings")}
                className="text-sm underline hover:no-underline"
              >
                Update your token in Settings
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
        </div>
      )}

      {repositories && repositories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleRepoClick(repo.owner.login, repo.name)}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate hover:text-primary-600 dark:hover:text-primary-400">
                    {repo.full_name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>⭐ {repo.stargazers_count}</span>
                    {repo.language && <span>{repo.language}</span>}
                  </div>
                  <div className="mt-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        searchQuery.trim() &&
        !isLoading && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No repositories found
          </p>
        )
      )}

      {!searchQuery.trim() && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Search for any GitHub repository to get started
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Try searching for: "react", "vue", "typescript", or any repository
            name
          </p>
        </div>
      )}
    </div>
  );
}
