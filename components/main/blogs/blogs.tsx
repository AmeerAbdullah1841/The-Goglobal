"use client";
import Card from "./card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import { db } from "@/config/db/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Blog {
    title: string;
    description: string;
    banner: string;
    country: string;
    status: string;
}

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);


    async function getVideos() {
        const videosCollection = query(collection(db, "blogs"), where("status", "==", "Active"));
        const videosSnapshot = await getDocs(videosCollection);
        if (videosSnapshot.empty) {
            return;
        }

        let videosData: Blog[] = [];
        videosSnapshot.forEach((doc) => {
            videosData.push({
                title: doc.data().title,
                description: doc.data().description,
                banner: doc.data().banner,
                country: doc.data().country,
                status: doc.data().status,
            });
        });
        setBlogs(videosData);
    }

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <div className="w-full justify-between flex-col px-20 py-16 relative" id="testimonials" style={{ display: blogs.length === 0 ? 'none' : 'flex' }}>
            <h2 className="font-[900] mb-5 uppercase text-4xl text-center"><span className="text-[#B31F24]">Blogs</span></h2>
            {/* <div className="flex lg:flex-row flex-col justify-between space-y-2 space-x-0 lg:space-x-4 lg:space-y-0">
                {testimonials.map((testimonial) => (
                    <TestimonialCard name={testimonial.name} testimonial={testimonial.testimonial} />
                ))}
            </div> */}
            <Carousel
                arrows={true}
                showDots={false}
                ssr={true}
                responsive={{
                    desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 4,
                    },
                    tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 2,
                    },
                    mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                    },
                }}
                autoPlay={true}
                autoPlaySpeed={5000}
                infinite={true}
                draggable={true}
                swipeable={true}
                keyBoardControl={true}
            >
                {blogs.map((blog) => (
                    <Card image={blog.banner} text={blog.title} />
                ))}
            </Carousel>
        </div>
    );
}