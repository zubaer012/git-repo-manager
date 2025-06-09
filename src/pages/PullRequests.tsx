import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPullRequests } from "../services/github";
import type { RestEndpointMethodTypes } from "@octokit/rest";

type BasePullRequest =
  RestEndpointMethodTypes["pulls"]["list"]["response"]["data"][0];
type Label = BasePullRequest["labels"][0];

interface PullRequest extends BasePullRequest {
  merged: boolean;
  mergeable: boolean | null;
  mergeable_state: string;
  comments: number;
  review_comments: number;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

export default function PullRequests() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  const {
    data: pullRequests,
    isLoading,
    error,
  } = useQuery<PullRequest[]>(
    ["pullRequests", owner, repo],
    async () => {
      if (!owner || !repo) throw new Error("Repository not found");
      const response = await getPullRequests(owner, repo);
      return response as PullRequest[];
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
        {error instanceof Error
          ? error.message
          : "Failed to fetch pull requests"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pull Requests
        </h1>
        {owner && repo && (
          <a
            href={`https://github.com/${owner}/${repo}/pulls`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on GitHub
          </a>
        )}
      </div>

      {pullRequests && pullRequests.length > 0 ? (
        <div className="space-y-4">
          {pullRequests.map((pr: PullRequest) => (
            <div key={pr.number} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        pr.draft
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          : pr.merged
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : pr.state === "open"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {pr.draft ? "Draft" : pr.merged ? "Merged" : pr.state}
                    </span>
                    <a
                      href={pr.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {pr.title}
                    </a>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>#{pr.number}</span>
                    {pr.user && (
                      <span>
                        Opened by{" "}
                        <a
                          href={`https://github.com/${pr.user.login}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {pr.user.login}
                        </a>
                      </span>
                    )}
                    <span>
                      Created {new Date(pr.created_at).toLocaleDateString()}
                    </span>
                    <span>
                      Updated {new Date(pr.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Comments:
                      </span>{" "}
                      {pr.comments + pr.review_comments}
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Commits:
                      </span>{" "}
                      {pr.commits}
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Changes:
                      </span>{" "}
                      <span className="text-green-600 dark:text-green-400">
                        +{pr.additions}
                      </span>{" "}
                      <span className="text-red-600 dark:text-red-400">
                        -{pr.deletions}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Files changed:
                      </span>{" "}
                      {pr.changed_files}
                    </div>
                  </div>
                </div>
                {pr.user && (
                  <img
                    src={pr.user.avatar_url}
                    alt={pr.user.login}
                    className="w-8 h-8 rounded-full ml-4"
                  />
                )}
              </div>
              {pr.labels.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {pr.labels.map((label: Label) => (
                    <span
                      key={label.name}
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `#${label.color}`,
                        color:
                          parseInt(label.color, 16) > 0x7fffff
                            ? "#000"
                            : "#fff",
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No pull requests found
        </p>
      )}
    </div>
  );
}
