import Image from "next/image";
import aboutImage from "../../../public/about.jpg";

export default function AboutImage() {
    return (
        <div className="flex w-[45%] justify-center items-center">
            <Image src={aboutImage} alt="about" className="w-full h-[650px]" />
        </div>
    );
}
