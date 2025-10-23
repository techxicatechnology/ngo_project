import { motion } from "framer-motion";
import AmolKharatImg from "../assets/Amol Kharat- Aadyaksh.jpg";
import AnilKharatImg from "../assets/Anil Kharat- Sahasachive.jpg";
import NimaKharatImg from "../assets/Nima Amol Kharat - Koshadyaksh.jpg";
import MilindKharatImg from "../assets/milind kharat member.jpg";
import VilasKharatImg from "../assets/vilas kharat voice president.jpg";
import vishalgaikwadImg from "../assets/vishal gaikwad secretory.jpg";

const coreMembers = [
  { name: "Amol Kharat", role: "आद्यक्ष", image: AmolKharatImg },
  { name: "Anil Kharat", role: "सहसाचिव", image: AnilKharatImg },
  { name: "Nima Kharat", role: "कोषाद्याक्ष", image: NimaKharatImg },
];

const members = [
  { name: "Suresh Kharat", role: "सदस्य", image: MilindKharatImg },
  { name: "Ramesh Kharat", role: "सदस्य", image: VilasKharatImg },
  { name: "Priya Kharat", role: "सदस्य", image: vishalgaikwadImg },
];

export default function OurMembers() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-20" id="our-members">
      <div className="max-w-7xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-4"
        >
          आमचे मुख्य सदस्य
        </motion.h2>
        <p className="text-gray-600 mb-12 text-lg">
          आमच्या ध्येयाला शक्य करणाऱ्या उत्साही लोकांना भेटा.
        </p>

        <h3 className="text-2xl font-semibold mb-8 text-emerald-700">मुख्य सदस्य</h3>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {coreMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl shadow-lg border border-emerald-200 hover:border-emerald-500 transition-all duration-300 overflow-hidden p-6"
            >
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-md mb-4">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-emerald-800">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-emerald-700 mt-16 mb-8">सदस्य</h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 hover:border-emerald-400 transition-all p-5"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-3">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
