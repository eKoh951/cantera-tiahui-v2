import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import grayMatter from "gray-matter";
import LessonList from "./LessonList";
import { fetchGithubContent } from "@/app/lib/fetchers";
import { CMS_LESSONS_URL } from "@/app/lib/constants";

export default async function Lesson({
  params,
}: {
  params: { skill: string[] };
}) {
  const { skill } = params;
  const [skillName, skillLesson] = skill;

  if (!skillLesson) {
    const lessons = await fetchGithubContent(`${CMS_LESSONS_URL}/${skillName}`);

    return Array.isArray(lessons) ? <LessonList lessons={lessons} /> : <></>;
  }

  const lesson = await fetchGithubContent(
    `${CMS_LESSONS_URL}/${skillName}/${skillLesson}.md`
  );

  if (!Array.isArray(lesson) && "content" in lesson) {
    const decodedContent = atob(lesson.content);
    const { content } = grayMatter(decodedContent);

    return <ReactMarkdown>{content}</ReactMarkdown>;
  }

  return <>error</>;
}

export async function generateStaticParams() {
  const lessons = await fetchGithubContent(CMS_LESSONS_URL);

  return Array.isArray(lessons)
    ? lessons.map((lesson) => ({ slug: lesson.name }))
    : [];
}
