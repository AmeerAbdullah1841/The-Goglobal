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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CloseCircleOutlined } from "@ant-design/icons";

interface Order {
    id: number;
    customer: string;
    totalPersons: number;
    Package: string;
    status: string;
    date: string;
}

export default function APanelOrdersPage() {

    const rowsPerPage: number = 10;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const orders: Order[] = [
        {
            id: 1,
            customer: "John Doe",
            totalPersons: 2,
            Package: "Package 1",
            status: "Pending",
            date: "2022-01-01"
        },
        {
            id: 2,
            customer: "Jane Doe",
            totalPersons: 3,
            Package: "Package 2",
            status: "Approved",
            date: "2022-01-02"
        },
        {
            id: 3,
            customer: "John Doe",
            totalPersons: 2,
            Package: "Package 1",
            status: "Pending",
            date: "2022-01-01"
        },
        {
            id: 4,
            customer: "Jane Doe",
            totalPersons: 3,
            Package: "Package 2",
            status: "Approved",
            date: "2022-01-02"
        },
        {
            id: 5,
            customer: "John Doe",
            totalPersons: 2,
            Package: "Package 1",
            status: "Pending",
            date: "2022-01-01"
        },
        {
            id: 6,
            customer: "Jane Doe",
            totalPersons: 3,
            Package: "Package 2",
            status: "Approved",
            date: "2022-01-02"
        },
        {
            id: 7,
            customer: "John Doe",
            totalPersons: 2,
            Package: "Package 1",
            status: "Pending",
            date: "2022-01-01"
        },
        {
            id: 8,
            customer: "Jane Doe",
            totalPersons: 3,
            Package: "Package 2",
            status: "Approved",
            date: "2022-01-02"
        },
        {
            id: 9,
            customer: "John Doe",
            totalPersons: 2,
            Package: "Package 1",
            status: "Pending",
            date: "2022-01-01"
        },
        {
            id: 10,
            customer: "Jane Doe",
            totalPersons: 3,
            Package: "Package 2",
            status: "Approved",
            date: "2022-01-02"
        },
        {
            id: 11,
            customer: "John Doe",
            totalPersons: 2,
            Package: "Package 1",
            status: "Pending",
            date: "2022-01-01"
        },
    ];



    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Orders</h1>
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
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Order ID</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Customer</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Total Persons</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Package</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Date</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.slice(startindex, endindex).map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center">{order.id}</TableCell>
                                        <TableCell className="text-center">{order.customer}</TableCell>
                                        <TableCell className="text-center">{order.totalPersons}</TableCell>
                                        <TableCell className="text-center">{order.Package}</TableCell>
                                        <TableCell className="text-center">{order.date}</TableCell>
                                        <TableCell className="align-middle text-center space-x-2 flex justify-center">
                                            <Button className="bg-gray-900 hover:bg-gray-800"><EyeOutlined /></Button>
                                            {order.status === "Pending" ?
                                                <>
                                                    <Button className="bg-green-500 hover:bg-green-600"><CheckCircleOutlined /></Button>
                                                    <Button className="bg-red-500 hover:bg-red-600"><CloseCircleOutlined /></Button>
                                                </>
                                                :
                                                ""
                                            }
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
                                if (startindex > 0) {
                                    setStartIndex(startindex - rowsPerPage);
                                    setEndIndex(endindex - rowsPerPage);
                                }
                            }
                            }>Previous</PaginationPrevious>
                    </PaginationItem>
                    {orders.slice(0, (Math.ceil(orders.length / rowsPerPage)) - 1 < 3 ? Math.ceil(orders.length / rowsPerPage) : 3).map((country, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                                className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                                onClick={() => {
                                    setStartIndex(index * rowsPerPage);
                                    setEndIndex((index * rowsPerPage) + rowsPerPage);
                                }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(orders.length / rowsPerPage)) - 1 > 4 &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }
                    {(Math.ceil(orders.length / rowsPerPage)) - 1 > 2 &&
                        <PaginationItem>
                            <PaginationLink href="#"
                                className={cn({ "bg-gray-900 text-white": endindex >= orders.length }, "hover:bg-gray-900 hover:text-white")}
                                onClick={() => {
                                    setStartIndex(Math.floor(orders.length / rowsPerPage) * rowsPerPage);
                                    setEndIndex(orders.length);
                                }}>{Math.ceil(orders.length / rowsPerPage)}</PaginationLink>
                        </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                            className={cn({ "cursor-not-allowed": endindex >= orders.length })}
                            onClick={() => {
                                if (endindex < orders.length) {
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
