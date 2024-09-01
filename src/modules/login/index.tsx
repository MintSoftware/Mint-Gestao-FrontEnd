import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Api from "@/infra/api"
import useTema from "@/infra/hooks/useTema"
import { useAutenticacaoContext } from "@/infra/providers/AutenticacaoProvider"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { salvarUsuario, salvarToken, salvarRefreshToken } = useAutenticacaoContext();
  const { salvarTema, alterarTema} = useTema();


  const logar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto = {
      email,
      senha
    }

    toast.promise(Api.post("autenticacao/entrar", dto, {}).then(async (response) => {
      salvarUsuario(response.data.usuario);
      salvarToken(response.data.token);
      salvarRefreshToken(response.data.refreshToken);
      if (response.data.tema) {
        salvarTema(response.data.tema);
        alterarTema();
      }
      toast.success("Login realizado com sucesso!");
    }).catch(() => {
      toast.error("Erro ao entrar, verifique suas credenciais!");
    }), {
      loading: "Entrando...",
    });
  }

  return (
    <form onSubmit={logar} className="flex w-full h-[100vh] justify-center items-center">
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