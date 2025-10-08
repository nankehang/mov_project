"use client";

import { useState } from "react";

export default function ChatMeButton({ productId, productName, productUrl, stock }) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChatMe = async () => {
    setSending(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productName,
          productUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus({
        type: "success",
        message: "Message sent! I'll contact you soon. 💬",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleChatMe}
        disabled={stock === 0 || sending}
        className="w-full bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {sending ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span className="text-2xl">💬</span>
            <span>{stock === 0 ? "Out of Stock" : "Chat Me"}</span>
          </>
        )}
      </button>

      {status.message && (
        <div
          className={`text-sm rounded-lg px-4 py-3 ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}
