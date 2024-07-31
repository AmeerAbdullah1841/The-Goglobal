import Image from "next/image";
import bestprice from "../../../public/bestprice.png";
import bestselection from "../../../public/bestselection.png";
import bestsupport from "../../../public/bestsupport.png";
import paymentoptions from "../../../public/paymentoptions.png";
export default function AboutWrite() {
    return (
        <div className="w-[100%] flex items-center justify-center space-x-8">
            <div className="w-1/4 flex flex-col items-center justify-center space-y-1 p-6 bg-white shadow-md rounded-lg">
                <Image src={bestprice} alt="bestprice" width={50} height={50} />
                <h3 className="font-[900] text-xl text-center">Best Price</h3>
                <p className="text-justify">Found a lower price elsewhere? We'll match it! No matter it’s flights or tours or hotels.
                </p>
            </div>
            <div className="w-1/4 flex flex-col items-center justify-center space-y-1 p-6 bg-white shadow-md rounded-lg">
                <Image src={bestselection} alt="bestselection" width={100} height={110} />
                <h3 className="font-[900] text-xl text-center pt-4">Best Selection</h3>
                <p className="text-justify">We choose best transport, guides and hotels as per your budget so you only get the best quality tours.
                </p>
            </div>
            <div className="w-1/4 flex flex-col items-center justify-center space-y-1 p-6 bg-white shadow-md rounded-lg">
                <Image src={bestsupport} alt="bestsupport" width={50} height={50} />
                <h3 className="font-[900] text-xl text-center">Best Support</h3>
                <p className="text-justify">We are available for support or questions. We are easily reachable via office visit, chat, emails, calls.
                </p>
            </div>
            <div className="w-1/4 flex flex-col items-center justify-center space-y-1 p-6 bg-white shadow-md rounded-lg">
                <Image src={paymentoptions} alt="paymentoptions" width={70} height={70} />
                <h3 className="font-[900] text-xl text-center">Payment Options</h3>
                <p className="text-justify">We have different payment options for your ease like we accept cash, cheques and credit / debit cards.
                </p>
            </div>
        </div>
    );
}