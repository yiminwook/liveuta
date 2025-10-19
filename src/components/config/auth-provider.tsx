'use client';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import FirebaseClient from '@/libraries/firebase/client';
import { useSession } from '@/stores/session';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const auth = FirebaseClient.getInstance().auth;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('auth state changed', user);
      useSession.getState().signIn(user);
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};
