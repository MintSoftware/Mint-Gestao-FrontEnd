
import { MenuItem } from "@/types/MenuItems";
import { Calendar, CurrencyCircleDollar, House, MapPin, Users } from "@phosphor-icons/react";

const menuItemsData:MenuItem[] = [{
    id: 1,
    icon: House,
    link: "/",
    texto: "Home"
},{
    id: 2,
    icon: Users,
    link: "/clientes",
    texto: "Clientes"
},{
    id: 3,
    icon: Calendar,
    link: "/calendario",
    texto: "Calendário"
},{
    id: 4,
    icon: MapPin,
    link: "/locais",
    texto: "Locais"
},{
    id: 5,
    icon: CurrencyCircleDollar,
    link: "/financeiro",
    texto: "Financeiro"
}];

export default menuItemsData;