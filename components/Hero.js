import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";
import ButtonLead from "./ButtonLead";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Track product prices and get notified when they drop
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          We constantly monitor the prices of your favorite products and alert you when its best time to buy
        </p>
        {/* <button className="btn btn-primary btn-wide">
          Get {config.appName}
        </button> */}
        {/* <ButtonLead /> */}
        <a href="/session"
          className="btn btn-primary btn-wide"
        >
          Check out the demo
        </a>

        {/* <TestimonialsAvatars priority={true} /> */}
      </div>
      <div className="lg:w-full">
        <Image
          src="/heroImage.png"
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={800}
          height={800}
        />
      </div>
    </section>
  );
};

export default Hero;