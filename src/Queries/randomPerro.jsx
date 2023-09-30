import { useQuery } from "react-query";
import axios from "axios";
import generateRandomNombre from '../Components/randomNombre';

const loremIpsum = <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies mauris lectus, at tempor justo egestas eu. Duis tristique imperdiet auctor.</p>

export function useQueryRandomPerro(params) {
  return useQuery(["queryRandomPerro", params], queryRandomPerro, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });
}

export const queryRandomPerro = async (params) => {
    const [queryName, paramsFilter] = params.queryKey;
    let url = "https://dog.ceo/api/breeds/image/random";
    const { data } = await axios.get(url);
    data.nombre = generateRandomNombre();
    data.descripcion = loremIpsum;
    return data;
};