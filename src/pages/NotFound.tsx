import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header component */}
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 bg-gray-50">
        <div className="text-center">
          {/* Error message */}
          <h1 className="text-6xl font-display font-bold text-festari-900 mb-4">404</h1>
          <p className="text-xl text-festari-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
          {/* Link to go back to the homepage */}
          <Link
            to="/"
            className="text-white bg-festari-accent hover:bg-festari-accent/90 px-6 py-3 rounded-lg text-lg"
          >
            Go Back Home
          </Link>
        </div>
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default NotFound;
