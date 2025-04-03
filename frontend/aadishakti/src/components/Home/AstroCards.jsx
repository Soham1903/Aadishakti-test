import { motion } from "framer-motion";

const cards = [
  {
    title: "ज्योतिष = मार्गदर्शनाची दिव्य ज्योत",
    description:
      "जीवनाच्या प्रत्येक टप्प्यावर योग्य दिशा दाखवणारी प्रकाशकृती म्हणजे ज्योतिष.",
    bgColor: "from-[#f9f3f5] to-[#f9f3f5]",
    image: "/assets/card1-removebg-preview.png",
  },
  {
    title: "ज्योतिष = जीवनसंतुलनाचे रहस्य",
    description:
      "प्रकृती, नशिब आणि कर्तृत्व यांचा समतोल राखून सुखद जीवन जगण्यासाठी ज्योतिष उपयुक्त ठरते.",
    bgColor: "from-[#f9f3f5] to-[#f9f3f5]",
    image: "/assets/card2-removebg-preview.png",
  },
  {
    title: "ज्योतिष = ग्रहांचा संजीवनी प्रभाव",
    description:
      "ग्रह आणि नक्षत्रांचा प्रभाव ओळखून जीवन समृद्ध करण्याची कला ज्योतिष शिकवते.",
    bgColor: "from-[#f9f3f5] to-[#f9f3f5]",
    image: "/assets/card_6-removebg-preview.png",
  },
  {
    title: "ज्योतिष = कालज्ञानाचे गूढ शास्त्र",
    description:
      "भूतकाळ, वर्तमान आणि भविष्य यांचा ताळमेळ घालून योग्य मार्गदर्शन करणारे शास्त्र म्हणजे ज्योतिष.",
    bgColor: "from-[#f9f3f5] to-[#f9f3f5]",
    image: "/assets/card5-removebg-preview.png",
  },
];

const GradientCards = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`relative bg-gradient-to-br ${card.bgColor} p-5 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex flex-col h-full space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {card.title}
                </h2>
                <p className="text-gray-700 opacity-90 text-sm flex-grow">
                  {card.description}
                </p>
                <motion.div
                  className="flex justify-center sm:justify-end mt-3"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientCards;
