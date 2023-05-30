import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-6">
      <div className="flex border-b border-grayLight">
        <Link href="/">
          <h1 className="font-bold text-titleBlue mb-2 text-xl">Podcaster</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
