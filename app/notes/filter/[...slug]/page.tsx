// app/notes/filter/[...slug]/page.tsx

// import { Metadata } from 'next';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { type Note } from '@/types/note';

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0];

  //   https://pixabay.com/get/ga71f6fb05b6cde7713093b074baf2d7dd3b999d8df8d2a2c1786c7fa399d503b36280dc8064e28e1160fc6fa0450feb665e17df100ca81c885b70bac13809c44_1280.jpg

  return {
    title: `${tag}`,
    description: 'tag of note',
    openGraph: {
      title: 'NoteHub',
      description: 'Home page of NoteHub website',
      url: `https://08-zustand-green-one.vercel.app/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://pixabay.com/get/ga71f6fb05b6cde7713093b074baf2d7dd3b999d8df8d2a2c1786c7fa399d503b36280dc8064e28e1160fc6fa0450feb665e17df100ca81c885b70bac13809c44_1280.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub image',
        },
      ],
      type: 'website',
    },
  };
}

const NotesByTag = async ({ params }: Props) => {
  const queryClient = new QueryClient();

  const perPage = 12;

  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : (slug[0] as Note['tag']);

  await queryClient.prefetchQuery({
    // ключі та функція повинні бути однаковими!!!
    // треба розібратися з параметрами функції та ключів
    queryKey: ['notes', { search: '', page: 1, tag }],

    queryFn: () => fetchNotes('', 1, perPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient perPage={perPage} tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByTag;
