import { Button } from "./components/ui/button";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function App() {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(`${import.meta.env.VITE_BACKEND_API_URL}/products`, fetcher);
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

      <main className="flex flex-1 flex-col items-center justify-center p-8 text-center">
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

        <div className="mt-10 w-full max-w-5xl">
          {isLoading && <p>Loading produk...</p>}
          {error && <p className="text-red-600">Gagal memuat produk</p>}
          {products && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {products.map((p: any) => (
                <div
                  key={p.id}
                  className="rounded-lg border bg-white p-4 text-left shadow"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="mb-3 h-40 w-full rounded-md object-cover"
                  />
                  <h3 className="text-lg font-semibold text-amber-900">
                    {p.name}
                  </h3>
                  <p className="text-gray-600">{p.origin}</p>
                  <p className="font-bold text-amber-700">
                    Rp {p.price.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-900 py-4 text-center text-white">
        <p>&copy; {new Date().getFullYear()} Seduh.in</p>
      </footer>
    </div>
  );
}
