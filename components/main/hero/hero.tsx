"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import hero1 from "../../../public/hero1.jpg";

export default function Hero() {
    return (
        <div className="relative mt-16">
            <Carousel
                arrows={true}
                showDots={false}
                ssr={true}
                responsive={{
                    desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 1,
                    },
                    tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 1,
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
                <div>
                    <Image src={hero1} alt="hero1" />
                </div>
                <div>
                    <Image src={hero1} alt="hero1" />
                </div>
            </Carousel>
        </div>
    );
}