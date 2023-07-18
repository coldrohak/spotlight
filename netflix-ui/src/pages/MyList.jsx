import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthContext";

export default function MyList() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      dispatch(getUsersLikedMovies(currentUser.email));
    }
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies?.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
