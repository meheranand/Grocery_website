import React from "react";
import Mainbanner from './../components/Mainbanner';
import Categories from './../components/categories';
import Bestseller from './../components/bestseller';

const Home = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 mb-8">
      <Mainbanner />
      <Categories />
      <Bestseller />
    </div>
  );
};

export default Home;
