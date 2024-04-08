const { Client } = require('pg');
const fs = require('fs');

// PostgreSQL connection configuration
const pgConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'test1234',
  port: 5432,
};

// Read JSON file as a stream
const artistsFile = fs.readFileSync('./Artists.json', { encoding: 'utf8' });
const artworksFile = fs.readFileSync('./Artworks.json', { encoding: 'utf8' });

// Connect to PostgreSQL database
const client = new Client(pgConfig);
client
  .connect()
  .then(async () => {
    console.log('Connected to PostgreSQL');
    try {
      await client.query(`
      DROP TABLE IF EXISTS artwork_artist;
      DROP TABLE IF EXISTS artworks;
      DROP TABLE IF EXISTS artists;

      CREATE TABLE  artists (
        "ConstituentID" SERIAL PRIMARY KEY,
        "DisplayName" TEXT,
        "ArtistBio" TEXT,
        "Nationality" TEXT,
        "Gender" TEXT,
        "BeginDate" INT,
        "EndDate" INT
      );

      CREATE TABLE artworks (
        id SERIAL PRIMARY KEY,
        "Title" TEXT,
        "Date" TEXT,
        "Nationality" TEXT,
        "URL" TEXT,
        "ImageURL" VARCHAR(255)
      );
      
      CREATE TABLE artwork_artist (
        id SERIAL PRIMARY KEY,
        artist_id INT REFERENCES artists("ConstituentID"),
        artwork_id INT REFERENCES artworks("id")
      );
      `);
      let count = 0;
      await Promise.all([
        artistsFile.split('\n').map((line) => {
          let parsedLine = {};
          try {
            parsedLine = JSON.parse(line);
          } catch (e) {
            console.log('error parsing json');
            return;
          }
          count += 1;
          console.log(count);
          return client.query(
            `INSERT INTO artists("ConstituentID", "DisplayName", "ArtistBio", "Nationality", "Gender", "BeginDate", "EndDate") VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [
              parsedLine.ConstituentID,
              parsedLine.DisplayName,
              parsedLine.ArtistBio,
              parsedLine.Nationality,
              parsedLine.Gender,
              parsedLine.BeginDate,
              parsedLine.EndDate,
            ]
          );
        }),
      ]);
      count = 0;
      await Promise.all([
        artworksFile.split('\n').map(async (line) => {
          let parsedLine = {};
          try {
            parsedLine = JSON.parse(line);
          } catch (e) {
            console.log('error parsing json');
            return;
          }
          count += 1;
          console.log('b' + count);
          let { rows } = await client.query(
            `INSERT INTO artworks("Title", "Date", "Nationality", "URL", "ImageURL" ) VALUES ($1, $2, $3, $4, $5) returning *;`,
            [
              parsedLine.Title,
              parsedLine.Date,
              parsedLine.Nationality,
              parsedLine.URL,
              parsedLine.ImageURL,
            ]
          );
          Promise.all([
            parsedLine.ConstituentID.map((id) => {
              return client.query(
                `
                  INSERT INTO artwork_artist(artist_id, artwork_id) VALUES ($1, $2)
`,
                [id, rows[0].id]
              );
            }),
          ]);
        }),
      ]).then(() => {
        client.end();
      });
    } catch (e) {
      console.log(e.message);
    }
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error);
    client.end(); // Close the PostgreSQL connection
  });

console.log('completed');
