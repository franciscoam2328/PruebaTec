import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { CreatePage } from './pages/CreatePage';
import { EditPage } from './pages/EditPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<DetailPage />} />
          <Route path="/character/:id/edit" element={<EditPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
