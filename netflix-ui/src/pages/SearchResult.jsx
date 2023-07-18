import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import Card from "../components/Card";
import { createArrayFromRawData } from "../store";
import { useSelector } from "react-redux";

let timer;
const timeout = 500;

const SearchResult = () => {
  const genres = useSelector((state) => state.netflix.genres);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  let moviesList = [];

  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/search/movie?query=${query}&page=${page}&api_key=${API_KEY}`
    );
    if (data) {
      createArrayFromRawData(data.results, moviesList, genres);
      if (page > 1) setMovies((m) => [...m, ...moviesList]);
      else setMovies([...moviesList]);
    }
  }, [query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMovies([]);
      setPage(1);
    } else search();
  }, [search, query, page]);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="search-area">
        <input type="text" placeholder="Search...." onChange={onQueryChange} />
        {query && (
          <div className="content flex column a-center">
            {movies.length ? (
              <>
                <h1>Search results for : "{query}"</h1>
                <div className="grid flex">
                  {movies?.map((movie, index) => {
                    return (
                      <Card movieData={movie} index={index} key={movie.id} />
                    );
                  })}
                </div>
                {movies.length > 0 && (
                  <button onClick={() => setPage(page + 1)}>Load More</button>
                )}
              </>
            ) : (
              <h1>No results for {query}</h1>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchResult;

const Container = styled.div`
  .search-area {
    margin: 10vh;
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      width: 80vw;
      height: 4vh;
    }
    .content {
      margin: 2.3rem;
      gap: 3rem;
      h1 {
        margin-left: 3rem;
      }
      .grid {
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;
