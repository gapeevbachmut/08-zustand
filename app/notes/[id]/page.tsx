import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { type Note } from '@/types/note';
import { type Metadata } from 'next';

type Props = {
  params: Promise<{ id: Note['id'] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `${note.title}`,
    description: 'Single note',
    openGraph: {
      title: 'Single note by id',
      description: note.content.slice(0, 30),
      url: `https://08-zustand-green-one.vercel.app/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://pixabay.com/get/g359253f449ac5bb9a82438e08e40d0629aa1ec2867831e37920e7665e57a4497e5f672e52958b7e1dd7189d3fe9b562bcdc8555214077e5c99256bc8c1b52ff8_1280.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub image',
        },
      ],
      type: 'article',
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
