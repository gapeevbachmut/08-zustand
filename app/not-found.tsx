import { Metadata } from 'next';
import css from './home.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Page does not exist',
  openGraph: {
    title: 'Page Not Found',
    description: 'Page does not exist',
    url: 'https://08-zustand-green-one.vercel.app/not-found',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://pixabay.com/get/g7cb1893bef852f924cbe3517a88068c6c3baff07bc36888a4943cd36cd8b3026d8c7adb48b1313d788f57c979440fbc8c5e742cf7c2354c000fbc1d2e483f996_1280.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub image - page not found',
      },
    ],
    type: 'article',
  },
};

import Link from 'next/link';

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
