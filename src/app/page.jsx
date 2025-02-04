import Social from "@/components/Social";
import {FiDownload} from "react-icons/fi";
import { Button } from '../components/ui/button'
import Photo from "@/components/Photo";

const Home =() => {
  return (
  <section className="h-full">
    <div className="container mx-auto h-full">
      <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
        <div className="text-center xl:text-left order-2 xl:order-none">
          <span className="text-xl">Architecture & Design Studio</span>
          <h1 className="h1 mb-6">
            We're<br /><span className="text-accent">A+AS Partners</span>
          </h1>
          <p className="max-w-[500px] mb-9">
          A team of architects and designers who plan and build amazing structures.
          </p>

          <div className="flex flex-col xl:flex-row items-center gap-8">
            <div className="mb-8 xl:mb-0">
              <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-accent 
              rounded-full flex justify-center items-center text-accent text-base hover:bg-primary 
              hover:text-white hover:transition-all duration-500"/>
            </div>
          </div>  
        </div>

        
        <div className="order-1 xl:order-none mb-8 xl:mb-0">
          <Photo/>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Home;