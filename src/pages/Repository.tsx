import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getRepository } from "../services/github";
import type { RestEndpointMethodTypes } from "@octokit/rest";

type Repository = RestEndpointMethodTypes["repos"]["get"]["response"]["data"];

export default function Repository() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const location = useLocation();

  const {
    data: repository,
    isLoading,
    error,
  } = useQuery<Repository>(
    ["repository", owner, repo],
    async () => {
      if (!owner || !repo) throw new Error("Repository not found");
      return getRepository(owner, repo);
    },
    {
      enabled: !!owner && !!repo,
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400">
        Error:{" "}
        {error instanceof Error ? error.message : "Failed to fetch repository"}
      </div>
    );
  }

  if (!repository) return null;

  const tabs = [
    {
      name: "Repository",
      href: `/repository/${owner}/${repo}`,
      current: location.pathname === `/repository/${owner}/${repo}`,
    },
    {
      name: "Issues",
      href: `/repository/${owner}/${repo}/issues`,
      current: location.pathname === `/repository/${owner}/${repo}/issues`,
    },
    {
      name: "Pull Requests",
      href: `/repository/${owner}/${repo}/pulls`,
      current: location.pathname === `/repository/${owner}/${repo}/pulls`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Repository Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={repository.owner?.avatar_url}
            alt={repository.owner?.login}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {repository.full_name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {repository.description || "No description available"}
            </p>
          </div>
        </div>
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          View on GitHub
        </a>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.href}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                tab.current
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Repository Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Repository Stats
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Stars:</span>
              <span className="font-medium">{repository.stargazers_count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Forks:</span>
              <span className="font-medium">{repository.forks_count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Open Issues:
              </span>
              <span className="font-medium">
                {repository.open_issues_count}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Repository Info
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Language:
              </span>
              <span className="font-medium">
                {repository.language || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Default Branch:
              </span>
              <span className="font-medium">{repository.default_branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Created:</span>
              <span className="font-medium">
                {new Date(repository.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link
              to={`/repository/${owner}/${repo}/issues`}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              View Issues ({repository.open_issues_count})
            </Link>
            <Link
              to={`/repository/${owner}/${repo}/pulls`}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              View Pull Requests
            </Link>
          </div>
        </div>
      </div>

      {/* Topics */}
      {repository.topics && repository.topics.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {repository.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-sm rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
