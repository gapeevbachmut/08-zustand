import axios from 'axios';
import { type Note, type CreateNoteType } from '@/types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

// const perPage = 12;   //  перенести сюди ???

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag?: Note['tag']
): Promise<NotesResponse> {
  const config = {
    params: {
      search, // пошук - // ...(search !== '' && { q: search }),
      page, // сторінка
      perPage, // кількість на сторінці
      tag,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  };

  await new Promise(r => setTimeout(r, 2000));

  const responce = await axios.get<NotesResponse>(`/notes`, config);

  return responce.data;
}

//  одна нотатка

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const responce = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
};

//  видалення

export async function deleteNote(id: Note['id']): Promise<Note> {
  const responce = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
}

//  додавання

export async function createNote(noteData: CreateNoteType): Promise<Note> {
  const responce = await axios.post<Note>(`/notes`, noteData, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
}

// список тегів for sidebar
export async function getTags(): Promise<Note['tag'][]> {
  // Теги фіксовані, тому просто повертаю масив
  return ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
}
