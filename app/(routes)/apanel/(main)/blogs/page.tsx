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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

interface Country {
    title: string;
}

interface Blog {
    title: string;
    description: string;
    banner: string;
    country: string;
    status: string;
}

export default function APanelBlogsPage() {

    const rowsPerPage: number = 5;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [countries, setCountries] = useState<Country[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [page, setPage] = useState<number>(1);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [banner, setBanner] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);

    const clearForm = () => {
        setTitle("");
        setDescription("");
        setBanner("");
        setCountry("");
        setUpdate(false);
    }

    const getCountries = async () => {
        const countrie: Country[] = [];
        const q = query(collection(db, "countries"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return;
        }

        querySnapshot.forEach((doc) => {
            let data: Country = doc.id
                ? { title: doc.id }
                : { title: "" };

            countrie.push(data);
        }
        );
        setCountries(countrie);
        setCountry(countrie[0].title);
    }

    const getBlogs = async () => {
        const blog: Blog[] = [];
        const q = query(collection(db, "blogs"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return;
        }

        querySnapshot.forEach((doc) => {
            let title = doc.id
            let data = doc.data();
            let blogData: Blog = {
                title: title,
                description: data.description,
                banner: data.banner,
                country: data.country,
                status: data.status
            };
            blog.push(blogData);
        }
        );

        setBlogs(blog);
    }

    useEffect(() => {
        getCountries();
        getBlogs();
    }, [page]);

    const addBlog = async (e: any) => {
        e.preventDefault();
        if (title === "" || description === "" || banner === "" || country === "") {
            alert("All fields are required");
            return;
        }
        const blogRef = doc(db, "blogs", title);
        const blogData = {
            title: title,
            description: description,
            banner: banner,
            country: country,
            status: "Active"
        };
        await setDoc(blogRef, blogData);
        clearForm();
        getBlogs();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const deleteBlog = async (title: string) => {
        const blogRef = doc(db, "blogs", title);
        await deleteDoc(blogRef);
        getBlogs();
    }

    const updateBlog = async (title: string, e: any) => {
        e.preventDefault();
        if (title === "" || description === "" || banner === "" || country === "") {
            alert("All fields are required");
            return;
        }
        const blogRef = doc(db, "blogs", title);
        const blogData = {
            title: title,
            description: description,
            banner: banner,
            country: country,
        };
        await updateDoc(blogRef, blogData);
        clearForm();
        getBlogs();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const convertImageToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }


    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Blogs</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800"
                                id="add-user"
                            ><PlusOutlined /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Blog</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            {...(update && { disabled: true })} />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Select value={country} onValueChange={(value) => setCountry(value)}>
                                            <SelectTrigger>
                                                <SelectValue>{country}</SelectValue>
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
                                            data={description}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data);
                                            }}
                                            config={{
                                                toolbar: {
                                                    items: ["bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"],
                                                },
                                            }}
                                            onReady={(editor) => {
                                                if (editor.ui.view.editable.element) {
                                                    editor.ui.view.editable.element.style.minHeight = "200px";
                                                }
                                            }}
                                            onFocus={(event, editor) => {
                                                if (editor.ui.view.editable.element) {
                                                    editor.ui.view.editable.element.style.minHeight = "200px";
                                                }
                                            }
                                            }
                                            onBlur={(event, editor) => {
                                                if (editor.ui.view.editable.element) {
                                                    editor.ui.view.editable.element.style.minHeight = "200px";
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="banner">Banner</Label>
                                        <Input type="file" id="banner"
                                            onChange={async (e) => {
                                                if (!e.target.files) return;

                                                const file = e.target.files[0];
                                                const base64 = await convertImageToBase64(file);
                                                setBanner(base64);
                                            }
                                            } />
                                    </div>
                                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800"
                                        onClick={(e) => {
                                            if (update) {
                                                updateBlog(title, e);
                                            } else {
                                                addBlog(e);
                                            }
                                        }
                                        }
                                    >Submit</Button>
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
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.slice(startindex, endindex).map((blog, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center justify-center">
                                            <img src={blog.banner} className="w-[150px] h-[150px] object-cover" />
                                        </TableCell>
                                        <TableCell className="text-center">{blog.title}</TableCell>
                                        <TableCell className="text-center">{blog.description}</TableCell>
                                        <TableCell className="text-center">
                                            <Select value={blog.status} onValueChange={(value) => {
                                                const blogRef = doc(db, "blogs", blog.title);
                                                updateDoc(blogRef, { status: value });
                                                getBlogs();
                                            }
                                            }>
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
                                            <Button className="bg-gray-900 hover:bg-gray-800"
                                                onClick={() => {
                                                    setTitle(blog.title);
                                                    setDescription(blog.description);
                                                    setBanner(blog.banner);
                                                    setCountry(blog.country);
                                                    setUpdate(true);
                                                    document.getElementById("add-user")?.click();
                                                }
                                                }
                                            ><EditOutlined /></Button>
                                            <Button variant="destructive"
                                                onClick={() => deleteBlog(blog.title)}
                                            ><DeleteOutlined /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {blogs.length !== 0 &&
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
                        {blogs.slice(0, (Math.ceil(blogs.length / rowsPerPage)) - 1 < 3 ? Math.ceil(blogs.length / rowsPerPage) : 3).map((blog, index) => (
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
                        {(Math.ceil(blogs.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(blogs.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= blogs.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(blogs.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(blogs.length);
                                        setPage(Math.ceil(blogs.length / rowsPerPage));
                                    }}>{Math.ceil(blogs.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= blogs.length })}
                                onClick={() => {
                                    if (endindex < blogs.length) {
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
