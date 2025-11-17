import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  _id?: string;
  text: string;
  fromUserEmail: string;
  toUserEmail?: string;
  isBroadcast: boolean;
  createdAt?: string;
}

interface ChatProps {
  userEmail: string;
  userRole: string; // "admin" or "ranger"
}

export default function Chat({ userEmail, userRole }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [targetRanger, setTargetRanger] = useState(""); // For admin private chat
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const s: Socket = io("http://localhost:5001", {
      transports: ["websocket"],
      auth: { userEmail },
    });
    setSocket(s);

    // Load previous messages
    s.on("chat:load", (msgs: Message[]) => setMessages(msgs));

    // Incoming messages
    s.on("chat:broadcast", (msg: Message) => setMessages((prev) => [...prev, msg]));
    s.on("chat:private", (msg: Message) => setMessages((prev) => [...prev, msg]));

    s.on("connect_error", (err) => console.log("Socket connection error:", err.message));

    return () => {
      s.disconnect();
    };
  }, [userEmail]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    if (userRole === "admin" && targetRanger === "ALL") {
      socket.emit("chat:broadcast", { text: input, fromUserEmail: userEmail });
    } else {
      socket.emit("chat:private", {
        text: input,
        fromUserEmail: userEmail,
        toUserEmail: userRole === "admin" ? targetRanger : "admin@gmail.com",
      });
    }
    setInput("");
  };

  return (
    <div className="border rounded-lg p-4 mt-6 bg-white/10 backdrop-blur-sm w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-3 text-white">
        {userRole === "admin" ? "Admin Chat" : "Ranger Chat"}
      </h2>

      {userRole === "admin" && (
        <div className="mb-3">
          <input
            type="text"
            placeholder="Ranger Email or ALL for broadcast"
            className="w-full p-2 rounded border"
            value={targetRanger}
            onChange={(e) => setTargetRanger(e.target.value)}
          />
        </div>
      )}

      <div className="h-64 overflow-y-auto bg-white/20 p-3 rounded mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-1 p-2 rounded ${
              m.fromUserEmail === userEmail ? "bg-green-300 text-right" : "bg-gray-300 text-left"
            }`}
          >
            <strong>{m.isBroadcast ? "Broadcast" : m.fromUserEmail}: </strong>
            {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
