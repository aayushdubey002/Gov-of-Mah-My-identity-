import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/portalData';
import { 
  X, 
  HelpCircle, 
  PhoneCall, 
  MapPin, 
  ChevronDown, 
  MessageSquare, 
  Send, 
  Bot, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';

interface HelpCenterModalProps {
  lang: Language;
  onClose: () => void;
}

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  lang,
  onClose
}) => {
  const t = translations[lang];
  const [selectedFaq, setSelectedFaq] = useState<number | null>(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: lang === 'mr'
        ? 'नमस्कार! मी माझी ओळख डिजिटल सहाय्यक आहे. मी आपल्याला ७/१२ उतारा, लाडकी बहीण योजना, जात प्रमाणपत्र किंवा अर्जाची स्थिती तपासण्यास कशी मदत करू?'
        : 'Namaskar! I am the Majhi Olakh Citizen Assistant. How can I assist you today with certificates, schemes, or application tracking?'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const faqs = [
    {
      q: lang === 'mr' ? 'डिजिटल स्वाक्षरीत ७/१२ उतारा कसा डाउनलोड करावा?' : 'How do I download a digitally signed 7/12 land extract?',
      a: lang === 'mr'
        ? 'मुख्य पृष्ठावरील "जमीन व मालमत्ता" विभागावर क्लिक करा, आपला जिल्हा, तालुका व गाव निवडून गट क्रमांक टाका. रु. १५ शुल्क भरून डिजिटल सही असलेला अधिकृत उतारा त्वरित मिळवा.'
        : 'Go to Land & Property department, enter your district, taluka, village, and gut survey number. Pay the nominal ₹15 fee to instantly download your digitally certified copy.'
    },
    {
      q: lang === 'mr' ? 'माझी लाडकी बहीण योजनेसाठी काय पात्रता आहे?' : 'What is the eligibility for Mukhyamantri Majhi Ladki Bahin Yojana?',
      a: lang === 'mr'
        ? 'महाराष्ट्रातील २१ ते ६५ वर्षे वयोगटातील महिला ज्यांचे कौटुंबिक वार्षिक उत्पन्न रु. २.५ लाखांपेक्षा कमी आहे व बँक खात्यास आधार लिंक आहे त्या सर्व महिला पात्र आहेत.'
        : 'Resident women aged 21 to 65 years in Maharashtra with family income under ₹2.5 Lakh and DBT-enabled Aadhaar-linked bank accounts.'
    },
    {
      q: lang === 'mr' ? 'महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ (RTS) काय आहे?' : 'What is the Maharashtra Right to Public Services Act (RTS)?',
      a: lang === 'mr'
        ? 'या कायद्यानुसार प्रत्येक नागरिकाला विहित वेळेत (उदा. उत्पन्न दाखला ७ दिवस, ७/१२ त्वरित) शासकीय सेवा मिळण्याचा कायदेशीर अधिकार आहे. विहित वेळेत सेवा न मिळाल्यास दाद मागता येते.'
        : 'A statutory guarantee ensuring citizens receive certified government services within transparent, legally mandated timeframes with right to appellate compensation.'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');

    setTimeout(() => {
      let botReply = lang === 'mr'
        ? `आपल्या "${userText}" या प्रश्नाबाबत: आपण मुख्य डॅशबोर्डवरील सेवा शोधू शकता किंवा आमच्या १८००-१२०-८०४० या टोल फ्री क्रमांकावर थेट कॉल करू शकता.`
        : `Regarding your query "${userText}": You can find full details on the main catalog or call our 24x7 toll-free helpline at 1800-120-8040.`;

      if (userText.toLowerCase().includes('7/12') || userText.toLowerCase().includes('utara')) {
        botReply = lang === 'mr'
          ? '७/१२ उतारा मिळवण्यासाठी "जमीन व मालमत्ता" विभागात जा किंवा त्वरित सेवांमधील "डाउनलोड प्रमाणपत्र" निवडा.'
          : 'To download your 7/12 extract, navigate to the Land & Property department or select Download Certificate from Quick Services.';
      } else if (userText.toLowerCase().includes('track') || userText.toLowerCase().includes('status')) {
        botReply = lang === 'mr'
          ? 'आपल्या अर्जाची स्थिती तपासण्यासाठी मुख्य पृष्ठावरील "अर्जाची स्थिती तपासा" बॉक्समध्ये आपला अर्ज संदर्भ क्रमांक (उदा. MH-2026-REV-84920) टाका.'
          : 'You can track any application using our Track Application tool by typing your reference code (e.g. MH-2026-REV-84920).';
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <HelpCircle className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
                24x7 Citizen Support
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {t.helpCenterCardTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Helplines & FAQs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Helpline Banner */}
            <div className="bg-emerald-700 text-white p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">
                  {lang === 'mr' ? 'टोल फ्री नागरिक संपर्क कक्ष' : 'Toll-Free Citizen Call Center'}
                </span>
                <h4 className="text-xl sm:text-2xl font-black font-mono">1800-120-8040</h4>
                <p className="text-xs text-emerald-100">
                  {lang === 'mr' ? '२४ तास, ७ दिवस उपलब्ध • सर्व भाषांमध्ये सहाय्य' : 'Available 24x7 in Marathi, Hindi & English'}
                </p>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl">
                <PhoneCall className="w-8 h-8 text-white animate-bounce" />
              </div>
            </div>

            {/* Aaple Sarkar Seva Kendra Locator */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>{lang === 'mr' ? 'जवळचे आपले सरकार सेवा केंद्र शोधा' : 'Find Nearest Maha e-Seva Kendra'}</span>
              </h4>
              <p className="text-xs text-slate-500">
                Over 35,000+ CSC / e-Seva physical centers active across every Gram Panchayat in Maharashtra.
              </p>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900">
                {lang === 'mr' ? 'नेहमी विचारले जाणारे प्रश्न (FAQ)' : 'Frequently Asked Questions'}
              </h4>

              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left font-bold text-xs text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${selectedFaq === idx ? 'rotate-180 text-emerald-700' : ''}`} />
                    </button>
                    {selectedFaq === idx && (
                      <div className="p-3.5 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive AI Citizen Chatbot */}
          <div className="lg:col-span-5 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full min-h-[380px]">
            <div className="p-4 bg-slate-900 text-white flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-emerald-400" />
              <div>
                <h5 className="font-extrabold text-xs">Majhi Olakh AI Assistant</h5>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online • 24x7
                </span>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 max-h-[300px]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0F5132] text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input
                id="chatbot-input"
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={lang === 'mr' ? 'तुमचा प्रश्न येथे विचारा...' : 'Ask any question...'}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
              />
              <button
                id="chatbot-send-btn"
                type="submit"
                className="bg-[#0F5132] hover:bg-[#0b3d26] text-white p-2 rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
