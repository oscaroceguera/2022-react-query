import { useQuery } from "react-query";
import "./App.css";

import { fetchCharacter } from "./apis";

function App() {
  const { isLoading, isError, data, error, status, isFetching } = useQuery(
    "characters",
    fetchCharacter
  );

  console.log({ status });

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="App">
      {isFetching ? "Updating..." : ""}
      {data.results.map((character) => (
        <li key={character.id}>{character.name}</li>
      ))}
    </div>
  );
}

export default App;
