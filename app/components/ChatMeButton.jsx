"use client";

import { useState } from "react";

/**
 * ChatMeButton Component
 * Opens native SMS app with pre-filled message containing product info
 * Works on both iOS and Android using sms: protocol
 * 
 * @param {string} productName - Name of the product
 * @param {string} productId - ID of the product for URL
 * @param {string} phoneNumber - Phone number to send SMS to (default: +16127200910)
 * @param {string} baseUrl - Base URL of the site (default: https://hmoobwin.com)
 */
export default function ChatMeButton({ 
  productName = "this product", 
  productId = "",
  phoneNumber = "+16127200910",
  baseUrl = "https://hmoobwin.com"
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Create the product URL
    const productUrl = `${baseUrl}/products/${productId}`;
    
    // Create the SMS message
    const message = `Hi! I'm interested in "${productName}" — ${productUrl}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create SMS link
    // iOS uses &body, Android uses ?body, both work with ?body
    const smsLink = `sms:${phoneNumber}?body=${encodedMessage}`;
    
    // Visual feedback
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
    
    // Open SMS app
    window.location.href = smsLink;
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group relative inline-flex items-center justify-center gap-2 
        px-6 py-3 
        bg-green-600 hover:bg-green-700 
        text-white font-semibold text-base
        rounded-xl 
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        transform hover:scale-105 active:scale-95
        ${clicked ? 'scale-95' : ''}
        focus:outline-none focus:ring-4 focus:ring-green-300
        overflow-hidden
      `}
      aria-label="Send SMS inquiry about this product"
    >
      {/* Animated background effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        <span className="text-2xl animate-pulse">💬</span>
        <span>Chat Me</span>
      </span>
      
      {/* Ripple effect on click */}
      {clicked && (
        <span className="absolute inset-0 bg-white opacity-30 animate-ping rounded-xl"></span>
      )}
    </button>
  );
}
