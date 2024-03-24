/**
 *
 * @type {import("@arietta-studio/arietta-i18n").Config}
 */
module.exports = {
  markdown: {
    entry: ['docs/**/**'],
    entryLocale: 'en-US',
    exclude: ['changelog.md'],
    outputLocales: ['lt-LT'],
    outputExtensions: (locale, { getDefaultExtension }) => {
      if (locale === 'en-US') return '.md';
      return getDefaultExtension(locale);
    },
  },
  modelName: 'gpt-4-1106-preview',
};
