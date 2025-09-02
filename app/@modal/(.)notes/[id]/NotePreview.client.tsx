'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';
import { type Note } from '@/types/note';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

const NotePreview = () => {
  const { id } = useParams<{ id: Note['id'] }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();

  // const close = () => router.back();

  if (isLoading) return <p>Loading, please wait.....</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  // await new Promise(r => setTimeout(r, 15000));

  return (
    <Modal onClose={() => router.back()}>
      <button className={css.backBtn} onClick={() => router.back()}>
        Back
      </button>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
