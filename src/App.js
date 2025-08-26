import './App.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home.js';
import Header from './components/Header.js';
import Login from './components/Login/Login.js';
import MyTodo from './components/MyTodo/MyTodo.js';
import Clock from './components/TimeToNow/Clock.js';
import Books from './components/Books/Books.js';
import MyPage from './components/My/MyPage.js';
import AdminPage from './components/My/AdminPage.js';
import BookAdd from './components/Books/BookAdd.js';
import BookDetail from './components/Books/BookDetail.js';


function App() {
  const location = useLocation();

  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");
  const userInfo = {userId, userType};

  return (
    <div className="App">

      <div className='header-menu' style={{border:"1px solid"}}>
        <Link to={"/"}>HOME</Link>
        <Header userInfo={userInfo}/>

        <Clock ></Clock>
      </div>
      

      <br/>
      <br/>
      
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/myPage' element={<MyPage />}></Route>
        <Route path='/adminPage' element={<AdminPage />}></Route>
        <Route path='/myTodo' element={<MyTodo />}></Route>

        <Route path='/bookList' element={<Books location={location} userInfo={userInfo}/>}></Route>
        <Route path='/bookDetail/:id' element={<BookDetail location={location} userInfo={userInfo}/>}></Route>
        <Route path='/bookToRent/:id' elemnpment={<BookDetail />}></Route>
        <Route path='/adminPage/bookAdd' element={<BookDetail />}></Route>
        <Route path='/adminPage/bookUpdate' element={<Books location={location} userInfo={userInfo}/>}></Route>
        <Route path='/adminPage/bookUpdate/:id' element={<BookDetail location={location} userInfo={userInfo}/>}></Route>
        <Route path='/adminPage/bookDelete' element={<Books location={location} userInfo={userInfo}/>}></Route>
      </Routes>
    
    </div>
  );
}

export default App;
