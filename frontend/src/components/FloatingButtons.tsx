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
{/* Chatbot Button - Bottom Right */}
    <button
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40 group chat-btn"
      aria-label="Chat with us"
      style={{ /* keep if you want custom duration override */ animationDuration: '3s' }}
    >
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full opacity-75 chat-badge" />
    </button>


      {/* Language Switcher - Bottom Left */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="fixed bottom-8 left-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40 border border-gray-200"
            aria-label="Change language"
          >
            <Globe className="w-6 h-6 text-primary_green" />
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
              className={selectedLang === lang.name ? 'bg-primary_green/10 text-primary_green' : ''}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
