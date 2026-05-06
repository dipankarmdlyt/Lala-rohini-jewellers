import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917699078709?text=Greetings! I am visiting the Lala Rohini Jewellers website and would like to learn more about your heritage collections and current store offerings."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <MessageSquare fill="currentColor" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-medium whitespace-nowrap">
        Enquire Now
      </span>
    </a>
  );
}
