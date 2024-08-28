'use client';
// import blur from '@/public/blur.jpeg';
import Card from "@/components/main/toppackages/card";
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Navbar from '@/components/main/navbar/navbar';
import Footer from '@/components/main/footer/footer';
import packageMain from "@/public/packagemain.png";
import Image from 'next/image';

interface package1 {
    title: string;
    country: string;
    categories: string[];
    status: string;
    featured: string;
    image: string;
    webShow?: boolean;
}
export default function CountryWisePackage({ params }: { params: { id: string } }) {
    // replace all %20 with space
    let country = params.id.replace(/%20/g, " ");
    const [countries, setCountries] = useState<package1[]>([]);

    async function getCountries() {
        const countriesCollection = query(collection(db, "packages"), where("country", "==", country));
        const countriesSnapshot = await getDocs(countriesCollection);
        if (countriesSnapshot.empty) {
            window.location.href = '/';
        }
        const countriesList: package1[] = [];
        countriesSnapshot.forEach((doc) => {
            let data = {
                title: doc.id,
                country: doc.data().country,
                categories: doc.data().categories,
                status: doc.data().status,
                featured: doc.data().featured,
                image: doc.data().picture,
                webShow: doc.data().webShow
            }
            countriesList.push(data);
        }
        );
        setCountries(countriesList);
    }

    useEffect(() => {
        getCountries();
    }, []);
    return (
        <div className="flex-col w-full justify-center items-center" style={{ display: countries.length > 0 ? 'flex' : 'none' }} id="packages">
            <Navbar />
            <div className="relative w-full mt-16">
                <Image src={packageMain} alt="packageMain" className='w-full object-cover' />
                <h2 className="absolute top-1/2 ml-20 transform -translate-y-1/2 text-black uppercase font-[900] text-4xl">Packages in <span className="text-[#B31F24]">{country}</span></h2>
            </div>
            {/* <h2 className="font-[900] mb-5 uppercase text-4xl text-center">Top <span className="text-[#B31F24]">Packages</span></h2> */}
            <div className="flex flex-wrap w-full items-center space-x-8 px-20 py-16">
                {/* //first 4 countries */}
                {countries.map((country, index) => (
                    <Card key={index} image={country.image} text={country.title} />
                ))}
            </div>
            <div className='w-full'>
                <Footer />
            </div>
        </div>
    );
}