import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  ExternalLink, 
  ShieldCheck, 
  Bot, 
  Loader2,
  FileQuestion
} from 'lucide-react';
import type { AiChatMessage } from '../types/medvault';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apiService: any;
  onSelectRecordById: (docId: string) => void;
}

const SAMPLE_CASE_QUESTIONS = [
  { icon: '🩸', label: 'Hemoglobin & Fasting Sugar', query: 'What were my latest Hemoglobin and Fasting Sugar levels?' },
  { icon: '💊', label: 'Medications & Dosage', query: 'What medications were prescribed to me and what are the doses?' },
  { icon: '🫁', label: 'Chest X-Ray Findings', query: 'What did my Chest X-Ray show? Are my lungs clear?' },
  { icon: '🫀', label: 'Echo Ejection Fraction', query: 'What was my Echocardiogram ejection fraction and heart health?' },
  { icon: '🏥', label: 'Appendectomy Discharge', query: 'Summarize my Laparoscopic Appendectomy discharge instructions' },
  { icon: '👁️', label: 'Eye Spectacle Power', query: 'What is my current eye spectacle glass power?' },
  { icon: '🧪', label: 'Thyroid TSH & Creatinine', query: 'What are my Thyroid TSH and Serum Creatinine values?' }
];

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  apiService,
  onSelectRecordById
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'AI',
      text: 'Hello Bharath! I am MedVault AI. Ask me questions about your health history, blood lab panels, medications, echo tests, or radiology reports. Every response is strictly grounded in your stored document evidence.\n\n👇 Click any of the sample inquiry chips above to see instant clinical reasoning!',
      timestamp: '10:30 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputText;
    setInputText('');
    setIsLoading(true);

    const aiResp = await apiService.askAiAssistant(query);
    setMessages(prev => [...prev, aiResp]);
    setIsLoading(false);
  };

  const handleAskQuestion = async (query: string) => {
    if (isLoading) return;
    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const aiResp = await apiService.askAiAssistant(query);
    setMessages(prev => [...prev, aiResp]);
    setIsLoading(false);
  };

  return (
    <>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden animate-in fade-in duration-200"
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-gray-950 border-l border-gray-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="h-16 px-4 sm:px-6 border-b border-gray-800 flex items-center justify-between bg-gray-900/60 shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 ai-glow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
              <span>MedVault AI Assistant</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-mono">
                Source Grounded
              </span>
            </h3>
            <p className="text-[11px] text-gray-400">Strict patient evidence retrieval</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-gray-900 text-gray-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Clickable Case Inquiries Tray */}
      <div className="bg-gray-900/90 border-b border-gray-800 p-3 shrink-0">
        <div className="text-[11px] font-bold text-gray-300 mb-2 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <FileQuestion className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sample Clinical Case Inquiries (Click to Ask):</span>
          </span>
          <span className="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 font-semibold">
            1-Click RAG
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {SAMPLE_CASE_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(item.query)}
              disabled={isLoading}
              className="shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-950 hover:bg-indigo-950/50 border border-gray-800 hover:border-indigo-500/40 text-[11px] text-gray-300 hover:text-white transition-all shadow-sm"
            >
              <span>{item.icon}</span>
              <span className="font-medium whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col space-y-2 ${
              msg.sender === 'USER' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-[10px] text-gray-500">
              {msg.sender === 'USER' ? (
                <>
                  <span>You</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-indigo-400" />
                  <span className="text-indigo-400 font-bold">MedVault RAG Engine</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </>
              )}
            </div>

            <div
              className={`p-4 rounded-2xl max-w-[92%] leading-relaxed ${
                msg.sender === 'USER'
                  ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                  : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</div>

              {/* Source Evidence Cards attached to AI responses */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-800 space-y-2">
                  <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Evidence Source Document (Click to Open)</span>
                  </div>

                  {msg.sources.map((src, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectRecordById(src.documentId)}
                      className="p-2.5 rounded-xl bg-gray-950 border border-gray-800 hover:border-indigo-500/60 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-white group-hover:text-indigo-300">
                        <span className="truncate max-w-[240px]">{src.documentTitle}</span>
                        <ExternalLink className="w-3 h-3 text-indigo-400" />
                      </div>
                      <p className="text-[10px] text-gray-400 italic mt-1 line-clamp-2">
                        "{src.snippet}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-indigo-400 p-3 bg-gray-900/60 rounded-xl border border-gray-800 w-fit">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs font-mono">Retrieving evidence from patient vault...</span>
          </div>
        )}
      </div>

      {/* Input Form Footer */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/60 shrink-0 space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your records (e.g. 'What was my latest Hb level?')"
            className="flex-1 p-3 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] text-gray-500 text-center">
          MedVault AI retrieves anchored facts from your verified records. Always consult your attending physician.
        </p>
      </div>
    </div>
  </>
  );
};
