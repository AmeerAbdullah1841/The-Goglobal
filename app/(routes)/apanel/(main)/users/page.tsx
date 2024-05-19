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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    type: string;
    date: string;
    status: string;
}

export default function APanelUsersPage() {

    const rowsPerPage: number = 10;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const users: User[] = [
        {
            id: "1",
            name: "John Doe",
            email: "abc@gmail.com",
            password: "123456",
            type: "Admin",
            date: "2021-09-01",
            status: "Active",
        },
        {
            id: "2",
            name: "Jane Doe",
            email: "abc1@gmail.com",
            password: "123456",
            type: "User",
            date: "2021-09-01",
            status: "Active",
        },
        {
            id: "3",
            name: "John Doe",
            email: "abc2@gmail.com",
            password: "123456",
            type: "User",
            date: "2021-09-01",
            status: "Active",
        },
        {
            id: "4",
            name: "Jane Doe",
            email: "abc3@gmail.com",
            password: "123456",
            type: "User",
            date: "2021-09-01",
            status: "Block",
        },
    ];
            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Users</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800"><PlusOutlined/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add User</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Name</Label>
                                        <Input type="text" id="title" placeholder="Name" />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Email</Label>
                                        <Input type="email" id="description" placeholder="Email" />
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" id="password" placeholder="Password" />
                                    </div>
                                    <div>
                                        <Label htmlFor="type">Type</Label>
                                        <Select value="Select Type">
                                            <SelectTrigger>
                                                <SelectValue>Select Type</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                    <SelectItem value="User">User</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Sr. No.</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Name</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Email</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Password</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Type</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Date</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Status</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.slice(startindex, endindex).map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{user.name}</TableCell>
                                <TableCell className="text-center">{user.email}</TableCell>
                                <TableCell className="text-center">{user.password}</TableCell>
                                <TableCell className="text-center">{user.type}</TableCell>
                                <TableCell className="text-center">{user.date}</TableCell>
                                <TableCell className="text-center">
                                    <Select value={user.status}>
                                        <SelectTrigger>
                                            <SelectValue>{user.status}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Block">Block</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-center space-x-2 flex justify-center">
                                    <Button className="bg-gray-900 hover:bg-gray-900"><EditOutlined/></Button>
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
                    {users.slice(0, 
                        (Math.ceil(users.length / rowsPerPage))-1 < 3 ? Math.ceil(users.length / rowsPerPage) : 3).map((user, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(users.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(users.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-gray-900 text-white": endindex >= users.length }, "hover:bg-gray-900 hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(users.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(users.length);
                        }}>{Math.ceil(users.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= users.length })}
                         onClick={() => {
                            if(endindex < users.length){
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
