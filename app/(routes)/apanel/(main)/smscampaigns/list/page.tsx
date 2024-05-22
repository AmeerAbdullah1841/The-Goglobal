"use client";
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DeleteOutlined } from "@ant-design/icons";

interface List{
    id: string;
    dateTime: string;
    template: string;
    users: string;
}

export default function APanelSMSlistPage() {

    const rowsPerPage: number = 10;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const lists: List[] = [
        {
            id: "1",
            dateTime: "2021-09-01 12:00:00",
            template: "Template 1",
            users: "All Users",
        },
        {
            id: "3",
            dateTime: "12:00:00",
            template: "Template 3",
            users: "All Users",
        },
        {
            id: "4",
            dateTime: "2021-09-01 12:00:00",
            template: "Template 4",
            users: "Custom Users",
        },
    ];

            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">SMS Campaign List</h1>
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
                            <TableHead className="w-2/6 px-2 py-1 text-white text-center">Date & Time</TableHead>
                            <TableHead className="w-2/6 px-2 py-1 text-white text-center">Template</TableHead>
                            <TableHead className="w-2/6 px-2 py-1 text-white text-center">Users</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lists.slice(startindex, endindex).map((list, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{list.dateTime}</TableCell>
                                <TableCell className="text-center">{list.template}</TableCell>
                                <TableCell className="text-center">{list.users}</TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        className="bg-red-500 hover:bg-red-700"
                                        
                                    >
                                        <DeleteOutlined />
                                    </Button>
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
                    {lists.slice(0, (Math.ceil(lists.length / rowsPerPage))-1 < 3 ? Math.ceil(lists.length / rowsPerPage) : 3).map((country, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(lists.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(lists.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-gray-900 text-white": endindex >= lists.length }, "hover:bg-gray-900 hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(lists.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(lists.length);
                        }}>{Math.ceil(lists.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= lists.length })}
                         onClick={() => {
                            if(endindex < lists.length){
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
