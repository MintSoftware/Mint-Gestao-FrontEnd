import { useAuth } from "@/infra/hooks/useAuth";
import { BellIcon, HomeIcon, LineChartIcon, Package2Icon, PackageIcon, PanelLeftIcon, ShoppingCartIcon, Users2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const TopBar = () => {
    const { limparUsuarioLogado } = useAuth();
    const navigate = useNavigate();

    const recuperarEmpresa = () => {
        const usuarioLogado = localStorage.getItem('@usuario');
        if (usuarioLogado) {
            const usuario = JSON.parse(usuarioLogado);
            return usuario.empresa.nomefantasia;
        }
    }

    const sair = () => {
        limparUsuarioLogado();
        toast.success("Saiu com sucesso!");
        navigate('/');
    }

    return (
        <AlertDialog >
            <header className="sticky top-0 z-30 flex h-14 w-[100%] justify-between items-center gap-4 border-b bg-background px-4 pt-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="sm:hidden" size="icon" variant="outline">
                            <PanelLeftIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-xs" side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                to="#"
                            >
                                <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" to="#">
                                <HomeIcon className="h-5 w-5" />
                                Dashboard
                            </Link>
                            <Link className="flex items-center gap-4 px-2.5 text-foreground" to="#">
                                <ShoppingCartIcon className="h-5 w-5" />
                                Orders
                            </Link>
                            <Link className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" to="#">
                                <PackageIcon className="h-5 w-5" />
                                Products
                            </Link>
                            <Link className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" to="#">
                                <Users2Icon className="h-5 w-5" />
                                Customers
                            </Link>
                            <Link className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" to="#">
                                <LineChartIcon className="h-5 w-5" />
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="absolute w-[95vw] flex justify-center z-[-1]">
                    <Label className="text-lg">{recuperarEmpresa()}</Label>
                </div>
                <div className="flex w-full justify-end">
                    <div className="relative flex h-9 w-9 justify-center items-center mr-3 cursor-pointer">
                        <BellIcon className="flex" />
                        <div className="bg-red-500 w-4 h-4 absolute items-center justify-center flex rounded-full left-5 bottom-4 text-black">
                            1
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="overflow-hidden rounded-full" size="icon" variant="outline">
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link to="/perfil">
                                    Minha conta
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to="/configuracoes">
                                    Configurações
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to="/ajuda">
                                    Ajuda
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <AlertDialogTrigger className="w-full text-left">
                                    Sair
                                </AlertDialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sair</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deseja realmente sair?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => sair()}>
                                Sair
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </header>
        </AlertDialog>
    );
};

export default TopBar;