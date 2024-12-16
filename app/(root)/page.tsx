import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

  const loggedIn = {firstName: 'Divyansh', lastName: 'Chauhan', email: 'divyanshchauhan520@gmail.com'}

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
          type= 'greeting'
          title='Welcome'
          user={loggedIn?.firstName || 'Guest'}
          subtext='Access and manage your account and transactions efficiently.'
          />

          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.35} 
          />
        </header>

        RECENT TRANSACTION
      </div>

      <RightSidebar 
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance: 1234.50}, { currentBalance: 15554.50}]}
       />
    </section>
  )
}

export default Home