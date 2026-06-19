import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, projectSlugs } from "@/data/projects";
import CaseStudy from "@/components/projects/CaseStudy";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects[slug];
  if (!p) return {};
  return {
    title: `${p.title} — Tanvi Chowdhury`,
    description: p.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projects[slug];
  if (!p) notFound();
  return <CaseStudy projectId={slug} />;
}
