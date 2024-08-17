"use client";
import { useState } from 'react';

function FaqCard({ title, content }: { title: string, content: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="border rounded-md">
            <h2 className="cursor-pointer flex justify-between items-center p-4 font-bold" onClick={toggle} style={{ background: isOpen ? '#B31F24' : '#F7F7F7', color: isOpen ? 'white' : 'black' }}>
                {title}
                <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </h2>
            <div className={`transition-height duration-300 ${isOpen ? 'h-auto' : 'h-0'} overflow-hidden`}>
                <p className="my-2 mx-6" dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
        </div>
    );
}

export default FaqCard;