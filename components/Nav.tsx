import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-black/10 dark:border-white/15 bg-white/80 dark:bg-black/40 backdrop-blur-sm sticky top-0 z-10">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          GIX Lab 5
        </Link>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <Link className="underline-offset-4 hover:underline" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="underline-offset-4 hover:underline" href="/equipment">
              Equipment
            </Link>
          </li>
          <li>
            <Link className="underline-offset-4 hover:underline" href="/events">
              Events
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
