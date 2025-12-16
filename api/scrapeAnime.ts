import { chromium } from 'playwright';

export interface Anime {
  title: string;
  link: string;
  image: string;
  subDub: string | null;
}

export async function scrapeAnime(): Promise<Anime[]> {
  const url = 'https://9anime.to/';
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('div.listing');

  const animeData: Anime[] = await page.$$eval('div.listing > div.item', items =>
    items.map(item => {
      const title = item.querySelector('a.name')?.textContent?.trim() || '';
      const link = item.querySelector('a.name')?.getAttribute('href') || '';
      const image = item.querySelector('img')?.getAttribute('src') || '';
      const subDub = item.querySelector('span.type')?.textContent?.trim() || null;
      return { title, link, image, subDub };
    })
  );

  await browser.close();
  return animeData;
}
