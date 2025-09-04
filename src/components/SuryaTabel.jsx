// components/SuryaTabel.js
"use client";

export default function SuryaTabel() {
  const data = [
    { kode: "A001", produk: "Jus Mangga", kategori: "Minuman", stok: 50, status: "Tersedia" },
    { kode: "A002", produk: "Jus Alpukat", kategori: "Minuman", stok: 30, status: "Tersedia" },
    { kode: "A003", produk: "Jus Nanas", kategori: "Minuman", stok: 0, status: "Habis" },
    { kode: "A004", produk: "Jus Semangka", kategori: "Minuman", stok: 15, status: "Tersedia" },
    { kode: "A005", produk: "Jus Jambu", kategori: "Minuman", stok: 0, status: "Habis" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 mt-10">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Kode</th>
            <th className="px-4 py-2">Produk</th>
            <th className="px-4 py-2">Kategori</th>
            <th className="px-4 py-2">Stok</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.kode} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.kode}</td>
              <td className="px-4 py-2">{item.produk}</td>
              <td className="px-4 py-2">{item.kategori}</td>
              <td className="px-4 py-2">{item.stok}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.status === "Tersedia"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
