import { Route, Routes } from "react-router";
import All from "./components/All";
import Movie from "./components/Movie";
import Series from "./components/Series";
import Anime from "./components/Anime";
import Others from "./components/Others";
import Layout from "./Layout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import LogIn from "./components/LogIn";
import AuthLayout from "./AuthLayout";
import Register from "./components/Register";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/" element={<Layout />}>
          <Route path="all" element={<All />} />
          <Route path="movie" element={<Movie />} />
          <Route path="series" element={<Series />} />
          <Route path="anime" element={<Anime />} />
          <Route path="others" element={<Others />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
