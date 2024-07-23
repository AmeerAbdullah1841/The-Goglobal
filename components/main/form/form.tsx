"use client";
import { Plane, BookOpen } from "lucide-react";
import { useState } from "react";
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";

export default function Form() {
    const [selected, setSelected] = useState("trip");
    return (
        <div className="absolute top-[65%] left-[50%] w-[80%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
            <div className="absolute top-0 z-10 bg-white shadow-md flex justify-center items-center rounded-lg">
                <div className="px-6 py-2 flex flex-col justify-center items-center cursor-pointer space-y-1"
                    style={
                        selected === "trip"
                            ? { borderBottom: "2px solid #E85B5D" }
                            : { borderBottom: "2px solid transparent" }
                    }
                    onClick={() => setSelected("trip")}>
                    <Plane size={30} color={selected === "trip" ? "#E85B5D" : "#000"} />
                    <span className="text-sm" style={{ color: selected === "trip" ? "#E85B5D" : "#000" }}>Trips</span>
                </div>
                <div className="px-6 py-2 flex flex-col justify-center items-center cursor-pointer space-y-1"
                    style={
                        selected === "visa"
                            ? { borderBottom: "2px solid #E85B5D" }
                            : { borderBottom: "2px solid transparent" }
                    }
                    onClick={() => setSelected("visa")}>
                    <BookOpen size={30} color={selected === "visa" ? "#E85B5D" : "#000"} />
                    <span className="text-sm" style={{ color: selected === "visa" ? "#E85B5D" : "#000" }}>Visas</span>
                </div>
            </div>
            <div className="absolute top-[40px] bg-white shadow-md pt-12 px-4 pb-4 rounded-lg w-full">
                <form className="justify-center items-center space-x-4 w-full" style={{ display: selected === "trip" ? "flex" : "none" }}>
                    <div className="w-[20%]">
                        <Select value="Select Country">
                            <SelectTrigger>
                                <SelectValue>
                                    Select Country
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                                    <SelectItem value="Turkey">Turkey</SelectItem>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="UK">UK</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="New Zealand">New Zealand</SelectItem>
                                    <SelectItem value="Malaysia">Malaysia</SelectItem>
                                    <SelectItem value="Thailand">Thailand</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[30%]">
                        <Select value="Select Package">
                            <SelectTrigger>
                                <SelectValue>
                                    Select Package
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Economy">Economy</SelectItem>
                                    <SelectItem value="Business">Business</SelectItem>
                                    <SelectItem value="First Class">First Class</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Input placeholder="Select Date" type="date" className="w-[20%]" />
                    <Input placeholder="Select People" type="text" className="w-[20%]" />
                    <button className="bg-[#E85B5D] text-white p-2 rounded-lg">
                        <Search size={18} />
                    </button>
                </form>
                <form className="justify-center items-center space-x-4 w-full" style={{ display: selected === "visa" ? "flex" : "none" }}>
                    <div className="w-[20%]">
                        <Select value="Select Country">
                            <SelectTrigger>
                                <SelectValue>
                                    Select Country
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                                    <SelectItem value="Turkey">Turkey</SelectItem>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="UK">UK</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="New Zealand">New Zealand</SelectItem>
                                    <SelectItem value="Malaysia">Malaysia</SelectItem>
                                    <SelectItem value="Thailand">Thailand</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[30%]">
                        <Select value="Select Visa Type">
                            <SelectTrigger>
                                <SelectValue>
                                    Select Visa Type
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Tourist">Tourist</SelectItem>
                                    <SelectItem value="Business">Business</SelectItem>
                                    <SelectItem value="Student">Student</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[20%]">
                        <Select value="Select Occupation">
                            <SelectTrigger>
                                <SelectValue>
                                    Select Occupation
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Employed">Employed</SelectItem>
                                    <SelectItem value="Self Employed">Self Employed</SelectItem>
                                    <SelectItem value="Student">Student</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Input placeholder="Select People" type="text" className="w-[20%]" />
                    <button className="bg-[#E85B5D] text-white p-2 rounded-lg">
                        <Search size={18} />
                    </button>
                </form>
            </div>

        </div>
    );
}