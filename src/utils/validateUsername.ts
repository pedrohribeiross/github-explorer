const GITHUB_USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

export const isValidUsername = (username: string): boolean =>
  GITHUB_USERNAME_PATTERN.test(username.trim())
