import React from "react";
import { ArrowRight } from "lucide-react";

interface AnimatedButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const AnimatedButton = ({
  children,
  href,
  className = "",
  ...props
}: AnimatedButtonProps) => {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden bg-[#081C36] text-white px-10 py-3 rounded-full font-medium transition-all duration-300 ${className}`}
      style={{ minWidth: "165px" }}
      {...props}
    >
      {/* Expanding Dot - Desktop only (md:block) */}
      <span className="absolute left-5 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full transition-transform duration-700 ease-in-out hidden md:block md:group-hover:scale-[120]" />
      
      {/* Text - Slide desktop only (md:group-hover) */}
      <span className="relative z-10 transition-transform duration-500 md:group-hover:-translate-x-3 md:group-hover:text-[#081C36]">
        {children}
      </span>

      {/* Arrow - Reveal desktop only (md:block) */}
      <ArrowRight 
        size={18} 
        className="absolute right-6 opacity-0 translate-x-4 transition-all duration-500 hidden md:block md:group-hover:opacity-100 md:group-hover:translate-x-0 text-[#081C36]" 
      />
    </a>
  );
};

export default AnimatedButton;
