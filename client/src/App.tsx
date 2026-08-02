import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import Items from './pages/Items';

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items" element={<Items />} />

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="add-item" element={<AddItem />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
