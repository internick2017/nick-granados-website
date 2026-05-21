import type { Metadata } from 'next'
import CvDocument from '@/components/cv-document'

export const metadata: Metadata = {
  title: 'Nick Granados - CV',
  description: 'Curriculum Vitae of Nick Granados — Full Stack Developer.',
  robots: 'noindex',
}

export default function CvPage() {
  const buildDate = new Date().toISOString()
  return <CvDocument buildDate={buildDate} />
}
