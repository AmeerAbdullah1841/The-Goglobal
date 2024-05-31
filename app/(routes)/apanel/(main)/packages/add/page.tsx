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


interface country {
    id: number;
    name: string;
}

interface category {
    id: number;
    name: string;
}

export default function APanelCustomersAddPage() {
    const [pricesCount, setPricesCount] = useState<number>(1);
    const [daysCount, setDaysCount] = useState<number>(1);

    const addPrice = () => {
        setPricesCount(pricesCount + 1);
    }

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

    const categories: category[] = [
        {
            id: 1,
            name: "Category 1"
        },
        {
            id: 2,
            name: "Category 2"
        },
        {
            id: 3,
            name: "Category 3"
        },
        {
            id: 4,
            name: "Category 4"
        },
        {
            id: 5,
            name: "Category 5"
        },
        {
            id: 6,
            name: "Category 6"
        },
        {
            id: 7,
            name: "Category 7"
        },
        {
            id: 8,
            name: "Category 8"
        },
        {
            id: 9,
            name: "Category 9"
        },
        {
            id: 10,
            name: "Category 10"
        }
    ]
    return (
        <div className="flex flex-col space-y-5 p-4 overflow-y-auto h-full no-scrollbar">
            <h1 className="text-2xl font-bold">Add Package</h1>
            <fieldset className="space-y-2 space-x-2 flex flex-wrap items-center p-4 border border-gray-500 rounded-md">
                <legend className="text-lg font-bold">Main Information</legend>
                <Input placeholder="Title" className="w-[32.5%]" />
                <div className="w-[32.5%]">
                    <Select value="Select Category">
                        <SelectTrigger>
                            <SelectValue>Select Category</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.name}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Input placeholder="Duration in Days" className="w-[32.5%]" type="number" value={daysCount} onChange={(e) => setDaysCount(parseInt(e.target.value))} />
                <div className="w-[32.5%]">
                    <Label>Valid From</Label>
                    <Input type="date" />
                </div>
                <div className="w-[32.5%]">
                    <Label>Valid To</Label>
                    <Input type="date" />
                </div>
                <div className="w-[32.5%] flex flex-col">
                    <Label>Categories</Label>
                    <MultiSelect optionLabel="name" optionValue="id" options={categories} className="w-full items-center rounded-sm bg-white py-1.5 pl-4 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 mt-1 h-10"
                        placeholder="Select Categories" />
                </div>
                <div className="w-[49%] flex flex-col space-y-1">
                    <Label htmlFor="description">Description</Label>
                    <CKEditor
                        editor={ClassicEditor}
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
                            <Input placeholder="Heading" className="w-[100%]" />
                            <div className="flex items-center pt-2">
                                <div className="w-[32.5%] flex items-center space-x-1">
                                    <Input type="checkbox" className="w-4 h-4" />
                                    <Label>Breakfast</Label>
                                </div>
                                <div className="w-[32.5%] flex items-center space-x-1">
                                    <Input type="checkbox" className="w-4 h-4" />
                                    <Label>Lunch</Label>
                                </div>
                                <div className="w-[32.5%] flex items-center space-x-1">
                                    <Input type="checkbox" className="w-4 h-4" />
                                    <Label>Dinner</Label>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-[49%] flex flex-col space-y-1">
                                    <Label htmlFor="description">Description</Label>
                                    <CKEditor
                                        editor={ClassicEditor}
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
                                onClick={() => setPricesCount(pricesCount - 1)}><DeleteOutlined /></Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input placeholder="Price in USD" className="w-[49%]" type="number" />
                            <Input placeholder="Hotel Name" className="w-[49%]" />
                        </div>
                        <div className="flex items-center pt-2">
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4" />
                                <Label>3 Star</Label>
                            </div>
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4" />
                                <Label>4 Star</Label>
                            </div>
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4" />
                                <Label>5 Star</Label>
                            </div>
                        </div>
                        <div className="flex items-center pt-2">
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4" />
                                <Label>Single</Label>
                            </div>
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4" />
                                <Label>Double Sharing</Label>
                            </div>
                            <div className="w-[32.5%] flex items-center space-x-1">
                                <Input type="checkbox" className="w-4 h-4" />
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
            <Button className="mt-4 w-[200px] bg-gray-900 hover:bg-gray-800">Add Package</Button>
        </div>
    );
}