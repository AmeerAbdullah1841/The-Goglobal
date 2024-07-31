'use client';
import blur from '../../../public/blur.jpeg';
import Card from './card';
import { db } from "@/config/db/firebase";
import { collection, getDocs, where, query, limit, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

interface Country {
    title: string;
    code: string;
    description: string;
    banner: string;
    featured: string;
    status: string;
    webShow?: boolean;
}
export default function Destinations() {
    const [countries, setCountries] = useState<Country[]>([]);

    async function getCountries() {
        const countriesCollection = query(collection(db, "countries"), where("webShow", "==", true));
        const countriesSnapshot = await getDocs(countriesCollection);

        const countriesList: Country[] = [];
        countriesSnapshot.forEach((doc) => {
            let data = {
                title: doc.id,
                code: doc.data().code,
                description: doc.data().description,
                banner: doc.data().banner,
                featured: doc.data().featured,
                status: doc.data().status,
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
        <div className="flex-col w-full justify-center items-center px-20 py-16" style={{ display: countries.length > 0 ? 'flex' : 'none' }}>
            <h2 className="font-[900] mb-5 uppercase text-4xl text-center">Top <span className="text-[#B31F24]">Destinations </span> to Visit</h2>
            <div className="flex w-full items-center space-x-8">
                {/* //first 4 countries */}
                {countries.slice(0, 4).map((country, index) => (
                    <Card key={index} image={country.banner} text={country.title} />
                ))}
            </div>
            <div className="flex w-full items-center space-x-8 mt-8">
                {/* //next 4 countries */}
                {countries.slice(4, 8).map((country, index) => (
                    <Card key={index} image={country.banner} text={country.title} />
                ))}
            </div>
        </div>
    );
}