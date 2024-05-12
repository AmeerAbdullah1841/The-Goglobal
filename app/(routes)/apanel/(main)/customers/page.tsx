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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { FileExcelOutlined } from "@ant-design/icons";
import Link from "next/link";

interface Customer {
    code: string;
    profilePicture: string;
    name: string;
    email: string;
    contact: number;
    gender: string;
}

export default function APanelCustomersPage() {

    const rowsPerPage: number = 5;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    
    const customers:Customer[] = [
        {
        code: "ABC-101",
        profilePicture: "https://via.placeholder.com/150",
        name: "Obaid-ur-Rehman",
        email: "obaidurrehman457@gmail.com",
        contact: 923001084120,
        gender: "Male"
        },
        {
            code: "ABC-102",
            profilePicture: "https://via.placeholder.com/150",
            name: "Muhammad Jamal",
            email: "mjamalnasir07@gmail.com",
            contact: 923324661592,
            gender: "Male"
            },
            {
                code: "ABC-103",
                profilePicture: "https://via.placeholder.com/150",
                name: "Haseeb Ahmed",
                email: "haseen@gmail.com",
                contact: 923186508844,
                gender: "Male"
                },
                {
                    code: "ABC-104",
                    profilePicture: "https://via.placeholder.com/150",
                    name: "Bilal Abbas",
                    email: "syedbilalabbasofficial@gmail.com",
                    contact: 923054977960,
                    gender: "Male"
                    },
                    {
                        code: "ABC-105",
                        profilePicture: "https://via.placeholder.com/150",
                        name: "Hadeed Naeem",
                        email: "hadeed@gmail.com",
                        contact: 923001234567,
                        gender: "Male"
                        },
                        {
                            code: "ABC-106",
                            profilePicture: "https://via.placeholder.com/150",
                            name: "Sami Asghar",
                            email: "sami@gmail.com",
                            contact: 923001234567,
                            gender: "Male"
                            },
    ]
        
            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-2 gap-1">
                    <h1 className="text-2xl font-bold mr-2">Customers</h1>
                    <Link href="/apanel/customers/add">
                    <Button className="bg-gray-900 hover:bg-gray-800"><PlusOutlined/></Button>
                    </Link>
                    <Button className="bg-green-600 hover:bg-green-500"><FileExcelOutlined/></Button>
                </div>
                </div>
                <div className="w-full">
                    <div className="h-[20vh] flex items-center flex-wrap">
                        <div className="w-1/3 px-1">
                            <Input
                                type="text"
                                placeholder="Name"
                            />
                        </div>
                        <div className="w-1/3 px-1">
                            <Input
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        <div className="w-1/3 px-1">
                            <Input
                                type="text"
                                placeholder="Contact"
                            />
                        </div>
                        <div className="w-1/3 px-1">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue>
                                        
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/3 px-1">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue>
                                        
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Single">Single</SelectItem>
                                        <SelectItem value="Married">Married</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/3 px-1">
                            <Input  
                                type="text"
                                placeholder="CNIC"
                            />
                            </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="rounder-md">
                        <div className="h-[60vh] overflow-auto relative mb-2 no-scrollbar">
                <Table
                >
                    <TableHeader
                        className="sticky top-0 bg-gray-900"
                    >
                        <TableRow className="hover:bg-gray-900 hover:text-white">
                            <TableHead className="w-1/10 px-2 py-1 text-white text-center">Sr no.</TableHead>
                            <TableHead className="w-1/10 px-2 py-1 text-white text-center">Code</TableHead>
                            <TableHead className="w-1/10 px-2 py-1 text-white text-center">Profile Picture</TableHead>
                            <TableHead className="w-1/10 px-2 py-1 text-white text-center">Name</TableHead>
                            <TableHead className="w-2/10 px-2 py-1 text-white text-center">Email</TableHead>
                            <TableHead  className="w-1/10 px-2 py-1 text-white text-center">Contact</TableHead>
                            <TableHead  className="w-1/10 px-2 py-1 text-white text-center">Gender</TableHead>
                            <TableHead  className="w-2/10 px-2 py-1 text-white text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.slice(startindex, endindex).map((customer, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index+1}</TableCell>
                                <TableCell className="text-center">{customer.code}</TableCell>
                                <TableCell className="flex items-center justify-center">
                                    <img src={customer.profilePicture} alt={customer.code} className="w-full h-full object-cover" />
                                </TableCell>
                                <TableCell className="text-center">{customer.name}</TableCell>
                                <TableCell className="text-center">{customer.email}</TableCell>
                                <TableCell className="text-center">{customer.contact}</TableCell>
                                <TableCell className="text-center">{customer.gender}</TableCell>
                                <TableCell className="align-middle text-center space-x-2">
                                    <Link href={`/apanel/customers/message/${customer.code}`}>
                                    <Button className="bg-green-600 hover:bg-green-500"
                                    ><MessageOutlined/></Button></Link>
                                    <Link href={`/apanel/customers/edit/${customer.code}`}>
                                    <Button className="bg-gray-900 hover:bg-gray-800"><EditOutlined/></Button>
                                    </Link>
                                    <Button variant="destructive"><DeleteOutlined/></Button>
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
                    {customers.slice(0, (Math.ceil(customers.length / rowsPerPage))-1 < 3 ? Math.ceil(customers.length / rowsPerPage) : 3).map((country, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(customers.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(customers.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-gray-900 text-white": endindex >= customers.length }, "hover:bg-gray-900 hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(customers.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(customers.length);
                        }}>{Math.ceil(customers.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= customers.length })}
                         onClick={() => {
                            if(endindex < customers.length){
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
