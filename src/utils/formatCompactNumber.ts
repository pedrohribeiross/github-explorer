const truncateToOneDecimal = (value: number): number =>
  Math.floor(value * 10) / 10

const formatScaled = (value: number, suffix: string): string => {
  const scaled = truncateToOneDecimal(value)
  const text = Number.isInteger(scaled) ? String(scaled) : scaled.toFixed(1)
  return `${text}${suffix}`
}

export const formatCompactNumber = (value: number): string => {
  if (value < 1000) {
    return String(value)
  }

  if (value < 1_000_000) {
    return formatScaled(value / 1000, 'k')
  }

  return formatScaled(value / 1_000_000, 'm')
}
