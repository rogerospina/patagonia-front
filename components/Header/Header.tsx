import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const Header = () => {

    return (
        <header className={`font-(family-name:--font-roboto) bg-[#23232F]`}>
            <p className="text-[#DEDEE2] p-3 text-[15px]">Patagonian Guardrail Agent</p>
        </header>
    )
}