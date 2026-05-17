import type { User } from '../domain'
import type { GitHubUserResponse } from '../types'

export const toUser = (data: GitHubUserResponse): User => ({
  login: data.login,
  name: data.name,
  avatarUrl: data.avatar_url,
  bio: data.bio,
  email: data.email,
  followers: data.followers,
  following: data.following,
  publicRepos: data.public_repos,
})
