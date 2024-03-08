'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthProvider';
import { ProtectedRouteProps } from '@/types/type';

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
    const { currentUser } = useAuthContext();
    const router = useRouter();

    if (!currentUser) {
        router.push('/login');
        return;
    }

    return (
        <>
            { children }
        </>
    )

    

    // const router = useRouter();

    // if (!loading && !currentUser) {
    //     // router.push('/login');
    //     redirect('/login');
    //     return;
    // }

    // return (
    //     <>
    //         {!loading && children }
    //     </>
    // )
}


export default ProtectedRoute