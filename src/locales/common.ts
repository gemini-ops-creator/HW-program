import type { Language } from "./languages";

type CommonTranslations = {
  header: {
    home: string;
    menu: string;
    company: string;
    login: string;
    languageLabel: string;
    theme: {
      light: string;
      dark: string;
    };
  };
  footer: {
    description: string;
    columns: {
      company: string;
      template: string;
    };
    links: {
      about: string;
      careers: string;
      contact: string;
      style: string;
      changelog: string;
      license: string;
    };
    credits: {
      builtBy: string;
      poweredBy: string;
    };
  };
};

export const commonTranslations: Record<Language, CommonTranslations> = {
  en: {
    header: {
      home: "Home",
      menu: "Menu",
      company: "Company",
      login: "Login",
      languageLabel: "Language",
      theme: {
        light: "Light",
        dark: "Dark",
      },
    },
    footer: {
      description:
        "Takeaway & Delivery template for small - medium businesses.",
      columns: {
        company: "COMPANY",
        template: "TEMPLATE",
      },
      links: {
        about: "About Us",
        careers: "Careers",
        contact: "Contact",
        style: "Style Guide",
        changelog: "Changelog",
        license: "License",
      },
      credits: {
        builtBy: "Built by",
        poweredBy: "Powered by",
      },
    },
  },
  ru: {
    header: {
      home: "Главная",
      menu: "Меню",
      company: "Компания",
      login: "Вход",
      languageLabel: "Язык",
      theme: {
        light: "Светлая",
        dark: "Тёмная",
      },
    },
    footer: {
      description: "Шаблон доставки еды для малого и среднего бизнеса.",
      columns: {
        company: "КОМПАНИЯ",
        template: "ШАБЛОН",
      },
      links: {
        about: "О нас",
        careers: "Вакансии",
        contact: "Контакты",
        style: "Стиль",
        changelog: "Изменения",
        license: "Лицензия",
      },
      credits: {
        builtBy: "Сделано",
        poweredBy: "Работает на",
      },
    },
  },
  es: {
    header: {
      home: "Inicio",
      menu: "Menú",
      company: "Empresa",
      login: "Iniciar sesión",
      languageLabel: "Idioma",
      theme: {
        light: "Claro",
        dark: "Oscuro",
      },
    },
    footer: {
      description:
        "Plantilla de comida para llevar y entrega para pequeñas y medianas empresas.",
      columns: {
        company: "EMPRESA",
        template: "PLANTILLA",
      },
      links: {
        about: "Sobre nosotros",
        careers: "Carreras",
        contact: "Contacto",
        style: "Guía de estilo",
        changelog: "Cambios",
        license: "Licencia",
      },
      credits: {
        builtBy: "Creado por",
        poweredBy: "Impulsado por",
      },
    },
  },
};
