import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import Home from './social_network/home';
import Profile from './social_network/profile';
import Login from './social_network/login';
import Information from './social_network/profile/information';
import Followers from './social_network/profile/followers';
import Following from './social_network/profile/following';
import ProfileId from './social_network/profile/profile_id';
import RecipePage from './social_network/recipe';
import NewPost from './social_network/profile/post';
import Anon from './social_network/profile/anon';
import HomeAnon from './social_network/home/anon';
import RecipeHome from './social_network/recipe/home';
import SearchPage from './social_network/search/search';
import ManageUsers from './social_network/profile/manageusers';
import SpoonacularSearch from './social_network/spoonacularapi';
import SpoonacularDetails from './social_network/spoonacularapi/details';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Home/SignedOut" element={<HomeAnon />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/Information" element={<Information />} />
          <Route path="/Profile/Followers" element={<Followers />} />
          <Route path="/Profile/Following" element={<Following />} />
          <Route path="/Profile/Post" element={<NewPost />} />
          <Route path="/Profile/SignedOut" element={<Anon />} />
          <Route path="/Profile/:profileId/*" element={<ProfileId />} />
          <Route path="/Profile/ManageUsers" element={<ManageUsers />} />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/Recipes" element={<RecipeHome />} />
          <Route path="/Recipes/:recipeId/*" element={<RecipePage />} />
          <Route path="/Recipes/Details/:recipeId" element={<SpoonacularDetails />} />
          <Route path="/Spoonacular" element={<SpoonacularSearch />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
