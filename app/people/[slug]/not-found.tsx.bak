// app/people/[slug]/not-found.tsx
import SafeLink from "@/components/nav/SafeLink";

export default function NotFound() {
  return (
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[800px] px-4 lg:px-6 py-20 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold">Profile not found</h1>
        <p className="mt-3 text-zinc-600">
          We couldn’t find that leader’s profile. It may have been moved.
        </p>
        <div className="mt-6">
          <SafeLink
            href="/people"
            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border border-black/10 hover:bg-black/5"
          >
            Back to Leadership
          </SafeLink>
        </div>
      </div>
    </section>
  );
}