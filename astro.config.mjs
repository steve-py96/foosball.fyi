import { defineConfig } from 'astro/config';
import unocss from 'unocss/astro';
import unpluginIcons from 'unplugin-icons/vite';
import viteYaml from '@modyfi/vite-plugin-yaml';
import autoImport from 'astro-auto-import';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

const PUBLIC_DOMAIN = 'foosball.fyi';
const SITE = `https://${PUBLIC_DOMAIN}`;

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
    sitemap({
      changefreq: 'weekly',
      serialize(item) {
        // add missing domain
        if (!item.url.startsWith(SITE)) {
          item.url = item.url.replace('https://', `${SITE}/`);
        }

        const pathname = item.url.slice(SITE.length);

        // remove double slashes
        if (pathname.includes('//')) {
          item.url = `${SITE}${pathname.replace(/\/+/g, '/')}`;
        }

        return item;
      },
    }),
  ],
  site: SITE,
  vite: {
    plugins: [
      viteYaml(),
      unpluginIcons({
        compiler: 'astro',
      }),
    ],
  },
});
