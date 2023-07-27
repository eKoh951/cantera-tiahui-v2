import { lowerCase, upperCase } from "lodash-es";
import Link from "next/link";

export default function LessonList({ lessons }: { lessons: RepoContent[] }) {
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
