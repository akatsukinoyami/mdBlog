import en from "./en.json";
import ru from "./ru.json";
import ua from "./ua.json";

export default function i18n(language: string): Record<string, any> {
  return { en, ru, ua }[language];
}
