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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";

interface Country {
    title: string;
}

interface Blog {
    title: string;
    description: string;
    banner: string;
    country: Country;
    status: string;
}

export default function APanelBlogsPage() {

    const rowsPerPage: number = 5;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const countries : Country[] = [
        {
            title: "United States",
        },
        {
            title: "United Kingdom",
        },
        {
            title: "Canada",
        },
        {
            title: "Australia",
        },
        {
            title: "Germany",
        },
        {
            title: "France",
        },
        {
            title: "Italy",
        },
        {
            title: "Spain",
        },
        {
            title: "Japan",
        },
        {
            title: "China",
        },
        {
            title: "India",
        },
        {
            title: "Brazil",
        },
        {
            title: "Mexico",
        },
        {
            title: "Russia",
        },
        {
            title: "South Africa",
        },
        {
            title: "Pakistan",
        },
    ];

    const blogs: Blog[] = [
        {
            title: "Blog 1",
            description: "Blog 1 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[0],
            status: "Active",
        },
        {
            title: "Blog 2",
            description: "Blog 2 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[1],
            status: "Active",
        },
        {
            title: "Blog 3",
            description: "Blog 3 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[2],
            status: "Active",
        },
        {
            title: "Blog 4",
            description: "Blog 4 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[3],
            status: "Active",
        },
        {
            title: "Blog 5",
            description: "Blog 5 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[4],
            status: "Active",
        },
        {
            title: "Blog 6",
            description: "Blog 6 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[5],
            status: "Active",
        },
        {
            title: "Blog 7",
            description: "Blog 7 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[6],
            status: "Active",
        },
        {
            title: "Blog 8",
            description: "Blog 8 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[7],
            status: "Active",
        },
        {
            title: "Blog 9",
            description: "Blog 9 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[8],
            status: "Active",
        },
        {
            title: "Blog 10",
            description: "Blog 10 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[9],
            status: "Active",
        },
        {
            title: "Blog 11",
            description: "Blog 11 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[10],
            status: "Active",
        },
        {
            title: "Blog 12",
            description: "Blog 12 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[11],
            status: "Active",
        },
        {
            title: "Blog 13",
            description: "Blog 13 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[12],
            status: "Active",
        },
        {
            title: "Blog 14",
            description: "Blog 14 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[13],
            status: "Active",
        },
        {
            title: "Blog 15",
            description: "Blog 15 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[14],
            status: "Active",
        },
        {
            title: "Blog 16",
            description: "Blog 16 Description",
            banner: "https://via.placeholder.com/150",
            country: countries[15],
            status: "Active",
        },
    ]

            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Blogs</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800"><PlusOutlined /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Blog</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Title" />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Select value={countries[0].title}>
                                            <SelectTrigger>
                                                <SelectValue>{countries[0].title}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {countries.map((country, index) => (
                                                        <SelectItem key={index} value={country.title}>{country.title}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Banner</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Title</TableHead>
                            <TableHead className="w-2/6 px-2 py-1 text-white text-center">Description</TableHead>
                            <TableHead className="w-1/6 px-2 py-1 text-white text-center">Status</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs.slice(startindex, endindex).map((blog, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center justify-center">
                                    <img src={blog.banner} alt={blog.title} className="w-full h-full object-cover" />
                                </TableCell>
                                <TableCell className="text-center">{blog.title}</TableCell>
                                <TableCell className="text-center">{blog.description}</TableCell>
                                <TableCell className="text-center">
                                    <Select value={blog.status}>
                                        <SelectTrigger>
                                            <SelectValue>{blog.status}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="space-x-2 text-center">
                                    <Button className="bg-gray-900 hover:bg-gray-800"><EditOutlined/></Button>
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
                    {blogs.slice(0, (Math.ceil(blogs.length / rowsPerPage))-1 < 3 ? Math.ceil(blogs.length / rowsPerPage) : 3).map((blog, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(blogs.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(blogs.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-gray-900 text-white": endindex >= blogs.length }, "hover:bg-gray-900 hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(blogs.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(blogs.length);
                        }}>{Math.ceil(blogs.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= blogs.length })}
                         onClick={() => {
                            if(endindex < blogs.length){
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
