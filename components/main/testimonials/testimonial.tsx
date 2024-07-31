"use client";
import TestimonialCard from "./card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function Testimonial() {
    const testimonials = [
        {
            name: "Obaid-ur-Rehman",
            testimonial: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            name: "Ameer Abdullah",
            testimonial: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            name: "Anoyomous User",
            testimonial: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        }
    ];
    return (
        <div className="w-full flex justify-between flex-col px-20 py-24 relative" id="testimonials">
            <h2 className="font-[900] mb-5 uppercase text-4xl text-center">What our <span className="text-[#B31F24]">customers</span> say</h2>
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
                        items: 3,
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
                {testimonials.map((testimonial) => (
                    <TestimonialCard name={testimonial.name} testimonial={testimonial.testimonial} />
                ))}
            </Carousel>
        </div>
    );
}