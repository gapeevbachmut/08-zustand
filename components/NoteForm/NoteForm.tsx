'use client';

import css from './NoteForm.module.css';
import { useId, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { type CreateNoteType } from '../../types/note';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

//  валідація форми
const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .required('Введіть назву нотатки!')
    .min(3, 'Мінімум три символи!')
    .max(50, 'ДУУУУУЖЕ довга назва! Давайте зробимо її коротшою!'),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Оберіть категорію!'),
});

export default function NoteForm() {
  const queryClient = useQueryClient();
  const fieldId = useId();
  const router = useRouter();

  const [formValues, setFormValues] = useState<CreateNoteType>({
    title: '',
    content: '',
    tag: 'Todo',
  });

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Нотатка створена!');

      router.push('/notes/filter/all');
    },
    onError: () => {
      toast.error('Не вдалося створити нотатку!');
    },
  });

  //  Обробка input
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  //  Сабміт з Yup-валідацією

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await NoteSchema.validate(formValues);
      await mutation.mutateAsync(formValues);
      setFormValues({ title: '', content: '', tag: 'Todo' });
    } catch {
      toast.error('Не вдалося створити нотатку!');
    }
  };

  const handleCancel = () => {
    router.push('/notes/filter/all');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          placeholder="Введіть назву нотатки"
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          value={formValues.content}
          onChange={handleChange}
          placeholder="Зробіть, будь ласка опис нотатки!"
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          value={formValues.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Note is creating ...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
