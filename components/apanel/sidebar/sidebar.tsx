"use client"
import {useState, useEffect} from "react"
import Link from "next/link"
import { DashboardOutlined, GlobalOutlined, ShopOutlined, UserOutlined, FileTextOutlined, FileDoneOutlined, UsergroupAddOutlined, MessageOutlined, NotificationOutlined, DatabaseOutlined, LockOutlined } from "@ant-design/icons"

interface route {
    name: string,
    path: string,
    icon?: any
}

export default function Sidebar(){
    const [selected, setSelected] = useState("Dashboard")

    const routes : route[] = [
        {name: "Dashboard", path: "/apanel/dashboard", icon: <DashboardOutlined />},
        {name: "Countries", path: "/apanel/countries", icon: <GlobalOutlined />},
        {name: "Cities", path: "/apanel/cities", icon: <GlobalOutlined />},
        {name: "Categories", path: "/apanel/categories", icon: <ShopOutlined />},
        {name: "Packages", path: "/apanel/packages", icon: <ShopOutlined />},
        {name: "Customers", path: "/apanel/customers", icon: <UserOutlined />},
        {name: "Orders", path: "/apanel/orders", icon: <FileTextOutlined />},
        {name: "Users", path: "/apanel/users", icon: <UsergroupAddOutlined />},
        {name: "SMS Templates", path: "/apanel/smstemplates", icon: <FileDoneOutlined />},
        {name: "Announcements", path: "/apanel/announcements", icon: <NotificationOutlined />},
        {name: "Newsletter", path: "/apanel/newsletter", icon: <MessageOutlined />},
        {name: "Backup", path: "/apanel/backup", icon: <DatabaseOutlined />},
        {name: "Access Levels", path: "/apanel/accesslevels", icon: <LockOutlined />}
    ]    

    useEffect(() => {
        const path: string = window.location.pathname
        setSelected(path.split("/apanel/")[1])
    }
    , [])
    return (
        <div className="w-[300px] bg-gray-800 text-white h-screen overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <h1 className="text-2xl font-bold">GoGlobal</h1>
            </div>
            <div className="p-4">
                <ul>
                    {routes.map((route: route, index: number) => (
                        <Link href={route
                            .path} key={index} onClick={() => setSelected(route.name.toLowerCase())}>
                            <li className={`flex items-center p-3 ${selected == route.name.toLowerCase() ? "bg-gray-700" : ""}`}>
                                {route.icon}
                                <span className="ml-2">{route.name}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}