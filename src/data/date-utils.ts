import type { Language } from '@/lib/translations'

const MONTHS: Record<Language, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
}

const PRESENT: Record<Language, string> = {
  en: 'Present',
  es: 'Actual',
  pt: 'Atual',
}

const UNITS: Record<Language, { year: [string, string]; month: [string, string] }> = {
  en: { year: ['yr', 'yrs'], month: ['mo', 'mos'] },
  es: { year: ['año', 'años'], month: ['mes', 'meses'] },
  pt: { year: ['ano', 'anos'], month: ['mês', 'meses'] },
}

function parseYM(ym: string): { year: number; month: number } {
  const [year, month] = ym.split('-').map(Number)
  return { year, month }
}

export function formatMonthYear(ym: string, lang: Language): string {
  const { year, month } = parseYM(ym)
  return `${MONTHS[lang][month - 1]} ${year}`
}

export function formatDateRange(startYM: string, endYM: string | null, lang: Language): string {
  const start = formatMonthYear(startYM, lang)
  const end = endYM ? formatMonthYear(endYM, lang) : PRESENT[lang]
  return `${start} - ${end}`
}

export function formatDuration(
  startYM: string,
  endYM: string | null,
  lang: Language,
  refDate: Date
): string {
  const start = parseYM(startYM)
  const end = endYM
    ? parseYM(endYM)
    : { year: refDate.getFullYear(), month: refDate.getMonth() + 1 }
  const totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const u = UNITS[lang]
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years === 1 ? u.year[0] : u.year[1]}`)
  if (months > 0) parts.push(`${months} ${months === 1 ? u.month[0] : u.month[1]}`)
  if (parts.length === 0) parts.push(`0 ${u.month[1]}`)
  return parts.join(' ')
}
