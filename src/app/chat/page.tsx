import { remark } from "remark";
import remarkParse from "remark-parse";
import { fetchGithubContent } from "@/app/lib/fetchers";
import { CMS_PROMPTS_URL } from "@/app/lib/constants";
import ChatBot from "./ChatBot";

export default async function Chat() {
  const url = `${CMS_PROMPTS_URL}/educational`;
  const prompts = await fetchGithubContent(url);
  const fullPrompts = await Promise.all(
    prompts.map((prompt) => {
      return fetchGithubContent(`${url}/${prompt.name}`);
    })
  );
  const parsedPrompts = fullPrompts.map((prompt) => {
    const parsedObject = remark().use(remarkParse).parse(atob(prompt.content));
    const parsedPrompt = parsedObject.children.map((child: any) => {
      return {
        type: child.type,
        value: child?.children[0]?.value,
        depth: child?.depth,
      };
    });

    return {
      label: parsedPrompt[0].value,
      value: parsedPrompt[2].value,
    };
  });

  return <ChatBot prompts={parsedPrompts} />;
}
