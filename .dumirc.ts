import { defineConfig } from 'dumi';
import path from 'node:path';

import { description, homepage, name } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const themeConfig = {
  actions: [
    {
      link: homepage,
      openExternal: true,
      text: 'Github',
    },
    {
      link: '/components/use-speech-recognition',
      text: 'Get Started',
      type: 'primary',
    },
  ],
  apiHeader: {
    docUrl: `{github}/tree/master/src/{atomId}/index.md`,
    match: ['/components'],
    pkg: name,
    sourceUrl: `{github}/tree/master/src/{atomId}/index.tsx`,
  },
  description: description,
  footer: 'Made with 🤯 by Arietta Studio',
  giscus: {
    category: 'Q&A',
    categoryId: 'DIC_kwDOLkQSls4CeM_k',
    repo: 'arietta-studio/arietta-recognition',
    repoId: 'R_kgDOLkQSlg',
  },
  hideHomeNav: true,
  name: 'Recognition',
  socialLinks: {
    discord: 'https://discord.gg/',
    github: homepage,
  },
  title: 'Arietta Recognition',
};

export default defineConfig({
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  alias: {
    '@arietta-studio/tts/react': path.join(__dirname, './src/react'),
  },
  /* eslint-enable */
  apiParser: isProduction ? {} : false,
  base: '/',
  define: {
    'process.env': process.env,
  },
  favicons: ['https://unpkg.com/@arietta-studio/assets-favicons@latest/assets/favicon.ico'],
  locales: [
    { id: 'en-US', name: 'English' },
    { id: 'lt-LT', name: 'Lietuvių' },
  ],
  // mfsu: isWin ? undefined : {},
  mfsu: false,
  npmClient: 'pnpm',
  publicPath: '/',
  resolve: {
    atomDirs: [{ dir: 'src/react', type: 'component' }],
    entryFile: isProduction ? './src/index.ts' : undefined,
  },
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #000; }
  }`,
  ],
  themeConfig,
  title: 'Arietta Recognition',
});
