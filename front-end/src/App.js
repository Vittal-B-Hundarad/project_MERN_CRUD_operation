import './App.css';
import Nav from './components/Nav';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/signup';
import PrivateComponent from './components/privatecomponent';
import LogIn from './components/login';
import AddProduct from './components/AddProduct';
import ProductList from './components/productList'
import UpdateProduct from './components/updateproduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent/>}>
       <Route path="/" element ={<ProductList/>}/>
       <Route path="/add" element ={<AddProduct/>}/>
       <Route path="/update/:id" element ={<UpdateProduct/>}/>
       <Route path="/logout" element ={<h1>Logout Component </h1>}/>
       </Route>
       <Route path="/signup" element ={<SignUp/>}/>
       <Route path="/login" element={<LogIn/>}/>
      </Routes>
      
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
