import AboutImage from "./image";
import AboutWrite from "./write";

export default function About() {
    return (
        <div className="flex flex-col w-full justify-center items-center px-20 py-16" id="about">
            <h2 className="font-[900] mb-5 uppercase text-4xl text-center">Why <span className="text-[#B31F24]">GoGlobal</span></h2>
            <div className="flex w-full justify-center items-center space-x-10">
                <AboutWrite />
                {/* <AboutImage /> */}
            </div>
        </div>
    );
}