import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Layout } from './layouts/layout';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="users" element={<UserPage />} />
          <Route
            path="posts"
            element={<p className="text-black">Posts tab</p>}
          />

          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
