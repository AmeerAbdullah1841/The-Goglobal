"use client";
export default function TestimonialCard({ name, testimonial }: { name: string, testimonial: string }) {
    return (
        <div className="bg-[#B31F24] h-[380px] p-12 flex flex-col items-center mx-2">
            <h3 className="text-white text-2xl font-bold">{name}</h3>
            <p className="text-white text-lg text-justify mt-4">{testimonial}</p>
        </div>
    );
}