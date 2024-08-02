"use client";
import TestimonialCard from "./card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function Testimonial() {
    const testimonials = [
        {
            name: "Razzaq sab",
            testimonial: "Go Global's exceptional service made our trip unforgettable, handling every detail with precision and care."
        },
        {
            name: "Ameer Abdullah",
            testimonial:"Thanks to Go Global, our vacation was seamless and stress-free, allowing us to fully enjoy our travel experience."

        },
        {
            name: "Ahmed Sheraz",
            testimonial: "Go Global's dedication to customer satisfaction ensured that our journey was smooth and enjoyable from start to finish."
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