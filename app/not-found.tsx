'use client';
import { Metadata } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './home.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Page does not exist',
  openGraph: {
    title: 'Page Not Found',
    description: 'Page does not exist',
    url: 'https://08-zustand-green-one.vercel.app',
    siteName: 'NoteHub',
    images: [
      {
        // url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        url: 'https://pixabay.com/get/gc2e6cf545f31b6cf2bb9d1b572707bd52442e5875191daad8e5de17f9f12ecc982e608180c86e29cb32ff915ed8776e0a198081832f991a4cbffcade32ebcf65_1280.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub image - page not found',
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Редірект через 3 секунди
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
