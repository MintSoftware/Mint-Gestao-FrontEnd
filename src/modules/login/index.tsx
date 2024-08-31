import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Api from "@/infra/api"
import { useAuth } from "@/infra/hooks/useAuth"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("#03bb85")
  const [secondaryColor, setSecondaryColor] = useState("#818cf8")
  const [borderRadius, setBorderRadius] = useState(8)

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', primaryColor)
    document.documentElement.style.setProperty('--secondary', secondaryColor)
    document.documentElement.style.setProperty('--radius', `${borderRadius}px`)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [primaryColor, secondaryColor, borderRadius, isDarkMode])

  const { salvarUsuarioLogado } = useAuth();

  async function buscarTema(id: string) {
    const { data } = await Api.get(`configuracao/tema/buscarporusuario/${id}`);
    if (!data) return;
    setIsDarkMode(data.isDarkMode)
    setPrimaryColor(data.primaryColor)
    setSecondaryColor(data.secondaryColor)
    setBorderRadius(data.borderRadius)

    localStorage.setItem("themeConfig", JSON.stringify(data));
  }


  const logar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto = {
      email,
      senha
    }

    toast.promise(Api.post("autenticacao/entrar", dto, {}).then(async (response) => {
      toast.success("Login realizado com sucesso!");
      await salvarUsuarioLogado(response.data);
      if (response.data.usuario) {
        await buscarTema(response.data.usuario.id);
      }
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