import HeaderBox from '@/components/HeaderBox'
import React from 'react'

function Home() {

  const loggedIn = { firstName: 'Jose' };
  return (
    <section className="home">
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Manage your money"

          />
        </header>
      </div>

    </section>
  )
}

export default Home