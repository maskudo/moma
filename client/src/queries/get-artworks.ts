import qs from 'qs'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Artwork } from '@/types/Artworks';

export const GET_ARTWORKS_QUERY = 'get-artworks-query'
interface GetArtworksParams {
  artwork?: string;
  page?: string;
  limit?: string;
}
const getArtworks = async (searchParams?: GetArtworksParams) => {
  const params = searchParams ? qs.stringify(searchParams) : '';
  const { data } = await axios.get(`http://localhost:8000/artworks?${params}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return data as Artwork[];
};
const useArtworks = (searchParams?: GetArtworksParams) => {
  return useQuery({
    queryKey: [GET_ARTWORKS_QUERY, searchParams],
    queryFn: () => getArtworks(searchParams),
    refetchOnWindowFocus: false,
  });
};

export { useArtworks }
