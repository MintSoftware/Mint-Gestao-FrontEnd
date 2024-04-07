import MenuSlider from "@/components/menuSlider"
import TopBar from "@/components/topBar"
import { ReactNode } from "react"

interface props {
    children?: ReactNode
}

export function Layout({ children }: props) {
    return (
        <div className="flex w-screen h-screen">
            <div className="flex flex-col bg-muted/40">
                <MenuSlider />
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