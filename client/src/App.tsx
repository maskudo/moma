import React from "react"
import { useArtists } from "./queries/get-artists";

function App() {
  const { data } = useArtists()
  console.log(data)
  return <div className="">hello world</div>;
}

export default App;
