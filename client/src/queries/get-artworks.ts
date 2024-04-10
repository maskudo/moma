import qs from 'qs'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Artwork } from '@/types/Artworks';
import { API_ROUTE } from '@/constants/host';

export const GET_ARTWORKS_QUERY = 'get-artworks-query'
interface GetArtworksParams {
  artwork?: string;
  artist?: string;
  page?: string;
  limit?: string;
}
const getArtworks = async (searchParams?: GetArtworksParams) => {
  const params = searchParams ? qs.stringify(searchParams) : '';
  const { data } = await axios.get(`${API_ROUTE}/artworks?${params}`, {
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
