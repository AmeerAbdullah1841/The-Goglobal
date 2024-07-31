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
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";

interface package1 {
    title: string;
    country: string;
    categories: string[];
    status: string;
    featured: string;
    image: string;
    webShow?: boolean;
}

interface country {
    id: number;
    name: string;
}

export default function APanelpackage1sPage() {

    const rowsPerPage: number = 5;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [package1s, setPackage1s] = useState<package1[]>([]);
    const [page, setPage] = useState<number>(1);

    const countries: country[] = [
        {
            id: 1,
            name: "Pakistan"
        },
        {
            id: 2,
            name: "India"
        },
        {
            id: 3,
            name: "Afghanistan"
        },
        {
            id: 4,
            name: "Bangladesh"
        },
        {
            id: 5,
            name: "Sri Lanka"
        },
        {
            id: 6,
            name: "Nepal"
        },
        {
            id: 7,
            name: "Bhutan"
        },
        {
            id: 8,
            name: "Maldives"
        },
        {
            id: 9,
            name: "China"
        },
        {
            id: 10,
            name: "Japan"
        },
        {
            id: 11,
            name: "South Korea"
        },
        {
            id: 12,
            name: "North Korea"
        },
        {
            id: 13,
            name: "Russia"
        },
        {
            id: 14,
            name: "United States"
        },
        {
            id: 15,
            name: "United Kingdom"
        },
        {
            id: 16,
            name: "France"
        },
        {
            id: 17,
            name: "Germany"
        },
        {
            id: 18,
            name: "Italy"
        },
        {
            id: 19,
            name: "Spain"
        },
        {
            id: 20,
            name: "Portugal"
        },
        {
            id: 21,
            name: "Greece"
        },
        {
            id: 22,
            name: "Turkey"
        },
        {
            id: 23,
            name: "Saudi Arabia"
        },
        {
            id: 24,
            name: "United Arab Emirates"
        },
        {
            id: 25,
            name: "Qatar"
        },
        {
            id: 26,
            name: "Kuwait"
        },
        {
            id: 27,
            name: "Bahrain"
        },
        {
            id: 28,
            name: "Oman"
        },
        {
            id: 29,
            name: "Yemen"
        },
        {
            id: 30,
            name: "Iran"
        }
    ]

    const fetchData = async () => {
        const q = query(collection(db, "packages"));
        const querySnapshot = await getDocs(q);
        let temp: package1[] = [];
        querySnapshot.forEach((doc) => {
            let data = {
                title: doc.id,
                country: doc.data().country,
                categories: doc.data().categories,
                status: doc.data().status,
                featured: doc.data().featured,
                image: doc.data().picture,
                webShow: doc.data().webShow
            }
            temp.push(data);
        }
        );
        setPackage1s(temp);
    }

    useEffect(() => {
        fetchData();
    }
        , [page]);




    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-2 gap-1">
                    <h1 className="text-2xl font-bold mr-2">Packages</h1>
                    <Link href="/apanel/packages/add">
                        <Button className="bg-gray-900 hover:bg-gray-800"><PlusOutlined /></Button>
                    </Link>
                </div>
            </div>
            {/* <div className="w-full">
                    <div className="h-[10vh] flex items-center flex-wrap">
                        <div className="w-1/2 px-1">
                            <Input
                                type="text"
                                placeholder="Title"
                            />
                        </div>
                        <div className="w-1/2 px-1">
                            <Select value="Select Country">
                                <SelectTrigger>
                                    <SelectValue>Select Country</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {countries.map((country, index) => (
                                            <SelectItem key={index} value={country.name}>{country.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                    </div>
                    </div>
                    </div> */}
            <div className="w-full">
                <div className="rounder-md">
                    <div className="h-[80vh] overflow-auto relative mb-2 no-scrollbar">
                        <Table
                        >
                            <TableHeader
                                className="sticky top-0 bg-gray-900"
                            >
                                <TableRow className="hover:bg-gray-900 hover:text-white">
                                    <TableHead className="w-1/10 px-2 py-1 text-white text-center">Sr no.</TableHead>
                                    <TableHead className="w-1/10 px-2 py-1 text-white text-center">Image</TableHead>
                                    <TableHead className="w-2/10 px-2 py-1 text-white text-center">Title</TableHead>
                                    <TableHead className="w-1/10 px-2 py-1 text-white text-center">Country</TableHead>
                                    <TableHead className="w-2/10 px-2 py-1 text-white text-center">Categories</TableHead>
                                    <TableHead className="w-1/10 px-2 py-1 text-white text-center">Status</TableHead>
                                    <TableHead className="w-1/10 px-2 py-1 text-white text-center">Featured</TableHead>
                                    <TableHead className="w-1/10 px-2 py-1 text-white text-center">Actions</TableHead>
                                    <TableHead className="w-1/10 px-2 py-1 text-white text-center">Website</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {package1s.slice(startindex, endindex).map((package1, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="flex items-center justify-center">
                                            <img src={package1.image} alt={package1.title} className="w-[150px] h-[150px] object-cover" />
                                        </TableCell>
                                        <TableCell className="text-center">{package1.title}</TableCell>
                                        <TableCell className="text-center">{package1.country}</TableCell>
                                        <TableCell className="text-center">{package1.categories.join(", ")}</TableCell>
                                        <TableCell className="text-center">
                                            <Select value={package1.status} onValueChange={async (value) => {
                                                const q = doc(db, "packages", package1.title);
                                                await updateDoc(q, { status: value });
                                                fetchData();
                                            }
                                            }>
                                                <SelectTrigger>
                                                    <SelectValue>{package1.status}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Active">Active</SelectItem>
                                                        <SelectItem value="Block">Block</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Select value={package1.featured}
                                                onValueChange={async (value) => {
                                                    const q = doc(db, "packages", package1.title);
                                                    await updateDoc(q, { featured: value });
                                                    fetchData();
                                                }
                                                }>
                                                <SelectTrigger>
                                                    <SelectValue>{package1.featured}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Top Rated">Top Rated</SelectItem>
                                                        <SelectItem value="Popular">Popular</SelectItem>
                                                        <SelectItem value="Best Seller">Best Seller</SelectItem>
                                                        <SelectItem value="Normal">Normal</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="align-middle text-center space-x-2">
                                            <Link href={`/apanel/packages/edit/${package1.title}`}>
                                                <Button className="bg-gray-900 hover:bg-gray-800"><EditOutlined /></Button>
                                            </Link>
                                            {/* <Button variant="destructive"><DeleteOutlined /></Button> */}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center">
                                                <input type="checkbox" checked={package1.webShow} onChange={async (e) => {
                                                    if (!e.target.checked) {
                                                        const countryRef = doc(db, "packages", package1.title);
                                                        const countryData = {
                                                            webShow: false,
                                                        };
                                                        await updateDoc(countryRef, countryData);
                                                        fetchData();
                                                    }
                                                    else {
                                                        const q = query(collection(db, "packages"), where("webShow", "==", true));
                                                        getDocs(q).then(async (querySnapshot) => {
                                                            if (querySnapshot.size >= 8) {
                                                                alert("Only 8 packages can be shown on the website");
                                                                e.target.checked = false;
                                                                return;
                                                            }
                                                            const countryRef = doc(db, "packages", package1.title);
                                                            const countryData = {
                                                                webShow: true,
                                                            };
                                                            await updateDoc(countryRef, countryData);
                                                            fetchData();
                                                        }
                                                        );
                                                    }
                                                }} />
                                            </div>
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
                                if (startindex > 0) {
                                    setStartIndex(startindex - rowsPerPage);
                                    setEndIndex(endindex - rowsPerPage);
                                }
                            }
                            }>Previous</PaginationPrevious>
                    </PaginationItem>
                    {package1s.slice(0, (Math.ceil(package1s.length / rowsPerPage)) - 1 < 3 ? Math.ceil(package1s.length / rowsPerPage) : 3).map((country, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                                className={cn({ "bg-gray-900 text-white": startindex === index * rowsPerPage }, "hover:bg-gray-900 hover:text-white")}
                                onClick={() => {
                                    setStartIndex(index * rowsPerPage);
                                    setEndIndex((index * rowsPerPage) + rowsPerPage);
                                }}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    {(Math.ceil(package1s.length / rowsPerPage)) - 1 > 4 &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }
                    {(Math.ceil(package1s.length / rowsPerPage)) - 1 > 2 &&
                        <PaginationItem>
                            <PaginationLink href="#"
                                className={cn({ "bg-gray-900 text-white": endindex >= package1s.length }, "hover:bg-gray-900 hover:text-white")}
                                onClick={() => {
                                    setStartIndex(Math.floor(package1s.length / rowsPerPage) * rowsPerPage);
                                    setEndIndex(package1s.length);
                                }}>{Math.ceil(package1s.length / rowsPerPage)}</PaginationLink>
                        </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationNext href="#"
                            className={cn({ "cursor-not-allowed": endindex >= package1s.length })}
                            onClick={() => {
                                if (endindex < package1s.length) {
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
