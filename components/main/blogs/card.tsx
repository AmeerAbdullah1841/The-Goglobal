// import Image, { StaticImageData } from 'next/image';

export default function Card({ image, text }: { image: string, text: string }) {
    return (
        <div className="flex flex-col h-[300px] items-center bg-white shadow-md space-y-2 mx-2 cursor-pointer">
            <img src={image} alt="package" className="w-full h-[250px] object-cover" />
            <h3 className="font-[800] text-xl text-[#B31F24]">{text}</h3>
        </div>
    );
}