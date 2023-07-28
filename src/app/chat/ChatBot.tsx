"use client";

import React from "react";
import { useChat } from "ai/react";
import ComboBox from "../components/AutoComplete";

interface Props {
  prompts: {
    label: string;
    value: string;
  }[];
}

export default function ChatBot({ prompts }: Props) {
  const [systemPrompt, setSystemPrompt] = React.useState(prompts[0]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "system",
        content: systemPrompt.value,
      },
    ],
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        : null}

      <ComboBox
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
        systemPromptOptions={prompts}
      />
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
