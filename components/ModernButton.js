import { useState } from 'react';

export default function ModernButton({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold
    transition-all duration-300 ease-out
    border border-transparent rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    transform hover:scale-105 active:scale-95
    overflow-hidden group
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-white to-gray-200
      text-black border-white/20
      hover:from-gray-200 hover:to-white
      hover:shadow-lg hover:shadow-white/25
      focus:ring-white/50
    `,
    secondary: `
      bg-gray-800/60 border-gray-700/50 text-white
      hover:bg-gray-800/80 hover:border-white/50
      hover:shadow-lg hover:shadow-gray-900/50
      focus:ring-gray-500/50
    `,
    outline: `
      bg-transparent border-white/60 text-white
      hover:bg-white/10 hover:border-white
      hover:shadow-lg hover:shadow-white/20
      focus:ring-white/50
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const ButtonContent = () => (
    <>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
      
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {children}
        
        {/* Download icon */}
        <svg 
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      </span>

      {/* Floating particles effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + (i * 10)}%`,
                animationDelay: `${i * 150}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </>
  );

  // If href is provided, render as link
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        <ButtonContent />
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <ButtonContent />
    </button>
  );
}
