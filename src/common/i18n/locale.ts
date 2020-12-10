/**
 * Detects browser language.
 * @return detected language.
 */
const detectLanguage = (req: any): string => {
  // TODO dynamically declare SUPPORING_LANGUAGES in withLang
  const SUPPORING_LANGUAGES = ['ko', 'en'];
  const DEFAULT_LANGUAGE = 'en';
  let language;
  if (req.headers['accept-language']) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/accept-language
    // MEMO considereing only language with the highest quality
    // MEMO language could be passed from client
    const languages: string[] = req.headers['accept-language'].split(';')[0].split(',');
    languages.some((lang) => {
      if (lang === '*') {
        return true;
      }

      if (SUPPORING_LANGUAGES.includes(lang)) {
        language = lang;
        return true;
      }
      return false;
    });
    return language || DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
};

export default detectLanguage;
