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
  baseUrl = "https://hmoobwin.com",
  customMessage,
  className,
  label = "Chat Me",
  icon = "💬",
  showIcon = true,
  fullWidth = true,
  disableHoverScale = false,
  focusClassName,
  enableHoverOverlay,
  enableRipple,
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Normalize base URL to avoid double slashes
    const trimmedBaseUrl = baseUrl.replace(/\/$/, "");
    const productPath = productId ? `/products/${productId}` : "";
    const productUrl = `${trimmedBaseUrl}${productPath || ""}`;

    // Create the SMS message
    const message = customMessage ?? `Hi! I'm interested in "${productName}" — ${productUrl}`;
    
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

  const interactiveClasses = disableHoverScale
    ? "transition-colors duration-300"
    : `transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${clicked ? "scale-95" : ""}`;

  const baseClasses = [
    fullWidth ? "w-full" : "",
    "group relative inline-flex items-center justify-center gap-2",
    interactiveClasses,
  ].filter(Boolean).join(" ");

  const defaultThemeClasses = `
    px-8 py-4
    bg-red-600 hover:bg-red-700
    text-white font-bold text-lg
    rounded-xl
    shadow-lg hover:shadow-xl
  `;

  const resolvedFocusClass =
    focusClassName !== undefined
      ? focusClassName
      : className
        ? "focus:outline-none"
        : "focus:outline-none focus:ring-4 focus:ring-red-300";

  const finalClassName = [
    baseClasses,
    className || defaultThemeClasses,
    resolvedFocusClass,
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const overlayEnabled = enableHoverOverlay ?? !className;
  const rippleEnabled = enableRipple ?? !className;

  return (
    <button
      onClick={handleClick}
      className={`${finalClassName} overflow-hidden`}
      aria-label="Send SMS inquiry about this product"
    >
      {/* Animated background effect */}
      {overlayEnabled && (
        <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      )}
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {showIcon && <span className="text-2xl animate-pulse">{icon}</span>}
        <span>{label}</span>
      </span>
      
      {/* Ripple effect on click */}
      {rippleEnabled && clicked && (
        <span className="absolute inset-0 bg-white opacity-30 animate-ping rounded-xl"></span>
      )}
    </button>
  );
}
