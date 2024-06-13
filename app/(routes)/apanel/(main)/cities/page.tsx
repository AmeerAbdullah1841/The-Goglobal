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

interface City {
    title: string;
    description: string;
    banner: string;
    country: Country;
    rainfall: string;
    temperature: number;
    temperatureMonth: string;
    temperatureMonthEnd: string;
    temperatureEnd: number;
}

export default function APanelCitiesPage() {

    const rowsPerPage: number = 5;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [countries, setCountries] = useState<Country[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [page, setPage] = useState<number>(1);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [banner, setBanner] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [rainfall, setRainfall] = useState<string>("");
    const [temperature, setTemperature] = useState<number>(0);
    const [temperatureMonth, setTemperatureMonth] = useState<string>("");
    const [temperatureMonthEnd, setTemperatureMonthEnd] = useState<string>("");
    const [temperatureEnd, setTemperatureEnd] = useState<number>(0);
    const [update, setUpdate] = useState<boolean>(false);

    const clearForm = () => {
        setTitle("");
        setDescription("");
        setBanner("");
        getCountries();
        setRainfall("");
        setTemperature(0);
        setTemperatureMonth("");
        setTemperatureMonthEnd("");
        setTemperatureEnd(0);
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

    const getCities = async () => {
        const q = query(collection(db, "cities"), limit(5 * page));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return;
        }

        let tempCities: City[] = [];
        querySnapshot.forEach((doc) => {
            let title = doc.id;
            let data = doc.data();
            let city: City = {
                title: title,
                description: data.description,
                banner: data.banner,
                country: data.country,
                rainfall: data.rainfall,
                temperature: data.temperature,
                temperatureMonth: data.temperatureMonth,
                temperatureMonthEnd: data.temperatureMonthEnd,
                temperatureEnd: data.temperatureEnd
            };
            tempCities.push(city);
        }
        );
        setCities(tempCities);
    }

    const addCity = async (e: any) => {
        e.preventDefault();

        if (!title) {
            alert("Please enter a title");
            return;
        }

        if (!description) {
            alert("Please enter a description");
            return;
        }

        if (!banner) {
            alert("Please select a banner");
            return;
        }

        if (!country) {
            alert("Please select a country");
            return;
        }

        const cityRef = doc(db, "cities", title);
        const payload = {
            title: title,
            description: description,
            banner: banner,
            country: country,
            rainfall: rainfall,
            temperature: temperature,
            temperatureMonth: temperatureMonth,
            temperatureMonthEnd: temperatureMonthEnd,
            temperatureEnd: temperatureEnd
        };
        await setDoc(cityRef, payload);
        clearForm();
        getCities();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const deleteCity = async (title: string) => {
        const cityRef = doc(db, "cities", title);
        await deleteDoc(cityRef);
        getCities();
    }

    const updateCity = async (title: string, e: any) => {
        e.preventDefault();

        if (!title) {
            alert("Please enter a title");
            return;
        }

        if (!description) {
            alert("Please enter a description");
            return;
        }

        if (!banner) {
            alert("Please select a banner");
            return;
        }

        if (!country) {
            alert("Please select a country");
            return;
        }

        const cityRef = doc(db, "cities", title);
        const payload = {
            title: title,
            description: description,
            banner: banner,
            country: country,
            rainfall: rainfall,
            temperature: temperature,
            temperatureMonth: temperatureMonth,
            temperatureMonthEnd: temperatureMonthEnd,
            temperatureEnd: temperatureEnd
        };
        await updateDoc(cityRef, payload);
        clearForm();
        getCities();

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

    useEffect(() => {
        getCountries();
        getCities();
    }, [page]);


    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Cities</h1>
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
                                <DialogTitle>Add City</DialogTitle>
                            </DialogHeader>
                            <form className="h-[80vh] overflow-auto no-scrollbar">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input type="text" id="title" placeholder="Category Title" value={title} onChange={(e) => setTitle(e.target.value)}
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
                                        <Label htmlFor="rainfall">Average Rainfall</Label>
                                        <Input type="text" id="rainfall" placeholder="Rainfall"
                                            value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="temperature">Typical Temperature</Label>
                                            <Input type="number" id="temperature" placeholder="Temperature"
                                                value={temperature} onChange={(e) => setTemperature(parseInt(e.target.value))} />
                                        </div>
                                        <div>
                                            <Label htmlFor="temperatureEnd">Typical Temperature End</Label>
                                            <Input type="number" id="temperatureEnd" placeholder="Temperature End"
                                                value={temperatureEnd} onChange={(e) => setTemperatureEnd(parseInt(e.target.value))} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="temperatureMonth">Typical Temperature Month</Label>
                                            <Input type="text" id="temperatureMonth" placeholder="Temperature Month"
                                                value={temperatureMonth} onChange={(e) => setTemperatureMonth(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label htmlFor="temperatureMonthEnd">Typical Temperature Month End</Label>
                                            <Input type="text" id="temperatureMonthEnd" placeholder="Temperature Month End"
                                                value={temperatureMonthEnd} onChange={(e) => setTemperatureMonthEnd(e.target.value)} />
                                        </div>
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
                                                updateCity(title, e);
                                            } else {
                                                addCity(e);
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
                                {cities.slice(startindex, endindex).map((city, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center justify-center">
                                            <img src={city.banner} className="w-[150px] h-[150px] object-cover" />
                                        </TableCell>
                                        <TableCell className="text-center">{city.title}</TableCell>
                                        <TableCell className="text-center">{city.description}</TableCell>
                                        <TableCell className="align-middle text-center space-x-2">
                                            <Button className="bg-gray-900 hover:bg-gray-800"
                                                onClick={() => {
                                                    setTitle(city.title);
                                                    setDescription(city.description);
                                                    setBanner(city.banner);
                                                    setCountry(city.country.title);
                                                    setRainfall(city.rainfall);
                                                    setTemperature(city.temperature);
                                                    setTemperatureMonth(city.temperatureMonth);
                                                    setTemperatureMonthEnd(city.temperatureMonthEnd);
                                                    setTemperatureEnd(city.temperatureEnd);
                                                    setUpdate(true);
                                                }}
                                            ><EditOutlined /></Button>
                                            <Button variant="destructive"
                                                onClick={() => deleteCity(city.title)}
                                            ><DeleteOutlined /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {cities.length !== 0 &&
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
                        {cities.slice(0, (Math.ceil(cities.length / rowsPerPage)) - 1 < 3 ? Math.ceil(cities.length / rowsPerPage) : 3).map((city, index) => (
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
                        {(Math.ceil(cities.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(cities.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= cities.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(cities.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(cities.length);

                                        setPage(Math.ceil(cities.length / rowsPerPage));
                                    }}>{Math.ceil(cities.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= cities.length })}
                                onClick={() => {
                                    if (endindex < cities.length) {
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
