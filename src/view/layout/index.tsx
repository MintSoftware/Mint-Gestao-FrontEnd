import MenuSlider from "@/components/menuSlider"
import TopBar from "@/components/topBar"
import { ReactNode } from "react"

interface props {
    children?: ReactNode
}

export function Layout({ children }: props) {
    return (
        <div>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <MenuSlider />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <TopBar />
                    <main className="flex w-[97vw] p-3">
                        {children}
                    </main>
                </div>
            </div>
        </div >
    )
}