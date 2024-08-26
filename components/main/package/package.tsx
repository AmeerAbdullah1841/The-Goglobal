"use client";
import packagemain from "../../../public/packagemain.png";
import Image from "next/image";
import { db } from "@/config/db/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import Faq from "react-faq-component";
import FaqCard from "@/components/faq/faq";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";
import { List } from "lucide-react";
import { CookingPot } from "lucide-react";
import { Bus } from "lucide-react";
import { Bed } from "lucide-react";
import { Camera } from "lucide-react";
import { Flame } from "lucide-react";
import { UserSearch } from "lucide-react";
import { BriefcaseMedical } from "lucide-react";
import Timeline from "@/components/tiemline/timeline";
import { Input } from "@/components/ui/input";


export default function Package1({ id }: { id: string }) {
    const [data, setData] = useState<any>({});
    const [itenary, setItenary] = useState<any>([]);
    const [faq, setFaq] = useState<any>([])
    const [people, setPeople] = useState<number>(1);

    const itenaryStyles = {
        bgColor: '#F7F7F7',
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
            let itenaryArr: any = [];

            for (let i = 0; i < obj.itinerary.length; i++) {
                itenaryArr.push({
                    title: `Day ${i + 1}`,
                    content: `<div class="flex flex-col space-y-5">
                        <div class="flex flex-col space-y-1">
                            <h3 class="text-base font-bold text-black">Description:</h3>
                            <p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.itinerary[i].description}</p>
                        </div>
                        <div class="flex flex-col space-y-1">
                            <h3 class="text-base font-bold text-black">Guidelines:</h3>
                            <p class="text-sm text-black text-justify pl-4" dangerouslySetInnerHTML={{ __html: ${obj.itinerary[i].guidelines}</p>
                        </div>
                    </div>
                    `
                });
            }

            setItenary(itenaryArr);




            setFaq([
                // {
                //     title: "Overview",
                //     content: `${obj.overview}`
                // },
                {
                    title: "Accomodation",
                    content: `${obj.accommodation}`
                },
                {
                    title: "Inclusions",
                    content: `${obj.inclusions}`
                },
                {
                    title: "Exclusions",
                    content: `${obj.exclusions}`
                },
                {
                    title: "Child Policy",
                    content: `${obj.childPolicy}`
                },
                {
                    title: "Payment Policy",
                    content: `${obj.paymentPolicy}`
                },
                {
                    title: "Transportation",
                    content: `${obj.transportation}`
                },
                // {
                //     title: "Package Highlights",
                //     content: `${obj.packageHighlights}`
                // },
                // {
                //     title: "Sightseeing",
                //     content: `${obj.sightseeing}`
                // },
            ]
            );
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="mt-16 flex-col" style={{ display: data.country !== undefined && data.country !== 0 ? "flex" : "none", margin: 100 }}>
            <div className="relative items-center space-x-4 px-8 py-4" style={{ display: data.bigPicture !== "" || data.pic1 !== "" || data.pic2 !== "" || data.pic3 !== "" || data.pic4 !== "" ? "flex" : "none" }}>
                <img src={data.bigPicture} alt="package" className="rounded-lg object-cover w-[600px] h-[410px]" />
                <div className="flex flex-col space-y-2 items-center">
                    <img src={data.pic1} alt="package" className="rounded-lg object-cover w-[300px] h-[200px]" />
                    <img src={data.pic2} alt="package" className="rounded-lg object-cover w-[300px] h-[200px]" />
                </div>
                <div className="flex flex-col space-y-2 items-center">
                    <img src={data.pic3} alt="package" className="rounded-lg object-cover w-[300px] h-[200px]" />
                    <img src={data.pic4} alt="package" className="rounded-lg object-cover w-[300px] h-[200px]" />
                </div>
                {/* <Image src={packagemain} alt="package" /> */}
                {/* <div className="absolute top-1/2 transform -translate-y-1/2 mx-10 flex flex-col space-y-3">
                    
                </div> */}
            </div>
            <div className="w-full py-8 px-10 flex flex-col space-y-8 relative">
                <div className="fixed w-1/4 flex-col space-y-4 py-4 px-6 right-[60px] bg-white rounded-md shadow-lg" style={{ display: data.pricing !== undefined && data.pricing !== 0 ? "flex" : "none" }}>
                    <h3 className="text-2xl font-bold text-[#B31F24]">Price Information</h3>
                    <h3 className="text-lg font-bold text-black flex items-center ">Rs {data.pricing ? data.pricing[0].price : 0} x <Input type="number" className="w-16 mx-2 outline-none" value={people} onChange={(e) => setPeople(parseInt(e.target.value))} /> People</h3>
                    <div className="border-t-2 border-gray-500 w-full"></div>
                    <h2 className="text-3xl font-extrabold text-black" style={{ display: people > 0 ? "block" : "none" }}>
                        Total: Rs {data.pricing ? parseInt(data.pricing[0].price) * people : 0 * people}
                    </h2>
                    <button className="bg-[#B31F24] text-white py-2 px-4 rounded-lg cursor-pointer">Book Now</button>
                </div>
                <div className="w-2/3 flex items-center space-x-6">
                    <h1 className="text-4xl font-[600] " style={{color:'#B31F24'}}>{id}</h1>
                </div>
                <div className="w-2/3 flex items-center space-x-6">
                    <div className="space-x-2 items-center font-bold" style={{ display: data.categories !== undefined && data.categories !== 0 ? "flex" : "none" }}>
                        {/* <h3 className="text-2xl font-bold text-[#B31F24]">Category:</h3> */}
                        <List size={18} color="black" className="font-bold mb-1" />
                        {data.categories !== undefined && data.categories !== 0 &&
                            <h3 className="text-base text-black">{data.categories.map((item: any, index: number) => {
                                if (index === data.categories.length - 1) {
                                    return item;
                                }
                                return item + ", ";
                            })}</h3>
                        }
                    </div>
                    <div className="space-x-2 items-center font-bold" style={{ display: data.itinerary !== undefined && data.itinerary !== 0 ? "flex" : "none" }}>
                        {/* <h3 className="text-2xl font-bold text-[#B31F24]">Duration:</h3> */}
                        <Clock size={18} color="black" className="font-bold mb-1" />
                        <h3 className="text-base text-black">{data.itinerary !== undefined && data.itinerary !== 0 ? data.itinerary.length + " Days" : ""}</h3>
                    </div>
                    <div className="space-x-2 items-center font-bold" style={{ display: data.country !== undefined && data.country !== 0 ? "flex" : "none" }}>
                        {/* <h3 className="text-2xl font-bold text-[#B31F24]">Country:</h3> */}
                        <MapPin size={18} color="black" className="font-bold mb-1" />
                        <h3 className="text-base text-black">{data.country}</h3>
                    </div>
                </div>
                <div className="w-2/3 border-b-2 border-[#B31F24] flex items-center space-x-10 pb-3">
                    <Camera size={40} color="#B31F24" className="font-[400]" />
                    <CookingPot size={40} color="#B31F24" className="font-[400]" />
                    <Bed size={40} color="#B31F24" className="font-[400]" />
                    <Flame size={40} color="#B31F24" className="font-[400]" />
                    <UserSearch size={40} color="#B31F24" className="font-[400]" />
                    <BriefcaseMedical size={40} color="#B31F24" className="font-[400]" />
                    <Bus size={40} color="#B31F24" className="font-[400]" />
                </div>
                <div className="w-2/3 flex-col space-y-2" style={{ display: data.description !== undefined && data.description !== 0 ? "flex" : "none" }}>
                    <h3 className="text-2xl font-bold text-[#B31F24]" style={{ fontSize: 30 }} >Description:</h3>
                    <p className="text-base text-black text-justify pl-4" style={{ margin: 13, fontSize: 16, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: data.description }}></p>
                </div>
                <div className="w-2/3 flex-col space-y-2" style={{ display: data.itinerary !== undefined && data.itinerary !== 0 ? "flex" : "none" }}>
                    <h3 className="text-2xl font-bold text-[#B31F24]" style={{ fontSize: 30 }}>Itinerary:</h3>
                    {/* <Faq data={itenary} styles={itenaryStyles} config={config} /> */}
                    <Timeline timelineData={itenary} style={{ margin: 13, fontSize: 16, lineHeight: 1.5 }} />
                </div>
                <div className="w-2/3 flex-col space-y-2" style={{ display: faq !== undefined && faq !== 0 ? "flex" : "none" }}>
                    <h3 className="text-2xl font-bold text-[#B31F24]">Details:</h3>
                    {faq.map((item: any) => {
                        return <FaqCard title={item.title} content={item.content} />
                    })}
                </div>
            </div>
        </div>
    )
}