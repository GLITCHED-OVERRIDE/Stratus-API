import express, { Request, Response } from 'express';
import { scrapeAnime } from './scrapeAnime';
import { scrapeManga } from './scrapeManga';

const app = express();
const PORT = process.env.PORT || 3000;

// Anime endpoint
app.get('/api/anime', async (_req: Request, res: Response) => {
  try {
    const data = await scrapeAnime();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Manga endpoint
app.get('/api/manga', async (_req: Request, res: Response) => {
  try {
    const data = await scrapeManga();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
