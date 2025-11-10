export default function NotFound() {
  return (
    <main className="section section-pt section-pb">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you’re looking for doesn’t exist or may have been moved.</p>
        <a href="/" className="btn btn-primary mt-6 inline-block">Go home</a>
      </div>
    </main>
  );
}
