import Image from "next/image";
import { notFound } from "next/navigation";
import { PEOPLE } from "@/data/people";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default function PersonDetailPage({ params }: Params): React.JSX.Element {
  const person = PEOPLE.find((p) => p.slug === params.slug);
  if (!person) return notFound();

  const { name, role, location, headshot, bio } = person;

  return (
    <main className="bg-transparent">
      <div className="mx-auto max-w-[900px] px-4 lg:px-6 py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
          <div className="relative w-full sm:w-56 aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50">
            <Image
              src={headshot.src800}
              alt={headshot.alt}
              fill
              sizes="(min-width:768px) 224px, 80vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="sm:flex-1">
            <h1 className="text-zinc-900 dark:text-white text-3xl font-semibold">{name}</h1>
            <p className="text-zinc-700 dark:text-zinc-300 text-lg mt-2">{role}</p>
            {location ? (
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">{location}</p>
            ) : null}
          </div>
        </div>

        <article className="mt-8">
          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line">
            {bio}
          </p>
        </article>
      </div>
    </main>
  );
}
