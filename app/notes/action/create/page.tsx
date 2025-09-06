import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Page for creating a note',
  openGraph: {
    title: 'Create note',
    description: 'Page for creating a note',
    url: 'https://08-zustand-green-one.vercel.app/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://pixabay.com/get/g03b29e4852e61fc29b5cc3f14db44eca8ebcc12edbc272c8c0cb452bf6fac85c927de39d715953e1f5ea37dc7b5932f01e4f4e225d6d1c0b732919efb814b022_1280.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub image - create note',
      },
    ],
    type: 'article',
  },
};

const CreateNote = async () => {
  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          <NoteForm />
        </div>
      </main>
    </>
  );
};

export default CreateNote;
