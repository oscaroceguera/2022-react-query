import React, { useEffect } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

import "./App.css";

const getPageId = (pageId) => new URL(pageId).searchParams.get("page");

function App() {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    "characters",
    async ({ pageParam = 0 }) => {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${pageParam}`
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) =>
        firstPage.info.prev ? getPageId(firstPage.info.prev) : undefined,
      getNextPageParam: (lastPage) =>
        lastPage.info.next ? getPageId(lastPage.info.next) : undefined,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="App">
      <h1>Infinite Loading</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                ? "Load Older"
                : "Nothing more to load"}
            </button>
          </div>
          {data.pages.map((page) => {
            const key = getPageId(page.info.next);
            return (
              <React.Fragment key={key}>
                {page.results.map((character) => {
                  return (
                    <div
                      style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        padding: "1rem 1rem",
                        background: `hsla(${character.id * 30}, 60%, 80%, 1)`,
                      }}
                      key={character.id}
                    >
                      <h2>{character.name}</h2>
                      <img src={character.image} />
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </>
      )}
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
}

export default App;
