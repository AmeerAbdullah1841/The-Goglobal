"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


  interface Template {
    id: string,
    name: string
}

interface userGroup {
    id: string,
    email: string,
    name?: string
}

export default function APanelEmailCampaignsPage() {

    const [datetime, setDateTime] = useState<string>("Date");
    const [userGroup, setUserGroup] = useState<string>("All Users");

    const templates: Template[] = [
        {
            id: "1",
            name: "Template 1",
        },
        {
            id: "2",
            name: "Template 2",
        },
        {
            id: "3",
            name: "Template 3",
        },
    ]

    const allUsers: userGroup[] = [
        {
            id: "1",
            email: "abc@gmail.com",
            name: "John Doe"
        },
        {
            id: "2",
            email: "abc1@gmail.com",
            name: "Jane Doe"
        },
        {
            id: "3",
            email: "abc2@gmail.com",
            name: "John Smith"
        },
    ]

    const newsletter: userGroup[] = [
        {
            id: "1",
            email: "abc3@gmail.com"
        },
        {
            id: "2",
            email: "abc4@gmail.com"
        },
        {
            id: "3",
            email: "abc5@gmail.com"
        },
    ]
            

    return (
        <section className="flex items-center flex-col w-full p-6 overflow-auto no-scrollbar h-[calc(100%-4rem)]">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Email Campaign</h1>
                </div>
            </div>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center w-1/2 mx-1">
                            <Label className="mr-2 w-1/4">Date or Time</Label>
                            <Select value={datetime} onValueChange={(value) => setDateTime(value)}>
                                <SelectTrigger>
                                    <SelectValue>{datetime}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Date">Date</SelectItem>
                                        <SelectItem value="Time">Time</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center w-1/2 mx-1">
                            <Label className="mr-2 w-1/4">User Group</Label>
                            <Select value={userGroup} onValueChange={(value) => setUserGroup(value)}>
                                <SelectTrigger>
                                    <SelectValue>{userGroup}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="All Users">All Users</SelectItem>
                                        <SelectItem value="Newsletter Subscribers">Newsletter Subscribers</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        {datetime === "Date" && (
                            <div className="flex items-center w-1/2 mx-1">
                                <Label className="mr-2 w-1/4">Date</Label>
                                <Input type="datetime-local" />
                            </div>
                        )}
                        {datetime === "Time" && (
                            <div className="flex items-center w-1/2 mx-1">
                                <Label className="mr-2 w-1/4">Time</Label>
                                <Input type="time" />
                            </div>
                        )}
                        <div className="flex items-center w-1/2 mx-1">
                            <Label className="mr-2 w-1/4">Template</Label>
                            <Select value="Select Template">
                                <SelectTrigger>
                                    <SelectValue>Select Template</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {templates.map((template) => (
                                            <SelectItem key={template.id} value={template.id}>
                                                {template.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* <div className="w-full mt-4 flex items-center flex-wrap">
                {routes.map((route) => (
                        <div key={route.path} className="flex items-center justify-between p-4 border-b border-gray-200 w-1/2">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>{route.name}</span>
                            </div>
                        </div>
                    ))}
                    </div> */}

                    <div className="flex items-center flex-wrap mt-4">
                        {userGroup === "All Users" && (
                            <>
                                <div className={cn("flex items-center justify-between p-4 border-b border-gray-200 w-1/2")}>
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span>Select All Users</span>
                                    </div>
                                </div>
                                {allUsers.map((user) => (
                                    <div key={user.id} className={cn("flex items-center justify-between p-4 border-b border-gray-200 w-1/2")}>
                                        <div className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span>{user.name} ({user.email})</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {userGroup === "Newsletter Subscribers" && (
                            <>
                                <div className={cn("flex items-center justify-between p-4 border-b border-gray-200 w-1/2")}>
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span>Select All Newsletter Subscribers</span>
                                    </div>
                                </div>
                                {newsletter.map((user) => (
                                    <div key={user.id} className={cn("flex items-center justify-between p-4 border-b border-gray-200 w-1/2")}>
                                        <div className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                    <Button variant="default">Add Campaign</Button>
                </div>
                </div>
        </section>  
    );
}
