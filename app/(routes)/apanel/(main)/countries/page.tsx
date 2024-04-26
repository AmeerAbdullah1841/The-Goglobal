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

interface Country {
    title: string;
    code: string;
    description: string;
    banner: string;
    featured: string;
    status: string;
}

export default function APanelCountriesPage() {

    const rowsPerPage: number = 5;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const countries : Country[] = [
        {
            title: "United States",
            code: "US",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit amet erat aliquam malesuada. Etiam eget purus in purus vehicula scelerisque. Nullam in magna sit amet risus luctus varius. Nulla facilisi. Sed nec nisl nec justo ultrices luctus. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Normal",
            status: "Active",
        },
        {
            title: "United Kingdom",
            code: "UK",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit amet erat aliquam malesuada. Etiam eget purus in purus vehicula scelerisque. Nullam in magna sit amet risus luctus varius. Nulla facilisi. Sed nec nisl nec justo ultrices luctus. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Top Rated",
            status: "Active",
        },
        {
            title: "Canada",
            code: "CA",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Normal",
            status: "Hide",
        },
        {
            title: "Australia",
            code: "AU",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Top Rated",
            status: "Active",
        },
        {
            title: "Germany",
            code: "DE",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Popular",
            status: "Active",
        },
        {
            title: "France",
            code: "FR",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Top Rated",
            status: "Active",
        },
        {
            title: "Italy",
            code: "IT",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Best Seller",
            status: "Active",
        },
        {
            title: "Spain",
            code: "ES",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Top Rated",
            status: "Active",
        },
        {
            title: "Japan",
            code: "JP",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Normal",
            status: "Hide",
        },
        {
            title: "China",
            code: "CN",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Top Rated",
            status: "Active",
        },
        {
            title: "India",
            code: "IN",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Popular",
            status: "Active",
        },
        {
            title: "Brazil",
            code: "BR",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Top Rated",
            status: "Active",
        },
        {
            title: "Mexico",
            code: "MX",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Best Seller",
            status: "Active",
        },
        {
            title: "Russia",
            code: "RU",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Top Rated",
            status: "Active",
        },
        {
            title: "South Africa",
            code: "ZA",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Normal",
            status: "Hide",
        },
        {
            title: "Pakistan",
            code: "PK",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150",
            featured: "Top Rated",
            status: "Active",
        },
    ];

            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Countries</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default">Add Country</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Country</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Country Title" />
                                    </div>
                                    <div>
                                        <Label htmlFor="code">Code</Label>
                                        <Input type="text" id="code" placeholder="Country Code" />
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
                                        <Label htmlFor="banner">Banner</Label>
                                        <Input type="file" id="banner" />
                                    </div>
                                    <Button type="submit">Submit</Button>
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
                        className="sticky top-0 bg-black"
                    >
                        <TableRow className="hover:bg-black hover:text-white">
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Banner</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Title</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Code</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Featured</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Status</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {countries.slice(startindex, endindex).map((country, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center justify-center">
                                    <img src={country.banner} alt={country.title} className="w-full h-full object-cover" />
                                </TableCell>
                                <TableCell className="text-center">{country.title}</TableCell>
                                <TableCell className="text-center">{country.code}</TableCell>
                                <TableCell className="text-center"><Select value={country.featured}>
                                    <SelectTrigger>
                                        <SelectValue>{country.featured}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Normal">Normal</SelectItem>
                                            <SelectItem value="Top Rated">Top Rated</SelectItem>
                                            <SelectItem value="Popular">Popular</SelectItem>
                                            <SelectItem value="Best Seller">Best Seller</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select> 
                                    </TableCell>
                                <TableCell className="text-center"><Select value={country.status}>
                                    <SelectTrigger>
                                        <SelectValue>{country.status}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Hide">Hide</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select> 
                                    </TableCell>
                                <TableCell className="align-middle text-center space-x-2">
                                    <Button variant="default">Edit</Button>
                                    <Button variant="destructive">Delete</Button>
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
                    {countries.slice(0, (Math.ceil(countries.length / rowsPerPage))-1).map((country, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-black text-white": startindex === index * rowsPerPage }, "hover:bg-black hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-black text-white": endindex >= countries.length }, "hover:bg-black hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(countries.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(countries.length);
                        }}>{Math.ceil(countries.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= countries.length })}
                         onClick={() => {
                            if(endindex < countries.length){
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
