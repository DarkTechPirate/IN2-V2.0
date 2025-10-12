import { MessageCircle, Globe } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function FloatingButtons() {
  const [selectedLang, setSelectedLang] = useState('English');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
  ];

  return (
    <>
      {/* Chatbot Button - Bottom Right */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#2FF924] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40 animate-pulse hover:animate-none group"
        style={{ animationDuration: '3s' }}
        aria-label="Chat with us"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -left-1 w-3 h-3 bg-[#2FF924] rounded-full opacity-75 group-hover:opacity-0 transition-opacity" />
      </button>

      {/* Language Switcher - Bottom Left */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="fixed bottom-8 left-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40 border border-gray-200"
            aria-label="Change language"
          >
            <Globe className="w-6 h-6 text-[#2FF924]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          side="top" 
          className="mb-2 ml-8"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setSelectedLang(lang.name)}
              className={selectedLang === lang.name ? 'bg-[#2FF924]/10 text-[#2FF924]' : ''}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
