import { useQuery } from "react-query";
import axios from "axios";

const getPostById = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

export default function usePost(postId) {
  return useQuery(["post", postId], () => getPostById(postId), {
    // The query will not execute until the userId exists
    enabled: !!postId,
  });
}
