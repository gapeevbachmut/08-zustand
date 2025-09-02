import css from './notes.module.css';

export default function Loading() {
  return (
    <>
      <div className={css.loading}>
        <p>Loading, please wait...</p>
      </div>
    </>
  );
}
