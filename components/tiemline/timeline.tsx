"use client";
import { useState } from 'react';

const Timeline = ({ timelineData }: { timelineData: any[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);



    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="flex flex-col  w-full p-4">
            {timelineData.map((item, index) => (
                <div key={index} className="flex  w-full">
                    {/* Circle and Line */}
                    <div className="flex flex-col items-center mt-1">
                        <div
                            className={`flex items-center justify-center rounded-full w-4 h-4 bg-[#B31F24] text-white cursor-pointer transition-all duration-300 `}
                            onClick={() => handleClick(index)}
                        >
                        </div>
                        {/* Line between circles */}
                        {/* {index < timelineData.length - 1 && ( */}
                        <div className="w-px flex-1 bg-gray-300"></div>
                        {/* )} */}

                    </div>

                    {/* Content */}
                    <div className="ml-4 w-full">
                        <div
                            className="pb-4 cursor-pointer transition-all duration-300"
                            onClick={() => handleClick(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-[#B31F24]">{item.title}</h2>
                                {/* <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    ▼
                                </span> */}
                            </div>
                            <div
                                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${activeIndex === index ? 'max-h-[1000px]' : 'max-h-0'}`}
                            >
                                <p className="mt-2" dangerouslySetInnerHTML={{ __html: item.content }}>

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
