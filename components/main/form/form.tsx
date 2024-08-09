"use client";
import { Plane, BookOpen } from "lucide-react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select from 'react-select'

export default function Form() {
    const [selected, setSelected] = useState("trip");

    const countryOptions = [
        { label: 'Pakistan', value: 'Pakistan' },
        { label: 'Turkey', value: 'Turkey' },
        { label: 'USA', value: 'USA' },
        { label: 'UK', value: 'UK' },
        { label: 'Canada', value: 'Canada' },
        { label: 'Australia', value: 'Australia' },
        { label: 'New Zealand', value: 'New Zealand' },
        { label: 'Malaysia', value: 'Malaysia' },
        { label: 'Thailand', value: 'Thailand' },
    ];

    const visaTypeOptions = [
        { label: 'Tourist', value: 'Tourist' },
        { label: 'Business', value: 'Business' },
        { label: 'Student', value: 'Student' },
    ];

    const occupationOptions = [
        { label: 'Employed', value: 'Employed' },
        { label: 'Self Employed', value: 'Self Employed' },
        { label: 'Student', value: 'Student' },
    ];

    const packageOptions = [
        { label: 'Economy', value: 'Economy' },
        { label: 'Business', value: 'Business' },
        { label: 'First Class', value: 'First Class' },
    ];
    return (
        <div className="absolute top-[65%] left-[50%] w-[80%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
            <div className="absolute top-0 z-10 bg-white shadow-md flex justify-center items-center rounded-lg">
                <div className="px-6 py-2 flex flex-col justify-center items-center cursor-pointer space-y-1"
                    style={
                        selected === "trip"
                            ? { borderBottom: "2px solid #B31F24" }
                            : { borderBottom: "2px solid transparent" }
                    }
                    onClick={() => setSelected("trip")}>
                    <Plane size={30} color={selected === "trip" ? "#B31F24" : "#000"} />
                    <span className="text-sm" style={{ color: selected === "trip" ? "#B31F24" : "#000" }}>Trips</span>
                </div>
                <div className="px-6 py-2 flex flex-col justify-center items-center cursor-pointer space-y-1"
                    style={
                        selected === "visa"
                            ? { borderBottom: "2px solid #B31F24" }
                            : { borderBottom: "2px solid transparent" }
                    }
                    onClick={() => setSelected("visa")}>
                    <BookOpen size={30} color={selected === "visa" ? "#B31F24" : "#000"} />
                    <span className="text-sm" style={{ color: selected === "visa" ? "#B31F24" : "#000" }}>Visas</span>
                </div>
            </div>
            <div className="absolute top-[40px] bg-white shadow-md pt-12 px-4 pb-4 rounded-lg w-full">
                <form className="justify-center items-center space-x-4 w-full" style={{ display: selected === "trip" ? "flex" : "none" }}>
                    <div className="w-[20%]">
                        <Select options={countryOptions} placeholder="Select Country" styles={{ control: (styles) => ({ ...styles, fontSize: "13.5px" }) }} />
                    </div>
                    <div className="w-[30%]">
                        <Select options={packageOptions} placeholder="Select Package" styles={{ control: (styles) => ({ ...styles, fontSize: "13.5px" }) }} />
                    </div>
                    <Input placeholder="Select Date" type="date" className="w-[20%]" />
                    <Input placeholder="Select People" type="text" className="w-[20%]" />
                    <button className="bg-[#B31F24] text-white p-2 rounded-lg">
                        <Search size={18} />
                    </button>
                </form>
                <form className="justify-center items-center space-x-4 w-full" style={{ display: selected === "visa" ? "flex" : "none" }}>
                    <div className="w-[20%]">
                        <Select options={countryOptions} placeholder="Select Country" styles={{ control: (styles) => ({ ...styles, fontSize: "13.5px" }) }} />
                    </div>
                    <div className="w-[30%]">
                        <Select options={visaTypeOptions} placeholder="Select Visa Type" styles={{ control: (styles) => ({ ...styles, fontSize: "13.5px" }) }} />
                    </div>
                    <div className="w-[20%]">
                        <Select options={occupationOptions} placeholder="Select Occupation" styles={{ control: (styles) => ({ ...styles, fontSize: "13.5px" }) }} />
                    </div>
                    <Input placeholder="Select People" type="text" className="w-[20%]" />
                    <button className="bg-[#B31F24] text-white p-2 rounded-lg">
                        <Search size={18} />
                    </button>
                </form>
            </div>

        </div>
    );
}