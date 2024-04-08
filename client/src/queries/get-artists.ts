import { Artists } from "@/types/Artists";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GET_ARTISTS_QUERY = 'get-artists-query'
const getArtists = async () => {
  const { data } = await axios.get(`http://localhost:8000/artists`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return data as Artists[];
};
const useArtists = () => {
  return useQuery({
    queryKey: [GET_ARTISTS_QUERY,],
    queryFn: () => getArtists(),
    refetchOnWindowFocus: false,
  });
};

export { useArtists }
