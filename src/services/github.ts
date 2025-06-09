import { Octokit } from "@octokit/rest";

let octokit: Octokit | null = null;

export function initializeGitHub(token: string) {
  octokit = new Octokit({ auth: token });
  return octokit;
}

export function isGitHubInitialized(): boolean {
  return octokit !== null;
}

export async function searchRepositories(query: string) {
  if (!octokit)
    throw new Error(
      "GitHub not initialized. Please add your token in Settings."
    );
  const response = await octokit.search.repos({ q: query });
  return response.data.items;
}

export async function getRepository(owner: string, repo: string) {
  if (!octokit)
    throw new Error(
      "GitHub not initialized. Please add your token in Settings."
    );
  const response = await octokit.repos.get({ owner, repo });
  return response.data;
}

export async function getIssues(owner: string, repo: string) {
  if (!octokit)
    throw new Error(
      "GitHub not initialized. Please add your token in Settings."
    );
  const response = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "all",
  });
  return response.data;
}

export async function getPullRequests(owner: string, repo: string) {
  if (!octokit)
    throw new Error(
      "GitHub not initialized. Please add your token in Settings."
    );
  const response = await octokit.pulls.list({
    owner,
    repo,
    state: "all",
  });
  return response.data;
}
