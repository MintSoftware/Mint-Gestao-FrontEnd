import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export default function RecuperarSenha() {

    const { toast } = useToast()

    const NotificarErro = () => {
        debugger
        toast({
            variant: "destructive",
            title: "Erro",
            description: "Ocorreu um erro ao enviar o e-mail",
            action: <ToastAction altText="Tentar Novamente">Tentar novamente</ToastAction>,
        })
    }

    const enviarEmail = () => {
        //adicionar a lógica de envio de email
        NotificarErro()
    }

    return (
        <Card className="mx-auto max-w-sm w-[500px]">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Esqueceu a senha</CardTitle>
                <CardDescription>Digite seu e-mail para redefinir sua senha</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" placeholder="email@exemplo.com" required type="email" />
                    </div>
                    <div className="flex gap-2">
                        <Link to="/">
                            <Button variant="outline" className="w-full">
                                Voltar
                            </Button>
                        </Link>
                        <Button className="w-full" onClick={() => enviarEmail()}>
                            Enviar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

