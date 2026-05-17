import { formatCompactNumber } from './formatCompactNumber'

describe('formatCompactNumber', () => {
  it('returns the full number below 1000', () => {
    expect(formatCompactNumber(0)).toBe('0')
    expect(formatCompactNumber(42)).toBe('42')
    expect(formatCompactNumber(999)).toBe('999')
  })

  it('formats thousands with a k suffix (GitHub style)', () => {
    expect(formatCompactNumber(1000)).toBe('1k')
    expect(formatCompactNumber(1234)).toBe('1.2k')
    expect(formatCompactNumber(15500)).toBe('15.5k')
  })

  it('drops the decimal when the scaled value is a whole number', () => {
    expect(formatCompactNumber(2000)).toBe('2k')
    expect(formatCompactNumber(10000)).toBe('10k')
  })

  it('truncates instead of rounding up', () => {
    expect(formatCompactNumber(1299)).toBe('1.2k')
    expect(formatCompactNumber(1999)).toBe('1.9k')
  })

  it('formats millions with an m suffix', () => {
    expect(formatCompactNumber(1_000_000)).toBe('1m')
    expect(formatCompactNumber(2_500_000)).toBe('2.5m')
  })
})
