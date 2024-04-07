import MenuLateral from "@/components/menulateral"
import TopBar from "@/components/topBar"
import { ReactNode } from "react"

interface props {
    children?: ReactNode
}

export function Layout({ children }: props) {
    return (
        <div className="flex w-screen h-screen bg-muted/40">
            <div className="flex flex-col ">
                <MenuLateral />
            </div>
            <div className="flex flex-col w-full">
                <TopBar />
                <main className="flex justify-center items-center">
                    {children}
                </main>
            </div>
        </div>
    )
}