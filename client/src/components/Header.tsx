import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-slate-500 text-white p-5">
      <Link to="/" className="text-3xl font-bold">Logo</Link>
    </header>
  );
};
