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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

interface Newsletter {
    id: string;
    email: string;
    date: string;
}

export default function APanelNewsletterPage() {

    const rowsPerPage: number = 10;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [page, setPage] = useState<number>(1);

    const getNewsletters = async () => {
        const q = query(collection(db, "newsletters"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return;
        }

        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Newsletter[];

        setNewsletters(data);
    };

    useEffect(() => {
        getNewsletters();
    }, [page]);



    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Newsletter</h1>
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
                                    <TableHead className="w-2/6 px-2 py-1 text-white text-center">Email</TableHead>
                                    <TableHead className="w-2/6 px-2 py-1 text-white text-center">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {newsletters.slice(startindex, endindex).map((newsletter, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center">{newsletter.email}</TableCell>
                                        <TableCell className="text-center">{newsletter.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {newsletters.length > 0 &&
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#"
                                className={cn({ "cursor-not-allowed": startindex === 0 })}
                                onClick={() => {
                                    if (startindex > 0) {
                                        setStartIndex(startindex - rowsPerPage);
                                        setEndIndex(endindex - rowsPerPage);

                                        setPage(page - 1);
                                    }
                                }
                                }>Previous</PaginationPrevious>
                        </PaginationItem>
                        {newsletters.slice(0, (Math.ceil(newsletters.length / rowsPerPage)) - 1 < 3 ? Math.ceil(newsletters.length / rowsPerPage) : 3).map((country, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(index * rowsPerPage);
                                        setEndIndex((index * rowsPerPage) + rowsPerPage);

                                        setPage(index + 1);
                                    }}>{index + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                        {(Math.ceil(newsletters.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(newsletters.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= newsletters.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(newsletters.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(newsletters.length);
                                        setPage(Math.ceil(newsletters.length / rowsPerPage));
                                    }}>{Math.ceil(newsletters.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= newsletters.length })}
                                onClick={() => {
                                    if (endindex < newsletters.length) {
                                        setStartIndex(startindex + rowsPerPage);
                                        setEndIndex(endindex + rowsPerPage);

                                        setPage(page + 1);
                                    }
                                }
                                }>Next</PaginationNext>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            }
        </section>
    );
}
