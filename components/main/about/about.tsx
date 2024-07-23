import AboutImage from "./image";
import AboutWrite from "./write";

export default function About() {
    return (
        <div className="flex flex-col w-full justify-center items-center px-20 py-24">
            <h2 className="font-[900] mb-6 capitalize text-4xl text-center">Why <span className="text-[#E85B5D]">GoGlobal</span></h2>
            <div className="flex w-full justify-center items-center space-x-10">
                <AboutWrite />
                <AboutImage />
            </div>
        </div>
    );
}