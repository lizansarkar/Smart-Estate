"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Wand2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const FloatingButtons: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Action Buttons */}
      {isOpen && (
        <div className="flex flex-col gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* AI Chat Button */}
          <Link href="/ai-chat">
            <Button
              variant="default"
              size="lg"
              className="w-full px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="hidden sm:inline">AI Chat</span>
            </Button>
          </Link>

          {/* AI Generator Button */}
          <Link href="/ai-description">
            <Button
              variant="accent"
              size="lg"
              className="w-full px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Wand2 className="h-5 w-5" />
              <span className="hidden sm:inline">AI Generator</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`w-16 h-16 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all flex items-center justify-center font-bold text-lg ${
          isOpen
            ? "bg-secondary text-secondary-foreground hover:opacity-90"
            : "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <div>⚡</div>}
      </Button>
    </div>
  );
};

export default FloatingButtons;
