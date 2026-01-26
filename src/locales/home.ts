import type { Language } from "./languages";

type HomeTranslations = {
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  titleLine3Suffix: string;
  subtitle: string;
  orderButton: string;
  ratingText: string;
  trustpilotAlt: string;
  heroImageAlt: string;
};

export const homeTranslations: Record<Language, HomeTranslations> = {
  en: {
    titleLine1: "Beautiful food",
    titleLine2: "& takeaway,",
    titleHighlight: "delivered",
    titleLine3Suffix: "to your door.",
    subtitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.",
    orderButton: "Place an Order",
    ratingText: "from over 2000+ reviews",
    trustpilotAlt: "Trustpilot logo",
    heroImageAlt: "Delicious Food",
  },
  ru: {
    titleLine1: "Вкусная еда",
    titleLine2: "и навынос,",
    titleHighlight: "доставлена",
    titleLine3Suffix: "к вашей двери.",
    subtitle:
      "Lorem Ipsum — это просто текст-заглушка в полиграфии и наборе. Он используется как стандартный текст с 1500-х годов.",
    orderButton: "Сделать заказ",
    ratingText: "более 2000+ отзывов",
    trustpilotAlt: "Логотип Trustpilot",
    heroImageAlt: "Вкусная еда",
  },
  es: {
    titleLine1: "Comida deliciosa",
    titleLine2: "y para llevar,",
    titleHighlight: "entregada",
    titleLine3Suffix: "a tu puerta.",
    subtitle:
      "Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. Ha sido el texto estándar desde los años 1500.",
    orderButton: "Hacer un pedido",
    ratingText: "más de 2000+ reseñas",
    trustpilotAlt: "Logotipo de Trustpilot",
    heroImageAlt: "Comida deliciosa",
  },
};
