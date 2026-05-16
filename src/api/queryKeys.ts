export const queryKeys = {
  user: (username: string) => ['user', username] as const,
  repositories: (username: string) => ['repositories', username] as const,
  repository: (owner: string, repo: string) => ['repository', owner, repo] as const,
}
