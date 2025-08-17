'use client';

import Link from "next/link";
import styles from "../noteList.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={styles.nav}>
      <Link
        href="/"
        className={`${styles.navLink} ${pathname === "/" ? styles.selectedNavLink : ""}`}
      >
        Home
      </Link>
      <Link
        href="/note/create"
        className={`${styles.navLink} ${pathname === "/note/create" ? styles.selectedNavLink : ""}`}
      >
        Create Note
      </Link>
    </header>
  );
}
