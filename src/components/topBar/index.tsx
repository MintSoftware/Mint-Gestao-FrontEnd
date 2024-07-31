import { useAuth } from "@/hooks/useAuth";
import { HomeIcon, LineChartIcon, Package2Icon, PackageIcon, PanelLeftIcon, SearchIcon, ShoppingCartIcon, Users2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { ComboBoxFilial } from "../filial";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const TopBar = () => {
    const { limparUsuarioLogado } = useAuth();

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
                <div className="relative flex md:grow-0">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        placeholder="Search..."
                        type="search"
                    />
                </div>
                <div className="absolute left-[46vw] ">
                    <ComboBoxFilial />
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
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sair</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deseja realmente sair?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => limparUsuarioLogado()}>
                            <Link to="/">
                                Sair
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </header>
        </AlertDialog>
    );
};

export default TopBar;