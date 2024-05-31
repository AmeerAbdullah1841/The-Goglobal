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
    number: string,
    name: string
}

export default function APanelSMSCampaignsPage() {

    const [datetime, setDateTime] = useState<string>("Date");

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
            number: "+123456789",
            name: "John Doe"
        },
        {
            id: "2",
            number: "+123456789",
            name: "Jane Doe"
        },
        {
            id: "3",
            number: "+123456789",
            name: "Jane Smith"
        },
    ]
            

    return (
        <section className="flex items-center flex-col w-full p-6 overflow-auto no-scrollbar h-[calc(100%-4rem)]">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">SMS Campaign</h1>
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

                    <div className="flex items-center flex-wrap mt-4">
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
                                            <span>{user.name} ({user.number})</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Button variant="default">Add Campaign</Button>
                </div>
        </section>
    )
}
