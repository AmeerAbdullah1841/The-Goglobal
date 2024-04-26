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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
    title: string;
    description: string;
    banner: string;
}

export default function APanelCategoriesPage() {

    const rowsPerPage: number = 5;
    const  [startindex, setStartIndex] = useState<number>(0);
    const  [endindex, setEndIndex] = useState<number>(rowsPerPage);

    const categories: Category[] = [
        {
            title: "Adventure Tours",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150"
        },
        {
            title: "Cultural Tours",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150"
        },
        {
            title: "Wildlife Tours",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150"
        },
        {
            title: "Beach Tours",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150"
        },
        {
            title: "Mountain Tours",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150"
        },
        {
            title: "Family Tours",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150"
        },
        {
            title: "Honeymoon Tours",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nisl id mi tincidunt aliquet. Nulla facilisi. Ut vel semper risus. Nullam eget odio nec libero tincidunt porttitor. Donec nec nunc sit",
            banner: "https://via.placeholder.com/150"
        },
    ];

            

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Categories</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default">Add Category</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Category</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Category Title" />
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
                            <TableHead className="w-3/6 px-2 py-1 text-white text-center">Description</TableHead>
                            <TableHead  className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.slice(startindex, endindex).map((category, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center justify-center">
                                    <img src={category.banner} alt={category.title} className="w-full h-full object-cover" />
                                </TableCell>
                                <TableCell className="text-center">{category.title}</TableCell>
                                <TableCell className="text-center">{category.description}</TableCell>
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
                    {categories.slice(0, 
                        (Math.ceil(categories.length / rowsPerPage))-1 < 3 ? Math.ceil(categories.length / rowsPerPage) : 3).map((category, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                            className={cn({ "bg-black text-white": startindex === index * rowsPerPage }, "hover:bg-black hover:text-white")}
                             onClick={() => {
                                setStartIndex(index * rowsPerPage);
                                setEndIndex((index * rowsPerPage) + rowsPerPage);
                            }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(categories.length / rowsPerPage))-1 > 4 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    }
                    {(Math.ceil(categories.length / rowsPerPage))-1 > 2 &&
                    <PaginationItem>
                        <PaginationLink href="#"
                        className={cn({ "bg-black text-white": endindex >= categories.length }, "hover:bg-black hover:text-white")}
                         onClick={() => {
                            setStartIndex(Math.floor(categories.length / rowsPerPage) * rowsPerPage);
                            setEndIndex(categories.length);
                        }}>{Math.ceil(categories.length / rowsPerPage)}</PaginationLink>
                    </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                        className={cn({ "cursor-not-allowed": endindex >= categories.length })}
                         onClick={() => {
                            if(endindex < categories.length){
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
