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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

interface Testimonial {
    id: string;
    name: string;
    email: string;
    company: string;
    testimonial: string;
    rating: number;
    date: string;
    status: string;
    image: string;
}

export default function APanelTestimonialsPage() {

    const rowsPerPage: number = 10;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [page, setPage] = useState<number>(1);

    const getTestimonials = async () => {
        const q = query(collection(db, "testimonials"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return;
        }

        const data: Testimonial[] = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                company: doc.data().company,
                testimonial: doc.data().testimonial,
                rating: doc.data().rating,
                date: doc.data().date,
                status: doc.data().status,
                image: doc.data().image
            });
        });
        setTestimonials(data);
    }

    useEffect(() => {
        getTestimonials();
    }, [page]);


    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Testimonials</h1>
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
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Company</TableHead>
                                    <TableHead className="w-3/6 px-2 py-1 text-white text-center">Testimonial</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Rating</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {testimonials.slice(startindex, endindex).map((testimonial, index) => (
                                    <TableRow key={testimonial.id}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center">{testimonial.name}</TableCell>
                                        <TableCell className="text-center">{testimonial.company}</TableCell>
                                        <TableCell className="text-center">{testimonial.testimonial}</TableCell>
                                        <TableCell className="text-center">{testimonial.rating}</TableCell>
                                        <TableCell className="align-middle text-center space-x-2 flex justify-center">
                                            <Select value={testimonial.status} onValueChange={async (value) => {
                                                const testimonialRef = doc(db, "testimonials", testimonial.id);
                                                await updateDoc(testimonialRef, {
                                                    status: value
                                                });
                                                getTestimonials();
                                            }
                                            }>
                                                <SelectTrigger>
                                                    <SelectValue>{testimonial.status}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Active">Active</SelectItem>
                                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {testimonials.length !== 0 &&
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
                        {testimonials.slice(0, (Math.ceil(testimonials.length / rowsPerPage)) - 1 < 3 ? Math.ceil(testimonials.length / rowsPerPage) : 3).map((country, index) => (
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
                        {(Math.ceil(testimonials.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(testimonials.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= testimonials.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(testimonials.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(testimonials.length);
                                        setPage(Math.ceil(testimonials.length / rowsPerPage));
                                    }}>{Math.ceil(testimonials.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= testimonials.length })}
                                onClick={() => {
                                    if (endindex < testimonials.length) {
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
