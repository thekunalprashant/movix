import { useEffect } from 'react'
import { fetchDataFromApi } from './utils/api.js'
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfigurations, getGenres } from './store/homeSlice.js';

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer.jsx"
import Home from "./pages/home/Home.jsx"
import Details from "./pages/details/Details.jsx"
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import Explore from "./pages/explore/Explore.jsx"
import PageNotFound from "./pages/404/PageNotFound.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const dispatch= useDispatch();
  const {url}=useSelector((state) => state.home);
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);
  const fetchApiConfig=()=>{
    fetchDataFromApi('/configuration').then((res)=>{
      console.log(res);
      const url={
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfigurations(url));
    })
  }
  const genresCall = async() =>{
    let promises=[];
    let endpoints=["movie","tv"];
    let allGenres={};
    endpoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data= await Promise.all(promises);
    
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item));
    })
    // console.log(allGenres);
    dispatch(getGenres(allGenres));
  }
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:mediaType/:id' element={<Details/>}/>
        <Route path='/search/:query' element={<SearchResult/>} />
        <Route path='/explore/:mediaType' element={<Explore/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
