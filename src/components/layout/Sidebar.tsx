
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col shrink-0 transition-all">
      <div className="h-16 flex items-center px-6 border-b border-slate-700">
        <span className="font-bold text-lg">Menu</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <Link to="/" className="block px-6 py-2 hover:bg-slate-700 transition-colors">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
