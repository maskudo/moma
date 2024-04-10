# Convert JSON files to ndJSON for postgres compatibility

```bash
    jq -c '.[]' collection/Artworks.json > Artworks.json
```

NOTE: artist and artwork json files may not be able to be ingested directly by postgres after above processing
because it contains some characters postgres considers invalid in JSON files such as \W and \" characters.

# Update Cursors for Serial Fields

Since we have manually inserted the items including the IDs which is a serial field, the cursor doesn't get updated automatically. So we must update those fields manually as well.

```sql
    SELECT setval('"artists_ConstituentID_seq"', (SELECT MAX("ConstituentID") FROM artists)+1);
    SELECT setval('"artworks_id_seq"', (SELECT MAX("id") FROM artworks)+1);
```
