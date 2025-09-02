'use client';

import css from './TagsMenu.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { type Note } from '@/types/note';

type Props = { tags: Note['tag'][] };
//   tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export default function TagsMenu({ tags }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          {/* tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'; */}
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/all`}
              onClick={toggle}
              className={css.menuLink}
            >
              All notes
            </Link>
          </li>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
