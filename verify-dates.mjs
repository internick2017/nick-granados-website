const MONTHS = {
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  es: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
  pt: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
}
const UNITS = {
  en: { year: ['yr','yrs'], month: ['mo','mos'] },
  es: { year: ['año','años'], month: ['mes','meses'] },
  pt: { year: ['ano','anos'], month: ['mês','meses'] },
}
const parseYM = (ym) => { const [y,m] = ym.split('-').map(Number); return { year: y, month: m } }
const formatMonthYear = (ym, lang) => { const { year, month } = parseYM(ym); return `${MONTHS[lang][month-1]} ${year}` }
const formatDuration = (startYM, endYM, lang, refDate) => {
  const start = parseYM(startYM)
  const end = endYM ? parseYM(endYM) : { year: refDate.getFullYear(), month: refDate.getMonth() + 1 }
  const totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const u = UNITS[lang]
  const parts = []
  if (years > 0) parts.push(`${years} ${years === 1 ? u.year[0] : u.year[1]}`)
  if (months > 0) parts.push(`${months} ${months === 1 ? u.month[0] : u.month[1]}`)
  if (parts.length === 0) parts.push(`0 ${u.month[1]}`)
  return parts.join(' ')
}

const ref = new Date('2026-05-15')
const cases = [
  [formatDuration('2021-04','2023-06','en',ref), '2 yrs 3 mos'],   // CEICOM
  [formatDuration('2018-11','2021-01','en',ref), '2 yrs 3 mos'],   // Inkaweb
  [formatDuration('2019-11','2020-05','en',ref), '7 mos'],         // Aresmkt
  [formatDuration('2022-08',null,'en',ref), '3 yrs 10 mos'],       // Apiki (current)
  [formatDuration('2021-01',null,'en',ref), '5 yrs 5 mos'],        // Freelancer (current)
  [formatDuration('2022-08',null,'es',ref), '3 años 10 meses'],
  [formatDuration('2022-08',null,'pt',ref), '3 anos 10 meses'],
  [formatMonthYear('2022-08','en'), 'Aug 2022'],
  [formatMonthYear('2022-08','es'), 'ago 2022'],
  [formatMonthYear('2022-08','pt'), 'ago 2022'],
]
let ok = true
for (const [got, want] of cases) {
  const pass = got === want
  if (!pass) ok = false
  console.log(`${pass ? 'PASS' : 'FAIL'}: got "${got}" want "${want}"`)
}
process.exit(ok ? 0 : 1)
