import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        catalog: 'Catalog',
        bridal: 'Bridal',
        'try-on': 'Try-On',
        store: 'Store',
        appointment: 'Book Appointment',
        brandFilm: 'Brand Film'
      },
      hero: {
        label1: 'Bengali Bridal Series — The Shubho Drishti',
        title1: 'Timeless Grace in Everlasting Gold',
        label2: 'Diamond Excellence',
        title2: 'Certified Brilliance and Clarity',
        label3: 'The Legacy of Gold',
        title3: 'The Heart of Every Celebration',
        cta: 'Explore Now'
      },
      common: {
        language: 'Language',
        selectLanguage: 'Choose Language',
        wishlist: 'Wishlist',
        callNow: 'Call Now',
        whatsapp: 'WhatsApp Us'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        catalog: 'कैटलॉग',
        bridal: 'ब्राइडल',
        'try-on': 'ट्राई-ऑन',
        store: 'स्टोर',
        appointment: 'अपॉइंटमेंट बुक करें',
        brandFilm: 'ब्रांड फिल्म'
      },
      hero: {
        label1: 'बंगाली ब्राइडल सीरीज़ — शुभो दृष्टि',
        title1: 'शाश्वत सोने में कालातीत अनुग्रह',
        label2: 'हीरा उत्कृष्टता',
        title2: 'प्रमाणित चमक और स्पष्टता',
        label3: 'सोने की विरासत',
        title3: 'हर उत्सव का हृदय',
        cta: 'अभी देखें'
      },
      common: {
        language: 'भाषा',
        selectLanguage: 'भाषा चुनें',
        wishlist: 'विशलिस्ट',
        callNow: 'अभी कॉल करें',
        whatsapp: 'व्हाट्सएप करें'
      }
    }
  },
  bn: {
    translation: {
      nav: {
        home: 'হোম',
        catalog: 'ক্যাটালগ',
        bridal: 'ব্রাইডাল',
        'try-on': 'ট্রাই-অন',
        store: 'স্টোর',
        appointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
        brandFilm: 'ব্র্যান্ড ফিল্ম'
      },
      hero: {
        label1: 'বেঙ্গলি ব্রাইডাল সিরিজ — শুভ দৃষ্টি',
        title1: 'চিরন্তন স্বর্ণে নিরবধি লাবণ্য',
        label2: 'ডায়মন্ড এক্সিলেন্স',
        title2: 'প্রত্যয়িত উজ্জ্বলতা এবং স্বচ্ছতা',
        label3: 'সোনার উত্তরাধিকার',
        title3: 'প্রতিটি উদযাপনের হৃদয়',
        cta: 'এখনই দেখুন'
      },
      common: {
        language: 'ভাষা',
        selectLanguage: 'ভাষা চয়ন করুন',
        wishlist: 'উইশলিস্ট',
        callNow: 'কল করুন',
        whatsapp: 'হোয়াটসঅ্যাপ করুন'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
