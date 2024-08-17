"use client";
import { CircleX } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";

export default function Sidebar({ open, setOpen }: { open: boolean, setOpen: any }) {
    const [selected, setSelected] = useState("Home");
    return (
        <>
            {/* <div className="py-16 text-center">
                <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-offcanvas-example" aria-label="Toggle navigation" data-hs-overlay="#hs-offcanvas-example">
                    Open
                </button>
            </div> */}
            {open &&
                <div id="hs-offcanvas-example" className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[100000] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" aria-label="Sidebar">
                    <button type="button" className="absolute top-0 end-0 p-4 text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-300 focus:outline-none" onClick={() => setOpen(false)}>
                        <CircleX size={20} className="hover:text-[#B31F24]" />
                    </button>
                    <div className="px-6">
                        <Image src={logo} alt="logo" width={150} height={120} />
                    </div>
                    <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                        <ul className="space-y-1.5">
                            <ol>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg " href="/#" style={{ backgroundColor: selected === "Home" ? "#B31F24" : "", color: selected === "Home" ? "white" : "#B31F24" }}
                                    onClick={() => setSelected("Home")}>
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                    Home
                                </a>
                            </ol>

                            <ol>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg " href="/#about" style={{ backgroundColor: selected === "About" ? "#B31F24" : "", color: selected === "About" ? "white" : "#B31F24" }} onClick={() => setSelected("About")}>
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="8" /></svg>
                                    About
                                </a>
                            </ol>

                            <ol>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg " href="/#countries" style={{ backgroundColor: selected === "Countries" ? "#B31F24" : "", color: selected === "Countries" ? "white" : "#B31F24" }}
                                    onClick={() => setSelected("Countries")}>
                                    {/* //Globe svg */}
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 5H8a15.3 15.3 0 0 1 4-5z" /><path d="M12 22a15.3 15.3 0 0 1-4-5h8a15.3 15.3 0 0 1-4 5z" /></svg>
                                    Countries
                                </a>
                            </ol>

                            <ol>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg " href="/#packages" style={{ backgroundColor: selected === "Packages" ? "#B31F24" : "", color: selected === "Packages" ? "white" : "#B31F24" }}
                                    onClick={() => setSelected("Packages")}>
                                    {/* //Package svg */}
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><line x1="7" y1="12" x2="17" y2="12" /></svg>
                                    Packages
                                </a>
                            </ol>

                            <ol>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg " href="/#videos" style={{ backgroundColor: selected === "Videos" ? "#B31F24" : "", color: selected === "Videos" ? "white" : "#B31F24" }}
                                    onClick={() => setSelected("Videos")}>
                                    {/* //Video svg */}
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                                    Travel Videos
                                </a>
                            </ol>

                            <ol>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg " href="/#blogs" style={{ backgroundColor: selected === "Blogs" ? "#B31F24" : "", color: selected === "Blogs" ? "white" : "#B31F24" }}
                                    onClick={() => setSelected("Blogs")}>
                                    {/* //Blog svg */}
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 6a9 9 0 0 1-18 0" /><path d="M4 6a9 9 0 0 1 5 8 9 9 0 0 1 9 9" /></svg>
                                    Blogs
                                </a>
                            </ol>

                            <ol>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg text-white" href="/#contact" style={{ backgroundColor: selected === "Contact" ? "#B31F24" : "", color: selected === "Contact" ? "white" : "#B31F24" }}
                                    onClick={() => setSelected("Contact")}>
                                    {/* //Envelope svg */}
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="8" x2="19" y2="15" /><line x1="5" y1="15" x2="12" y2="8" /></svg>
                                    Contact
                                </a>
                            </ol>
                        </ul>
                    </nav>
                </div>
            }
        </>
    );
}
