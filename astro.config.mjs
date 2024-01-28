import { defineConfig } from 'astro/config';
import unocss from 'unocss/astro';
import unpluginIcons from 'unplugin-icons/vite';
import viteYaml from '@modyfi/vite-plugin-yaml';
import autoImport from 'astro-auto-import';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      injectReset: true,
    }),
    autoImport({
      imports: [
        {
          'astro:assets': ['Picture, Image'],
        },
      ],
    }),
    mdx({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            rel: 'noreferrer noopener',
            target: '_blank',
            // content: {
            //   type: 'text',
            //   value: ' 🔗',
            // },
          },
        ],
      ],
    }),
    vue(),
  ],
  vite: {
    plugins: [
      viteYaml(),
      unpluginIcons({
        compiler: 'astro',
      }),
    ],
  },
});
