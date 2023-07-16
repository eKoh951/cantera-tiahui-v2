import Image from "next/image";
import Button from "./components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>Home</div>
      <Link href="/dashboard">Dashboard</Link>
      <Button />
    </main>
  );
}
