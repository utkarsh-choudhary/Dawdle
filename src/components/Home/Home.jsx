import React from 'react'
import Card from '../Card/Card.jsx'
import UserContextProvider from '../../context/UserContextProvider.jsx'


function Home() {
  return (
    <UserContextProvider>
    <div>
        <Card />
    </div>
    </UserContextProvider>
  )
}

export default Home