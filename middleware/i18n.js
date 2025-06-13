import i18n from 'i18n';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18n.configure({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, '../translations'),
  defaultLocale: 'en',
  objectNotation: true,
  autoReload: true,
  updateFiles: false,
  syncFiles: false
});

export default i18n;
