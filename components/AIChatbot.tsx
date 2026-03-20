'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const { t, lang } = useLang();
  const chat = t.chatbot;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Listen for open-chatbot event
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handler);
    return () => window.removeEventListener('open-chatbot', handler);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [input]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    setHasInteracted(true);
    const userMessage: Message = { role: 'user', content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, language: lang }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: chat.errorProcess,
          },
        ]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: data.message }]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: chat.errorConnection,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-60 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 4px 24px rgba(201, 168, 76, 0.3)',
            }}
            aria-label={chat.open}
          >
            <span className="font-mono text-[13px] font-bold" style={{ color: 'var(--bg-primary)' }}>
              AI
            </span>
            {!hasInteracted && (
              <span
                className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full animate-ping"
                style={{ background: 'var(--accent)' }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-4 sm:right-6 z-60 flex flex-col"
            style={{
              width: 'min(400px, calc(100vw - 32px))',
              height: 'min(520px, 70vh)',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              transformOrigin: 'bottom right',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 shrink-0"
              style={{
                height: '56px',
                background: 'var(--tag-bg)',
                borderBottom: '1px solid var(--border-subtle)',
                borderRadius: '16px 16px 0 0',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-body text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>
                  Gregory AI
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
                style={{ color: 'var(--text-tertiary)' }}
                aria-label={chat.close}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {/* Welcome message */}
              <div className="flex justify-start">
                <div
                  className="max-w-[85%] px-4 py-3 font-body text-[13px] leading-[1.6]"
                  style={{
                    background: 'var(--card-bg)',
                    color: 'var(--text-secondary)',
                    borderRadius: '16px 16px 16px 4px',
                  }}
                >
                  {chat.welcome}
                </div>
              </div>

              {/* Suggestions */}
              {!hasInteracted && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {chat.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="font-mono text-[11px] px-3 py-1.5 rounded-full transition-all duration-200"
                      style={{
                        background: 'var(--tag-bg)',
                        border: '1px solid var(--tag-border)',
                        color: 'var(--accent)',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Conversation */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] px-4 py-3 font-body text-[13px] leading-[1.6]"
                    style={{
                      background:
                        msg.role === 'user' ? 'var(--accent)' : 'var(--card-bg)',
                      color:
                        msg.role === 'user' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      borderRadius:
                        msg.role === 'user'
                          ? '16px 16px 4px 16px'
                          : '16px 16px 16px 4px',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 flex gap-1.5"
                    style={{
                      background: 'var(--card-bg)',
                      borderRadius: '16px 16px 16px 4px',
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          background: 'var(--text-ghost)',
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: '0.8s',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="shrink-0 px-4 py-3"
              style={{ borderTop: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={chat.placeholder}
                  rows={1}
                  className="flex-1 resize-none bg-transparent font-body text-[13px] outline-none placeholder:text-text-ghost"
                  style={{
                    color: 'var(--text-primary)',
                    maxHeight: '100px',
                  }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-opacity duration-200 disabled:opacity-30"
                  style={{ color: 'var(--accent)' }}
                  aria-label="Send message"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
