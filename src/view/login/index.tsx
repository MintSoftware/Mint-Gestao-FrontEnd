import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import Api from "@/infra/api"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { handleSaveUserLogged } = useAuth();

  const { toast } = useToast();

  const logar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto = {
      email,
      senha
    }

    try {
      const { data } = await Api.post("auth/login", dto);
      if (data) {
        toast({
          variant: "default",
          description: "Login realizado com sucesso!",
        })
      }

      await handleSaveUserLogged(data);

    } catch (error: any) {
      if (error.response) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error.response.data,
          action: <ToastAction altText="Tentar Novamente" onClick={() => logar(e)}>Tentar novamente</ToastAction>,
        })

      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Erro ao realizar login!",
          action: <ToastAction altText="Tentar Novamente">Tentar novamente</ToastAction>,
        })
      }
    }
  }

  return (
    <form onSubmit={logar}>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Preencha seu e-mail e senha para entrar no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="senha" required type="password" onChange={(e) => setSenha(e.target.value)} />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
            <div className="flex justify-center">
              <Link to="/recuperar">Esqueci minha senha</Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

