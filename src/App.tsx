import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { CreatePage } from './pages/CreatePage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<DetailPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
