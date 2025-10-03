export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-2xl">
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Page Not Found</h1>
        <p className="text-xl text-text-secondary mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-[#0369a1] transition-colors duration-200 text-base"
          >
            Go Home
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors duration-200 text-base"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}
