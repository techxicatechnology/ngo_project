import { motion } from "framer-motion";
//@ts-ignore
import AmolKharatImg from "../assets/Amol Kharat- Aadyaksh.jpg";
//@ts-ignore 
import AnilKharatImg from "../assets/Anil Kharat- Sahasachive.jpg";
//@ts-ignore
import NimaKharatImg from "../assets/Nima Amol Kharat - Koshadyaksh.jpg";
const members = [
  {
    name: "Amol Kharat",
    role: "Aadyaksh",
    image: AmolKharatImg,
  },
  {
    name: "Anil Kharat",
    role: "Sahasachive",
    image: AnilKharatImg,
  },
  {
    name: "Nima Kharat",
    role: "Koshadyaksh",
    image:NimaKharatImg,
  },
  
];

export default function OurMembers() {
  return (
    <section className="bg-gray-50 py-16" id="our-members">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Members
        </h2>
        <p className="text-gray-600 mb-10">
          Meet the passionate people who make our mission possible.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
