import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4 text-center text-xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                href="/"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/analytics"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-md p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h1>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">          
          {children}</main>
      </div>
    </div>
  );
}
