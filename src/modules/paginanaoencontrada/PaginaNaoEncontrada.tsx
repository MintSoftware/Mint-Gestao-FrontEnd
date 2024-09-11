import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PaginaNaoEncontrada() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="max-w-md text-center space-y-4">
        <img
          alt="Perdido no espaço"
          className="mx-auto"
          height="500"
          src="/404.png"
          style={{
            aspectRatio: "500/500",
            objectFit: "cover",
          }}
          width="500"
        />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Ops! Você está perdido no espaço.
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Parece que você se afastou do caminho certo. Não se preocupe, nós o ajudaremos a encontrar o caminho de volta
          para casa.
        </p>
        <Link to={"/"}>
            <Button className="p-3 m-3">Leve-me de volta para casa</Button>
        </Link>
      </div>
    </div>
  )
}