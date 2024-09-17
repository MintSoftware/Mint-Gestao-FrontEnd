import { ReactNode } from "react"
import MenuLateral from "./components/MenuLateral"
import MenuSuperior from "./components/MenuSuperior"

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
                <MenuSuperior />
                <main className="flex justify-center items-center max-w-full">
                    {children}
                </main>
            </div>
        </div>
    )
}