import styles from "./LanguageDropdown.module.scss";
import { languages, type Language } from "../../locales/languages";
import { useLanguage } from "../../context/LanguageContext";
import { commonTranslations } from "../../locales/common";

const languageLabels: Record<Language, string> = {
  en: "English",
  ru: "Русский",
  es: "Español",
};

function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const content = commonTranslations[language];

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="language-select">
        {content.header.languageLabel}
      </label>
      <select
        id="language-select"
        className={styles.select}
        value={language}
        onChange={event => setLanguage(event.target.value as Language)}
        aria-label="Language"
      >
        {languages.map(option => (
          <option key={option} value={option}>
            {languageLabels[option]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageDropdown;
