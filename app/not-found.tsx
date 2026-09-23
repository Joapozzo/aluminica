import Link from "next/link";
import { IconArrowUpRight } from "../components/Icons";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>Esta pieza no está acá.</h1>
      <Link href="/">
        Volver al inicio <IconArrowUpRight size={16} />
      </Link>
    </main>
  );
}
