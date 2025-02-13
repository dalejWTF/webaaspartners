"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = ({ src, alt }) => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1, duration: 0.4, ease: "easeIn" }
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1, duration: 0.4, ease: "easeInOut" }
          }}
          className="w-[200px] h-[200px] xl:w-[150px] xl:h-[150px] mx-auto"
        >
          <Image
            src={src}
            priority
            quality={100}
            fill
            alt={alt}
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;