'use client';

import css from './NoteForm.module.css';
import { useId, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { type CreateNoteType } from '../../types/note';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

// import { Field, Formik, Form, type FormikHelpers, ErrorMessage } from 'formik';

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

interface NoteFormProps {
  onClose: () => void;
}

// const initialFormValues: CreateNoteType = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

export default function NoteForm({ onClose }: NoteFormProps) {
  // export default function NoteForm() {
  const queryClient = useQueryClient();
  const fieldId = useId();
  const router = useRouter();

  const [formValues, setFormValues] = useState<CreateNoteType>({
    title: '',
    content: '',
    tag: 'Todo',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Нотатка створена!');
      onClose(); //  або
      // if (onClose) onClose();
      // else router.push('/notes/filter/all');
    },
    onError: () => {
      toast.error('Не вдалося створити нотатку!');
    },
  });

  //  Обробка input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  //  Сабміт з Yup-валідацією

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await NoteSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      await mutation.mutateAsync(formValues);
      setFormValues({ title: '', content: '', tag: 'Todo' });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach(e => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  // values: CreateNoteType,
  //   formikHelpers: FormikHelpers<CreateNoteType>
  // ) => {
  //   await mutation.mutateAsync(values);
  //   formikHelpers.resetForm(); //скидання форми
  //   // console.log(values);
  // };

  const handleCancel = () => {
    if (onClose) onClose();
    else router.push('/notes/filter/all');
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
        {errors.title && <span className={css.error}>{errors.title}</span>}
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
        {errors.content && <span className={css.error}>{errors.content}</span>}
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
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
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

    // <Formik
    //   initialValues={initialFormValues}
    //   validationSchema={NoteSchema}
    //   onSubmit={handleSubmit}
    // >
    //   {props => {
    //     return (
    //       <Form className={css.form}>
    //         <div className={css.formGroup}>
    //           <label htmlFor={`${fieldId}-title`}>Title</label>
    //           <Field
    //             id={`${fieldId}-title`}
    //             type="text"
    //             name="title"
    //             placeholder="Введіть назву нотатки"
    //             className={css.input}
    //           />
    //           <ErrorMessage
    //             component="span"
    //             name="title"
    //             className={css.error}
    //           />
    //         </div>

    //         <div className={css.formGroup}>
    //           <label htmlFor={`${fieldId}-content`}>Content</label>
    //           <Field
    //             as="textarea"
    //             id={`${fieldId}-content`}
    //             placeholder="Зробіть, будь ласка опис нотатки!"
    //             name="content"
    //             rows={8}
    //             className={css.textarea}
    //           />
    //           <ErrorMessage
    //             component="span"
    //             name="content"
    //             className={css.error}
    //           />
    //         </div>

    //         <div className={css.formGroup}>
    //           <label htmlFor={`${fieldId}-tag`}>Tag</label>
    //           <Field
    //             as="select"
    //             id={`${fieldId}-tag`}
    //             name="tag"
    //             className={css.select}
    //           >
    //             <option value="Todo">Todo</option>
    //             <option value="Work">Work</option>
    //             <option value="Personal">Personal</option>
    //             <option value="Meeting">Meeting</option>
    //             <option value="Shopping">Shopping</option>
    //           </Field>
    //           <ErrorMessage component="span" name="tag" className={css.error} />
    //         </div>

    //         <div className={css.actions}>
    //           <button
    //             type="button"
    //             className={css.cancelButton}
    //             onClick={handleCancel}
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             type="submit"
    //             className={css.submitButton}
    //             disabled={mutation.isPending}
    //             onClick={handleCancel}
    //           >
    //             {props.isSubmitting ? 'Note is creating ...' : 'Create note'}
    //           </button>
    //         </div>
    //       </Form>
    //     );
    //   }}
    // </Formik>
  );
}
