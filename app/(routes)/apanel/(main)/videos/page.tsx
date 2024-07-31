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
import { storage } from "@/config/db/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Video {
    id: string,
    title: string,
    url: string,
    status: string,
}

export default function APanelVideoPage() {

    const rowsPerPage: number = 5;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [countries, setCountries] = useState<Video[]>([]);
    const [page, setPage] = useState<number>(1);
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);

    const clearForm = () => {
        setTitle("");
        setUrl("");
        setUpdate(false);
    }

    const getCountryData = async () => {
        const q = query(collection(db, "videos"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return;
        }

        let tempCountries: Video[] = [];
        querySnapshot.forEach((doc) => {
            let id = doc.id;
            let title = doc.data().title;
            let url = doc.data().url;
            let status = doc.data().status;
            tempCountries.push({ id, title, url, status });
        }
        );

        setCountries(tempCountries);
    }

    const addCountry = async (e: any) => {
        e.preventDefault();
        if (!title || !url) {
            alert("Please fill all fields");
            return;
        }
        const countryRef = collection(db, "videos");
        const countryData = {
            title: title,
            url: url,
            status: "Active"
        };
        await setDoc(doc(countryRef), countryData);
        getCountryData();
        clearForm();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const deleteCountry = async (id: string) => {
        const countryRef = doc(db, "videos", id);
        await deleteDoc(countryRef);
        getCountryData();
    }

    useEffect(() => {
        getCountryData();
    }, [page]);



    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Videos</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800"
                                id="add-user"
                            ><PlusOutlined /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Video</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="banner">Video</Label>
                                        <Input type="file" id="banner" onChange={async (e) => {
                                            if (!e.target.files) return;

                                            const file = e.target.files[0];
                                            const storageRef = ref(storage, `videos/${file.name}`);
                                            await uploadBytes(storageRef, file);
                                            const url = await getDownloadURL(storageRef);
                                            setUrl(url);
                                        }
                                        }
                                        />
                                    </div>
                                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800"
                                        onClick={(e) => {
                                            addCountry(e);
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
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Sr no</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Title</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">URL</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Status</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {countries.slice(startindex, endindex).map((country, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center">{country.title}</TableCell>
                                        <TableCell className="text-center">{country.url}</TableCell>
                                        <TableCell className="text-center"><Select value={country.status}
                                            onValueChange={(value) => {
                                                const countryRef = doc(db, "videos", country.id);
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
                                            <Button variant="destructive"
                                                onClick={() => deleteCountry(country.id)}
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
