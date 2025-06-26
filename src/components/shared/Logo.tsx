import Link from "next/link";

export default function HeaderLogo() {
  return (
    <div className="flex items-center">
      <Link href="/" className="mr-8 flex items-center space-x-2">
        <div className="bg-primary w-8 h-8 rounded-lg" />
        <span className="font-bold text-xl">Sitegen</span>
      </Link>
    </div>
  );
}
