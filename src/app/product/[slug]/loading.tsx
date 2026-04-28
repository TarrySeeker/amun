export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 page-content-top pb-8">
      {/* Breadcrumbs skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 w-16 bg-[#1e1e1e] animate-pulse rounded" />
        <div className="h-4 w-4 bg-[#1e1e1e] animate-pulse rounded" />
        <div className="h-4 w-16 bg-[#1e1e1e] animate-pulse rounded" />
        <div className="h-4 w-4 bg-[#1e1e1e] animate-pulse rounded" />
        <div className="h-4 w-32 bg-[#1e1e1e] animate-pulse rounded" />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        {/* Gallery skeleton */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-[#1e1e1e] animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-20 h-20 bg-[#1e1e1e] animate-pulse" />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="flex flex-col gap-5">
          <div className="h-6 w-24 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-4 w-20 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-10 w-3/4 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-[#1e1e1e] animate-pulse rounded" />
            ))}
          </div>
          <div className="h-4 w-32 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-10 w-40 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-10 w-20 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-12 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-4 w-full bg-[#1e1e1e] animate-pulse rounded mt-4" />
          <div className="h-4 w-2/3 bg-[#1e1e1e] animate-pulse rounded" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="mt-16 border-t border-[#1e1e1e] pt-8">
        <div className="flex gap-6 mb-8">
          <div className="h-8 w-24 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-8 w-32 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-8 w-20 bg-[#1e1e1e] animate-pulse rounded" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-4 w-full bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-[#1e1e1e] animate-pulse rounded" />
          <div className="h-4 w-4/6 bg-[#1e1e1e] animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
