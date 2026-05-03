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
      className={`group relative inline-flex items-center justify-center overflow-hidden bg-[#081C36] text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold tracking-wide transition-all duration-300 ${className}`}
      style={{ minWidth: "165px" }}
      {...props}
    >
      {/* BULATAN - hidden di mobile */}
      <span
        className="absolute left-5 top-1/2 z-0 h-2 w-2 -translate-y-1/2 rounded-full bg-white transition-transform duration-700 ease-in-out hidden md:block md:group-hover:scale-[150]"
        style={{ transformOrigin: "center" }}
      />
      
      {/* TEKS */}
      <span
        className="relative z-10 transition-all duration-500 ease-in-out md:group-hover:-translate-x-3 md:group-hover:text-[#081C36] whitespace-nowrap"
      >
        {children}
      </span>

      {/* PANAH */}
      <ArrowRight 
        size={20} 
        className="absolute right-6 z-10 h-5 w-5 translate-x-4 text-[#081C36] opacity-0 transition-all duration-500 ease-out md:group-hover:translate-x-0 md:group-hover:opacity-100 hidden md:block" 
      />
    </a>
  );
};

export default AnimatedButton;
