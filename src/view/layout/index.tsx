import MenuSlider from "@/components/menuSlider"
import TopBar from "@/components/topBar"
import { ReactNode } from "react"

interface props {
    children?: ReactNode
}

export function Layout({ children }: props) {
    return (
        <div>
            <div className="w-screen h-screen flex" >
                <MenuSlider />
                <div className="w-screen max-h-screen h-screen flex flex-col items-center" >
                    <TopBar />
                    {children}
                </div>
            </div>
        </div >
    )
}