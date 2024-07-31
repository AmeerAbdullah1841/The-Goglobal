"use client";
import logo from "../../../public/logowhite.png";
import Image from "next/image";
import { FacebookFilled, InstagramFilled, TwitterSquareFilled, LinkedinFilled } from "@ant-design/icons";
import fbr from "../../../public/fbr.png";
import dots from "../../../public/dots.png";
import lcoci from "../../../public/lcoci.png";


export default function Footer() {

    const footerLinks = [
        {
            name: "Home",
            link: "/#",
        },
        {
            name: "About",
            link: "#about",
        },
        {
            name: "NewsLetter",
            link: "/#newsletter",
        },
        {
            name: "Testimonials",
            link: "/#testimonials",
        },
    ];

    return (
        //code for footer using tailwind css with first column as logo, facebook, instagram, twitter, linkedin, and second column as all the links to the pages and last column as the newsletter form

        <footer className="bg-[#000] pt-10 sm:mt-10">
            <div className="max-w-6xl m-auto text-[#000] flex flex-wrap justify-left">
                <div className="p-5 w-[25%] flex justify-center items-center flex-col">
                    <a href="/#"><Image src={logo} alt="logo" width={200} height={200} /></a>
                    <div className="mt-2 flex space-x-2 cursor-pointer">
                        <FacebookFilled className="text-white text-xl hover:text-[#B31F24] transition-all duration-300" />
                        <InstagramFilled className="text-white text-xl hover:text-[#B31F24] transition-all duration-300" />
                        <TwitterSquareFilled className="text-white text-xl hover:text-[#B31F24] transition-all duration-300" />
                        <LinkedinFilled className="text-white text-xl hover:text-[#B31F24] transition-all duration-300" />
                    </div>
                </div>
                <div className="p-5 w-[41%] flex flex-col justify-center items-center">
                    <div className="text-xs uppercase text-gray-400 font-medium">Links</div>
                    {footerLinks.map((link, index) => (
                        <a key={index} href={link.link} className="my-3 block text-gray-300 hover:text-white transition-all duration-300">{link.name}</a>
                    ))}
                </div>
                <div className="p-5 w-1/3">
                    <div className="text-xs uppercase text-gray-400 font-medium">Get in touch</div>
                    <p className="my-3 text-gray-300">
                        <a href="tel:+92 311 4077770" className="hover:text-white transition-all duration-300">
                            +92 311 4077770
                        </a>
                    </p>
                    <p className="my-3 text-gray-300">
                        <a href="mailto:goglobal@goglobal.com.pk" className="hover:text-white transition-all duration-300">
                            goglobal@goglobal.com.pk
                        </a>
                    </p>
                    <p className="my-3 text-gray-300 border-t pt-3">
                        443 Q, Commercial Area, Phase II,
                        DHA, Lahore, Pakistan.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center border-t border-gray-800 py-8 space-y-6">
                <h3 className="text-xl text-center text-white">Certificates and Affiliations</h3>
                <div className="flex">
                    <Image src={dots} alt="dots" className="w-[100px] h-[90px]" />
                    <Image src={fbr} alt="fbr" className="w-[180px] h-[100px] ml-7" />
                    <Image src={lcoci} alt="lcoci" className="w-[180px] h-[100px]" />
                </div>
            </div>
            <div className="pt-2">
                <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-400 text-sm max-w-6xl items-center justify-center">
                    <div className="">
                        <p className="text-sm text-gray-400 text-center">© 2024
                            <a href="/" className="text-[#B31F24]"> GoGlobal</a>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}