import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  X, 
  Volume2, 
  Sparkles, 
  KeyRound
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askGeminiOrLocalRAG } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AskBreatheWellDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskBreatheWellDrawer: React.FC<AskBreatheWellDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    aqiData, 
    household, 
    language, 
    speakText, 
    stopSpeaking, 
    isReadingAloud 
  } = useApp();

  const isHi = language === 'hi';
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-init',
      sender: 'assistant',
      text: isHi
        ? `नमस्ते! मैं आपका **BreatheWell AI साथी** हूँ। मैं ${household.city} के लाइव AQI (${aqiData.aqi}) और आपके परिवार के सदस्यों की संवेदनशीलता के आधार पर हवा शुद्ध रखने, मास्क चुनने और सुरक्षित दिनचर्या में आपकी मदद कर सकता हूँ।`
        : `Hello! I am your **BreatheWell AI Companion**. Grounded in official CPCB, WHO, and ICMR protocols with your live ${household.city} AQI of ${aqiData.aqi}, ask me anything about indoor air, pediatric masks, or elderly care.`,
      timestamp: 'Just now',
      suggestedQuestions: isHi
        ? [
            'क्या मुझे रात में प्यूरीफायर चलाना चाहिए?',
            'क्या पौधे स्मॉग साफ कर सकते हैं?',
            'दादाजी के सुबह टहलने का क्या नियम है?'
          ]
        : [
            'Should I run the purifier at night?',
            'Do indoor plants clean smog?',
            'Can Dadaji go for a morning walk today?'
          ]
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('saans_gemini_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = async (text?: string) => {
    const q = (text || inputQuestion).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsTyping(true);

    const result = await askGeminiOrLocalRAG({
      question: q,
      aqiData,
      members: household.members,
      language,
      customApiKey: apiKeyInput
    });

    const botMsg: ChatMessage = {
      id: `msg-resp-${Date.now()}`,
      sender: 'assistant',
      text: result.replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isWarning: result.isWarning,
      suggestedQuestions: result.suggestedQuestions
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleSaveApiKey = (key: string) => {
    setApiKeyInput(key);
    localStorage.setItem('saans_gemini_key', key.trim());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        <div className="p-4 bg-[#08332c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#5eead4] text-[#08332c] flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm leading-tight text-white">Ask BreatheWell</h3>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#13594c] text-[#5eead4]">
                  Gemini + RAG
                </span>
              </div>
              <p className="text-[11px] text-[#8ab3a8]">
                {household.city} · AQI {aqiData.aqi} ({aqiData.cpcbCategory})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className={`p-1.5 rounded-lg text-[#8ab3a8] hover:text-white transition ${showKeyInput ? 'bg-[#104b40] text-white' : ''}`}
              title="Configure Google Gemini API Key"
            >
              <KeyRound className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8ab3a8] hover:text-white hover:bg-[#104b40] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showKeyInput && (
          <div className="p-3 bg-[#0c3d35] border-b border-[#13594c] text-white space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5eead4]">
                Google Gemini API Key (Optional)
              </span>
              <a
                href="https://aistudio.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-[#8ab3a8] hover:underline"
              >
                Get Key ↗
              </a>
            </div>
            <input
              type="password"
              placeholder="AIzaSy... (leave blank for local RAG)"
              value={apiKeyInput}
              onChange={(e) => handleSaveApiKey(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-[#08332c] border border-[#1b6d5e] rounded-lg text-xs text-white outline-none placeholder-[#67978c]"
            />
          </div>
        )}

        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#f8faf8]">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-[#08332c] text-white'
                      : 'bg-[#5eead4] text-[#08332c]'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`space-y-1.5 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#08332c] text-white rounded-tr-none'
                        : m.isWarning
                        ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-none'
                        : 'bg-white border border-[#e5ebe5] text-slate-800 rounded-tl-none shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {m.text}
                    </div>

                    {!isUser && (
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[10px] text-slate-400">
                        <span>{m.timestamp}</span>
                        <button
                          onClick={() => speakText(m.text)}
                          className="hover:text-teal-700 font-semibold flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Listen</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {m.suggestedQuestions && m.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {m.suggestedQuestions.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="px-2.5 py-1 rounded-full text-[10px] bg-white border border-slate-200 text-[#08332c] hover:border-teal-500 transition shadow-2xs font-medium"
                        >
                          💡 {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Bot className="w-4 h-4 text-teal-600 animate-spin" />
              <span>Analyzing CPCB/WHO protocol with Gemini...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder={isHi ? 'मास्क, खिड़की, प्यूरीफायर पर पूछें...' : 'Ask about masks, purifier, walking...'}
            className="flex-1 px-3.5 py-2 bg-[#f4f7f4] border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-600 text-slate-800"
          />

          <button
            type="submit"
            disabled={!inputQuestion.trim() || isTyping}
            className="p-2 bg-[#08332c] hover:bg-[#104b40] text-white rounded-xl disabled:opacity-40 transition shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="px-3 pb-2 bg-white text-[9px] text-center text-slate-400">
          Non-clinical air quality guidance. In emergency, call 112 / 108.
        </p>
      </div>
    </div>
  );
};
