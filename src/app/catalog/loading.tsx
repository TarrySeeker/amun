export default function CatalogLoading() {
  return (
    <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 page-content-top pb-20">
      <div className="flex gap-2 mb-6">
        <div className="h-4 w-16 bg-[#1a1a1a] animate-pulse rounded" />
        <div className="h-4 w-4 bg-[#1a1a1a] animate-pulse rounded" />
        <div className="h-4 w-16 bg-[#1a1a1a] animate-pulse rounded" />
      </div>

      <div className="mb-10 md:mb-12 border-b border-[#2a2a2a]/80 pb-8 space-y-4">
        <div className="h-12 w-32 bg-[#7a9e52]/30 animate-pulse rounded" />
        <div className="h-14 md:h-16 w-64 md:w-80 bg-[#1a1a1a] animate-pulse rounded" />
        <div className="h-4 max-w-xl bg-[#1a1a1a] animate-pulse rounded" />
        <div className="h-4 max-w-lg bg-[#1a1a1a] animate-pulse rounded" />
      </div>

      {/* Подборка — скелетон над сеткой */}
      <div className="mb-8 rounded-xl border border-[#ebe7df] bg-[#f4f2eb] px-4 py-5 md:px-6 md:py-6">
        <div className="h-4 w-28 mx-auto mb-5 bg-[#d5d0c6] animate-pulse rounded" />
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-[2.75rem] w-[7.25rem] md:flex-1 md:max-w-[9.5rem] bg-[#e3dfd6] animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Категории — скелетон */}
      <div className="mb-8 rounded-xl border border-[#ebe7df] bg-[#f4f2eb] px-4 py-5 md:px-6 md:py-6">
        <div className="h-4 w-32 mx-auto mb-4 bg-[#d5d0c6] animate-pulse rounded" />
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[2.75rem] w-28 md:w-36 bg-[#e3dfd6] animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 px-4 py-4 rounded-xl border border-[#2a2a2a] bg-[#0f0f0f]/90">
          <div className="h-5 w-40 bg-[#1a1a1a] animate-pulse rounded" />
          <div className="h-10 w-full sm:w-52 bg-[#ebe7df] animate-pulse rounded border border-[#d8d2c8]" />
        </div>

        <div className="grid grid-cols-1 min-[460px]:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#f4f2eb] border border-[#e3dfd6] overflow-hidden rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.4)]"
            >
              <div className="aspect-square bg-[#ebe7df] animate-pulse" />
              <div className="p-5 md:p-6 space-y-3">
                <div className="h-3 w-20 bg-[#e3dfd6] animate-pulse rounded" />
                <div className="h-5 w-full bg-[#e3dfd6] animate-pulse rounded" />
                <div className="h-5 w-[85%] bg-[#e3dfd6] animate-pulse rounded" />
                <div className="h-4 w-28 bg-[#e3dfd6] animate-pulse rounded" />
                <div className="h-8 w-32 bg-[#e3dfd6] animate-pulse rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
