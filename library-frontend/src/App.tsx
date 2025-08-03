import { AddBookPage } from './pages/add-book';
import { BookPage } from './pages/book';
import { ListBooksPage } from './pages/list-books';
import { LoginPage } from './pages/login';
import { LogoutPage } from './pages/logout';
import { RegisterPage } from './pages/register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/books' element={<ListBooksPage />} />
        <Route path='/add-book' element={<AddBookPage />} />
        <Route path='/books/:bookId' element={<BookPage />} />

        <Route path='/' element={<Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
