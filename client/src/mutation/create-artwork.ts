import axios from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { GET_ARTWORKS_QUERY } from "@/queries/get-artworks";
import { API_ROUTE } from "@/constants/host";


interface ICreateArtworks {
  Title: string,
  Artist: number,
  URL: string,
  ImageURL: string,
  Nationality: string,
  Date: string
}
const deleteArtwork = async (id: number | string) => {
  const { data } = await axios.delete(`${API_ROUTE}/artworks/` + id);
  return data;
};
const useDeleteArtwork = () => {
  return useMutation({
    mutationFn: deleteArtwork,
    onSuccess: () => {
      const qc = useQueryClient()
      qc.invalidateQueries({ queryKey: [GET_ARTWORKS_QUERY] })
    }
  });
};

const createArtwork = async (createArtworkData: ICreateArtworks) => {
  const { data } = await axios.post(`${API_ROUTE}/artworks`, {
    ...createArtworkData
  });
  return data;
};
const useCreateArtwork = () => {
  return useMutation({
    mutationFn: createArtwork,
  });
};

export { useCreateArtwork, useDeleteArtwork, deleteArtwork }
