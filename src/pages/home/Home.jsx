import React from 'react'
import HomeBanner from './homeBanner/HomeBanner';
import Trending from './trending/Trending';
import "./style.scss";
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';

const Home = () => {
  return (
    <div className='homePage'>
      <HomeBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
        
    </div>
  )
}

export default Home