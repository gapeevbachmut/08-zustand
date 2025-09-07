import css from './home.module.css';

export default function Loading() {
  return (
    <>
      <div className={css.loading}>
        <p>Loading, please wait...</p>
      </div>
    </>
  );
}
