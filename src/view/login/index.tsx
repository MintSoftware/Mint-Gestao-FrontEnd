import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import Api from "@/infra/api"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const { handleSaveUserLogged } = useAuth();

  const logar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto = {
      email,
      senha
    }

    const loading = toast.loading("Realizando login...");

    try {
      const { data } = await Api.post("auth/login", dto);
      if (data) {
        toast.update(loading, {
          render: "Login realizado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }

      await handleSaveUserLogged(data);

    } catch (error: any) {
      if (error.response) {
        toast.update(loading, {
          render: `${error.response.data}`,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(loading, {
          render: "Erro ao realizar login!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
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

