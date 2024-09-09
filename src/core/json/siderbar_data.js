import * as Icon from 'react-feather';
import { label } from 'yet-another-react-lightbox';


export const SidebarData = [
          
    {
        label: "Main",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Main",
        submenuItems: [
          {
            label: "Dashboard",
            icon: <Icon.Grid  />,
            submenu: false,
            showSubRoute: false,
            link:"/"
          },
          {
            label: "Purchase Dashboard",
            icon: <Icon.Grid  />,
            submenu: false,
            showSubRoute: false,
            link:"/PurchaseDashboard"
          },
         
        
        ]
      },
      
      
      {
        label: "Reports",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Reports",
      
        submenuItems: [
          {label:"Target Amount", link:"/targetAmountvsAchivement", icon:<Icon.BarChart2 /> , showSubRoute:false, submenu:false},
          {label:"Quantity Target (Luxuria)", link:"/QTargetVsAchivement", icon:<Icon.BarChart2 /> , showSubRoute:false, submenu:false},
          {label: "Ledger Report", link:"/LedgerReport", icon: <Icon.BarChart2 />, showSubRoute:false, submenu:false},
          {label: "Qty Target Monthly (Luxuria)  ", link:"/QtyMonthlyReport", icon:<Icon.BarChart2/>, showSubRoute:false, submenu:false},
          {label: "Item Wise Monthly Sale",  link:"/ItemWiseMonthly", icon:<Icon.BarChart2/>, showSubRoute:false, submenu:false},
          {label: "POAndPendingPODetail", linke:"/POAndPendingPODetail", icon:<Icon.BarChart2/>, showSubRoute: false, submenu: false},
        ]
      },



]
