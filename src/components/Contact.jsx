import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSendClick = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in First Name, Email, and Message.");
      return;
    }
    setShowModal(true);
  };

  const sendMailto = () => {
    const subject = encodeURIComponent(`Contact from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:siva06052005@gmail.com?subject=${subject}&body=${body}`;
    setShowModal(false);
  };

  const sendGmail = () => {
    const subject = encodeURIComponent(`Contact from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=siva06052005@gmail.com&su=${subject}&body=${body}`, '_blank');
    setShowModal(false);
  };

  const sendWhatsApp = () => {
    const text = encodeURIComponent(`Hi Siva, my name is *${formData.firstName} ${formData.lastName}*.\n\n*Message:* ${formData.message}\n\n*Email:* ${formData.email}`);
    window.open(`https://wa.me/917826852648?text=${text}`, '_blank');
    setShowModal(false);
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-white uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div 
          data-aos="fade-up"
          className="bg-[#ff6a00] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between"
        >
          <div className="text-xs font-bold tracking-[0.2em] mb-12 md:mb-20 uppercase opacity-90">
            Reach Us
          </div>

          <form onSubmit={handleSendClick} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                <div className="relative">
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    id="message" 
                    placeholder="Type your message here" 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full h-full min-h-[120px] bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium resize-none rounded-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-12 mt-4">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-white/90">
                <input 
                  type="checkbox" 
                  id="permission" 
                  required
                  className="mt-1 w-4 h-4 rounded-sm border-white/40 bg-transparent text-white focus:ring-white focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" 
                  style={{ accentColor: "white" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-8 text-xs text-white/70 font-medium">
                <p className="leading-relaxed max-w-[400px]">
                  This site is protected by reCAPTCHA and the Google <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a> apply.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    For information on how to unsubscribe, please review our <a href="#" className="underline hover:text-white transition-colors">privacy policy</a>.
                  </p>
                  
                  <button 
                    type="submit" 
                    className="px-8 py-3 rounded-full border border-white/40 text-white font-bold flex items-center justify-center gap-3 hover:bg-white hover:text-[#ff6a00] transition-all duration-300 group whitespace-nowrap self-start sm:self-auto"
                  >
                    Send
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>

      {/* Choice Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 z-[99999] flex items-center justify-center p-6 backdrop-blur-md">
          <div 
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full text-center relative shadow-[0_20px_50px_rgba(234,88,12,0.3)] animate-in fade-in zoom-in duration-300"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-black text-white mb-2 tracking-tight uppercase">Choose Delivery Method</h3>
            <p className="text-zinc-400 text-xs mb-8">How would you like to send this message to Siva?</p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={sendWhatsApp}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
              >
                {/* WhatsApp Logo */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.745 1.451 5.486 0 9.95-4.447 9.953-9.92 0-2.652-1.03-5.145-2.905-7.022a9.785 9.785 0 00-6.927-2.871c-5.485 0-9.948 4.446-9.952 9.92-.001 1.696.444 3.351 1.288 4.793L1.97 22.046l6.677-1.751v-.001zm11.754-7.291c-.328-.164-1.942-.958-2.242-1.069-.3-.11-.518-.164-.736.164-.218.327-.844 1.069-1.035 1.288-.19.218-.381.245-.71.081-1.283-.643-2.146-1.161-3.003-2.632-.228-.392.228-.364.654-1.214.07-.137.036-.258-.018-.367-.054-.109-.518-1.249-.709-1.707-.186-.447-.373-.387-.518-.394-.132-.007-.284-.008-.436-.008a.84.84 0 00-.608.273c-.208.228-.793.774-.793 1.888 0 1.113.81 2.189.924 2.342.114.153 1.593 2.433 3.859 3.411.539.233.959.372 1.288.477.542.172 1.035.148 1.424.09.435-.065 1.942-.794 2.215-1.529.273-.736.273-1.366.19-1.5-.081-.137-.272-.218-.601-.382z" />
                </svg>
                Send via WhatsApp
              </button>
              
              <button 
                onClick={sendGmail}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-red-700 hover:bg-red-600 text-white font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-[0_10px_20px_rgba(185,28,28,0.2)]"
              >
                {/* Gmail Envelope Logo */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.5L12 13 3 7.5V21H1.5C.65 21 0 20.35 0 19.5v-15c0-.85.65-1.5 1.5-1.5H3l9 5.5 9-5.5h1.5c.85 0 1.5.65 1.5 1.5z" />
                </svg>
                Send via Gmail (Web)
              </button>

              <button 
                onClick={sendMailto}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold border border-zinc-700 transition-all duration-300 transform hover:scale-[1.02] shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
              >
                {/* Default Email App Icon */}
                <svg className="w-5 h-5 text-zinc-300 fill-current" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send via Default Mail App
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
