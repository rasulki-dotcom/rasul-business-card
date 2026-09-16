import { Skeleton } from "@/components/ui/skeleton";

/** Каркас первого экрана: те же блоки, что в Hero, пока грузится страница. */
export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-between px-6 pt-10 pb-12 lg:px-8">
      <Skeleton className="h-3 w-32" />

      <div className="grid grid-cols-1 items-end gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Skeleton className="h-[clamp(4rem,17vw,9.5rem)] w-[min(100%,26rem)]" />
          <Skeleton className="mt-8 h-px w-full max-w-md rounded-none" />
          <Skeleton className="mt-5 h-3 w-48" />
          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-full max-w-[42ch]" />
            <Skeleton className="h-4 w-full max-w-[38ch]" />
            <Skeleton className="h-4 w-full max-w-[30ch]" />
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-14 w-full sm:w-56" />
            <Skeleton className="h-14 w-full sm:w-48" />
          </div>
        </div>

        <div className="lg:col-span-5 lg:pb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line-soft py-4 last:border-b"
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-full max-w-64" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="h-3 w-64" />
    </div>
  );
}
