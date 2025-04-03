import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Vedic Astrology?",
      answer:
        "Vedic Astrology, also known as Jyotish, is an ancient Indian system of astrology that uses mathematical calculations and planetary positions at the time of birth to provide insights into one's life path, personality, and future possibilities.",
    },
    {
      question: "How accurate are astrological predictions?",
      answer:
        "Astrological predictions are based on complex calculations of planetary positions and their influences. While our expert astrologers maintain a high accuracy rate, it's important to understand that free will plays a significant role in shaping our destiny.",
    },
    {
      question: "What information do I need for a consultation?",
      answer:
        "For an accurate reading, we need your date of birth, exact time of birth, and place of birth. This information helps create your precise birth chart, which is essential for personalized astrological insights.",
    },
    {
      question: "How can astrology help in my career?",
      answer:
        "Astrology can provide insights into your natural talents, favorable career paths, and timing for important career moves. It helps identify periods of professional growth and potential challenges, allowing you to make informed decisions.",
    },
    {
      question: "Do you offer online consultations?",
      answer:
        "Yes, we offer both online and in-person consultations. Our online sessions are conducted through secure video calls, making it convenient for clients worldwide to receive expert astrological guidance.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-300 ${
                  openIndex === index
                    ? "bg-[#921a40] text-white"
                    : "bg-white text-gray-800"
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#921a40]" />
                )}
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 py-4" : "max-h-0"
                } overflow-hidden`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
