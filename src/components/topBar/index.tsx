import { PanelLeftIcon, Package2Icon, HomeIcon, ShoppingCartIcon, PackageIcon, Users2Icon, LineChartIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TopBar = () => {

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="#">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="#">Orders</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Recent Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    placeholder="Search..."
                    type="search"
                />
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
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default TopBar;


