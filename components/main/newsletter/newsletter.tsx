export default function Newsletter() {
    return (
        <div className="flex items-center justify-center w-full p-16 bg-[#CECECE] space-x-14">
            <div className="flex flex-col items-center justify-center w-1/2">
                <h1 className="text-4xl font-bold">Subscribe to our <span className="text-[#E85B5D]">Newsletter</span></h1>
                <p className="mt-3">Save up to 50% on tours! Get exclusive access to members only deals by email.</p>
            </div>
            <div className="flex items-center justify-center w-1/2">
                <input type="email" placeholder="Enter your email address" className="p-2 w-96" />
                <button className="p-2 bg-[#E85B5D] text-white">Subscribe</button>
            </div>
        </div>
    );
}