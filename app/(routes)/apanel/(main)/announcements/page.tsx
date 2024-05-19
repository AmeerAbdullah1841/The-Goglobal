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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";

interface Template {
    id: string;
    subject: string;
    message: string;
}

export default function APanelAnnouncementsPage() {

    const rowsPerPage: number = 10;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const templates: Template[] = [
        {
            id: "1",
            subject: "Subject 1",
            message: "Message 1",
        },
        {
            id: "2",
            subject: "Subject 2",
            message: "Message 2",
        },
        {
            id: "3",
            subject: "Subject 3",
            message: "Message 3",
        },
        {
            id: "4",
            subject: "Subject 4",
            message: "Message 4",
        },
        {
            id: "5",
            subject: "Subject 5",
            message: "Message 5",
        },
        {
            id: "6",
            subject: "Subject 6",
            message: "Message 6",
        },
        {
            id: "7",
            subject: "Subject 7",
            message: "Message 7",
        },
        {
            id: "8",
            subject: "Subject 8",
            message: "Message 8",
        },
        {
            id: "9",
            subject: "Subject 9",
            message: "Message 9",
        },
        {
            id: "10",
            subject: "Subject 10",
            message: "Message 10",
        },
        {
            id: "11",
            subject: "Subject 11",
            message: "Message 11",
        },
        {
            id: "12",
            subject: "Subject 12",
            message: "Message 12",
        },
        {
            id: "13",
            subject: "Subject 13",
            message: "Message 13",
        },
        {
            id: "14",
            subject: "Subject 14",
            message: "Message 14",
        },
        {
            id: "15",
            subject: "Subject 15",
            message: "Message 15",
        },
        {
            id: "16",
            subject: "Subject 16",
            message: "Message 16",
        },
        {
            id: "17",
            subject: "Subject 17",
            message: "Message 17",
        },
        {
            id: "18",
            subject: "Subject 18",
            message: "Message 18",
        },
        {
            id: "19",
            subject: "Subject 19",
            message: "Message 19",
        },
    ];
            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Announcements</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800"><PlusOutlined/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Announcement</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Subject</Label>
                                        <Input type="text" id="title" placeholder="Subject" />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Announcement</Label>
                                        <Input type="email" id="description" placeholder="Announcement" />
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
                            <TableHead className="w-2/6 px-2 py-1 text-white text-center">Subject</TableHead>
                            <TableHead className="w-4/6 px-2 py-1 text-white text-center">Announcement</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {templates.slice(startindex, endindex).map((template, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{template.subject}</TableCell>
                                <TableCell className="text-center">{template.message}</TableCell>
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
                    {templates.slice(0, 
                        (Math.ceil(templates.length / rowsPerPage))-1 < 3 ? Math.ceil(templates.length / rowsPerPage) : 3).map((template, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(templates.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(templates.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-gray-900 text-white": endindex >= templates.length }, "hover:bg-gray-900 hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(templates.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(templates.length);
                        }}>{Math.ceil(templates.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= templates.length })}
                         onClick={() => {
                            if(endindex < templates.length){
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
