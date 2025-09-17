import { Link, useLocation } from "react-router-dom";
import { Home, Search, Library, User } from "lucide-react";

const Navbar = () => {
    const location = useLocation();

    const links = [
        { to: "/", icon: <Home size={22} />, label: "Home" },
        { to: "/search", icon: <Search size={22} />, label: "Search" },
        { to: "/library", icon: <Library size={22} />, label: "Library" },
        {
            to: "/profile",
            icon: (
                <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-black">
                    <User size={18} />
                </div>
            ),
            label: "Profile",
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-black text-white px-4 py-2 flex justify-around items-center border-t border-gray-700 rounded-t-xl z-50">
            {links.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === link.to
                        ? "text-purple-400"
                        : "hover:text-purple-400"
                        }`}
                >
                    {link.icon}
                    <span className="text-xs">{link.label}</span>
                </Link>
            ))}
        </nav>
    );
};

export default Navbar;
