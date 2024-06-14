import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox';
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
            subtext="Manage and budget your money"
          />
          <TotalBalanceBox
            accounts={[]}
            totalCurrentBalance={12356.43}
            totalBanks={1}

          />
        </header>
      </div>

    </section>
  )
}

export default Home