import { Button } from "./components/ui/button";

export function App() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold text-amber-800">☕ Seduh.in</h1>
        <div className="space-x-6">
          <a href="#" className="text-gray-700 hover:text-amber-700">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-amber-700">
            Product
          </a>
        </div>
      </nav>

      <main className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-8 text-center">
        <h2 className="mb-4 text-3xl font-semibold text-amber-900">
          Selamat Datang di Seduh.in
        </h2>
        <p className="mb-6 max-w-lg text-gray-700">
          Temukan berbagai varian kopi pilihan dari seluruh Nusantara. Nikmati
          aroma dan cita rasa kopi lokal terbaik!
        </p>
        <Button className="bg-amber-700 hover:bg-amber-800">
          Lihat Produk
        </Button>
      </main>

      <footer className="bg-gray-900 py-4 text-center text-white">
        <p>&copy; {new Date().getFullYear()} Seduh.in</p>
      </footer>
    </div>
  );
}
