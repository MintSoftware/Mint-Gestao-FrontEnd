import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function ConfigGeral() {
    return (
        <div className="flex flex-col gap-6 items-center">
            <Card className="flex flex-col w-[50%]">
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
            <Card className="flex flex-col w-[50%]">
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
    )
}