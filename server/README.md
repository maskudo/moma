convert to ndjson with
jq -c '.[]' collection/Artworks.json > Artworks.json

update serial cursor
SELECT setval('"artists_ConstituentID_seq"', (SELECT MAX("ConstituentID") FROM artists)+1);
SELECT setval('"artworks_id_seq"', (SELECT MAX("id") FROM artworks)+1);
