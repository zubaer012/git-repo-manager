import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  CodeBracketIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const baseNavigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

export default function Layout() {
  const location = useLocation();
  const params = useParams<{ owner: string; repo: string }>();

  // Check if we're in a repository context
  const isInRepository = params.owner && params.repo;

  // Create repository-specific navigation if we're in a repo
  const repoNavigation = isInRepository
    ? [
        {
          name: "Repository",
          href: `/repository/${params.owner}/${params.repo}`,
          icon: CodeBracketIcon,
        },
        {
          name: "Issues",
          href: `/repository/${params.owner}/${params.repo}/issues`,
          icon: ExclamationCircleIcon,
        },
        {
          name: "Pull Requests",
          href: `/repository/${params.owner}/${params.repo}/pulls`,
          icon: ArrowPathIcon,
        },
      ]
    : [];

  const navigation = [...baseNavigation, ...repoNavigation];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-primary-600">
              GitHub Manager
            </h1>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {/* Show current repository info if in repo context */}
            {isInRepository && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Current Repository
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {params.owner}/{params.repo}
                </p>
              </div>
            )}

            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
