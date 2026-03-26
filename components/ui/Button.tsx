"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  pulse?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  pulse = false,
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-body font-bold text-[18px] tracking-wide rounded-pill transition-all duration-200 select-none";

  const variants = {
    primary:
      "bg-orange text-white hover:bg-orange-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-transparent border-2 border-orange text-orange hover:bg-orange-light active:scale-[0.98]",
  };

  const sizing = fullWidth ? "w-full" : "w-full sm:w-auto sm:min-w-[240px]";
  const height = "h-14"; // 56px
  const padding = "px-8";
  const pulseClass = pulse ? "animate-cta-pulse" : "";

  const classes = `${base} ${variants[variant]} ${sizing} ${height} ${padding} ${pulseClass} ${className}`;

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes} onClick={onClick}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
