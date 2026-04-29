import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Upload, FileText, Send, Loader2, AlertCircle, Trash2, Sparkles, Search } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface KnowledgeProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Knowledge({ isOpen, onClose }: KnowledgeProps) {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setSelectedFile({ name: file.name, content });
      };
      reader.readAsText(file);
    }
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedFile) return;
    
    setIsProcessing(true);
    setError(null);
    setResponse(null);

    try {
      const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
      let prompt = message.trim();
      if (selectedFile) {
        prompt = `Context from file "${selectedFile.name}":\n${selectedFile.content}\n\nQuestion: ${prompt || "Summarize this document."}`;
      }

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setResponse(result.text || 'No response generated.');
    } catch (err: any) {
      console.error('Knowledge error:', err);
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
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Knowledge Integration</h3>
                  <p className="text-xs text-slate-500 font-medium">RAG-powered Document Analysis</p>
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
              {/* File Upload Area */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Upload Knowledge Base
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all group relative ${selectedFile ? 'border-emerald-500 bg-emerald-50/30' : ''}`}
                >
                  {selectedFile ? (
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                        <FileText size={32} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-slate-900 truncate">{selectedFile.name}</p>
                        <p className="text-sm text-emerald-600 font-black uppercase tracking-widest">Document Loaded</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        className="p-3 bg-white text-red-500 rounded-2xl shadow-sm border border-slate-100 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 text-slate-400 group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                      </div>
                      <p className="text-slate-900 font-bold text-lg">Click to upload PDF or Text</p>
                      <p className="text-slate-400 text-sm mt-1 font-medium">Max file size: 10MB</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    accept=".txt,.pdf,.doc,.docx" 
                    className="hidden" 
                  />
                </div>
              </div>

              {/* Chat Input */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Ask about the document
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={selectedFile ? "Summarize this document..." : "Upload a file to ask questions..."}
                    className="w-full p-5 pl-14 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium pr-16"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isProcessing || (!message.trim() && !selectedFile)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-100"
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
                    className="p-8 bg-emerald-50/30 border border-emerald-100 rounded-[2.5rem] relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <BookOpen size={64} className="text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Sparkles size={20} />
                      </div>
                      <span className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em]">Genius Analysis</span>
                    </div>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap text-lg">
                        {response}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-medium">
                RAG (Retrieval-Augmented Generation) allows AI to use your private data as context for accurate answers.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
