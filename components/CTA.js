import Image from "next/image";
import config from "@/config";
import ButtonLead from "./ButtonLead";
import ButtonSignin from "./ButtonSignin";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="/ctaImage.jpg"
        alt="Background"
        className="object-cover w-full blur-md"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="text-white font-bold text-4xl md:text-5xl tracking-tight mb-8 md:mb-12">
          Începeți să urmăriți acum!
          </h2>
          <p className="text-white text-lg opacity-80 mb-12 md:mb-16">
            Nu pierdeți timpul navigând pe web pentru cele mai bune oferte. O vom face pentru tine!
          </p>

          {/* <button className="btn btn-primary btn-wide">
            Get {config.appName}
          </button> */}
          {/* <ButtonLead /> */}
          {/* <p className="m-2">or</p>
          <ButtonSignin extraStyle="btn-primary" /> */}
          <ButtonSignin text="Încercați acum MagSpy gratuit!" extraStyle="btn-primary" />
          
        </div>
      </div>
    </section>
  );
};

export default CTA;
