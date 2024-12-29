import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react';

const MyBanks = async () => {
  try {
    // Fetch logged-in user
    const loggedIn = await getLoggedInUser();

    // Check if the user is logged in
    if (!loggedIn || !loggedIn.$id) {
      return (
        <section className="flex justify-center items-center h-screen">
          <p className="text-lg font-medium">User not logged in</p>
        </section>
      );
    }

    // Fetch accounts for the logged-in user
    const accounts = await getAccounts({ userId: loggedIn.$id });

    // Handle no accounts found
    if (!accounts || !accounts.data || accounts.data.length === 0) {
      return (
        <section className="flex justify-center items-center h-screen">
          <p className="text-lg font-medium">No bank accounts found</p>
        </section>
      );
    }

    // Render the page with accounts
    return (
      <section className="flex">
        <div className="my-banks">
          <HeaderBox
            title="My Bank Accounts"
            subtext="Effortlessly manage your banking activities."
          />

          <div className="space-y-4">
            <h2 className="header-2">Your cards</h2>
          </div>

          <div className="flex flex-wrap gap-6">
            {accounts.data.map((account) => (
              <BankCard
                key={account.$id}
                account={account}
                userName={loggedIn?.firstName}
              />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    // console.error('Error loading bank accounts:', error);
    return (
      <section className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">An error occurred while loading data.</p>
      </section>
    );
  }
};

export default MyBanks;
