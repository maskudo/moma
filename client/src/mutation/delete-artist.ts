import { GET_ARTISTS_QUERY } from "@/queries/get-artists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteArtist = async (id: number | string) => {
  const { data } = await axios.delete(`http://localhost:8000/artists/` + id);
  return data;
};
const useDeleteArtist = () => {
  return useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      const qc = useQueryClient()
      qc.invalidateQueries({ queryKey: [GET_ARTISTS_QUERY] })
    }
  });
};

export { useDeleteArtist, deleteArtist }
