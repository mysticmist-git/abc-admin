import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Layout from '@/layouts/Layout';
import UserPage from '@/pages/UserPage';
import SignIn from '@/pages/SignIn';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Layout />}>
          <Route path="users" element={<UserPage />} />
          <Route
            path="posts"
            element={<p className="text-black">Posts tab</p>}
          />

          <Route path="/" element={<Navigate to="/users" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
