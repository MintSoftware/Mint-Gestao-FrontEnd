import MenuLateral from "@/components/menulateral"
import TopBar from "@/components/topBar"
import { ReactNode } from "react"

interface props {
    children?: ReactNode
}

export function Layout({ children }: props) {
    return (
        <div className="flex w-screen h-screen dark:bg-[#151518] bg-[#F5FFFA]">
            <div className="flex flex-col ">
                <MenuLateral />
            </div>
            <div className="flex flex-col w-full">
                <TopBar />
                <main className="flex justify-center items-center max-w-full">
                    {children}
                </main>
            </div>
        </div>
    )
}