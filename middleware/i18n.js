import i18n from 'i18n';
import path from 'path';
import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

i18n.configure({
  locales: ['en', 'fr'],
  directory: path.join(dirname, '../translations'),
  defaultLocale: 'en',
  objectNotation: true,
  autoReload: true,
  updateFiles: false,
  syncFiles: false,
  queryParameter: 'lang',
});

export default i18n;
