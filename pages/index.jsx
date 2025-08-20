import React, { useEffect } from 'react'
import Main from '@/components/Main/Main'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import Home from '../components/HomePage/Home';

export default function index() {
  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/home');
      }
    }, [user]);


  return (
    <div>
      {/* {!user &&<Main/>} */}
      {!user &&<Home />}
    </div>
  )
}
