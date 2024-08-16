import Navbar from "@/components/main/navbar/navbar";
import Footer from "@/components/main/footer/footer";
import Package1 from "@/components/main/package/package";
export default function PackagePage({ params }: { params: { id: string } }) {
    // remove all %20 with space
    let id1 = params.id.replace(/%20/g, " ");
    return (
        <div>
            <Navbar />
            <Package1 id={id1} />
            <Footer />
        </div>
    );
}