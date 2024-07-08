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

interface Visa {
    category: string;
    country: string;
    description: string;
    processingTime: string;
    adultPrice: number;
    adultDiscountPrice: number;
    childPrice: number;
    childDiscountPrice: number;
    infantPrice: number;
    infantDiscountPrice: number;
    jobHolderServices: string;
    businessServices: string;
    retiredServices: string;
    jobHolderDocuments: string;
    businessDocuments: string;
    retiredDocuments: string;
    jobHolderTerms: string;
    businessTerms: string;
    retiredTerms: string;
    jobHolderRefunds: string;
    businessRefunds: string;
    retiredRefunds: string;
}

export default function APanelVisasPage() {

    const rowsPerPage: number = 5;
    const [startindex, setStartIndex] = useState<number>(0);
    const [endindex, setEndIndex] = useState<number>(rowsPerPage);
    const [countries, setCountries] = useState<Country[]>([]);
    const [visas, setVisas] = useState<Visa[]>([]);
    const [page, setPage] = useState<number>(1);
    const [category, setCategory] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [processingTime, setProcessingTime] = useState<string>("");
    const [adultPrice, setAdultPrice] = useState<number>(0);
    const [adultDiscountPrice, setAdultDiscountPrice] = useState<number>(0);
    const [childPrice, setChildPrice] = useState<number>(0);
    const [childDiscountPrice, setChildDiscountPrice] = useState<number>(0);
    const [infantPrice, setInfantPrice] = useState<number>(0);
    const [infantDiscountPrice, setInfantDiscountPrice] = useState<number>(0);
    const [jobHolderServices, setJobHolderServices] = useState<string>("");
    const [businessServices, setBusinessServices] = useState<string>("");
    const [retiredServices, setRetiredServices] = useState<string>("");
    const [jobHolderDocuments, setJobHolderDocuments] = useState<string>("");
    const [businessDocuments, setBusinessDocuments] = useState<string>("");
    const [retiredDocuments, setRetiredDocuments] = useState<string>("");
    const [jobHolderTerms, setJobHolderTerms] = useState<string>("");
    const [businessTerms, setBusinessTerms] = useState<string>("");
    const [retiredTerms, setRetiredTerms] = useState<string>("");
    const [jobHolderRefunds, setJobHolderRefunds] = useState<string>("");
    const [businessRefunds, setBusinessRefunds] = useState<string>("");
    const [retiredRefunds, setRetiredRefunds] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);

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

    const clearForm = () => {
        setCategory("");
        setDescription("");
        setProcessingTime("");
        setAdultPrice(0);
        setAdultDiscountPrice(0);
        setChildPrice(0);
        setChildDiscountPrice(0);
        setInfantPrice(0);
        setInfantDiscountPrice(0);
        setJobHolderServices("");
        setBusinessServices("");
        setRetiredServices("");
        setJobHolderDocuments("");
        setBusinessDocuments("");
        setRetiredDocuments("");
        setJobHolderTerms("");
        setBusinessTerms("");
        setRetiredTerms("");
        setJobHolderRefunds("");
        setBusinessRefunds("");
        setRetiredRefunds("");
        getCountries();
    }

    const getVivas = async () => {
        const q = query(collection(db, "viva"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return;
        }

        let tempCities: Visa[] = [];
        querySnapshot.forEach((doc) => {
            let title = doc.id;
            let data = doc.data();
            let viva: Visa = {
                category: title,
                country: data.country,
                description: data.description,
                processingTime: data.processingTime,
                adultPrice: data.adultPrice,
                adultDiscountPrice: data.adultDiscountPrice,
                childPrice: data.childPrice,
                childDiscountPrice: data.childDiscountPrice,
                infantPrice: data.infantPrice,
                infantDiscountPrice: data.infantDiscountPrice,
                jobHolderServices: data.jobHolderServices,
                businessServices: data.businessServices,
                retiredServices: data.retiredServices,
                jobHolderDocuments: data.jobHolderDocuments,
                businessDocuments: data.businessDocuments,
                retiredDocuments: data.retiredDocuments,
                jobHolderTerms: data.jobHolderTerms,
                businessTerms: data.businessTerms,
                retiredTerms: data.retiredTerms,
                jobHolderRefunds: data.jobHolderRefunds,
                businessRefunds: data.businessRefunds,
                retiredRefunds: data.retiredRefunds
            };
            tempCities.push(viva);
        }
        );
        setVisas(tempCities);
    }

    useEffect(() => {
        getVivas();
        getCountries();
    }, [page]);

    const addVisa = async (e: any) => {
        e.preventDefault();

        if (category === "") {
            alert("Please input category");
            return;
        }

        if (country === "") {
            alert("Please select country");
            return;
        }

        if (description === "") {
            alert("Please input description");
            return;
        }

        if (processingTime === "") {
            alert("Please input processing time");
            return;
        }

        if (adultPrice === 0) {
            alert("Please input adult price");
            return;
        }

        if (adultDiscountPrice === 0) {
            alert("Please input adult discount price");
            return;
        }

        if (childPrice === 0) {
            alert("Please input child price");
            return;
        }

        if (childDiscountPrice === 0) {
            alert("Please input child discount price");
            return;
        }

        if (infantPrice === 0) {
            alert("Please input infant price");
            return;
        }

        if (infantDiscountPrice === 0) {
            alert("Please input infant discount price");
            return;
        }

        if (jobHolderServices === "") {
            alert("Please input job holder services");
            return;
        }

        if (businessServices === "") {
            alert("Please input business services");
            return;
        }

        if (retiredServices === "") {
            alert("Please input retired services");
            return;
        }

        if (jobHolderDocuments === "") {
            alert("Please input job holder documents");
            return;
        }

        if (businessDocuments === "") {
            alert("Please input business documents");
            return;
        }

        if (retiredDocuments === "") {
            alert("Please input retired documents");
            return;
        }

        if (jobHolderTerms === "") {
            alert("Please input job holder terms");
            return;
        }

        if (businessTerms === "") {
            alert("Please input business terms");
            return;
        }

        if (retiredTerms === "") {
            alert("Please input retired terms");
            return;
        }

        if (jobHolderRefunds === "") {
            alert("Please input job holder refunds");
            return;
        }

        if (businessRefunds === "") {
            alert("Please input business refunds");
            return;
        }

        if (retiredRefunds === "") {
            alert("Please input retired refunds");
            return;
        }
        const data = {
            country: country,
            description: description,
            processingTime: processingTime,
            adultPrice: adultPrice,
            adultDiscountPrice: adultDiscountPrice,
            childPrice: childPrice,
            childDiscountPrice: childDiscountPrice,
            infantPrice: infantPrice,
            infantDiscountPrice: infantDiscountPrice,
            jobHolderServices: jobHolderServices,
            businessServices: businessServices,
            retiredServices: retiredServices,
            jobHolderDocuments: jobHolderDocuments,
            businessDocuments: businessDocuments,
            retiredDocuments: retiredDocuments,
            jobHolderTerms: jobHolderTerms,
            businessTerms: businessTerms,
            retiredTerms: retiredTerms,
            jobHolderRefunds: jobHolderRefunds,
            businessRefunds: businessRefunds,
            retiredRefunds: retiredRefunds
        };
        await setDoc(doc(db, "viva", category), data);
        clearForm();
        getVivas();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    const deleteVisa = async (category: string) => {
        await deleteDoc(doc(db, "viva", category));
        getVivas();
    }

    const updateVisa = async (category: string, e: any) => {
        e.preventDefault();

        if (category === "") {
            alert("Please input category");
            return;
        }

        if (country === "") {
            alert("Please select country");
            return;
        }

        if (description === "") {
            alert("Please input description");
            return;
        }

        if (processingTime === "") {
            alert("Please input processing time");
            return;
        }

        if (adultPrice === 0) {
            alert("Please input adult price");
            return;
        }

        if (adultDiscountPrice === 0) {
            alert("Please input adult discount price");
            return;
        }

        if (childPrice === 0) {
            alert("Please input child price");
            return;
        }

        if (childDiscountPrice === 0) {
            alert("Please input child discount price");
            return;
        }

        if (infantPrice === 0) {
            alert("Please input infant price");
            return;
        }

        if (infantDiscountPrice === 0) {
            alert("Please input infant discount price");
            return;
        }

        if (jobHolderServices === "") {
            alert("Please input job holder services");
            return;
        }

        if (businessServices === "") {
            alert("Please input business services");
            return;
        }

        if (retiredServices === "") {
            alert("Please input retired services");
            return;
        }

        if (jobHolderDocuments === "") {
            alert("Please input job holder documents");
            return;
        }

        if (businessDocuments === "") {
            alert("Please input business documents");
            return;
        }

        if (retiredDocuments === "") {
            alert("Please input retired documents");
            return;
        }

        if (jobHolderTerms === "") {
            alert("Please input job holder terms");
            return;
        }

        if (businessTerms === "") {
            alert("Please input business terms");
            return;
        }

        if (retiredTerms === "") {
            alert("Please input retired terms");
            return;
        }

        if (jobHolderRefunds === "") {
            alert("Please input job holder refunds");
            return;
        }

        if (businessRefunds === "") {
            alert("Please input business refunds");
            return;
        }

        if (retiredRefunds === "") {
            alert("Please input retired refunds");
            return;
        }

        const data = {
            country: country,
            description: description,
            processingTime: processingTime,
            adultPrice: adultPrice,
            adultDiscountPrice: adultDiscountPrice,
            childPrice: childPrice,
            childDiscountPrice: childDiscountPrice,
            infantPrice: infantPrice,
            infantDiscountPrice: infantDiscountPrice,
            jobHolderServices: jobHolderServices,
            businessServices: businessServices,
            retiredServices: retiredServices,
            jobHolderDocuments: jobHolderDocuments,
            businessDocuments: businessDocuments,
            retiredDocuments: retiredDocuments,
            jobHolderTerms: jobHolderTerms,
            businessTerms: businessTerms,
            retiredTerms: retiredTerms,
            jobHolderRefunds: jobHolderRefunds,
            businessRefunds: businessRefunds,
            retiredRefunds: retiredRefunds
        };

        await updateDoc(doc(db, "viva", category), data);
        clearForm();

        const dialog = document.getElementById("close-dialog");
        dialog?.click();
    }

    return (
        <section className="flex items-center justify-center flex-col w-full p-6">
            <div className="w-full">
                <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold mr-2">Visa</h1>
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
                                <DialogTitle>Add Visa</DialogTitle>
                            </DialogHeader>
                            <form className="h-[80vh] overflow-auto no-scrollbar">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Unique Name</Label>
                                        <Input type="text" id="category" placeholder="Name(US 6 months)" value={category} onChange={(e) => setCategory(e.target.value)}
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
                                        <Label htmlFor="processing-time">Processing Time</Label>
                                        <Input type="text" id="processing-time" placeholder="Processing Time(2-3 weeks)" value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label htmlFor="adult-price">Adult Price</Label>
                                        <Input type="number" id="adult-price" placeholder="Adult Price(1000)" value={adultPrice} onChange={(e) => setAdultPrice(parseInt(e.target.value))} />
                                    </div>
                                    <div>
                                        <Label htmlFor="adult-discount-price">Adult Discount Price</Label>
                                        <Input type="number" id="adult-discount-price" placeholder="Adult Discount Price(800)" value={adultDiscountPrice} onChange={(e) => setAdultDiscountPrice(parseInt(e.target.value))} />
                                    </div>
                                    <div>
                                        <Label htmlFor="child-price">Child Price</Label>
                                        <Input type="number" id="child-price" placeholder="Child Price(500)" value={childPrice} onChange={(e) => setChildPrice(parseInt(e.target.value))} />
                                    </div>
                                    <div>
                                        <Label htmlFor="child-discount-price">Child Discount Price</Label>
                                        <Input type="number" id="child-discount-price" placeholder="Child Discount Price(400)" value={childDiscountPrice} onChange={(e) => setChildDiscountPrice(parseInt(e.target.value))} />
                                    </div>
                                    <div>
                                        <Label htmlFor="infant-price">Infant Price</Label>
                                        <Input type="number" id="infant-price" placeholder="Infant Price(200)" value={infantPrice} onChange={(e) => setInfantPrice(parseInt(e.target.value))} />
                                    </div>
                                    <div>
                                        <Label htmlFor="infant-discount-price">Infant Discount Price</Label>
                                        <Input type="number" id="infant-discount-price" placeholder="Infant Discount Price(150)" value={infantDiscountPrice} onChange={(e) => setInfantDiscountPrice(parseInt(e.target.value))} />
                                    </div>
                                    <div>
                                        <Label htmlFor="job-holder-services">Job Holder Services</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={jobHolderServices}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setJobHolderServices(data);
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
                                        <Label htmlFor="business-services">Business Services</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={businessServices}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setBusinessServices(data);
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
                                        <Label htmlFor="retired-services">Retired Services</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={retiredServices}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setRetiredServices(data);
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
                                        <Label htmlFor="job-holder-documents">Job Holder Documents</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={jobHolderDocuments}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setJobHolderDocuments(data);
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
                                        <Label htmlFor="business-documents">Business Documents</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={businessDocuments}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setBusinessDocuments(data);
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
                                        <Label htmlFor="retired-documents">Retired Documents</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={retiredDocuments}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setRetiredDocuments(data);
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
                                        <Label htmlFor="job-holder-terms">Job Holder Terms</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={jobHolderTerms}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setJobHolderTerms(data);
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
                                        <Label htmlFor="business-terms">Business Terms</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={businessTerms}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setBusinessTerms(data);
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
                                        <Label htmlFor="retired-terms">Retired Terms</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={retiredTerms}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setRetiredTerms(data);
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
                                        <Label htmlFor="job-holder-refunds">Job Holder Refunds</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={jobHolderRefunds}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setJobHolderRefunds(data);
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
                                        <Label htmlFor="business-refunds">Business Refunds</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={businessRefunds}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setBusinessRefunds(data);
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
                                        <Label htmlFor="retired-refunds">Retired Refunds</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={retiredRefunds}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setRetiredRefunds(data);
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
                                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800"
                                        onClick={(e) => {
                                            if (update) {
                                                updateVisa(category, e);
                                            } else {
                                                addVisa(e);
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
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Unique Name</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Country</TableHead>
                                    <TableHead className="w-3/6 px-2 py-1 text-white text-center">Description</TableHead>
                                    <TableHead className="w-1/6 px-2 py-1 text-white text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {visas.slice(startindex, endindex).map((visa, index) => (
                                    <TableRow key={index} className={cn("hover:bg-gray-200", index % 2 === 0 ? "bg-gray-100" : "bg-gray-50")}>
                                        <TableCell className="w-1/6 px-2 py-1 text-center">{visa.category}</TableCell>
                                        <TableCell className="w-1/6 px-2 py-1 text-center">{visa.country}</TableCell>
                                        <TableCell className="w-3/6 px-2 py-1 text-center">{visa.description}</TableCell>
                                        <TableCell className="w-1/6 px-2 py-1 text-center space-x-1">
                                            <Button className="bg-gray-900 hover:bg-gray-800" onClick={() => {
                                                setCategory(visa.category);
                                                setCountry(visa.country);
                                                setDescription(visa.description);
                                                setProcessingTime(visa.processingTime);
                                                setAdultPrice(visa.adultPrice);
                                                setAdultDiscountPrice(visa.adultDiscountPrice);
                                                setChildPrice(visa.childPrice);
                                                setChildDiscountPrice(visa.childDiscountPrice);
                                                setInfantPrice(visa.infantPrice);
                                                setInfantDiscountPrice(visa.infantDiscountPrice);
                                                setJobHolderServices(visa.jobHolderServices);
                                                setBusinessServices(visa.businessServices);
                                                setRetiredServices(visa.retiredServices);
                                                setJobHolderDocuments(visa.jobHolderDocuments);
                                                setBusinessDocuments(visa.businessDocuments);
                                                setRetiredDocuments(visa.retiredDocuments);
                                                setJobHolderTerms(visa.jobHolderTerms);
                                                setBusinessTerms(visa.businessTerms);
                                                setRetiredTerms(visa.retiredTerms);
                                                setJobHolderRefunds(visa.jobHolderRefunds);
                                                setBusinessRefunds(visa.businessRefunds);
                                                setRetiredRefunds(visa.retiredRefunds);
                                                setUpdate(true);

                                                const dialog = document.getElementById("add-user");
                                                dialog?.click();
                                            }}><EditOutlined /></Button>
                                            <Button className="bg-gray-900 hover:bg-gray-800" onClick={() => deleteVisa(visa.category)}><DeleteOutlined /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {visas.length !== 0 &&
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
                        {visas.slice(0, (Math.ceil(visas.length / rowsPerPage)) - 1 < 3 ? Math.ceil(visas.length / rowsPerPage) : 3).map((city, index) => (
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
                        {(Math.ceil(visas.length / rowsPerPage)) - 1 > 4 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {(Math.ceil(visas.length / rowsPerPage)) - 1 > 2 &&
                            <PaginationItem>
                                <PaginationLink href="#"
                                    className={cn({ "bg-gray-900 text-white": endindex >= visas.length }, "hover:bg-gray-900 hover:text-white")}
                                    onClick={() => {
                                        setStartIndex(Math.floor(visas.length / rowsPerPage) * rowsPerPage);
                                        setEndIndex(visas.length);

                                        setPage(Math.ceil(visas.length / rowsPerPage));
                                    }}>{Math.ceil(visas.length / rowsPerPage)}</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext href="#"
                                className={cn({ "cursor-not-allowed": endindex >= visas.length })}
                                onClick={() => {
                                    if (endindex < visas.length) {
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

