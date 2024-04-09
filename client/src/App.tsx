import React from "react"
import { useArtists } from "./queries/get-artists";
import DataTable from "./components/artists/table"
import { columns } from "./components/artists/columns";
import { useSearchParams } from "react-router-dom";

function App() {
  let [searchParams, _setSearchParams] = useSearchParams()
  const artistName = searchParams.get('artist') ?? undefined

  const { data } = useArtists({ artist: artistName })
  return <div className="">
    <DataTable columns={columns} data={data ?? []} totalItems={data?.length ?? 0} />

  </div>;
}

export default App;
