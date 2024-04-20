import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import Home from './social_network/home';
import Profile from './social_network/profile';
import Search from './social_network/search';
import Login from './social_network/login';
import Information from './social_network/profile/information';
import Followers from './social_network/profile/followers';
import Following from './social_network/profile/following';
import ProfileId from './social_network/profile/profile_id';
import RecipePage from './social_network/recipe';
import NewPost from './social_network/profile/post';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/Information" element={<Information />} />
          <Route path="/Profile/Followers" element={<Followers />} />
          <Route path="/Profile/Following" element={<Following />} />
          <Route path="/Profile/Post" element={<NewPost />} />
          <Route path="/Profile/:profileId/*" element={<ProfileId />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Recipe" element={<RecipePage />} />
          <Route path="/Recipe/:recipeId/*" element={<RecipePage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
