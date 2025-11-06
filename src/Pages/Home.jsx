import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Category from '../components/Category'
import MenuList from '../components/MenuList'

function Home({ openLogin }) {

  // define the state for category
  const [selectedCategory, setSelectedCategory] = useState("Pizza");

  return (
    <div>
      <Navbar openLogin={openLogin}/>
      <Banner/>
      <Category onSelectCategory={setSelectedCategory} />
      <MenuList category={selectedCategory} />
    </div>
  )
}

export default Home
