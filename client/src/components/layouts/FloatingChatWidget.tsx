import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import Chat from "./Chat";

interface Props {
  userEmail: string;
  userRole: string;
}

export default function FloatingChatWidget({ userEmail, userRole }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all z-50"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-white font-bold text-lg"
            >
              ✕
            </button>

            <Chat userEmail={userEmail} userRole={userRole} />
          </div>
        </div>
      )}
    </>
  );
}
