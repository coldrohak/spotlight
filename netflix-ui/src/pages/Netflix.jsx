import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [backgroundMovie, setBackgroundMovie] = useState("");
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  useEffect(() => {
    if (movies.length > 0) {
      setBackgroundMovie(movies[Math.floor(Math.random() * 60)]);
    }
  }, [movies]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        {backgroundMovie && (
          <img
            src={`https://image.tmdb.org/t/p/original${backgroundMovie.image}`}
            alt="background"
            className="background-image"
          />
        )}
        <div className="opacity-layer"></div>
        <div className="container">
          <div className="logo">{backgroundMovie?.name}</div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center">
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    margin-bottom: -4vh;
    .background-image {
      opacity: 0.5;
    }
    img {
      height: 80vh;
      width: 100vw;
    }
    .opacity-layer {
      width: 100%;
      height: 20vh;
      background: linear-gradient(
        180deg,
        rgba(4, 21, 45, 0) 0%,
        rgba(, 0, 0, 0) 79.17%
      );
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        font-weight: bold;
        font-size: 3rem;
        padding-left: 5rem;
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Netflix;
