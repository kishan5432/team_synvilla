import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const terms = [
    "Welcome to SynVilla! By using our website, you agree to the following terms and conditions.",
    "All content, images, and designs on this website are the intellectual property of SynVilla.",
    "You must not use our website for any fraudulent or unlawful activities.",
    "Personal data collected will be used as per our privacy policy.",
    "We reserve the right to update these terms at any time without prior notice.",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border border-[#d2a679]"
      >
        <h2 className="text-3xl font-semibold text-center text-[#5c4033] mb-6">
          Terms & Conditions
        </h2>
        
        <div className="space-y-4">
          {terms.map((term, index) => (
            <motion.p
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-[#5c4033] text-lg"
            >
              {term}
            </motion.p>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-[#d2a679] hover:underline text-lg font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;
