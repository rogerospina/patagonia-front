"use client";

import { Loading } from "@/components/Loading";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [questions, setQuestions] = useState<string[]>([])

  const sendPrompt = async (prompt: string) => {
    const question = prompt;
    setQuestions([...questions, question])
    setPrompt("");
    setLoading(true);
    console.log("Sending prompt:", prompt);
    // Call your API route here
    const data = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    }) as any;

    const dataJson = await data.json();
    console.log(dataJson);
    setLoading(false);
    setResponses([...responses, dataJson]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendPrompt(prompt);
    }
  }


  return (
    <div className="text-[#DEDEE2] font-sans grid p-8 pb-20 gap-16 sm:p-20 relative flex content-between">
      <main className="h-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="justify-center flex w-full flex-col items-center"><p>Welcome! I'm your Patagonian Guardrail</p><p> Assistant.How can I assist you today?</p></div>
        <div className="w-full flex justify-center flex items-center flex-col">
        { questions.length > 0 && questions.reverse().map((quest, index) => (
          <div key={index}>
            <div>
              <div  key={`ques_${quest}_${index}`} className="font-sans w-[600px] rounded-md p-4">{quest}</div>
            </div>
            
            {responses[index] ? <div key={`resp_${quest}_${index}`} className="font-sans w-[600px] rounded-md p-4 bg-[#23232f]">
              <div className="font-bold flex">Response <span className="w-2"></span> {responses[index].guardrail.status === "Blocked" ? <div className="text-[#cb8435]">Potential risk detected</div> :  <div className="text-[#5ba77a]">Sanitized</div>}</div>
             
              <div>{responses[index].guardrail.filtered_response}</div>
            </div> : <Loading />}
          </div>
        )) }
        </div>


       
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
              className="mt-0.5 w-[600] resize-none rounded bg-[#2E2E38] p-2 shadow-sm sm:text-sm dark:border-white-600 dark:bg-white-900"
              disabled={loading}
            />    
        </div>
      </main>
      <footer className="w-full row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div className="p-5 font-bold text-[12px]">Patagonian Terms and the Patagonian Privacy Policy apply. Patagonian assistant can make mistakes, so double-check it.</div>
      </footer>
    </div>
  );
}
