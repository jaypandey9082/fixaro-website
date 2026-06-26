"use client";

import type { LucideIcon } from "lucide-react";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PremiumButton } from "@/components/PremiumButton";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export type ProblemItem = {
  title: string;
  symptoms: string;
  recommendedService: string;
  recommendedSlug?: string;
  startingPrice: string;
  warrantyNote?: string;
  icon: LucideIcon;
  message: string;
};

type ProblemCardProps = {
  problem: ProblemItem;
  index: number;
};

export function ProblemCard({ problem, index }: ProblemCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = problem.icon;
  const problemUrl = createWhatsAppUrl(problem.message);

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : index * 0.04 }}
      className={cn(
        "problem-card-shine group flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgb(21_28_36_/_0.78),rgb(11_15_18_/_0.72))] p-4 shadow-[0_18px_58px_rgb(0_0_0_/_0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-aqua/30 hover:shadow-[0_24px_76px_rgb(0_0_0_/_0.34),0_0_34px_rgb(18_199_195_/_0.08)] sm:p-5",
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-aqua/24 bg-aqua/10 text-aqua shadow-[0_0_24px_rgb(18_199_195_/_0.1)]">
        <Icon aria-hidden="true" size={21} />
      </div>

      <h3 className="text-lg font-extrabold leading-tight text-white sm:text-xl">{problem.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-silver">{problem.symptoms}</p>

      <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Recommended service</p>
          <p className="mt-1 text-sm font-extrabold text-white">{problem.recommendedService}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">From</p>
            <p className="mt-1 text-lg font-extrabold text-aqua">{problem.startingPrice}</p>
          </div>
          {problem.warrantyNote ? (
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                <ShieldCheck aria-hidden="true" size={13} />
                Warranty
              </p>
              <p className="mt-1 text-xs font-extrabold leading-5 text-gold">{problem.warrantyNote}</p>
            </div>
          ) : null}
        </div>
      </div>

      <PremiumButton href={problemUrl} external className="mt-5 w-full" aria-label={`Get help for ${problem.title} on WhatsApp`}>
        <MessageCircle aria-hidden="true" size={17} />
        Get Help on WhatsApp
      </PremiumButton>
    </motion.article>
  );
}
