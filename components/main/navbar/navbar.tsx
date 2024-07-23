import Image from "next/image";
import logo from "../../../public/logo.png";
import { PhoneFilled } from "@ant-design/icons";
import { MailFilled } from "@ant-design/icons";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-3 w-full bg-white shadow-md fixed top-0 z-50">
            <Image src={logo} alt="logo" width={150} height={120} />
            <div className="flex items-center space-x-4">
                <a href="tel:+92 311 4077770" className="flex items-center space-x-1 text-sm">
                    <PhoneFilled style={{ color: "gray" }} className="rotate-90" />
                    <span className="text-gray-500">+92 311 4077770</span>
                </a>
                <a href="mailto:goglobal@goglobal.com.pk" className="flex items-center space-x-1 text-sm">
                    <MailFilled style={{ color: "gray" }} />
                    <span className="text-gray-500">
                        goglobal@goglobal.com.pk
                    </span>
                </a>
            </div>
        </nav>
    );
}

