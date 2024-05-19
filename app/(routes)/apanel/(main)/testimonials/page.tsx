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
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
    id: number;
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
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const testimonials : Testimonial[] = [
        {
            id: 1,
            name: "John Doe",
            email: "abc@gmail.com",
            company: "Google",
            testimonial: "This is a great company for travelling.",
            rating: 5,
            date: "2021-12-12",
            status: "Active",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            name: "Jane Doe",
            email: "abc@gmail.com",
            company: "Facebook",
            testimonial: "This is a great company for travelling.",
            rating: 4,
            date: "2021-12-12",
            status: "Active",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            name: "John Doe",
            email: "abc@gmail.com",
            company: "Google",
            testimonial: "This is a great company for travelling.",
            rating: 5,
            date: "2021-12-12",
            status: "Inactive",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 4,
            name: "Jane Doe",
            email: "abc@gmail.com",
            company: "Facebook",
            testimonial: "This is a great company for travelling.",
            rating: 4,
            date: "2021-12-12",
            status: "Active",
            image: "https://via.placeholder.com/150"
        }
    ];

            

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
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.slice(startindex, endindex).map((testimonial, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{testimonial.name}</TableCell>
                                <TableCell className="text-center">{testimonial.company}</TableCell>
                                <TableCell className="text-center">{testimonial.testimonial}</TableCell>
                                <TableCell className="text-center">{testimonial.rating}</TableCell>
                                <TableCell className="align-middle text-center space-x-2 flex justify-center">
                                    <Select value={testimonial.status}>
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
                    {testimonials.slice(0, (Math.ceil(testimonials.length / rowsPerPage))-1 < 3 ? Math.ceil(testimonials.length / rowsPerPage) : 3).map((country, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(testimonials.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(testimonials.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-gray-900 text-white": endindex >= testimonials.length }, "hover:bg-gray-900 hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(testimonials.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(testimonials.length);
                        }}>{Math.ceil(testimonials.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= testimonials.length })}
                         onClick={() => {
                            if(endindex < testimonials.length){
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
