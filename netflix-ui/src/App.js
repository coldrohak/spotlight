import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import MyList from "./pages/MyList";
import { AuthProvider } from "./contexts/AuthContext";
import SearchResult from "./pages/SearchResult";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route exact path="/" element={<Netflix />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="player" element={<Player />} />
      <Route path="movies" element={<MoviePage />} />
      <Route path="tv" element={<TVShows />} />
      <Route path="mylist" element={<MyList />} />
      <Route path="/search" element={<SearchResult />} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
