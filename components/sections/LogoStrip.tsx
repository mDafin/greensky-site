import Image from "next/image";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type GrayscaleMode = "always" | "dark-only";

interface LogoStripProps {
  logos: Logo[];
  grayscale?: GrayscaleMode;
}

export default function LogoStrip({
  logos,
  grayscale = "always",
}: LogoStripProps) {
  const grayscaleClass =
    grayscale === "always"
      ? "grayscale hover:grayscale-0"
      : "dark:grayscale dark:hover:grayscale-0";

  return (
    <section className="w-full border-t border-[color:var(--hairline-dark)]">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-8">
        <div
          className="
            flex items-center gap-8
            overflow-x-auto sm:overflow-visible
            sm:justify-between
            scrollbar-none
          "
        >
          {logos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.width ?? 120}
              height={logo.height ?? 40}
              className={`
                h-8 w-auto sm:h-10
                flex-shrink-0
                opacity-90
                ${grayscaleClass}
                transition-all duration-300 ease-out
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}