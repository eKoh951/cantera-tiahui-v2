import { Endpoints } from "@octokit/types";
import Link from "next/link";
import { lowerCase, upperCase } from "lodash-es";

type RepoContent =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

export default async function Lesson() {
  const lessons: RepoContent = await fetch(
    `https://api.github.com/repos/eKoh951/cantera-tiahui-content/contents/lessons`,
    {
      next: {
        revalidate: 60,
      },
    }
  ).then((res) => res.json());

  if (Array.isArray(lessons)) {
    return (
      <ul>
        {lessons.map(({ name }) => {
          const lessonName = upperCase(lowerCase(name.split(".")[0]));

          return (
            <li key={lessonName}>
              <Link href={`lessons/${name}`}>{lessonName}</Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return <></>;
}
