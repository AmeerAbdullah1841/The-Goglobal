"use client";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react";
import { cn } from "@/lib/utils";


interface Route {
    name: string,
    path: string,
}

interface User {
    id: string,
    name: string
    type: string
}


export default function APanelAccessLevelsPage() {
    
    const routes : Route[] = [
        {name: "Dashboard", path: "/apanel/dashboard"},
        {name: "Countries", path: "/apanel/countries"},
        {name: "Cities", path: "/apanel/cities"},
        {name: "Categories", path: "/apanel/categories"},
        {name: "Packages", path: "/apanel/packages"},
        {name: "Customers", path: "/apanel/customers"},
        {name: "Orders", path: "/apanel/orders"},
        {name: "Blogs", path: "/apanel/blogs"},
        {name: "Testimonials", path: "/apanel/testimonials"},
        {name: "Users", path: "/apanel/users"},
        {name: "SMS Templates", path: "/apanel/smstemplates"},
        {name: "Announcements", path: "/apanel/announcements"},
        {name: "Newsletter", path: "/apanel/newsletter"},
        {name: "Backup", path: "/apanel/backup"},
        {name: "Access Levels", path: "/apanel/accesslevels"},
        {name: "Email List", path: "/apanel/emailcampaigns/list",},
        {name: "Email Campaigns", path: "/apanel/emailcampaigns/campaigns",},
        {name: "SMS List", path: "/apanel/smscampaigns/list"},
        {name: "SMS Campaigns", path: "/apanel/smscampaigns/campaigns"}
    ]
    
    const users: User[] = [
        {
            id: "1",
            name: "John Doe",
            type: "Admin",
        },
        {
            id: "2",
            name: "Jane Doe",
            type: "User",
        },
        {
            id: "3",
            name: "John Doe",
            type: "User",
        },
        {
            id: "4",
            name: "Jane Doe",
            type: "User",
        },
    ];

    return (
        <section className="flex items-center justify-center flex-col w-full p-6 h-full overflow-auto no-scrollbar">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Access Levels</h1>
                </div>
                </div>
                <div className="w-full">
                    <Select value="Select User">
                        <SelectTrigger>
                            <SelectValue>Select User</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {users.filter((user) => user.type === "User").map((user) => (
                                    <SelectItem key={user.id} value={user.id}>
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full mt-4 flex items-center flex-wrap">
                {routes.map((route) => (
                        <div key={route.path} className="flex items-center justify-between p-4 border-b border-gray-200 w-1/2">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>{route.name}</span>
                            </div>
                        </div>
                    ))}
                    </div>
                
        </section>  
    );
}
