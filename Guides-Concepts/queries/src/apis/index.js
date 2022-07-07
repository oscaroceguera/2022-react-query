import axios from "axios";

export const fetchCharacter = () => {
  return axios
    .get("https://rickandmortyapi.com/api/character")
    .then((res) => res.data);
};
