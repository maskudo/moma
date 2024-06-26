import qs from 'qs'
import { Artists } from "@/types/Artists";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ROUTE } from '@/constants/host';

const GET_ARTISTS_QUERY = 'get-artists-query'
interface GetArtistsParams {
  artist?: string;
  page?: string;
  limit?: string;
}
const getArtists = async (searchParams?: GetArtistsParams) => {
  const params = searchParams ? qs.stringify(searchParams) : '';
  const { data } = await axios.get(`${API_ROUTE}/artists?${params}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return data as Artists[];
};
const useArtists = (searchParams?: GetArtistsParams) => {
  return useQuery({
    queryKey: [GET_ARTISTS_QUERY, searchParams],
    queryFn: () => getArtists(searchParams),
    refetchOnWindowFocus: false,
  });
};

export { useArtists, GET_ARTISTS_QUERY }
