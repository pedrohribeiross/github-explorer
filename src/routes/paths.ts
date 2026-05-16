export const ROUTE_PATHS = {
  search: '/',
  userProfile: '/user/:username',
  repositoryDetail: '/user/:username/repo/:repoName',
  notFound: '*',
} as const

export const buildUserProfilePath = (username: string): string =>
  `/user/${encodeURIComponent(username)}`

export const buildRepositoryDetailPath = (username: string, repoName: string): string =>
  `/user/${encodeURIComponent(username)}/repo/${encodeURIComponent(repoName)}`
