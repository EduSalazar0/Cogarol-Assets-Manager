import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative w-full py-4 px-6 rounded-xl font-bold text-lg text-white overflow-hidden",
          "bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#B8860B]",
          "shadow-lg shadow-[#D4AF37]/30",
          "hover:shadow-xl hover:shadow-[#D4AF37]/40",
          "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-12" />
        
        <span className="relative flex items-center justify-center gap-2">
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          {children}
        </span>
      </motion.button>
    );
  }
);
GoldButton.displayName = "GoldButton";
