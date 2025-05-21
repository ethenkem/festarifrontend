import fs from "fs"
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/contact', changefreq: 'monthly' },
  { url: '/estates', changefreq: 'monthly' },
  { url: '/frci', changefreq: 'monthly' },
  { url: '/agriculture', changefreq: 'monthly' },
  { url: '/enterprise', changefreq: 'monthly' },
  { url: '/about', changefreq: 'monthly' },
  { url: '/founder', changefreq: 'monthly' },
  { url: '/consultation', changefreq: 'monthly' },
  { url: '/login', changefreq: 'monthly' },
  { url: '/register', changefreq: 'monthly' },
  { url: '/dashboard', changefreq: 'weekly' },
  { url: '/properties', changefreq: 'monthly' },
  { url: '/terms-of-service', changefreq: 'yearly' },
  { url: '/impressum', changefreq: 'yearly' },
  { url: '/privacy-policy', changefreq: 'yearly' },
  { url: '/refund-and-cookies-policy', changefreq: 'yearly' },
];

const hostname = 'https://festarigroup.com';

(async () => {
  const sitemap = new SitemapStream({ hostname });
  const writeStream = createWriteStream('./public/sitemap.xml');

  sitemap.pipe(writeStream);

  links.forEach(link => sitemap.write(link));
  sitemap.end();

  await streamToPromise(sitemap);

  console.log('✅ Sitemap successfully generated at public/sitemap.xml');
})();
