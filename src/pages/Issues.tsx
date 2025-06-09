import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getIssues } from "../services/github";

interface Issue {
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  } | null;
  labels: Array<{
    name: string;
    color: string;
  }>;
}

export default function Issues() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  const {
    data: issues,
    isLoading,
    error,
  } = useQuery<Issue[]>(
    ["issues", owner, repo],
    async () => {
      if (!owner || !repo) throw new Error("Repository not found");
      const response = await getIssues(owner, repo);
      return response.map((issue) => ({
        number: issue.number,
        title: issue.title,
        state: issue.state,
        html_url: issue.html_url,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        user: issue.user
          ? {
              login: issue.user.login,
              avatar_url: issue.user.avatar_url,
            }
          : null,
        labels: issue.labels.map((label) => {
          if (typeof label === "string") {
            return {
              name: label,
              color: "000000",
            };
          }
          return {
            name: label.name || "",
            color: label.color || "000000",
          };
        }),
      }));
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
        {error instanceof Error ? error.message : "Failed to fetch issues"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Issues
        </h1>
        {owner && repo && (
          <a
            href={`https://github.com/${owner}/${repo}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on GitHub
          </a>
        )}
      </div>

      {issues && issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.number} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        issue.state === "open"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      }`}
                    >
                      {issue.state}
                    </span>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {issue.title}
                    </a>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>#{issue.number}</span>
                    {issue.user && (
                      <span>
                        Opened by{" "}
                        <a
                          href={`https://github.com/${issue.user.login}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {issue.user.login}
                        </a>
                      </span>
                    )}
                    <span>
                      Created {new Date(issue.created_at).toLocaleDateString()}
                    </span>
                    <span>
                      Updated {new Date(issue.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {issue.user && (
                  <img
                    src={issue.user.avatar_url}
                    alt={issue.user.login}
                    className="w-8 h-8 rounded-full ml-4"
                  />
                )}
              </div>
              {issue.labels.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {issue.labels.map((label) => (
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
        <p className="text-gray-500 dark:text-gray-400">No issues found</p>
      )}
    </div>
  );
}
