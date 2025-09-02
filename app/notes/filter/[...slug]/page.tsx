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

  return {
    title: `${tag}`,
    description: 'tag of note',
    openGraph: {
      title: 'Notes by tag',
      description: 'Home page of NoteHub website',
      url: `https://08-zustand-green-one.vercel.app/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',

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
