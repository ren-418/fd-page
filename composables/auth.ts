import axios from "axios";
import { useRuntimeConfig } from "#app";

export const useCountries = () => {
  const countries = useState("countries", () => []);
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.adsApiUrl}/country/get_all`;

  const fetchCountries = async () => {
    try {
      const { data } = await axios.get(url);
      countries.value = data.data;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  fetchCountries();

  return { countries };
};
