import HeaderBox from '@/components/HeaderBox';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react';

const PaymentTransfer = async () => {
  try {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
      // Handle the case where the user is not logged in
      // console.error("User not logged in.");
      return (
        <section className='payment-transfer'>
          <HeaderBox title='Payment Transfer' subtext='You must be logged in to view this page.' />
        </section>
      );
    }

    const accounts = await getAccounts({ userId: loggedIn.$id });

    if (!accounts || !accounts.data || accounts.data.length === 0) {
      console.error("No accounts found for the user.");
      return (
        <section className='payment-transfer'>
          <HeaderBox title='Payment Transfer' subtext='No accounts available for payment transfer.' />
        </section>
      );
    }

    const accountsData = accounts.data;

    return (
      <section className='payment-transfer'>
        <HeaderBox title='Payment Transfer' subtext='Please provide any specific details or notes related to the payment transfer.' />
        <section className='size-full pt-5'>
          <PaymentTransferForm accounts={accountsData} />
        </section>
      </section>
    );
  } catch (error) {
    console.error("Error in PaymentTransfer:", error);
    return (
      <section className='payment-transfer'>
        <HeaderBox title='Payment Transfer' subtext='An error occurred while loading the payment transfer form.' />
      </section>
    );
  }
};

export default PaymentTransfer;
