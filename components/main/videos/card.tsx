"use client";
export default function VideoCard({ url, text }: { url: string, text: string }) {
    return (
        <div className="flex flex-col h-[300px] items-center bg-white shadow-md space-y-2 mx-2 cursor-pointer">
            <video src={url} controls
                className="w-full h-[250px]" />
            <h3 className="font-[800] text-xl text-[#B31F24]">{text}</h3>
        </div>
    );
}