import { motion } from "framer-motion";
import AmolKharatImg from "../assets/Amol Kharat- Aadyaksh.jpg";
import AnilKharatImg from "../assets/Anil Kharat- Sahasachive.jpg";
import NimaKharatImg from "../assets/Nima Amol Kharat - Koshadyaksh.jpg";

import MilindKharatImg from "../assets/milind kharat member.jpg";
import PunamKharatImg from "../assets/punam kharat- member.jpg";
import VilasKharatImg from "../assets/vilas kharat voice president.jpg";
import vishalgaikwadImg from "../assets/vishal gaikwad secretory.jpg";

const coreMembers = [
  {
    name: "Amol Kharat",
    role: "आद्यक्ष",
    image: AmolKharatImg,
  },
  {
    name: "Anil Kharat",
    role: "सहसाचिव",
    image: AnilKharatImg,
  },
  {
    name: "Nima Kharat",
    role: "कोषाद्याक्ष",
    image: NimaKharatImg,
  },
];

const members = [
  {
    name: "Suresh Kharat",
    role: "सदस्य",
    image: MilindKharatImg,
  },
  {
    name: "Sunita Kharat",
    role: "सदस्य",
    image: PunamKharatImg,
  },
  {
    name: "Ramesh Kharat",
    role: "सदस्य",
    image: VilasKharatImg,
  },
  {
    name: "Priya Kharat",
    role: "सदस्य",
    image: vishalgaikwadImg,
  },
];

export default function OurMembers() {
  return (
    <section className="bg-gray-50 py-16" id="our-members">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          आमचे मुख्य सदस्य
        </h2>
        <p className="text-gray-600 mb-10">
          आमचे ध्येय शक्य करणाऱ्या उत्साही लोकांना भेटा.
        </p>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold  mb-6">मुख्य सदस्य</h3>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {coreMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden border-2 border-emerald-600"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-6">सदस्य</h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}