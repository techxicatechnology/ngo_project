import { useEffect, useState, useRef } from "react";

interface PledgeModalProps {
    onClose: () => void;
}

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const LANGUAGES = ["English", "Hindi", "Marathi"];

const PLEDGE_TEXT_EN =
    "I solemnly pledge that I will oppose child marriage in all its forms and actively support the rights, education, safety, health, and dignity of every child. I commit to raising awareness within my community, standing against social practices that harm children, and taking responsible actions to ensure that every child is given the opportunity to grow, learn, and thrive in a safe and supportive environment, free from early marriage.";

const PLEDGE_TEXT_HI =
    "मैं गंभीरता से यह प्रतिज्ञा करता/करती हूँ कि मैं बाल विवाह के सभी रूपों का विरोध करूँगा/करूँगी और प्रत्येक बच्चे के अधिकारों, शिक्षा, सुरक्षा, स्वास्थ्य और गरिमा का सक्रिय रूप से समर्थन करूँगा/करूँगी। मैं अपने समुदाय में जागरूकता फैलाने, बच्चों को नुकसान पहुँचाने वाली सामाजिक प्रथाओं के विरुद्ध खड़े होने तथा यह सुनिश्चित करने के लिए जिम्मेदार कदम उठाने के लिए प्रतिबद्ध हूँ कि प्रत्येक बच्चे को सुरक्षित, सहयोगपूर्ण और बाल विवाह से मुक्त वातावरण में बढ़ने, सीखने और आगे बढ़ने का अवसर मिले।";


const generateCaptcha = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

const PledgeModal: React.FC<PledgeModalProps> = ({ onClose }) => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [language, setLanguage] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [error, setError] = useState("");

    const [step, setStep] = useState<"form" | "pledge" | "certificate">("form");

    const [displayText, setDisplayText] = useState("");
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [isStateOpen, setIsStateOpen] = useState(false);

    const typingStartedRef = useRef(false);

    const getPledgeTextByLanguage = () => {
        if (language === "English") return PLEDGE_TEXT_EN;
        return PLEDGE_TEXT_HI;
    };


    /* Generate captcha once */
    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    /* ✅ BULLETPROOF typing animation (slice-based) */
    useEffect(() => {
        if (step !== "pledge") return;
        if (typingStartedRef.current) return;

        typingStartedRef.current = true;
        let index = 0;

        const interval = setInterval(() => {
            const pledgeText = getPledgeTextByLanguage(); // ✅ define FIRST
            index++;

            if (index > pledgeText.length) {
                clearInterval(interval);
                setIsTypingDone(true);
                return;
            }

            setDisplayText(pledgeText.slice(0, index));
        }, 35);

        return () => clearInterval(interval);
    }, [step]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !mobile || !state || !district || !language) {
            setError("Please fill all fields");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError("Enter a valid 10-digit mobile number");
            return;
        }

        if (captchaInput !== captcha) {
            setError("Captcha does not match");
            setCaptcha(generateCaptcha());
            setCaptchaInput("");
            return;
        }

        setError("");
        setDisplayText("");
        setIsTypingDone(false);
        typingStartedRef.current = false;
        setStep("pledge");
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-center mb-4">
                    Take Pledge
                </h2>

                {/* ================= FORM ================= */}
                {step === "form" && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                        />

                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                        />

                        {/* State Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsStateOpen(!isStateOpen)}
                                className="w-full border rounded-lg px-4 py-2 text-left bg-white"
                            >
                                {state || "Select State / UT"}
                            </button>

                            {isStateOpen && (
                                <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-white border rounded-lg shadow-lg">
                                    {INDIAN_STATES.map((st) => (
                                        <div
                                            key={st}
                                            onClick={() => {
                                                setState(st);
                                                setIsStateOpen(false);
                                            }}
                                            className="px-4 py-2 cursor-pointer hover:bg-emerald-50"
                                        >
                                            {st}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            placeholder="District"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                        />

                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                        >
                            <option value="">Select Language</option>
                            {LANGUAGES.map((lang) => (
                                <option key={lang}>{lang}</option>
                            ))}
                        </select>

                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-gray-200 rounded-lg font-mono">
                                {captcha}
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Captcha"
                                value={captchaInput}
                                onChange={(e) =>
                                    setCaptchaInput(e.target.value.toUpperCase())
                                }
                                className="flex-1 border rounded-lg px-4 py-2"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2 rounded-lg hover:opacity-90"
                        >
                            Submit
                        </button>
                    </form>
                )}

                {/* ================= PLEDGE ================= */}
                {step === "pledge" && (
                    <div className="space-y-6">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {displayText}
                        </p>

                        <button
                            disabled={!isTypingDone}
                            onClick={() => setStep("certificate")}
                            className={`w-full py-2 rounded-lg text-white ${isTypingDone
                                ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-90"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            I Take Pledge
                        </button>

                    </div>
                )}
                {step === "certificate" && (
                    <div className="space-y-6 text-center">
                        <h3 className="text-lg font-bold">
                            Pledge Certificate
                        </h3>

                        <div className="border-2 border-dashed border-emerald-600 rounded-lg p-6">
                            <p className="text-gray-700 mb-2">
                                This certifies that
                            </p>

                            <p className="text-xl font-bold uppercase">
                                {name}
                            </p>

                            <p className="text-gray-700 mt-2">
                                has successfully taken the pledge against child marriage.
                            </p>

                            <p className="text-sm text-gray-500 mt-4">
                                Date: {new Date().toLocaleDateString()}
                            </p>
                        </div>

                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            Download Certificate
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PledgeModal;
