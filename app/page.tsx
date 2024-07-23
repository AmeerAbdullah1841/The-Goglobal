import Navbar from "@/components/main/navbar/navbar";
import Hero from "@/components/main/hero/hero";
import Form from "@/components/main/form/form";
import About from "@/components/main/about/about";
import Newsletter from "@/components/main/newsletter/newsletter";
import Testimonial from "@/components/main/testimonials/testimonial";
import Footer from "@/components/main/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Form />
      <About />
      <Newsletter />
      <Testimonial />
      <Footer />
    </>
  );
}
