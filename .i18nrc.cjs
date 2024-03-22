/**
 *
 * @type {import("@arietta-studio/arietta-i18n").Config}
 */
module.exports = {
  markdown: {
    entry: ['docs/**/**'],
    entryLocale: 'lt-LT',
    entryExtension: '.lt-LT.md',
    exclude: ['changelog.md'],
    outputLocales: ['en-US'],
    outputExtensions: (locale, { getDefaultExtension }) => {
      if (locale === 'en-US') return '.md';
      return getDefaultExtension(locale);
    },
  },
  modelName: 'gpt-3.5-turbo-1106',
};
