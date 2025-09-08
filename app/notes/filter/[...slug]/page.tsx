// app/notes/filter/[...slug]/page.tsx

import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { type Note } from '@/types/note';
import { type Metadata } from 'next';

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Notes: ${tag}`,
    description: `Page of notes by ${tag}`,
    openGraph: {
      title: `Notes by ${tag}`,
      description: `Page of notes by ${tag}`,
      url: `https://08-zustand-green-one.vercel.app/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://pixabay.com/get/g8b1d6e6faec9d9d4f140e421cade3f5865cc671b33c9bac7d8ae20e31137d1a6150b7bd306151e82d27f12f33bb9d12aaf401dc002ed13cfe806d8bfd7f8d0ca_1280.jpg',

          width: 1200,
          height: 630,
          alt: 'NoteHub image',
        },
      ],
      type: 'article',
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
