'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
// import Modal from '@/components/Modal/Modal';
// import NoteForm from '@/components/NoteForm/NoteForm';
import { Note } from '@/types/note';

interface Props {
  perPage: number;
  tag?: Note['tag'];
}

export default function NotesClient({ perPage, tag }: Props) {
  const [searchQuery, setSearchQuery] = useState(''); // значення інпута
  const [currentPage, setCurrentPage] = useState(1); // pagination

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  // Завантаження при першому рендері
  const { data, isSuccess } = useQuery({
    queryKey: ['notes', { search: searchQuery, page: currentPage, tag }],

    queryFn: () => fetchNotes(searchQuery, currentPage, perPage, tag),
    refetchOnMount: false, //не робити повторний запит, при монтуванні компонента клієнта
    placeholderData: keepPreviousData, //  дані відмалюються після запиту
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <h1>Мої нотатки {tag ? `(${tag})` : ''}!</h1>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={updateSearchQuery} />

          {isSuccess && data && data.notes.length > 0 && (
            <Pagination
              pageCount={data.totalPages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}

          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </header>

        {isSuccess && data && data.notes.length > 0 && (
          <NoteList notes={data.notes || []} />
        )}

        {isSuccess && data && data.notes.length === 0 && (
          <p>Нотаток немає. Додайте першу!</p>
        )}
      </div>
      <Toaster />
    </>
  );
}
