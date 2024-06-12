import AboutMe from "@/src/components/home/AboutMe";
import Hero from "@/src/components/home/Hero";
import Resume from "@/src/components/home/Resume";
import Service from "@/src/components/home/Service";
import Footer from "@/src/components/shared/Footer";
import Layout from "@/layout/Layout";

export default async function Home() {
  return (
    <Layout>
      <Hero />
      <AboutMe />
      <Service />
      {/* <Skills /> */}
      <Resume />
      {/* <Portfolio /> */}
      {/* <Blog /> */}
      {/* <Testimonial /> */}
      {/* <ContactMe /> */}
      <Footer />
    </Layout>
  );
}
