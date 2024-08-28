export default function Card({ image, text, description }: { image: string, text: string, description: string }) {
    return (
        <div className="flex flex-col w-1/4 h-[280px] items-center bg-white shadow-md space-y-2 cursor-pointer relative group overflow-hidden"
            onClick={() => window.location.href = `/country/${text.replace(/ /g, "%20")}`}>
            <img
                src={image}
                alt="destination"
                className="w-full h-[280px] object-cover brightness-75 transition-all duration-300 ease-in-out group-hover:h-[250px]"
            />
            <div className="absolute bottom-0 w-full ml-4 mb-4 flex group-hover:hidden">
                <h3 className="text-white font-[800] text-xl ">{text}</h3>
            </div>
            <div className="absolute bottom-0 w-full h-[0%] bg-white transition-all duration-300 px-2 ease-in-out group-hover:h-[160px]  flex flex-col items-start">
                <h3 className="text-white font-[800] text-xl group-hover:text-[#B31F24] group-hover:my-1">{text}</h3>
                <p className="hidden text-[10px] overflow-y-auto no-scrollbar text-justify text-gray-500 group-hover:block" dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
        </div>
    );
}
