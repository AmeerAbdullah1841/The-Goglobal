'use client';
import blur from '../../../public/blur.jpeg';
import Card from './card';
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

interface package1 {
    title: string;
    country: string;
    categories: string[];
    status: string;
    featured: string;
    image: string;
    webShow?: boolean;
}
export default function Packages() {
    const [countries, setCountries] = useState<package1[]>([]);

    async function getCountries() {
        const countriesCollection = query(collection(db, "packages"), where("webShow", "==", true));
        const countriesSnapshot = await getDocs(countriesCollection);

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
        <div className="flex-col w-full justify-center items-center px-20 py-16" style={{ display: countries.length > 0 ? 'flex' : 'none' }} id="packages">
            <h2 className="font-[900] mb-5 uppercase text-4xl text-center">Top <span className="text-[#B31F24]">Packages</span></h2>
            <div className="flex w-full items-center space-x-8">
                {/* //first 4 countries */}
                {countries.slice(0, 4).map((country, index) => (
                    <Card key={index} image={country.image} text={country.title} />
                ))}
            </div>
            <div className="flex w-full items-center space-x-8 mt-8">
                {/* //next 4 countries */}
                {countries.slice(4, 8).map((country, index) => (
                    <Card key={index} image={country.image} text={country.title} />
                ))}
            </div>
        </div>
    );
}