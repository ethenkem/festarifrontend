import React from 'react'
import { motion } from "framer-motion"

function FounderMessage() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      //variants={fadeIn}
      className="py-12 bg-gradient-to-br from-festari-50 to-white"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto relative p-8 rounded-xl">
          <div className="absolute top-0 left-10 text-8xl text-festari-accent/20 font-serif">"</div>
          <div className="relative z-10">
            <p className="text-xl text-festari-700 leading-relaxed italic mb-6">
              At Festari Group Ltd., we don't just provide services — we build partnerships that transform industries and empower individuals.
              Our mission is to offer premier solutions tailored to Africa's growth needs, driven by expertise, ethics, and innovation.
            </p>
            <div className="flex items-center">
              <div className="h-12 w-1 bg-festari-accent mr-4"></div>
              <div>
                <p className="font-bold text-festari-900">Dr. Festus Kunkyin-Saadaari</p>
                <p className="text-festari-600 text-sm">Founder & CEO, Festari Group Ltd</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-10 text-8xl text-festari-accent/20 font-serif rotate-180">"</div>
        </div>
      </div>
    </motion.section>
  )
}

export default FounderMessage
