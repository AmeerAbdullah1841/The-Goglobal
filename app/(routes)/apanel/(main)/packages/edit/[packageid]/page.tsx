"use client";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiSelect } from 'primereact/multiselect';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { storage } from "@/config/db/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



interface country {
    id: string;
    name: string;
}

interface category {
    id: string;
    name: string;
}

interface selectedCategory {
    id: string;
}

interface itinerary {
    heading?: string;
    description?: string;
    guidelines?: string;
    breakfast?: boolean;
    lunch?: boolean;
    dinner?: boolean;
}

interface price {
    price?: number;
    hotel?: string;
    star3?: boolean;
    star4?: boolean;
    star5?: boolean;
    single?: boolean;
    double?: boolean;
    triple?: boolean;
}

export default function APanelCustomersEditPage({ params }: { params: { packageid: string } }) {
    const [pricesCount, setPricesCount] = useState<number>(1);
    const [daysCount, setDaysCount] = useState<number>(1);
    const [title, setTitle] = useState<string>(decodeURI(params.packageid));
    const [country, setCountry] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [validFrom, setValidFrom] = useState<string>("");
    const [validTo, setValidTo] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<selectedCategory[]>([]);
    const [description, setDescription] = useState<string>("");
    const [packageHighlights, setPackageHighlights] = useState<string>("");
    const [itinerary, setItinerary] = useState<itinerary[]>([]);
    const [pricing, setPricing] = useState<price[]>([]);
    const [overview, setOverview] = useState<string>("");
    const [sightseeing, setSightseeing] = useState<string>("");
    const [accommodation, setAccommodation] = useState<string>("");
    const [transportation, setTransportation] = useState<string>("");
    const [inclusions, setInclusions] = useState<string>("");
    const [exclusions, setExclusions] = useState<string>("");
    const [childPolicy, setChildPolicy] = useState<string>("");
    const [categories, setCategories] = useState<category[]>([]);
    const [countries, setCountries] = useState<country[]>([]);
    const [paymentPolicy, setPaymentPolicy] = useState<string>("");
    const [picture, setPicture] = useState<string>("");
    const [bigPicture, setBigPicture] = useState<string>("");
    const [pic1, setPic1] = useState<string>("");
    const [pic2, setPic2] = useState<string>("");
    const [pic3, setPic3] = useState<string>("");
    const [pic4, setPic4] = useState<string>("");


    const addPrice = () => {
        setPricesCount(pricesCount + 1);
    }

    const getCountries = async () => {
        const countrie: country[] = [];
        const q = query(collection(db, "countries"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return;
        }

        querySnapshot.forEach((doc) => {
            let data = {
                id: doc.id,
                name: doc.id
            }
            countrie.push(data);

        }
        );

        setCountries(countrie);
        setCountry(countrie[0].name);
    }

    const getCategories = async () => {
        const categori: category[] = [];
        const q = query(collection(db, "categories"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return;
        }

        querySnapshot.forEach((doc) => {
            let data = {
                id: doc.id,
                name: doc.id
            }
            categori.push(data);

        }
        );

        setCategories(categori);
        setCategory(categori[0].name);
    }

    const getPackage = async () => {
        const q = doc(db, "packages", decodeURI(params.packageid));
        const docSnap = await getDoc(q);

        if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(decodeURI(params.packageid));
            setCountry(data.country);
            setValidFrom(data.validFrom);
            setValidTo(data.validTo);
            setSelectedCategories(data.categories);
            setDescription(data.description);
            setPackageHighlights(data.packageHighlights);
            setItinerary(data.itinerary);
            setPricing(data.pricing);
            setOverview(data.overview);
            setSightseeing(data.sightseeing);
            setAccommodation(data.accommodation);
            setTransportation(data.transportation);
            setInclusions(data.inclusions);
            setExclusions(data.exclusions);
            setChildPolicy(data.childPolicy);
            setPaymentPolicy(data.paymentPolicy);
            setPicture(data.picture);
            setDaysCount(data.itinerary.length);
            setPricesCount(data.pricing.length);
            setBigPicture(data.bigPicture);
            setPic1(data.pic1);
            setPic2(data.pic2);
            setPic3(data.pic3);
            setPic4(data.pic4);
        }
    }

    useEffect(() => {
        getCountries();
        getCategories();
        getPackage();
    }, []);

    const clearFields = () => {
        setTitle(decodeURI(params.packageid));
        getCategories();
        getCountries();
        setValidFrom("");
        setValidTo("");
        setSelectedCategories([]);
        setDescription("");
        setPackageHighlights("");
        setItinerary([]);
        setPricing([]);
        setOverview("");
        setSightseeing("");
        setAccommodation("");
        setTransportation("");
        setInclusions("");
        setExclusions("");
        setChildPolicy("");
        setPaymentPolicy("");
        setPicture("");
        setDaysCount(1);
        setPricesCount(1);
        setBigPicture("");
        setPic1("");
        setPic2("");
        setPic3("");
        setPic4("");
    }

    const convertImageToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const editPackage = async () => {
        if (!title || !country || !validFrom || !validTo || !selectedCategories.length || !description || !itinerary.length || !pricing.length || !picture) {
            alert("Please fill all fields");
            return;
        }
        const data = {
            country: country,
            validFrom: validFrom,
            validTo: validTo,
            categories: selectedCategories,
            description: description,
            packageHighlights: packageHighlights,
            itinerary: itinerary,
            pricing: pricing,
            overview: overview,
            sightseeing: sightseeing,
            accommodation: accommodation,
            transportation: transportation,
            inclusions: inclusions,
            exclusions: exclusions,
            childPolicy: childPolicy,
            paymentPolicy: paymentPolicy,
            picture: picture,
            status: "Active",
            bigPicture: bigPicture,
            pic1: pic1,
            pic2: pic2,
            pic3: pic3,
            pic4: pic4,
        }

        try {
            const docRef = await updateDoc(doc(db, "packages", decodeURI(params.packageid)), data);
            clearFields();

            window.location.href = "/apanel/packages";
        } catch (e) {
            alert("Error Editing Package");
            console.error(e);
        }
    }

    return (
        <div className="flex flex-col space-y-5 p-4 overflow-y-auto h-full no-scrollbar">
            <h1 className="text-2xl font-bold">Edit Package</h1>
            <p className="text-sm text-gray-500">{picture ? "First Row Picture is already uploaded. If you want to change it, upload new picture" : "Upload First Picture"}</p>
            <p className="text-sm text-gray-500">{bigPicture ? "Big Picture is already uploaded. If you want to change it, upload new picture" : "Upload Big Picture"}</p>
            <p className="text-sm text-gray-500">{pic1 ? "Picture 1 is already uploaded. If you want to change it, upload new picture" : "Upload Picture 1"}</p>
            <p className="text-sm text-gray-500">{pic2 ? "Picture 2 is already uploaded. If you want to change it, upload new picture" : "Upload Picture 2"}</p>
            <p className="text-sm text-gray-500">{pic3 ? "Picture 3 is already uploaded. If you want to change it, upload new picture" : "Upload Picture 3"}</p>
            <p className="text-sm text-gray-500">{pic4 ? "Picture 4 is already uploaded. If you want to change it, upload new picture" : "Upload Picture 4"}</p>
            <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
                <legend className="text-lg font-bold">Main Information</legend>
                <Input placeholder="Title" className="w-[29.5%]" value={title} onChange={(e) => setTitle(e.target.value)}
                    disabled={true} />
                <div className="w-[29.5%]">
                    <Select value={country} onValueChange={(value) => setCountry(value)}>
                        <SelectTrigger>
                            <SelectValue>{country}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {countries.map((category) => (
                                    <SelectItem key={category.id} value={category.name}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Input placeholder="Duration in Days" className="w-[9.5%]" type="number" value={daysCount} onChange={(e) => setDaysCount(parseInt(e.target.value))} />
                <Input placeholder="Picture" className="w-[27.5%]" type="file" onChange={async (e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    const base64 = await convertImageToBase64(file);
                    setPicture(base64);
                }} />
                <div className="w-[19%] flex flex-col space-y-1">
                    <Label>Big Picture (600px * 400px) </Label>
                    <Input placeholder="Big Picture" type="file" onChange={async (e) => {
                        if (!e.target.files) return;
                        const file = e.target.files[0];
                        const uploadTask = await uploadBytes(ref(storage, `bigPictures/${file.name}`), file);
                        const downloadURL = await getDownloadURL(uploadTask.ref);
                        setBigPicture(downloadURL);
                    }
                    } />
                </div>
                <div className="w-[18.5%] flex flex-col space-y-1">
                    <Label>Picture 1 (300px * 200px) </Label>
                    <Input placeholder="Picture 1" type="file" onChange={async (e) => {
                        if (!e.target.files) return;
                        const file = e.target.files[0];
                        const uploadTask = await uploadBytes(ref(storage, `pictures/${file.name}`), file);
                        const downloadURL = await getDownloadURL(uploadTask.ref);
                        setPic1(downloadURL);
                    }
                    } />
                </div>
                <div className="w-[18.5%] flex flex-col space-y-1">
                    <Label>Picture 2 (300px * 200px) </Label>
                    <Input placeholder="Picture 2" type="file" onChange={async (e) => {
                        if (!e.target.files) return;
                        const file = e.target.files[0];
                        const uploadTask = await uploadBytes(ref(storage, `pictures/${file.name}`), file);
                        const downloadURL = await getDownloadURL(uploadTask.ref);
                        setPic2(downloadURL);
                    }
                    } />
                </div>
                <div className="w-[18.5%] flex flex-col space-y-1">
                    <Label>Picture 3 (300px * 200px) </Label>
                    <Input placeholder="Picture 3" type="file" onChange={async (e) => {
                        if (!e.target.files) return;
                        const file = e.target.files[0];
                        const uploadTask = await uploadBytes(ref(storage, `pictures/${file.name}`), file);
                        const downloadURL = await getDownloadURL(uploadTask.ref);
                        setPic3(downloadURL);
                    }
                    } />
                </div>
                <div className="w-[18.5%] flex flex-col space-y-1">
                    <Label>Picture 4 (300px * 200px) </Label>
                    <Input placeholder="Picture 4" type="file" onChange={async (e) => {
                        if (!e.target.files) return;
                        const file = e.target.files[0];
                        const uploadTask = await uploadBytes(ref(storage, `pictures/${file.name}`), file);
                        const downloadURL = await getDownloadURL(uploadTask.ref);
                        setPic4(downloadURL);
                    }
                    } />
                </div>
                <div className="w-[32.5%]">
                    <Label>Valid From</Label>
                    <Input type="date" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />
                </div>
                <div className="w-[32.5%]">
                    <Label>Valid To</Label>
                    <Input type="date" value={validTo} onChange={(e) => setValidTo(e.target.value)} />
                </div>
                <div className="w-[32.5%] flex flex-col">
                    <Label>Categories</Label>
                    <MultiSelect optionLabel="name" optionValue="id" options={categories} className="w-full items-center rounded-sm bg-white py-1.5 pl-4 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 mt-1 h-10"
                        placeholder="Select Categories" value={selectedCategories} onChange={(e) => setSelectedCategories(e.value)} />
                </div>
                <div className="w-[49%] flex flex-col space-y-1">
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
                <div className="w-[49%] flex flex-col space-y-1">
                    <Label htmlFor="description">Package Highlights</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={packageHighlights}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setPackageHighlights(data);
                        }}
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
            </fieldset>
            {daysCount > 0 &&
                <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
                    <legend className="text-lg font-bold">Itinerary</legend>
                    {[...Array(daysCount)].map((_, index) => (
                        <div key={index} className="w-[49%] flex flex-col space-y-3 border border-gray-500 p-2 rounded-md">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="price">Day {index + 1}</Label>
                            </div>
                            <Input placeholder="Heading" className="w-[100%]"
                                value={itinerary[index]?.heading}
                                onChange={(e) => {
                                    const newItinerary = [...itinerary];
                                    //also check if index is present or heading in index is present
                                    if (newItinerary[index] === undefined) {
                                        newItinerary[index] = {
                                            heading: "",
                                            description: "",
                                            guidelines: "",
                                            breakfast: false,
                                            lunch: false,
                                            dinner: false,
                                        }
                                    }
                                    newItinerary[index].heading = e.target.value;
                                    setItinerary(newItinerary);
                                }} />
                            <div className="flex items-center pt-2">
                                <div className="w-[32.5%] flex items-center space-x-1">
                                    <Input type="checkbox" className="w-4 h-4"
                                        checked={itinerary[index]?.breakfast}
                                        onChange={(e) => {
                                            const newItinerary = [...itinerary];
                                            if (newItinerary[index] === undefined) {
                                                newItinerary[index] = {
                                                    heading: "",
                                                    description: "",
                                                    guidelines: "",
                                                    breakfast: false,
                                                    lunch: false,
                                                    dinner: false,
                                                }
                                            }
                                            newItinerary[index].breakfast = e.target.checked;
                                            setItinerary(newItinerary);
                                        }} />
                                    <Label>Breakfast</Label>
                                </div>
                                <div className="w-[32.5%] flex items-center space-x-1">
                                    <Input type="checkbox" className="w-4 h-4"
                                        checked={itinerary[index]?.lunch}
                                        onChange={(e) => {
                                            const newItinerary = [...itinerary];
                                            if (newItinerary[index] === undefined) {
                                                newItinerary[index] = {
                                                    heading: "",
                                                    description: "",
                                                    guidelines: "",
                                                    breakfast: false,
                                                    lunch: false,
                                                    dinner: false,
                                                }
                                            }
                                            newItinerary[index].lunch = e.target.checked;
                                            setItinerary(newItinerary);
                                        }} />
                                    <Label>Lunch</Label>
                                </div>
                                <div className="w-[32.5%] flex items-center space-x-1">
                                    <Input type="checkbox" className="w-4 h-4"
                                        checked={itinerary[index]?.dinner}
                                        onChange={(e) => {
                                            const newItinerary = [...itinerary];
                                            if (newItinerary[index] === undefined) {
                                                newItinerary[index] = {
                                                    heading: "",
                                                    description: "",
                                                    guidelines: "",
                                                    breakfast: false,
                                                    lunch: false,
                                                    dinner: false,
                                                }
                                            }
                                            newItinerary[index].dinner = e.target.checked;
                                            setItinerary(newItinerary);
                                        }} />
                                    <Label>Dinner</Label>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-[49%] flex flex-col space-y-1">
                                    <Label htmlFor="description">Description</Label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={itinerary[index]?.description}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            const newItinerary = [...itinerary];
                                            if (newItinerary[index] === undefined) {
                                                newItinerary[index] = {
                                                    heading: "",
                                                    description: "",
                                                    guidelines: "",
                                                    breakfast: false,
                                                    lunch: false,
                                                    dinner: false,
                                                }
                                            }
                                            newItinerary[index].description = data;
                                            setItinerary(newItinerary);
                                        }}
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
                                <div className="w-[49%] flex flex-col space-y-1">
                                    <Label htmlFor="description">GuideLines</Label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={itinerary[index]?.guidelines}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            const newItinerary = [...itinerary];
                                            if (newItinerary[index] === undefined) {
                                                newItinerary[index] = {
                                                    heading: "",
                                                    description: "",
                                                    guidelines: "",
                                                    breakfast: false,
                                                    lunch: false,
                                                    dinner: false,
                                                }
                                            }
                                            newItinerary[index].guidelines = data;
                                            setItinerary(newItinerary);
                                        }}
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
                            </div>
                        </div>
                    ))}
                </fieldset>
            }

            <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
                <legend className="text-lg font-bold">Pricing</legend>
                <div className="w-[100%]" >
                    <Button className="bg-gray-900 hover:bg-gray-800" onClick={addPrice}>Add Price</Button>
                </div>
                {[...Array(pricesCount)].map((_, index) => (
                    <div key={index} className="w-[49%] flex flex-col space-y-1 border border-gray-500 p-2 rounded-md">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="price">Price {index + 1}</Label>
                            <Button variant="ghost"
                                onClick={() => {
                                    const newPrices = [...pricing];
                                    newPrices.splice(index, 1);
                                    setPricing(newPrices);
                                    setPricesCount(pricesCount - 1);
                                }}
                            >
                                <DeleteOutlined className="text-red-500" />
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input placeholder="Price in USD" className="w-[49%]" type="number"
                                value={pricing[index]?.price}
                                onChange={(e) => {
                                    const newPrices = [...pricing];
                                    if (newPrices[index] === undefined) {
                                        newPrices[index] = {
                                            price: 0,
                                            hotel: "",
                                            star3: false,
                                            star4: false,
                                            star5: false,
                                            single: false,
                                            double: false,
                                            triple: false,
                                        }
                                    }
                                    newPrices[index].price = parseInt(e.target.value);
                                    setPricing(newPrices);
                                }} />
                            <Input placeholder="Hotel Name" className="w-[49%]"
                                value={pricing[index]?.hotel}
                                onChange={(e) => {
                                    const newPrices = [...pricing];
                                    if (newPrices[index] === undefined) {
                                        newPrices[index] = {
                                            price: 0,
                                            hotel: "",
                                            star3: false,
                                            star4: false,
                                            star5: false,
                                            single: false,
                                            double: false,
                                            triple: false,
                                        }
                                    }
                                    newPrices[index].hotel = e.target.value;
                                    setPricing(newPrices);
                                }} />
                        </div>
                        <div className="flex items-center pt-2">
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4"
                                    checked={pricing[index]?.star3}
                                    onChange={(e) => {
                                        const newPrices = [...pricing];
                                        if (newPrices[index] === undefined) {
                                            newPrices[index] = {
                                                price: 0,
                                                hotel: "",
                                                star3: false,
                                                star4: false,
                                                star5: false,
                                                single: false,
                                                double: false,
                                                triple: false,
                                            }
                                        }
                                        newPrices[index].star3 = e.target.checked;
                                        newPrices[index].star4 = false;
                                        newPrices[index].star5 = false;
                                        setPricing(newPrices);
                                    }} />
                                <Label>3 Star</Label>
                            </div>
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4"
                                    checked={pricing[index]?.star4}
                                    onChange={(e) => {
                                        const newPrices = [...pricing];
                                        if (newPrices[index] === undefined) {
                                            newPrices[index] = {
                                                price: 0,
                                                hotel: "",
                                                star3: false,
                                                star4: false,
                                                star5: false,
                                                single: false,
                                                double: false,
                                                triple: false,
                                            }
                                        }
                                        newPrices[index].star4 = e.target.checked;
                                        newPrices[index].star3 = false;
                                        newPrices[index].star5 = false;
                                        setPricing(newPrices);
                                    }} />
                                <Label>4 Star</Label>
                            </div>
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4"
                                    checked={pricing[index]?.star5}
                                    onChange={(e) => {
                                        const newPrices = [...pricing];
                                        if (newPrices[index] === undefined) {
                                            newPrices[index] = {
                                                price: 0,
                                                hotel: "",
                                                star3: false,
                                                star4: false,
                                                star5: false,
                                                single: false,
                                                double: false,
                                                triple: false,
                                            }
                                        }
                                        newPrices[index].star5 = e.target.checked;
                                        newPrices[index].star3 = false;
                                        newPrices[index].star4 = false;
                                        setPricing(newPrices);
                                    }} />
                                <Label>5 Star</Label>
                            </div>
                        </div>
                        <div className="flex items-center pt-2">
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4"
                                    checked={pricing[index]?.single}
                                    onChange={(e) => {
                                        const newPrices = [...pricing];
                                        if (newPrices[index] === undefined) {
                                            newPrices[index] = {
                                                price: 0,
                                                hotel: "",
                                                star3: false,
                                                star4: false,
                                                star5: false,
                                                single: false,
                                                double: false,
                                                triple: false,
                                            }
                                        }
                                        newPrices[index].single = e.target.checked;
                                        newPrices[index].double = false;
                                        newPrices[index].triple = false;
                                        setPricing(newPrices);
                                    }} />
                                <Label>Single</Label>
                            </div>
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4"
                                    checked={pricing[index]?.double}
                                    onChange={(e) => {
                                        const newPrices = [...pricing];
                                        if (newPrices[index] === undefined) {
                                            newPrices[index] = {
                                                price: 0,
                                                hotel: "",
                                                star3: false,
                                                star4: false,
                                                star5: false,
                                                single: false,
                                                double: false,
                                                triple: false,
                                            }
                                        }
                                        newPrices[index].double = e.target.checked;
                                        newPrices[index].single = false;
                                        newPrices[index].triple = false;
                                        setPricing(newPrices);
                                    }} />
                                <Label>Double Sharing</Label>
                            </div>
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4"
                                    checked={pricing[index]?.triple}
                                    onChange={(e) => {
                                        const newPrices = [...pricing];
                                        if (newPrices[index] === undefined) {
                                            newPrices[index] = {
                                                price: 0,
                                                hotel: "",
                                                star3: false,
                                                star4: false,
                                                star5: false,
                                                single: false,
                                                double: false,
                                                triple: false,
                                            }
                                        }
                                        newPrices[index].triple = e.target.checked;
                                        newPrices[index].single = false;
                                        newPrices[index].double = false;
                                        setPricing(newPrices);
                                    }} />
                                <Label>Triple Sharing</Label>
                            </div>
                        </div>
                    </div>
                ))}
            </fieldset>

            <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
                <legend className="text-lg font-bold">Other Information</legend>
                <div className="w-[32.5%] flex flex-col space-y-1">
                    <Label htmlFor="description">Overview</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={overview}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setOverview(data);
                        }}
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
                <div className="w-[32.5%] flex flex-col space-y-1">
                    <Label htmlFor="description">Sightseeing</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={sightseeing}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setSightseeing(data);
                        }}
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
                <div className="w-[32.5%] flex flex-col space-y-1">
                    <Label htmlFor="description">Accommodation</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={accommodation}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setAccommodation(data);
                        }}
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
                <div className="w-[32.5%] flex flex-col space-y-1">
                    <Label htmlFor="description">Transportation</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={transportation}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setTransportation(data);
                        }}
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
                <div className="w-[32.5%] flex flex-col space-y-1">
                    <Label htmlFor="description">Inclusions</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={inclusions}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setInclusions(data);
                        }}
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
                <div className="w-[32.5%] flex flex-col space-y-1">
                    <Label htmlFor="description">Exclusions</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={exclusions}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setExclusions(data);
                        }}
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
                <div className="w-[32.5%] flex flex-col space-y-1">
                    <Label htmlFor="description">Child Policy</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={childPolicy}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setChildPolicy(data);
                        }}
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
                <div className="w-[32.5%] flex flex-col space-y-1">
                    <Label htmlFor="description">Payment Policy</Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={paymentPolicy}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setPaymentPolicy(data);
                        }}
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
            </fieldset>
            <Button className="mt-4 w-[200px] bg-gray-900 hover:bg-gray-800"
                onClick={editPackage}
            >Edit Package</Button>
        </div>
    );
}