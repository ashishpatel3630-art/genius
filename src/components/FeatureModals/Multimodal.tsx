import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Image as ImageIcon, Send, Loader2, AlertCircle, Trash2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface MultimodalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Multimodal({ isOpen, onClose }: MultimodalProps) {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedImage) return;
    
    setIsProcessing(true);
    setError(null);
    setResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const parts: any[] = [];
      
      if (selectedImage) {
        const base64Data = selectedImage.split(',')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/png", // Simplified for demo
          },
        });
      }
      
      if (message.trim()) {
        parts.push({ text: message });
      } else {
        parts.push({ text: "Describe this image in detail." });
      }

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
      });

      setResponse(result.text || 'No response generated.');
    } catch (err: any) {
      console.error('Multimodal error:', err);
      setError(err.message || 'Failed to process request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Mic size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Voice & Multimodal</h3>
                  <p className="text-xs text-slate-500 font-medium">Powered by Gemini 3 Flash</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto flex-1 space-y-8">
              {/* Image Upload Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Upload Image
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all group overflow-hidden relative"
                  >
                    {selectedImage ? (
                      <>
                        <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                          }}
                          className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-3 text-slate-400 group-hover:scale-110 transition-transform">
                          <ImageIcon size={24} />
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Click to upload</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageSelect} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Voice Input (Simulated)
                  </label>
                  <div className="aspect-video bg-blue-50/50 border border-blue-100 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-200 animate-pulse cursor-pointer hover:scale-105 transition-transform">
                      <Mic size={32} />
                    </div>
                    <p className="text-blue-600 font-black text-sm uppercase tracking-widest">Tap to speak</p>
                    <p className="text-blue-400 text-xs mt-2 font-medium">Real-time voice analysis enabled</p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Ask Genius AI
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's in this image? or Ask anything..."
                    className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium pr-16"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isProcessing || (!message.trim() && !selectedImage)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100"
                  >
                    {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                  </button>
                </div>
              </div>

              {/* Response Area */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}

                {response && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 bg-slate-50 border border-slate-100 rounded-3xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sparkles size={48} className="text-blue-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                        <Sparkles size={16} />
                      </div>
                      <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Genius Insight</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                      {response}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-medium">
                Multimodal AI can analyze images, text, and audio simultaneously for deeper context.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
