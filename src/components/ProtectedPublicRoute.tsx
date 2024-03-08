import React from 'react'
import { useAuthContext } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { ProtectedRouteProps } from '@/types/type';

const ProtectedPublicRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuthContext();
    const router = useRouter();

    if (currentUser) {
        router.push('/');
        return;
    }

    return (
        <>
            { children }
        </>
    )
}

export default ProtectedPublicRoute