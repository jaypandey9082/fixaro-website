import { ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type WarrantySealProps = {
  className?: string;
};

export function WarrantySeal({ className }: WarrantySealProps) {
  return (
    <div className={cn("warranty-seal warranty-glow relative mx-auto aspect-square w-full max-w-[330px]", className)}>
      <div className="absolute inset-0 rounded-[42%] bg-[radial-gradient(circle_at_50%_34%,rgb(200_164_93_/_0.26),transparent_42%),linear-gradient(145deg,rgb(21_28_36_/_0.92),rgb(11_15_18_/_0.96))] shadow-[0_30px_90px_rgb(0_0_0_/_0.44)]" />
      <div className="warranty-shine absolute inset-3 rounded-[42%] border border-gold/40 bg-[radial-gradient(circle_at_50%_38%,rgb(110_244_234_/_0.16),transparent_48%),linear-gradient(145deg,rgb(245_247_248_/_0.08),rgb(255_255_255_/_0.015))]" />
      <div className="absolute inset-9 rounded-full border border-aqua/22 bg-charcoal/72 shadow-[inset_0_0_42px_rgb(18_199_195_/_0.16)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold shadow-[0_0_32px_rgb(200_164_93_/_0.16)]">
          <ShieldCheck aria-hidden="true" size={34} strokeWidth={2.2} />
        </div>
        <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-aqua">Up to</p>
        <p className="mt-1 text-5xl font-extrabold leading-none text-white">60 Days</p>
        <p className="mt-2 text-lg font-extrabold text-gradient-premium">Warranty</p>
        <p className="mt-4 max-w-36 text-xs font-semibold leading-5 text-silver">On eligible services</p>
      </div>
      <div className="absolute right-8 top-8 flex h-9 w-9 items-center justify-center rounded-full border border-aqua/25 bg-aqua/10 text-aqua">
        <Sparkles aria-hidden="true" size={16} />
      </div>
    </div>
  );
}
