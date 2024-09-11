import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useLoginController } from "./LoginController";

export default function Login() {

  const { setEmail, setSenha, logar } = useLoginController();

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 overflow-hidden">
      <div className="hidden bg-muted lg:block">
        <img
          src="/login.jpg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <img src="/logomint.png" alt="Mint Software" className="w-20 mx-auto" />
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Bem vindo de volta! Faça login para continuar.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" >
                  Senha
                </Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input id="password" type="password" required onChange={(e) => setSenha(e.target.value)} />
            </div>
            <Button onClick={(e: any) => logar(e)} className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}