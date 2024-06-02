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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

interface User {
    name: string;
    email: string;
    password: string;
    type: string;
    date?: string;
    status?: string;
}

export default function APanelUsersPage() {

    const rowsPerPage: number = 10;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [type, setType] = useState<string>("Admin");
    const [update, setUpdate] = useState<boolean>(false);

    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setType("Admin");
        setUpdate(false);
    }

    const getUsers = async () => {
        const q = query(collection(db, "user"), where("type", "!=", "superadmin"), limit(10 * page));
        const querySnapshot = await getDocs(q);
        let data: User[] = [];

        if (querySnapshot.empty) {
            return;
        }

        querySnapshot.forEach((doc) => {
            let key = doc.id;

            let user = {
                name: doc.data().name,
                email: key,
                password: doc.data().password,
                type: doc.data().type,
                date: doc.data().date,
                status: doc.data().status
            }

            data.push(user);
        }
        );

        data.sort((a: User, b: User) => {
            if (a.date && b.date) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return 0;
        });

        setUsers(data);
    }

    const addUser = async (e: any) => {
        e.preventDefault();

        const user = {
            name: name,
            password: password,
            type: type,
            date: new Date().toLocaleDateString(),
            status: "Active"
        }

        await setDoc(doc(db, "user", email), user);
        clearForm();
        getUsers();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const updateUser = async (email: string, e: any) => {
        e.preventDefault();
        const user = {
            name: name,
            password: password,
            type: type,
            date: new Date().toLocaleDateString(),
            status: "Active"
        }

        await updateDoc(doc(db, "user", email), user);
        clearForm();
        getUsers();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const deleteUser = async (email: string) => {
        await deleteDoc(doc(db, "user", email));
        getUsers();
    }


    useEffect(() => {
        if (!localStorage.getItem("user")) {
            window.location.href = "/apanel";
        }
        getUsers();
    }, [page]);


    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Users</h1>
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
                                <DialogTitle>Add User</DialogTitle>
                            </DialogHeader>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Name</Label>
                                        <Input type="text" id="title" placeholder="Name"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Email</Label>
                                        <Input type="email" id="description" placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            {...(update && { disabled: true })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" id="password" placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="type">Type</Label>
                                        <Select value={type} onValueChange={(value) => setType(value)}>
                                            <SelectTrigger>
                                                <SelectValue>{type}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                    <SelectItem value="User">User</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800"
                                        onClick={(e) => {
                                            if (update) {
                                                updateUser(email, e);
                                            } else {
                                                addUser(e);
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
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Sr. No.</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Name</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Email</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Password</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Type</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Date</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Status</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.slice(startindex, endindex).map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center">{user.name}</TableCell>
                                        <TableCell className="text-center">{user.email}</TableCell>
                                        <TableCell className="text-center">{user.password}</TableCell>
                                        <TableCell className="text-center">{user.type}</TableCell>
                                        <TableCell className="text-center">{user.date}</TableCell>
                                        <TableCell className="text-center">
                                            <Select value={user.status} onValueChange={async (value) => {
                                                await updateDoc(doc(db, "user", user.email), {
                                                    status: value
                                                });
                                                getUsers();
                                            }
                                            }>
                                                <SelectTrigger>
                                                    <SelectValue>{user.status}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Active">Active</SelectItem>
                                                        <SelectItem value="Block">Block</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-center space-x-2 flex justify-center">
                                            <Button className="bg-gray-900 hover:bg-gray-900"
                                                onClick={() => {
                                                    setName(user.name);
                                                    setEmail(user.email);
                                                    setPassword(user.password);
                                                    setType(user.type);
                                                    setUpdate(true);
                                                    document.getElementById("add-user")?.click();
                                                }}
                                            ><EditOutlined /></Button>
                                            <Button variant="destructive"
                                                onClick={() => deleteUser(user.email)}
                                            ><DeleteOutlined /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {users.length !== 0 &&
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
                        {users.slice(0,
                            (Math.ceil(users.length / rowsPerPage)) - 1 < 3 ? Math.ceil(users.length / rowsPerPage) : 3).map((user, index) => (
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
                        {(Math.ceil(users.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(users.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= users.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(users.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(users.length);
                                        setPage(Math.ceil(users.length / rowsPerPage));
                                    }}>{Math.ceil(users.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= users.length })}
                                onClick={() => {
                                    if (endindex < users.length) {
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
