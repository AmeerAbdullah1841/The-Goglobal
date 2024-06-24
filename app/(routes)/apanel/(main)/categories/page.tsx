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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

interface Category {
    title: string;
    description: string;
    banner: string;
}

export default function APanelCategoriesPage() {

    const rowsPerPage: number = 5;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [categories, setCategories] = useState<Category[]>([]);
    const [page, setPage] = useState<number>(1);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [banner, setBanner] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);

    const clearForm = () => {
        setTitle("");
        setDescription("");
        setBanner("");
        setUpdate(false);
    }

    const convertImageToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }


    const getCategories = async () => {
        const q = query(collection(db, "categories"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return;
        }

        const categories: Category[] = [];
        querySnapshot.forEach((doc) => {
            let title = doc.id;
            let description = doc.data().description;
            let banner = doc.data().banner;

            categories.push({ title, description, banner });
        }
        );
        setCategories(categories);

    }

    useEffect(() => {
        getCategories();
    }, [page]);

    const addCategory = async (e: any) => {
        e.preventDefault();
        if (!title || !description || !banner) {
            alert("Please fill all fields");
            return;
        }

        const categoryRef = doc(db, "categories", title);
        const category = {
            title,
            description,
            banner
        };
        await setDoc(categoryRef, category);
        getCategories();

        clearForm();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const updateCategory = async (e: any) => {
        e.preventDefault();
        if (!title || !description || !banner) {
            alert("Please fill all fields");
            return;
        }

        const categoryRef = doc(db, "categories", title);
        const category = {
            description: description,
            banner: banner
        };

        await updateDoc(categoryRef, category);
        getCategories();

        clearForm();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const deleteCategory = async (title: string) => {
        const categoryRef = doc(db, "categories", title);
        await deleteDoc(categoryRef);
        getCategories();
    }

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Categories</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800"><PlusOutlined /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Category</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Category Title" value={title} onChange={(e) => setTitle(e.target.value)}
                                            {...(update && { disabled: true })} />
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
                                            data={description}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data);
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
                                        <Input type="file" id="banner" onChange={async (e) => {
                                            if (!e.target.files) return;

                                            const file = e.target.files[0];
                                            const base64 = await convertImageToBase64(file);
                                            setBanner(base64);
                                        }
                                        } />
                                    </div>
                                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800"
                                        id="add-category"
                                        onClick={(e) => {
                                            if (update) {
                                                updateCategory(e);
                                            } else {
                                                addCategory(e);
                                            }
                                        }}
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
                                    <TableHead className="w-3/6 px-2 py-1 text-white text-center">Description</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.slice(startindex, endindex).map((category, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center justify-center">
                                            <img src={category.banner} className="w-[150px] h-[150px] object-cover" />
                                        </TableCell>
                                        <TableCell className="text-center">{category.title}</TableCell>
                                        <TableCell className="text-center">{category.description}</TableCell>
                                        <TableCell className="align-middle text-center space-x-2">
                                            <Button className="bg-gray-900 hover:bg-gray-900"
                                                onClick={() => {
                                                    setTitle(category.title);
                                                    setDescription(category.description);
                                                    setBanner(category.banner);
                                                    setUpdate(true);
                                                    document.getElementById("add-category")?.click();
                                                }}
                                            ><EditOutlined /></Button>
                                            <Button variant="destructive"
                                                onClick={() => deleteCategory(category.title)}
                                            ><DeleteOutlined /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {categories.length !== 0 &&
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
                        {categories.slice(0,
                            (Math.ceil(categories.length / rowsPerPage)) - 1 < 3 ? Math.ceil(categories.length / rowsPerPage) : 3).map((category, index) => (
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
                        {(Math.ceil(categories.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(categories.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= categories.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(categories.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(categories.length);
                                        setPage(Math.ceil(categories.length / rowsPerPage));
                                    }}>{Math.ceil(categories.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= categories.length })}
                                onClick={() => {
                                    if (endindex < categories.length) {
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
