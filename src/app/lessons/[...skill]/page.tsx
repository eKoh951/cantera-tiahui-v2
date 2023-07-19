// export const dynamicParams = true

import { Endpoints } from "@octokit/types";
import Link from "next/link";
import grayMatter from "gray-matter";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import lowerCase from "lodash-es/lowerCase";
import { upperCase } from "lodash-es";

type RepoContent =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

export default async function Lesson({
  params,
}: {
  params: { skill: string[] };
}) {
  const { skill } = params;
  const [skillName, skillLesson] = skill;
  console.log("skill", skill);

  if (!skillLesson) {
    const lessons: RepoContent = await fetch(
      `https://api.github.com/repos/eKoh951/cantera-tiahui-content/contents/lessons/${skillName}`,
      {
        next: {
          revalidate: 30,
        },
      }
    ).then((res) => res.json());

    if (Array.isArray(lessons)) {
      return (
        <ul>
          {lessons.map(({ name, path }) => {
            const [lessonPath, skillName] = path.split("/");
            const baseName = name.split(".")[0];
            const lessonName = upperCase(lowerCase(baseName));

            return (
              <li key={name}>
                <Link href={`${skillName}/${baseName}`}>{lessonName}</Link>
              </li>
            );
          })}
        </ul>
      );
    }

    return <></>;
  } else if (skillLesson) {
    const lesson: RepoContent = await fetch(
      `https://api.github.com/repos/eKoh951/cantera-tiahui-content/contents/lessons/${skillName}/${skillLesson}.md`,
      {
        next: {
          revalidate: 30,
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
