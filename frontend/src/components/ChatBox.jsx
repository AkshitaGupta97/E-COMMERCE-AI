
import { useContext, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ChatBox = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const {token} = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", sender: "bot", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot response
    /* setTimeout(() => {
       const botMessage = {
         id: Date.now() + 1,
         text: "Thank you for your message! Our team will get back to you soon.",
         sender: "bot",
         timestamp: new Date()
       };
       setMessages(prev => [...prev, botMessage]);
       setIsLoading(false);
     }, 1000);
     */

    try {
      const response = await axios.post(`${backendUrl}/api/ai/chat-ai`, { message: inputValue }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Ai response = ", response.data);
      if (response.data.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.data.response.content,
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
      else {
        const botMessage = {
          id: Date.now() + 1,
          text: "Sorry, something went wrong. Please try again later.",
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      const botMessage = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="fixed cursor-pointer bottom-6 right-6 z-40 font-sans">
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${isOpen
          ? "bg-red-500 hover:bg-red-600"
          : "bg-yellow-400 hover:bg-yellow-500 text-black"
          }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-yellow-400 via-yellow-450 to-amber-400 text-black p-4">
              <h3 className="text-lg font-bold">Chat with Us</h3>
              <p className="text-sm opacity-90">We typically reply within minutes</p>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-850">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${msg.sender === "user"
                      ? "bg-yellow-400 text-black rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </motion.div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-3 bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBox;

