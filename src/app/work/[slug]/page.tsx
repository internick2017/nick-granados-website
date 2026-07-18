import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import CaseStudy from '@/components/case-study'
import { projects } from '@/data/projects'

// Only projects that have a caseStudy get a /work/[slug] page.
const caseStudyProjects = projects.filter((p) => p.caseStudy)

// Static export: all valid slugs are known at build time; anything else 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudyProjects.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = caseStudyProjects.find((p) => p.id === slug)
  if (!project) return {}

  // Metadata is read at build time and cannot switch per the client-side
  // language selection, so it uses English (the international default).
  const summary = project.caseStudy!.en.summary
  const title = project.translations.en.title

  return {
    title: `Case Study: ${title} | Nick Granados`,
    description: summary,
    openGraph: {
      title: `Case Study: ${title}`,
      description: summary,
      images: [project.image],
      type: 'article',
    },
  }
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = caseStudyProjects.find((p) => p.id === slug)
  if (!project) notFound()

  return (
    <>
      <Navigation />
      <CaseStudy project={project} />
      <Footer />
    </>
  )
}
