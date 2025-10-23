import { motion } from "framer-motion";
import s1 from "../assets/savitri.webp";
import s2 from "../assets/savitribai fule-yojana.webp";
import s3 from "../assets/savitribai-fule yojana1.webp";
import s4 from "../assets/savitribai.webp";

const skimsData = [
  { id: 1, imageUrl: s1, title: "सावित्रीबाई फुले योजना", description: "शैक्षणिक विकास आणि सक्षमीकरण उपक्रम" },
  { id: 2, imageUrl: s2, title: "महिला सबलीकरण कार्यक्रम", description: "महिलांसाठी कौशल्य विकास आणि स्वावलंबन" },
  { id: 3, imageUrl: s3, title: "शिक्षण सहाय्य योजना", description: "गरजू विद्यार्थ्यांसाठी शैक्षणिक समर्थन" },
  { id: 4, imageUrl: s4, title: "समाजसेवा उपक्रम", description: "समाजातील सर्वांगीण विकासासाठी प्रयत्न" },
];

const Skims = () => {
  return (
    <section className="relative pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            आमचे NGO उपक्रम
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            समाजाच्या विकासासाठी आणि सक्षमीकरणासाठी आमचे विविध उपक्रम
          </p>
          <div className="w-28 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Image Cards with Staggered Animation */}
        <div className="flex flex-col gap-12">
          {skimsData.map((skim, index) => (
            <motion.div
              key={skim.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } flex flex-col lg:flex`}
            >
              {/* Image Container */}
              <div className="lg:w-1/2 relative overflow-hidden group">
                <motion.img
                  src={skim.imageUrl}
                  alt={skim.title}
                  className="w-full h-80 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/600x400?text=Image+Not+Found";
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Container */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-block">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full">
                    उपक्रम #{skim.id}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-4 mb-3">
                  {skim.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {skim.description}
                </p>
                
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State with Animation */}
        {skimsData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-white rounded-3xl shadow-lg"
          >
            <div className="text-gray-400 mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-medium">
              सध्या कोणतेही उपक्रम उपलब्ध नाहीत.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              लवकरच नवीन उपक्रम जोडले जातील
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skims;
