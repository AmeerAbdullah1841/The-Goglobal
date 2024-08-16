"use client";
import packagemain from "../../../public/packagemain.png";
import Image from "next/image";
import { db } from "@/config/db/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Faq from "react-faq-component";


export default function Package1({ id }: { id: string }) {
    const [data, setData] = useState<any>({});
    const [itenary, setItenary] = useState<any>({});
    const [faq, setFaq] = useState<any>({});

    const itenaryStyles = {
        bgColor: 'white',
        titleTextColor: '#B31F24',
        rowTitleColor: '#B31F24',
        rowContentColor: 'black',
        arrowColor: "#B31F24",
        titleTextSize: '1.5em',
        rowTitleTextSize: '1em',
        rowContentPaddingTop: '10px',
        rowContentPaddingBottom: '10px',
        rowContentPaddingLeft: '50px',
        rowContentPaddingRight: '50px',
        arrowPadding: '10px',
    };

    const config = {
        animate: true,
        arrowIcon: "v",
        tabFocus: true
    };

    async function fetchData() {
        // const q = collection(db, "packages");
        const q1 = doc(db, "packages", id);
        const querySnapshot = await getDoc(q1);
        if (!querySnapshot.exists()) {
            console.log("No such document!");
        } else {
            let obj: any = querySnapshot.data();
            obj.id = querySnapshot.id;

            setData(obj);
            setItenary({
                rows: obj.itinerary?.map((item: any, index: number) => {
                    return {
                        title: `Day ${index + 1}`,
                        content: `<div class="flex flex-col space-y-5">
                        <div class="flex flex-col space-y-2">
                            <h3 class="text-base font-bold text-[#B31F24]">Description:</h3>
                            <p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${item.description}</p>
                        </div>
                        <div class="flex flex-col space-y-2">
                            <h3 class="text-base font-bold text-[#B31F24]">Guidelines:</h3>
                            <p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${item.guidelines}</p>
                        </div>
                    </div>`
                    }
                }
                )
            });

            setFaq({
                rows: [
                    {
                        title: "Overview",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.overview}</p>`
                    },
                    {
                        title: "Accomodation",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.accommodation}</p>`
                    },
                    {
                        title: "Inclusions",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.inclusions}</p>`
                    },
                    {
                        title: "Exclusions",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.exclusions}</p>`
                    },
                    {
                        title: "Child Policy",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.childPolicy}</p>`
                    },
                    {
                        title: "Payment Policy",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.paymentPolicy}</p>`
                    },
                    {
                        title: "Transportation",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.transportation}</p>`
                    },
                    {
                        title: "Package Highlights",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.packageHighlights}</p>`
                    },
                    {
                        title: "Sightseeing",
                        content: `<p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.sightseeing}</p>`
                    },
                ]
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="mt-16 flex-col" style={{ display: data ? "flex" : "none" }}>
            <div className="flex relative">
                <Image src={packagemain} alt="package" />
                <div className="absolute top-1/2 transform -translate-y-1/2 mx-10 flex flex-col space-y-3">
                    <h1 className="text-4xl font-extrabold text-[#B31F24]">{id}</h1>
                    <h4 className="text-xl font-bold text-[#B31F24]">{data.country}</h4>
                </div>
            </div>
            <div className="w-full py-8 px-10 flex flex-col space-y-8">
                <div className="flex space-x-2 items-center">
                    <h3 className="text-xl font-bold text-[#B31F24]">Category:</h3>
                    {data.categories !== undefined && data.categories !== 0 &&
                        <h3 className="text-base text-black">{data.categories.map((item: any, index: number) => {
                            if (index === data.categories.length - 1) {
                                return item;
                            }
                            return item + ", ";
                        })}</h3>
                    }
                </div>
                <div className="flex flex-col space-y-2">
                    <h3 className="text-xl font-bold text-[#B31F24]">Description:</h3>
                    <p className="text-base text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: data.description }}></p>
                </div>
                <div className="w-3/4 flex-col space-y-2" style={{ display: data.itinerary !== undefined && data.itinerary !== 0 ? "block" : "none" }}>
                    <h3 className="text-xl font-bold text-[#B31F24]">Itenary:</h3>
                    <Faq data={itenary} styles={itenaryStyles} config={config} />
                </div>
                <div className="w-3/4 flex-col space-y-2" style={{ display: data.overview !== undefined && data.overview !== 0 ? "block" : "none" }}>
                    <h3 className="text-xl font-bold text-[#B31F24]">Details:</h3>
                    <Faq data={faq} styles={itenaryStyles} config={config} />
                </div>
            </div>
        </div>
    )
}