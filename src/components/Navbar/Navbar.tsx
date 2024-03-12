'use client';

import React, { useState } from 'react'
import './navbar.scss';

// icons
import {BsSearch, BsHeart, BsCart3} from 'react-icons/bs';
import { GoPerson } from "react-icons/go";
import { PiHeadsetFill } from "react-icons/pi";

import Link from 'next/link';

import logOut from '@/services/firebase/auth/signout';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/state/store';
import Ping from '../Ping';

const Navbar = () => {

  const [isHamMenuActive, setIsHamMenuActive] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuthStore();
  const router = useRouter();

  // if user isn't login account link in the navbar should direct user to the login page...

  const handleLogout = async () => {
    const { err } = await logOut();

    if (err) {
      setError("Can't sign out!");
      console.log(error);
      return;
    }

    console.log(currentUser);
    router.push('/');
  }

  return (
    <header className='w-full py-4 header'>
        <div className="container max-w-[1200px] mx-auto navbar ">
            <Link href={'/'}>
                <img src="/images/logo.svg" alt="" className='logo'/>
            </Link>

            {/* Search bar here... */}
            <form action="" className="search-form ">
            <input
              type="text"
              className='search-input-field'
              placeholder='Search here...'
            //   onClick={(e) => e.preventDefault()}
            //   onChange={(e) => listSearchItems(e)}
            //   onBlur={hideSearchResults}
            //   value={searchTerm}
            />
            <button type="submit" className='search-icon'>
              <BsSearch className='icon'/>
            </button>
            {/* search result box */}
            {/* {isSearching &&  */}

            {/* the following is to display the search result dynamically... */}
                <div className='bg-primary w-full h-auto absolute md:left-0 z-40 text-accent rounded my-1 max-h-[360px] overflow-y-scroll no-scrollbar'>
              {
            //   searchedItems.length === 0 ? <h3 className='text-center py-5'>No results...</h3>
            //   :
            //   <SimpleBar className='max-h-[444px]'>
            //     <ul>
            //       {searchedResults}
            //     </ul>
            //   </SimpleBar>
              }
            </div>
            {/* } */}
          </form>

          <div className="utility-nav p-2">
              <Link href={'/'} className="wishlist">
                <BsHeart strokeWidth={0.8} className='icon'/>
                <span>Wishlist</span>
              </Link>
              <Link href={'/cart'} className="cart">
                <div className="relative">
                  <BsCart3 strokeWidth={0.8} className='icon'/>
                  <Ping />
                </div>
                <span>Cart</span>
              </Link>
              {/* <Link href={'/'} className="user-account"> */}
              <div className='user-account'
              onClick={() => setOpenLogoutModal(prevState => !prevState)}
              >
                <GoPerson strokeWidth={0.8} className='icon'/>
                <span>{currentUser ? currentUser.displayName : 'Account'}</span>
                <button 
                className={`${openLogoutModal ? 'logout-btn' : 'hidden'} `}
                onClick={handleLogout}
                >Logout</button>
              </div>
              {/* </Link> */}
          </div>

          {/* hamburger menu will be in the bottom of the header... */}
          <div className={'cursor-pointer md:hidden z-20 hamburger-menu-icon'}
          onClick={() => setIsHamMenuActive((prevState: boolean) => !prevState)}
          >
            <div className={`w-8 h-0.5 my-1.5 bg-black rounded-full transition-all origin-center ${isHamMenuActive ? 'rotate-45 mb-[-10px]' : ''}`}></div>
            <div className={`w-8 h-0.5 my-1.5 bg-black rounded-full transition-all ${isHamMenuActive ? 'opacity-0' : ''}`}></div>
            <div className={`w-8 h-0.5 my-1.5 bg-black rounded-full transition-all origin-center ${isHamMenuActive ? 'rotate-[-45deg] mt-[-6px]' : ''}`}></div>
          </div>

            {/* header bottom... */}
            
            <nav className='nav-links'>
              <Link href={'/category/new-arrivals'}>New Arrivals</Link>
              <Link href={'/category/women'}>Women</Link>
              <Link href={'/category/men'}>Men</Link>
              <Link href={'/category/sale'}>Sale</Link>
              <Link href={'/about'}>About</Link>
              <Link href={'/'}>Blog</Link>
              <Link href={'/'}>Contact Us</Link>
            </nav>

            <div className="call-support">
              <PiHeadsetFill className='icon call-icon'/>
              <div className='call-support-details'>
                <h4>+977 984100</h4>
                <p>24/7 Call Support</p>
              </div>
            </div>

            {/* Make a container component... */}
        </div>
    </header>
  )
}

export default Navbar