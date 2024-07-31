import Navbar from "@/components/main/navbar/navbar";
import Hero from "@/components/main/hero/hero";
import Form from "@/components/main/form/form";
import About from "@/components/main/about/about";
import Newsletter from "@/components/main/newsletter/newsletter";
import Testimonial from "@/components/main/testimonials/testimonial";
import Footer from "@/components/main/footer/footer";
import Destinations from "@/components/main/topdestinations/destinations";
import Packages from "@/components/main/toppackages/packages";
import Videos from "@/components/main/videos/videos";

export default function Home() {
  return (
    <div className=" bg-[#F9F9F9]">
      <Navbar />
      <Hero />
      <Form />
      <About />
      <Destinations />
      <Packages />
      <Newsletter />
      <Videos />
      <Testimonial />
      <Footer />
    </div>
  );
}
