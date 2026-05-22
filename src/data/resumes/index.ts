// src/data/resumes/index.ts
import { resume } from '@/data/resume'
import { resumeWordpress } from '@/data/resumes/resume-wordpress'
import type { ResumeData } from '@/data/resume'
import type { Language } from '@/lib/translations'

export interface ResumeVersionMeta {
  label: Record<Language, string>
  data: ResumeData
}

export type ResumeVersion = 'default' | 'wordpress'

export const resumeVersions: Record<ResumeVersion, ResumeVersionMeta> = {
  default: {
    label: { en: 'Full Stack', es: 'Full Stack', pt: 'Full Stack' },
    data: resume,
  },
  wordpress: {
    label: { en: 'WordPress', es: 'WordPress', pt: 'WordPress' },
    data: resumeWordpress,
  },
}
