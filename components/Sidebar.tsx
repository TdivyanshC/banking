'use client';
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer';
import PlaidLink from './PlaidLink';

const Sidebar = ({user}: SiderbarProps) => {
    const pathname = usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href='/' className='mb-12 cursor-pointer items-center flex gap-2'>
            <Image alt='horizonLogo' className='size-[20px] max-xl:size-10 ' src='/icons/logo.svg' width={24} height={24}/>
            <h1 className='sidebar-logo'>
                Horizon
            </h1>
            </Link>

            {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                return (
                    <Link href={item.route} 
                    key={item.label}
                    className={cn('sidebar-link', {'bg-bank-gradient' : isActive})}
                    >
                        <div className='relative size-4'>
                            <Image 
                            alt={item.label} 
                            src={item.imgURL}
                            fill
                            className={cn({
                                'brightness-[3] invert-0' : isActive
                            })}
                            />
                        </div>
                        <p className={cn('sidebar-label',  {'!text-white' : isActive})}>
                            {item.label}
                        </p>
                    </Link>
                )
            })}

            <PlaidLink user={user} />
        </nav>

        <Footer user={user} />
    </section>
  )
}

export default Sidebar