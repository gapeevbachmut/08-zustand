// app/notes/action/create/page.tsx
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
// import { getTags } from '@/lib/api';

const CreateNote = async () => {
  // const tagNotes = await getTags();

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
