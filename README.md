# moma

# Setup postgres

With docker enabled run:

```bash
    chmod +x db.sh
    ./db.sh
```

## Convert JSON files to ndJSON for postgres compatibility

```bash
    jq -c '.[]' collection/Artworks.json > Artworks.json
```

NOTE: artist and artwork json files may not be able to be ingested directly by postgres after above processing
because it contains some characters postgres considers invalid in JSON files such as \W and \" characters.
I had to remove those invalid characters for the script below to run.

## Run population script

The population process takes about 10 minutes on my machine. The artwork-artist table has around 112k records by the end of the process.
(Have a small bug where the script doesnt exit properly after population is done.)

```bash
    # make sure postgres is installed and setup as in populate.js
    node populate.js
```

## Update Cursors for Serial Fields

Since we have manually inserted the items including the IDs which is a serial field, the cursor doesn't get updated automatically. So we must update those fields manually as well.

```sql
    SELECT setval('"artists_ConstituentID_seq"', (SELECT MAX("ConstituentID") FROM artists)+1);
    SELECT setval('"artworks_id_seq"', (SELECT MAX("id") FROM artworks)+1);

```

# Build and run server

```bash
    cd server
    cp .env.example .env # and make necessary adjustments
    pnpm i
    npm run dev
```

# Build and run client

```bash
    cd client
    pnpm i
    npm run dev
```
