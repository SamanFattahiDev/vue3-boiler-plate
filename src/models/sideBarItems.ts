import {navItems} from "@/models/navigationItems";


export const sideBarItems: navItems[] = [
    {
        title: "سفارشات",
        link: "",
        icon: "ReportsIcon",
        hasChildren: true,
        hasAccess: ["admin","subscriber","marketer","staff"],
        children: [
            {
                title: "مدیریت سفارشات",
                link: "/admin/order/manage-orders",
                hasAccess: ["admin","staff"],
            },
            {
                title: "ثبت سفارش",
                link: "/order/create",
                hasAccess: ["subscriber","marketer","admin","staff"],
            },
            {
                title: "سفارشات من",
                link: "/order/my-orders",
                hasAccess: ["subscriber","marketer"],
            },
        ],
    },
    {
        title: "محصولات",
        link: "",
        icon: "BoxIcon",
        hasChildren: true,
        hasAccess: ["admin"],
        children: [
            {
                title: "مدیریت محصولات",
                link: "/admin/products/manage-products",
                hasAccess: ["admin"],
            },
            {
                title: "لیست قیمت",
                link: "/admin/products/manage-priceList",
                hasAccess: ["admin","staff"],
            },
            {
                title: "لیست دسته بندی محصولات",
                link: "/admin/products/manage-product-category",
                hasAccess: ["admin"],
            },
            {
                title: "لیست برند ها",
                link: "/admin/products/manage-brands",
                hasAccess: ["admin"],
            },
        ],
    },

    {
        title: "چت",
        link: "/chat/1",
        icon: "ChatIcon",
        hasChildren: false,
        hasAccess: ["subscriber","marketer"],
        children: [],
    },
    {
        title: "چت",
        link: "/chat",
        icon: "ChatIcon",
        hasChildren: false,
        hasAccess: ["admin","staff"],
        children: [],
    },
    {
        title: "اکانت",
        link: "",
        icon: "UserIcon",
        hasChildren: true,
        hasAccess: ["subscriber","marketer","staff"],
        children: [
            {
                title: "حساب کاربری",
                link: "/user/profile",
                hasAccess: ["subscriber","marketer","staff"],
            },
            // {
            //     title: "فروشگاه ها",
            //     link: "/user/my-shops",
            //     hasAccess: ["subscriber","marketer"],
            // },
        ],
    },

    {
        title: "کاربران",
        link: "",
        icon: "UsersIcon",
        hasChildren: true,
        hasAccess: ["admin","marketer","staff"],
        children: [
            {
                title: "لیست",
                link: "/dashboard/users/AllUsers",
                hasAccess: ["admin","staff"],
            },
            {
                title: "مشتریان من",
                link: "/dashboard/users/my-users",
                hasAccess: ["marketer"],
            },
        ],
    },

];
