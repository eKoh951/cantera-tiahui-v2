import { Endpoints } from "@octokit/types";
import Link from "next/link";
import grayMatter from "gray-matter";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type RepoContent =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

type RepoFile =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

export default async function Lesson({
  params,
}: {
  params: { skill: string[] };
}) {
  const { skill } = params;
  const [skillName, skillLesson] = skill;

  if (!skillLesson) {
    const lessons: RepoContent = await fetch(
      `https://api.github.com/repos/eKoh951/cantera-tiahui-content/contents/lessons/${skillName}`
    ).then((res) => res.json());

    if (Array.isArray(lessons)) {
      return lessons.map((lesson) => {
        if (lesson.type === "file") {
          return (
            <ul key="a">
              {lessons.map(({ name, url }) => (
                <li key={name}>
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </ul>
          );
        }
      });
    }

    return <></>;
  } else {
    const url = `https://api.github.com/repos/eKoh951/cantera-tiahui-content/contents/lessons/${skillName}/${skillLesson}.md`;

    const lesson: RepoContent = await fetch(
      `https://api.github.com/repos/eKoh951/cantera-tiahui-content/contents/lessons/${skillName}/${skillLesson}.md`,
      {
        next: {
          revalidate: 60,
        },
      }
    ).then((res) => res.json());

    if (!Array.isArray(lesson) && "content" in lesson) {
      const decodedContent = atob(lesson.content);
      const { content } = grayMatter(decodedContent);

      return <ReactMarkdown>{content}</ReactMarkdown>;
    }

    return <></>;
  }
}

export async function generateStaticParams() {
  const lessons: RepoContent = await fetch(
    "https://api.github.com/repos/eKoh951/cantera-tiahui-content/contents/lessons"
  ).then((res) => res.json());

  // you can read response.data.content in this block
  if (Array.isArray(lessons)) {
    return lessons.map((lesson) => {
      return {
        slug: lesson.name,
      };
    });
  }

  return [];
}
