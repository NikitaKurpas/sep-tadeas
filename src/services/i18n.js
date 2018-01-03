import * as locales from "../locales"
const lang = 'en_US';

function get(obj, path) {
  return path.split('.').reduce((obj, path) => obj != null ? obj[path] : null, obj)
}

export default function(path, _default) {
  const locale = locales[lang]
  if (!locale) return _default;
  return locale[path] || get(locale, path) || _default || path;
}
