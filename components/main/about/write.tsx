import Image from "next/image";
import bestprice from "../../../public/bestprice.jpg";
import bestselection from "../../../public/bestselection.jpg";
import newselection from "../../../public/new selection.jpg";
import bestsupport from "../../../public/bestsupport.jpg";
import paymentoptions from "../../../public/paymentoptions.jpg";
export default function AboutWrite() {
    return (
        <div className="w-[100%] flex items-center justify-center space-x-8">
            <div className="w-1/4 flex h-[370px] flex-col items-center justify-center space-y-1 p-6 bg-white shadow-md rounded-lg">
                <Image src={bestprice} alt="bestprice" width={300} height={300} className="object-cover" />
                <h3 className="font-[900] text-xl text-center">Best Price</h3>
                <p className="text-justify">Found a lower price elsewhere? We'll match it! No matter it’s flights or tours or hotels.
                </p>
            </div>
            <div className="w-1/4 flex flex-col items-center justify-center h-[370px] space-y-1 p-6 bg-white shadow-md rounded-lg">
                <Image src={newselection} alt="bestselection" width={300} height={300} className="object-cover" />
                <h3 className="font-[900] text-xl text-center">Best Selection</h3>
                <p className="text-justify">We choose best transport, guides and hotels as per your budget so you only get the best quality tours.
                </p>
            </div>
            <div className="w-1/4 flex flex-col items-center justify-center space-y-1 h-[370px] p-6 bg-white shadow-md rounded-lg">
                <Image src={bestsupport} alt="bestsupport" width={300} height={300} className="object-cover" />
                <h3 className="font-[900] text-xl text-center">Best Support</h3>
                <p className="text-justify">We are available for support or questions. We are easily reachable via office visit, chat, emails, calls.
                </p>
            </div>
            <div className="w-1/4 flex flex-col items-center justify-center space-y-1 h-[370px] p-6 bg-white shadow-md rounded-lg">
                <Image src={paymentoptions} alt="paymentoptions" width={300} height={300} className="object-cover" />
                <h3 className="font-[900] text-xl text-center">Payment Options</h3>
                <p className="text-justify">We have different payment options for your ease like we accept cash, cheques and credit / debit cards.
                </p>
            </div>
        </div>
    );
}