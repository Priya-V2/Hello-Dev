import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Search from "./Component/Search";
import Topics from "./pages/Topics";
import User from "./pages/User";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Footer from "./Component/Footer";
import OAuthCallbackHandler from "./Component/OAuthCallbackHandler";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Component/PrivateRoute";
import AdminPrivateRoute from "./Component/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./Component/ScrollToTop";
import Headroom from "react-headroom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Headroom>
        <Header />
      </Headroom>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
        </Route>
        <Route
          path="/auth/google/callback"
          element={<OAuthCallbackHandler />}
        ></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/post/:postSlug" element={<PostPage />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
