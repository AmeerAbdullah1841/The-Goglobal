"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";

interface Country {
    title: string;
}

interface City {
    title: string;
    description: string;
    banner: string;
    country: Country;
    rainfall: string;
    temperature: number;
    temperatureMonth: string;
    temperatureMonthEnd: string;
    temperatureEnd: number;
}

export default function APanelCitiesPage() {

    const rowsPerPage: number = 5;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const countries : Country[] = [
        {
            title: "United States",
        },
        {
            title: "United Kingdom",
        },
        {
            title: "Canada",
        },
        {
            title: "Australia",
        },
        {
            title: "Germany",
        },
        {
            title: "France",
        },
        {
            title: "Italy",
        },
        {
            title: "Spain",
        },
        {
            title: "Japan",
        },
        {
            title: "China",
        },
        {
            title: "India",
        },
        {
            title: "Brazil",
        },
        {
            title: "Mexico",
        },
        {
            title: "Russia",
        },
        {
            title: "South Africa",
        },
        {
            title: "Pakistan",
        },
    ];

    const cities : City[] = [
        {
            title: "New York",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[0],
            rainfall: "100mm",
            temperature: 30,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 35,
        },
        {
            title: "Los Angeles",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[0],
            rainfall: "50mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Chicago",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[0],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "London",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[1],
            rainfall: "150mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Manchester",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[1],
            rainfall: "100mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Birmingham",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[1],
            rainfall: "125mm",
            temperature: 22,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 27,
        },
        {
            title: "Toronto",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[2],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Vancouver",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[2],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Montreal",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[2],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Sydney",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[3],
            rainfall: "75mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Melbourne",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[3],
            rainfall: "100mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Brisbane",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[3],
            rainfall: "50mm",
            temperature: 30,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 35,
        },
        {
            title: "Berlin",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[4],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Munich",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[4],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Hamburg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[4],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Paris",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[5],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Marseille",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[5],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Lyon",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[5],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Rome",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[6],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Milan",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[6],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Naples",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[6],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Madrid",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[7],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Barcelona",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[7],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Valencia",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[7],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Tokyo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[8],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Osaka",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[8],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Kyoto",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[8],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Shanghai",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[9],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Beijing",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[9],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Guangzhou",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[9],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Mumbai",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[10],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "New Delhi",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[10],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Bangalore",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[10],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Sao Paulo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[11],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Rio de Janeiro",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[11],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Brasilia",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[11],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Mexico City",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[12],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Guadalajara",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[12],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Monterrey",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[12],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Moscow",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[13],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Saint Petersburg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[13],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Novosibirsk",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[13],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Johannesburg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[14],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Cape Town",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[14],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Durban",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[14],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
        {
            title: "Lahore",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[15],
            rainfall: "75mm",
            temperature: 20,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 25,
        },
        {
            title: "Karachi",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[15],
            rainfall: "50mm",
            temperature: 15,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 20,
        },
        {
            title: "Islamabad",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            country: countries[15],
            rainfall: "100mm",
            temperature: 25,
            temperatureMonth: "June",
            temperatureMonthEnd: "August",
            temperatureEnd: 30,
        },
    ];

            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Cities</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800"><PlusOutlined /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add City</DialogTitle>
                            </DialogHeader>
                            <form className="h-[80vh] overflow-auto no-scrollbar">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Category Title" />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue>{countries[0].title}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {countries.map((country, index) => (
                                                        <SelectItem key={index} value={country.title}>{country.title}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>   
                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            toolbar: {
                                              items: ["bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"],
                                            },
                                          }}
                                            onReady={(editor) => {
                                            editor.ui.view.editable.element.style.minHeight = "200px";
                                            }}
                                            onFocus={(event, editor) => {
                                                editor.ui.view.editable.element.style.minHeight = "200px";
                                            }
                                        }
                                        onBlur={(event, editor) => {
                                            editor.ui.view.editable.element.style.minHeight = "200px";
                                        }}
                                          />
                                    </div>
                                    <div>
                                        <Label htmlFor="rainfall">Average Rainfall</Label>
                                        <Input type="text" id="rainfall" placeholder="Rainfall" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="temperature">Typical Temperature</Label>
                                            <Input type="number" id="temperature" placeholder="Temperature" />
                                        </div>
                                        <div>
                                            <Label htmlFor="temperatureEnd">Typical Temperature End</Label>
                                            <Input type="number" id="temperatureEnd" placeholder="Temperature End" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="temperatureMonth">Typical Temperature Month</Label>
                                            <Input type="text" id="temperatureMonth" placeholder="Temperature Month" />
                                        </div>
                                        <div>
                                            <Label htmlFor="temperatureMonthEnd">Typical Temperature Month End</Label>
                                            <Input type="text" id="temperatureMonthEnd" placeholder="Temperature Month End" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="banner">Banner</Label>
                                        <Input type="file" id="banner" />
                                    </div>
                                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800">Submit</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                </div>
                <div className="w-full">
                    <div className="rounder-md">
                        <div className="h-[80vh] overflow-auto relative mb-2 no-scrollbar">
                <Table
                >
                    <TableHeader
                        className="sticky top-0 bg-gray-900"
                    >
                        <TableRow className="hover:bg-gray-900 hover:text-white">
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Banner</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Title</TableHead>
                            <TableHead className="w-3/6 px-2 py-1 text-white text-center">Description</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cities.slice(startindex, endindex).map((city, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center justify-center">
                                    <img src={city.banner} alt={city.title} className="w-full h-full object-cover" />
                                </TableCell>
                                <TableCell className="text-center">{city.title}</TableCell>
                                <TableCell className="text-center">{city.description}</TableCell>
                                <TableCell className="align-middle text-center space-x-2">
                                    <Button className="bg-gray-900 hover:bg-gray-800"><EditOutlined /></Button>
                                    <Button variant="destructive"><DeleteOutlined /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </div>
            </div>
                <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"
                        className={cn({ "cursor-not-allowed": startindex === 0 })}
                         onClick={() => {
                            if(startindex > 0){
                                setStartIndex(startindex - rowsPerPage);
                                setEndIndex(endindex - rowsPerPage);
                            }
                        }
                        }>Previous</PaginationPrevious>
                    </PaginationItem>
                    {cities.slice(0, (Math.ceil(cities.length / rowsPerPage))-1 < 3 ? Math.ceil(cities.length / rowsPerPage) : 3).map((city, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(cities.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(cities.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-gray-900 text-white": endindex >= cities.length }, "hover:bg-gray-900 hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(cities.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(cities.length);
                        }}>{Math.ceil(cities.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= cities.length })}
                         onClick={() => {
                            if(endindex < cities.length){
                                setStartIndex(startindex + rowsPerPage);
                                setEndIndex(endindex + rowsPerPage);
                            }
                        }
                        }>Next</PaginationNext>
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
        </section>  
    );
}
