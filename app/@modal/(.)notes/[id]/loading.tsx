import { CircleLoader } from 'react-spinners';
import css from './NotePreview.module.css';

export default function Loading() {
  return (
    <>
      <div className={css.loading}>
        <CircleLoader color="#93ae9e" loading size={100} speedMultiplier={1} />
      </div>
    </>
  );
}
