"use client";

import { Loading } from "@/components/Loading";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async (prompt: string) => {
    setLoading(true);
    console.log("Sending prompt:", prompt);
    // Call your API route here
    const response = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: prompt }),
    });

    console.log(response);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(prompt);
    }
  }


  return (
    <div className="text-[#DEDEE2] font-sans grid p-8 pb-20 gap-16 sm:p-20 relative">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="justify-center flex w-full flex-col items-center"><p>Welcome! I'm your Patagonian Guardrail</p><p> Assistant.How can I assist you today?</p></div>
        { loading && <Loading /> }
        <div className="flex w-full justify-center">
            <textarea
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              cols={80}
              placeholder="Ask anything"
              id="Prompt"
              name="Prompt"
              rows={4}
              className="mt-0.5 w-[600px] resize-none rounded bg-[#2E2E38] p-2 shadow-sm sm:text-sm text-white border border-gray-600" />              
        </div>
      </main>
      <footer className="w-full fixed bottom-0 row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div className="p-5 font-bold text-[12px]">Patagonian Terms and the Patagonian Privacy Policy apply. Patagonian assistant can make mistakes, so double-check it.</div>
      </footer>
    </div>
  );
}
