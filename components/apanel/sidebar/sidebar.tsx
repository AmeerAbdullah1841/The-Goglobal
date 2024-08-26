"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { DashboardOutlined, GlobalOutlined, ShopOutlined, UserOutlined, FileTextOutlined, FileDoneOutlined, UsergroupAddOutlined, MessageOutlined, NotificationOutlined, DatabaseOutlined, LockOutlined } from "@ant-design/icons"
import { MailOutlined } from "@ant-design/icons"
import { PhoneOutlined } from "@ant-design/icons"
import { ArrowDownOutlined } from "@ant-design/icons"
import { StarOutlined } from "@ant-design/icons"
import { LogoutOutlined } from "@ant-design/icons"
import { VideoCameraOutlined } from "@ant-design/icons"

interface route {
    name: string,
    path: string,
    icon?: any
}

interface dropdownRoute {
    name: string,
    icon?: any,
    secondaryIcon?: any,
    subRoutes: route[]
}

export default function Sidebar() {
    const [selected, setSelected] = useState("Dashboard")
    const [name, setName] = useState<string>("")

    const routes: route[] = [
        { name: "Dashboard", path: "/apanel/dashboard", icon: <DashboardOutlined /> },
        { name: "Countries", path: "/apanel/countries", icon: <GlobalOutlined /> },
        { name: "Cities", path: "/apanel/cities", icon: <GlobalOutlined /> },
        { name: "Package Categories", path: "/apanel/categories", icon: <ShopOutlined /> },
        { name: "Packages", path: "/apanel/packages", icon: <ShopOutlined /> },
        { name: "Customers", path: "/apanel/customers", icon: <UserOutlined /> },
        { name: "Visas", path: "/apanel/visas", icon: <FileTextOutlined /> },
        { name: "Orders", path: "/apanel/orders", icon: <FileTextOutlined /> },
        { name: "Blogs", path: "/apanel/blogs", icon: <FileTextOutlined /> },
        { name: "Videos", path: "/apanel/videos", icon: <VideoCameraOutlined /> },
        { name: "Testimonials", path: "/apanel/testimonials", icon: <StarOutlined /> },
        { name: "Users", path: "/apanel/users", icon: <UsergroupAddOutlined /> },
        { name: "SMS Templates", path: "/apanel/smstemplates", icon: <FileDoneOutlined /> },
        { name: "Announcements", path: "/apanel/announcements", icon: <NotificationOutlined /> },
        { name: "Newsletter", path: "/apanel/newsletter", icon: <MessageOutlined /> },
        { name: "Backup", path: "/apanel/backup", icon: <DatabaseOutlined /> },
        { name: "Access Levels", path: "/apanel/accesslevels", icon: <LockOutlined /> }
    ]

    const dropdownRoutes: dropdownRoute[] = [
        {
            name: "Email Campaigns", icon: <MailOutlined />, subRoutes: [
                { name: "List", path: "/apanel/emailcampaigns/list", icon: <MailOutlined /> },
                { name: "Campaigns", path: "/apanel/emailcampaigns/campaigns", icon: <MailOutlined /> }
            ], secondaryIcon: <ArrowDownOutlined />
        },
        {
            name: "SMS Campaigns", icon: <PhoneOutlined />, subRoutes: [
                { name: "List", path: "/apanel/smscampaigns/list", icon: <PhoneOutlined /> },
                { name: "Campaigns", path: "/apanel/smscampaigns/campaigns", icon: <PhoneOutlined /> }
            ], secondaryIcon: <ArrowDownOutlined />
        },
    ]


    useEffect(() => {

        const user: any
            = localStorage.getItem("user")
        if (!user) {
            window.location.href = "/apanel"
        }
        const data = JSON.parse(user)
        setName(data.name)
        const path: string = window.location.pathname
        setSelected(path.split("/apanel/")[1])
    }
        , [])
    const [openRoutes, setOpenRoutes] = useState<string[]>([]);

    const handleRouteClick = (routeName: string) => {
        if (openRoutes.includes(routeName)) {
            setOpenRoutes(openRoutes.filter((route) => route !== routeName));
        } else {
            setOpenRoutes([...openRoutes, routeName]);
        }
    };

    return (
        <div className="w-[300px] bg-gray-800 text-white h-screen overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-center h-16 bg-gray-900 flex-col">
                <h1 className="text-2xl font-bold">GoGlobal</h1>
                <span className="text-xs">Welcome, {name} <span className="cursor-pointer" onClick={() => {
                    localStorage.removeItem("user")
                    window.location.href = "/apanel"
                }}><LogoutOutlined /></span></span>
            </div>
            <div className="p-4">
                <ul>
                    {routes.map((route: route, index: number) => (
                        <Link href={route.path} key={index} onClick={() => setSelected(route.name.toLowerCase())}>
                            <li className={`flex items-center p-3 ${selected == route.name.toLowerCase().replace(" ", "") ? "bg-gray-700" : ""} cursor-pointer`}>
                                {route.icon}
                                <span className="ml-2">{route.name}</span>
                            </li>
                        </Link>
                    ))}
                    {dropdownRoutes.map((route: dropdownRoute, index: number) => (
                        <div key={index}>
                            <li
                                className={`flex items-center p-3 ${selected == route.name.toLowerCase().replace(" ", "") ? "bg-gray-700" : ""} cursor-pointer`}
                                onClick={() => handleRouteClick(route.name)}
                            >
                                {route.icon}
                                <span className="ml-2">{route.name}</span>
                                <span className="ml-auto">{route.secondaryIcon}</span>
                            </li>
                            {openRoutes.includes(route.name) && (
                                <ul className={`ml-4`}>
                                    {route.subRoutes.map((subRoute: route, index: number) => (
                                        <Link href={subRoute.path} key={index} onClick={() => setSelected(subRoute.name.toLowerCase())}>
                                            <li className={`flex items-center p-3 ${selected == subRoute.name.toLowerCase().replace(" ", "") ? "bg-gray-700" : ""} cursor-pointer`}>
                                                {subRoute.icon}
                                                <span className="ml-2">{subRoute.name}</span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}