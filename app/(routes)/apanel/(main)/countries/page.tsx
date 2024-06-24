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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

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
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [countries, setCountries] = useState<Country[]>([]);
    const [page, setPage] = useState<number>(1);
    const [title, setTitle] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [banner, setBanner] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);

    const convertImageToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const clearForm = () => {
        setTitle("");
        setCode("");
        setDescription("");
        setBanner("");
        setUpdate(false);
    }

    const getCountryData = async () => {
        const q = query(collection(db, "countries"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return;
        }

        let tempCountries: Country[] = [];
        querySnapshot.forEach((doc) => {
            let title = doc.id;
            let code = doc.data().code;
            let description = doc.data().description;
            let banner = doc.data().banner;
            let featured = doc.data().featured;
            let status = doc.data().status;
            tempCountries.push({ title, code, description, banner, featured, status });
        }
        );

        setCountries(tempCountries);
    }

    const addCountry = async (e: any) => {
        e.preventDefault();
        if (!title || !code || !description || !banner) {
            alert("Please fill all fields");
            return;
        }
        const countryRef = doc(db, "countries", title);
        const countryData = {
            code: code,
            description: description,
            banner: banner,
            featured: "Normal",
            status: "Active"
        };
        await setDoc(countryRef, countryData);
        getCountryData();
        clearForm();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const deleteCountry = async (title: string) => {
        const countryRef = doc(db, "countries", title);
        await deleteDoc(countryRef);
        getCountryData();
    }

    const updateCountry = async (title: string, e: any) => {
        e.preventDefault();
        if (!title || !code || !description || !banner) {
            alert("Please fill all fields");
            return;
        }
        const countryRef = doc(db, "countries", title);
        const countryData = {
            code: code,
            description: description,
            banner: banner,
            status: "Active"
        };
        await updateDoc(countryRef, countryData);
        getCountryData();
        clearForm();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    useEffect(() => {
        getCountryData();
    }, [page]);



    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Countries</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800"
                                id="add-user"
                                onClick={() => {
                                    if (update) {
                                        clearForm();
                                    }
                                }
                                }
                            ><PlusOutlined /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Country</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Country Title" value={title} onChange={(e) => setTitle(e.target.value)}
                                            {...(update && { disabled: true })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="code">Code</Label>
                                        <Input type="text" id="code" placeholder="Country Code" value={code} onChange={(e) => setCode(e.target.value)} />
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
                                        <Input type="file" id="banner" onChange={async (e) => {
                                            if (!e.target.files) return;

                                            const file = e.target.files[0];
                                            const base64 = await convertImageToBase64(file);
                                            setBanner(base64);
                                        }
                                        }
                                        />
                                    </div>
                                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800"
                                        onClick={(e) => {
                                            if (update) {
                                                updateCountry(title, e);
                                            }
                                            else {
                                                addCountry(e);
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
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Code</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Featured</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Status</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {countries.slice(startindex, endindex).map((country, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center justify-center">
                                            <img src={country.banner} className="w-[150px] h-[150px] object-cover" />
                                        </TableCell>
                                        <TableCell className="text-center">{country.title}</TableCell>
                                        <TableCell className="text-center">{country.code}</TableCell>
                                        <TableCell className="text-center"><Select value={country.featured}
                                            onValueChange={(value) => {
                                                const countryRef = doc(db, "countries", country.title);
                                                const countryData = {
                                                    featured: value,
                                                };
                                                updateDoc(countryRef, countryData);
                                                getCountryData();
                                            }
                                            }>
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
                                        <TableCell className="text-center"><Select value={country.status}
                                            onValueChange={(value) => {
                                                const countryRef = doc(db, "countries", country.title);
                                                const countryData = {
                                                    status: value,
                                                };
                                                updateDoc(countryRef, countryData);
                                                getCountryData();
                                            }
                                            }>
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
                                            <Button className="bg-gray-900 hover:bg-gray-800"
                                                onClick={() => {
                                                    setTitle(country.title);
                                                    setCode(country.code);
                                                    setDescription(country.description);
                                                    setBanner(country.banner);
                                                    setUpdate(true);
                                                    document.getElementById("add-user")?.click();
                                                }}
                                            ><EditOutlined /></Button>
                                            <Button variant="destructive"
                                                onClick={() => deleteCountry(country.title)}
                                            ><DeleteOutlined /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {countries.length !== 0 &&
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
                        {countries.slice(0, (Math.ceil(countries.length / rowsPerPage)) - 1 < 3 ? Math.ceil(countries.length / rowsPerPage) : 3).map((country, index) => (
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
                        {(Math.ceil(countries.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(countries.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= countries.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(countries.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(countries.length);
                                        setPage(Math.ceil(countries.length / rowsPerPage));
                                    }}>{Math.ceil(countries.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= countries.length })}
                                onClick={() => {
                                    if (endindex < countries.length) {
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
