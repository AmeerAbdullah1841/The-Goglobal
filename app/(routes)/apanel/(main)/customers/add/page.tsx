"use client";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function APanelCustomersAddPage() {
  return (
    <div className="flex flex-col space-y-5 p-4 overflow-y-auto h-full no-scrollbar">
        <h1 className="text-2xl font-bold">Add customer</h1>
        <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
            <legend className="text-lg font-bold">Personal</legend>
            <div className="w-[32.5%]">
            <Select>
                <SelectTrigger>
                    <SelectValue>Mr.</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Mr.">Mr.</SelectItem>
                        <SelectItem value="Mrs.">Mrs.</SelectItem>
                        <SelectItem value="Ms.">Ms.</SelectItem>
                        <SelectItem value="Miss">Miss</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            </div>
            <Input placeholder="First name" className="w-[32.5%]" />
            <Input placeholder="Last name" className="w-[32.5%]" />
            <Input type="date" placeholder="Date of birth" className="w-[19%]" />
            <div className="w-[19%]">
                <Select>
                    <SelectTrigger>
                        <SelectValue>Male</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-[19%]">
                <Select>
                    <SelectTrigger>
                        <SelectValue>Single</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-[19%]">
                <Select>
                    <SelectTrigger>
                        <SelectValue>Islamabad</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Islamabad">Islamabad</SelectItem>
                            <SelectItem value="Rawalpindi">Rawalpindi</SelectItem>
                            <SelectItem value="Lahore">Lahore</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Input type="date" placeholder="Anniversary date" className="w-[19%]" />
            <Input placeholder="Company" className="w-[32.5%]" />
            <Input placeholder="Designation" className="w-[32.5%]" />
            <Input type="file" placeholder="Profile picture" className="w-[32.5%]" />
        </fieldset>
        <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
            <legend className="text-lg font-bold">Contact</legend>
            <Input placeholder="Address"/>
            <Input type="tel" placeholder="Phone number" className="w-[49%]" />
            <Input type="email" placeholder="Email" className="w-[49%]" />
            <Input type="tel" placeholder="Emergency contact number" className="w-[49%]" />
            <Input placeholder="Link" className="w-[49%]" />
            </fieldset>
            <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
            <legend className="text-lg font-bold">Travel</legend>
            <Input placeholder="Passport number" className="w-[24%]" />
            <Input type="date" placeholder="Passport issue date" className="w-[24%]" />
            <Input type="date" placeholder="Passport expiry date" className="w-[24%]" />
            <div className="w-[24%]">
                <Select>
                    <SelectTrigger>
                        <SelectValue>Pakistani</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="pakistani">Pakistani</SelectItem>
                            <SelectItem value="indian">Indian</SelectItem>
                            <SelectItem value="american">American</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                <Input type="number" placeholder="CNIC number" className="w-[32.5%]" />
                <Input type="date" placeholder="CNIC expiry date" className="w-[32.5%]" />
                <Input type="number" placeholder="Number of Flights" className="w-[32.5%]" />
                <Input placeholder="Airline preference" className="w-[32.5%]" />
                <Input placeholder="Deitry requirements" className="w-[32.5%]" />
                <Input placeholder="Seat preference" className="w-[32.5%]" />
                </fieldset>
                <div className="flex items-center">
                    <Input type="checkbox" className="w-[20px] h-[20px]"/>
                    <Label className="ml-2">I authorize you to sending SMS and Email from this website</Label>
                    </div>
                    <div className="flex items-center">
                        <Input type="checkbox" className="w-[20px] h-[20px]"/>
                        <Label className="ml-2">Reminder for date of birth and passport expiry (by SMS and Email)</Label>
                        </div>
                        <Button className="mt-4 w-[200px] bg-gray-900 hover:bg-gray-800">Add customer</Button>
    </div>
  );
}