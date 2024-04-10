import React from "react"
import { useArtists } from "./queries/get-artists";
import DataTable from "./components/artists/table"
import ArtworkTable from "./components/artworks/table"
import { columns } from "./components/artists/columns";
import { columns as artworkColumn } from "./components/artworks/columns";
import useMySearchParams from "./hooks/use-search-params";
import { useArtworks } from "./queries/get-artworks";

function App() {
  const { searchParams } = useMySearchParams()
  const artistName = searchParams.get('artist') ?? undefined
  const artworkName = searchParams.get('artwork') ?? undefined

  const { data } = useArtists({ artist: artistName })
  const { data: artworksData } = useArtworks({ artwork: artworkName })
  return <div className="">
    <DataTable columns={columns} data={data ?? []} totalItems={data?.length ?? 0} />
    <ArtworkTable columns={artworkColumn} data={artworksData ?? []} totalItems={artworksData?.length ?? 0} />

  </div>;
}

export default App;
