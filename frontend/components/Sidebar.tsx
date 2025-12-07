// components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-6 top-6 bottom-6 w-56 bg-white">
      <div className="p-4">
        <h1 className="text-4xl leading-none mb-8 font-semibold tracking-tight">
          <Link href="/" className="hover:opacity-80 transition">
            ana bárbara
          </Link>
        </h1>

        <nav className="text-sm leading-6 font-semibold">
          <Link href="/about" className="block hover:opacity-80 transition">about</Link>
          <Link href="/selected-works" className="block hover:opacity-80 transition">selected works</Link>
          <Link href="/projects" className="block hover:opacity-80 transition">projects</Link>
        </nav>
      </div>
    </aside>
  );
}