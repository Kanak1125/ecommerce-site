'use client';

import { useEffect, ReactNode } from 'react';
import { auth } from '@/services/firebase/config';
import { useAuthStore } from '@/state/store';

export function useAuthContext() {
  return useAuthStore((state) => state);
}

export default function AuthProvider({ children }: {children: ReactNode}) {
  const { currentUser, loading,setCurrentUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return !loading && children;
}