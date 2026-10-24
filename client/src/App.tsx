import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import Items from './pages/Items';

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/items" element={<Items />} />

        {/* Login ဝင်ပြီးသားသူ မမြင်ရတဲ့ page များ */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Login ဝင်မှ မြင်ရတဲ့ page များ */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="add-item" element={<AddItem />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
