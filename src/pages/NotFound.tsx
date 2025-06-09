import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-primary-600">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
        Page not found
      </p>
      <Link to="/" className="mt-6 btn-primary">
        Go back home
      </Link>
    </div>
  );
}
