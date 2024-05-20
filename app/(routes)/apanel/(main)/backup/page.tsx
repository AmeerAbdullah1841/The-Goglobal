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
import { DownloadOutlined } from "@ant-design/icons";

interface Backup {
    id: string;
    dateTime: string;
    fileName: string;
}

export default function APanelBackupPage() {

    const rowsPerPage: number = 10;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const backups : Backup[] = [
        {
            id: "1",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "2",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "3",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "4",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "5",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "6",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "7",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "8",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "9",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "10",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        },
        {
            id: "11",
            dateTime: "2021-12-12 12:12:12",
            fileName: "backup-2021-12-12-12-12-12.zip"
        }
    ];

            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Backups</h1>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">Create Backup</Button>
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
                            <TableHead className="w-3/6 px-2 py-1 text-white text-center">File Name</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {backups.slice(startindex, endindex).map((backup, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{backup.dateTime}</TableCell>
                                <TableCell className="text-center">{backup.fileName}</TableCell>
                                <TableCell className="text-center">
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                                        <DownloadOutlined className="text-white" />
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
                    {backups.slice(0, (Math.ceil(backups.length / rowsPerPage))-1 < 3 ? Math.ceil(backups.length / rowsPerPage) : 3).map((country, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(backups.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(backups.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-gray-900 text-white": endindex >= backups.length }, "hover:bg-gray-900 hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(backups.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(backups.length);
                        }}>{Math.ceil(backups.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= backups.length })}
                         onClick={() => {
                            if(endindex < backups.length){
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
