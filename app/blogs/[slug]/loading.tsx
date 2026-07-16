/* Loading skeleton for the blog post route. Shown while the dynamic
   /blogs/[slug] page renders, enabling streaming + partial prefetch. */
export default function Loading() {
  return (
    <main style={{ marginTop: "96px" }}>
      <section className="bg-bg-2 py-10 lg:py-14">
        <div className="container-px mx-auto max-w-3xl">
          <div className="h-3 w-32 animate-pulse rounded bg-bg-3" />
          <div className="mt-4 h-5 w-40 animate-pulse rounded bg-bg-3" />
          <div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-bg-3" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-bg-3" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-bg-3" />
        </div>
      </section>
      <section className="bg-white py-10 lg:py-14">
        <div className="container-px mx-auto max-w-3xl">
          <div className="space-y-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-1/2 animate-pulse rounded bg-bg-3" />
                <div className="h-4 w-full animate-pulse rounded bg-bg-3" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-bg-3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
