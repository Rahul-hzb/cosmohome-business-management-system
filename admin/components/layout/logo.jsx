import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-3 px-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white font-bold">
        C
      </div>

      <div>
        <h2 className="text-lg font-bold">Cosmohome</h2>

        <p className="text-xs text-muted-foreground">Admin Panel</p>
      </div>
    </Link>
  );
}
