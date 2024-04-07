import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ConfigSeguranca() {
    return (
        <div className="flex flex-col gap-6 items-center">
            <Card className="flex flex-col w-[50%]">
                <CardHeader>
                    <CardTitle>Opções de segurança</CardTitle>
                    <CardDescription>Configurações de segurança para a sua loja.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="enable" />
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="enable"
                            >
                                Habilitar autenticação de dois fatores.
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="enable" />
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="enable"
                            >
                                Exigir que todos os administradores usem SSO.
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="enable" />
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="enable"
                            >
                                Exigir que todos os administradores usem SSO.
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="enable" />
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="enable"
                            >
                                Exigir que todos os administradores usem SSO.
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