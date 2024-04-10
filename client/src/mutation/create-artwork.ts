import axios from "axios";
import { useMutation, } from "@tanstack/react-query";


interface ICreateArtworks {
  Title: string,
  Artist: number,
  URL: string,
  ImageURL: string,
  Nationality: string,
  Date: string

}
const createArtwork = async (createArtworkData: ICreateArtworks) => {
  const { data } = await axios.post(`http://localhost:8000/artworks`, {
    ...createArtworkData
  });
  return data;
};
const useCreateArtwork = () => {
  return useMutation({
    mutationFn: createArtwork,
  });
};

export { useCreateArtwork }
