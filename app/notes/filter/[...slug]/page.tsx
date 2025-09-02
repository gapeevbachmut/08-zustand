// app/notes/filter/[...slug]/page.tsx

import { Metadata } from 'next';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { type Note } from '@/types/note';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes page',
};

type Props = { params: Promise<{ slug: string[] }> };

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
