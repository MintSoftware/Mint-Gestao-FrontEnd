import { MenuItem } from "@/types/menuItems";
import { Calendar, CurrencyCircleDollar, House, MapPin, User } from "@phosphor-icons/react";

const menuItemsData:MenuItem[] = [{
    id: 1,
    icon: House,
    link: "/"
},{
    id: 2,
    icon: User,
    link: "/clientes"
},{
    id: 3,
    icon: Calendar,
    link: "/calendario"
},{
    id: 4,
    icon: MapPin,
    link: "/locais"
},{
    id: 5,
    icon: CurrencyCircleDollar,
    link: "/financeiro"
}];

export default menuItemsData;