"use client";

import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* TOAST */}
      <div className="fixed bottom-6 right-6 z-[999]">
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, x: 80, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 80, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/80 px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            >
              {/* Icon */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-sm font-bold">
                ✓
              </div>

              {/* Text */}
              <span className="text-sm font-medium text-[var(--color-text)]">
                {message}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}