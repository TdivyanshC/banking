import { logoutAccount } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use `next/navigation` for `app` directory
import React from 'react';

interface FooterProps {
  user?: { name: string; email: string }; // Ensure user props are optional and typed
  type?: 'desktop' | 'mobile';
}

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter(); // Moved useRouter to the top level of the component

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push('/sign-in');
  };

  return (
    <footer className="footer flex ">
      {/* User Name */}
      <div className='content'>

      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">
          {user?.firstName[0] || 'N/A'}
        </p>
      </div>

      {/* User Email */}
      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className="text-[14px] truncate text-gray-700 font-semibold">
          {user?.firstName || 'No user'}
        </h1>
        <p className="text-[10px] truncate font-normal text-gray-600">
          {user?.email || 'No email'}
        </p>
      </div>
      </div>

      {/* Logout Button */}
      <div
        className="footer_image relative w-8 h-8 cursor-pointer"
        onClick={handleLogOut}
      >
        <Image src="/icons/logout.svg" alt="logout" fill />
      </div>
    </footer>
  );
};

export default Footer;
