import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Manga {
  title: string;
  link: string;
  image: string;
  latestChapter: string;
}

export async function scrapeManga(): Promise<Manga[]> {
  const url = 'https://mangadex.org/'; 
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const mangaData: Manga[] = [];

  $('div.card.manga-entry').each((_, elem) => {
    const title = $(elem).find('h3.manga-title').text().trim();
    const link = $(elem).find('a').attr('href') || '';
    const image = $(elem).find('img').attr('src') || '';
    const latestChapter = $(elem).find('span.latest-chapter').text().trim() || '';
    mangaData.push({ title, link, image, latestChapter });
  });

  return mangaData;
}
