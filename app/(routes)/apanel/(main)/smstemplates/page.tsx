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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

interface Template {
    id: string;
    subject: string;
    message: string;
}

export default function APanelSMSTemplatesPage() {

    const rowsPerPage: number = 10;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [page, setPage] = useState<number>(1);
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);
    const [id, setId] = useState<string>("");

    const clearForm = () => {
        setSubject("");
        setMessage("");
        setUpdate(false);
        setId("");
    }

    const getTemplates = async () => {
        const q = query(collection(db, "smstemplates"));
        const querySnapshot = await getDocs(q);

        let temp: Template[] = [];

        if (querySnapshot.empty) {
            return;
        }

        querySnapshot.forEach((doc) => {
            temp.push({
                id: doc.id,
                subject: doc.data().subject,
                message: doc.data().message,
            });
        });

        setTemplates(temp);
    }

    useEffect(() => {
        getTemplates();
    }, [page]);

    const addTemplate = async (e: any) => {
        e.preventDefault();

        if (subject === "" || message === "") {
            alert("Please fill all the fields");
            return;
        }

        try {
            await setDoc(doc(collection(db, "smstemplates")), {
                subject: subject,
                message: message,
            });
            clearForm();
            getTemplates();
        } catch (error) {
            console.error("Error adding document: ", error);
        }

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const deleteTemplate = async (id: string) => {
        try {
            await deleteDoc(doc(db, "smstemplates", id));
            getTemplates();
            window.location.reload();
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    }

    const updateTemplate = async (id: string, e: any) => {
        e.preventDefault();

        if (subject === "" || message === "") {
            alert("Please fill all the fields");
            return;
        }

        try {
            await updateDoc(doc(db, "smstemplates", id), {
                subject: subject,
                message: message,
            });
            clearForm();
            getTemplates();
        } catch (error) {
            console.error("Error updating document: ", error);
        }

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">SMS Templates</h1>
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
                                <DialogTitle>Add Template</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Subject</Label>
                                        <Input type="text" id="title" placeholder="Subject"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Message</Label>
                                        <Input type="email" id="description" placeholder="Message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800"
                                        onClick={(e) => {
                                            if (update) {
                                                updateTemplate(id, e);
                                            } else {
                                                addTemplate(e);
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
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Sr. No.</TableHead>
                                    <TableHead className="w-2/6 px-2 py-1 text-white text-center">Subject</TableHead>
                                    <TableHead className="w-4/6 px-2 py-1 text-white text-center">Message</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {templates.slice(startindex, endindex).map((template, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center">{template.subject}</TableCell>
                                        <TableCell className="text-center">{template.message}</TableCell>
                                        <TableCell className="text-center space-x-2 flex justify-center">
                                            <Button className="bg-gray-900 hover:bg-gray-900"
                                                onClick={() => {
                                                    setSubject(template.subject);
                                                    setMessage(template.message);
                                                    setUpdate(true);
                                                    setId(template.id);

                                                    document.getElementById("add-user")?.click();
                                                }
                                                }
                                            ><EditOutlined /></Button>
                                            <Button variant="destructive"
                                                onClick={() => deleteTemplate(template.id)}
                                            ><DeleteOutlined /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {templates.length > 0 &&
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
                        {templates.slice(0,
                            (Math.ceil(templates.length / rowsPerPage)) - 1 < 3 ? Math.ceil(templates.length / rowsPerPage) : 3).map((template, index) => (
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
                        {(Math.ceil(templates.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(templates.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= templates.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(templates.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(templates.length);

                                        setPage(Math.ceil(templates.length / rowsPerPage));
                                    }}>{Math.ceil(templates.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= templates.length })}
                                onClick={() => {
                                    if (endindex < templates.length) {
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
