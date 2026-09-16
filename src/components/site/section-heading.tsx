import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
  as?: "h1" | "h2";
};

/** Единый заголовок секции: штамп-надзаголовок, трафаретный заголовок, лид. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  as: Tag = "h2",
}: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="stamp text-orange">{eyebrow}</p>
      <Tag className="stencil mt-4 text-cream text-[clamp(2rem,5vw,3.25rem)] leading-[0.95]">
        {title}
      </Tag>
      {lead && (
        <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-foreground/80 sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
