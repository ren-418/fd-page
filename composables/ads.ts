import axios from "axios";
import { useRuntimeConfig } from "#app";

interface FilterObject {
  location: string | null;
  keyword: string;
  category_id: string;
  sub_categories: any;
  is_automotive: string;
  automotive_categories: any;
  status: string;
  page: number;
}

export const useCategories = () => {
  const categories = useState("categories", () => []);
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.adsApiUrl}/category/get_all`;

  const categoryLoading = ref(true);

  const fetchCategories = async () => {
    try {
      let country_code: string = "";
      const { data } = await axios.post(url, { country_code });
      categories.value = data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      categoryLoading.value = false;
    }
  };

  fetchCategories();
  console.log("categoryLoading ::: ", categoryLoading.value)

  return { categories, categoryLoading };
};

export const useSelectCategory = () => {
  const category: any = useState<any>("category", () => {});

  const setCategory = (item: any) => {
    category.value = item;
  };

  return { category, setCategory };
};

export const useFilterObject = () => {
  const filterObject = useState<FilterObject>("category", () => ({
    automotive_categories: [],
    category_id: "",
    is_automotive: "",
    keyword: "",
    location: null,
    page: 1,
    status: "active",
    sub_categories: [],
  }));

  const setFilterObject = () => {
    const { category } = useSelectCategory();
    filterObject.value.category_id = category.id;
  };

  return { filterObject, setFilterObject };
};

export const useSelectedAds = async () => {
  const ads = useState<any>("ads", () => []);
  const runtimeConfig = useRuntimeConfig();
  const url = `${runtimeConfig.public.adsApiUrl}/post/search`;
  const { filterObject } = useFilterObject();

  const adsLoading = ref(true);

  const fetchAds = async () => {
    try {
      
      const { data } = await axios.post(url, filterObject.value);
      console.log("useSelectedAds :::", data.data.data)
      ads.value = data.data.data;
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      adsLoading.value = false;
    }
  };

  fetchAds();
  console.log("adsLoading ::: ", adsLoading.value)
  return { ads, adsLoading };
};
