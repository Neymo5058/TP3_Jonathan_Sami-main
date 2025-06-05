import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'fr'],
  directory: path.resolve('translations'),
  defaultLocale: 'en',
  queryParameter: 'lang',
  header: 'accept-language',
  autoReload: true,
  updateFiles: false,
  objectNotation: true
});

export default i18n;
