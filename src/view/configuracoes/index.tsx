import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export default function Configuracoes() {
  return (
    <div key="1" className="flex h-full w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Configurações</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link className="font-semibold text-primary" to="#">Geral</Link>
            <Link to="#">Segurança</Link>
            <Link to="#">Integrações</Link>
            <Link to="#">Apoio</Link>
            <Link to="#">Organizações</Link>
            <Link to="#">Avançado</Link>
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nome da loja</CardTitle>
                <CardDescription>Usado para identificar sua loja no marketplace.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Nome da loja" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Salvar</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Diretório de plugins</CardTitle>
                <CardDescription>
                  O diretório dentro do seu projeto, no qual seus plugins estão localizados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input defaultValue="/content/plugins" placeholder="Nome do projeto" />
                  <div className="flex items-center space-x-2">
                    <Checkbox defaultChecked id="include" />
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="include"
                    >
                      Permitir que os administradores alterem o diretório.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Salvar</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

