// app/lib/stores/noteStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type CreateNoteType } from '@/types/note';

type NoteDraftStore = {
  draft: CreateNoteType;
  setDraft: (note: CreateNoteType) => void;
  clearDraft: () => void;
};

//  початковий стан
const initialDraft: CreateNoteType = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),

    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
