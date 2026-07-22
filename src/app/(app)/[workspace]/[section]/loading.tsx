export default function SectionLoading() {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center"
      aria-hidden="true"
    >
      <div className="size-12 animate-pulse rounded-xl bg-muted" />
      <div className="h-5 w-32 animate-pulse rounded bg-muted" />
      <div className="h-4 w-64 animate-pulse rounded bg-muted" />
    </div>
  );
}
