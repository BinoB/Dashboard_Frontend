import { AiFillProduct  } from "react-icons/ai";
import { MdOutlineDashboardCustomize } from "react-icons/md";

import { AiOutlineCopy  } from "react-icons/ai";
import { MdPostAdd } from "react-icons/md";

const menu = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboardCustomize />,
    path: "/",
  },
  {
    title: "Orders",
    icon: <AiOutlineCopy />,
    path: "/order",
  },
  {
    title: "Create Order",
    icon: <MdPostAdd  />,
    path: "/createorder",
  },

  {
    title: "Product",
    icon: <AiFillProduct  />,
    path: "/product",
  },
];

export default menu;