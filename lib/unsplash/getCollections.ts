import { unsplash } from "./unsplash";

export const getCollections = async (query: string) => {
  const result = await unsplash.search.getPhotos({
    query,
    page: 1,
    perPage: 20,
  });
  if (result.errors) {
    console.error("error occurred: ", result.errors[0]);
    return [];
  }
  return result.response.results;
}