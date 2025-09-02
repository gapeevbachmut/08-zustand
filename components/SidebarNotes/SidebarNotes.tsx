import { type Note } from '@/types/note';
import css from './SidebarNotes.module.css';
import Link from 'next/link';

type Props = {
  tags: Note['tag'][];
};

export default async function SidebarNotes({ tags }: Props) {
  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
