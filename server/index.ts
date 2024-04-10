import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import artistRoutes from './src/route/artistRoutes';
import artworksRoutes from './src/route/artworkRoutes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors<Request>());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/artists', artistRoutes);
app.use('/artworks', artworksRoutes);

// add an error handling middleware if time

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
