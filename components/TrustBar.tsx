"use client";

import { IndianRupee, MessageCircle, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { trustBarItems } from "@/lib/data";

const trustIcons = [IndianRupee, SearchCheck, Sparkles, ShieldCheck, MessageCircle] as const;

export function TrustBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="trust" className="relative border-b border-white/10 py-5 sm:py-7">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgb(18_199_195_/_0.11),transparent_30rem)]" />
      <div className="container-premium">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.42 }}
          className="trust-bar-glow overflow-hidden rounded-[1.75rem] border border-aqua/16 bg-[linear-gradient(135deg,rgb(21_28_36_/_0.78),rgb(11_15_18_/_0.72))] p-3 shadow-[0_18px_62px_rgb(0_0_0_/_0.28)] backdrop-blur-xl"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trustBarItems.map((item, index) => {
              const Icon = trustIcons[index] || ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : index * 0.04 }}
                  className="relative rounded-2xl border border-white/8 bg-white/[0.035] p-4"
                >
                  {index > 0 ? <span className="absolute -left-1 top-5 hidden h-10 w-px bg-aqua/25 shadow-[0_0_14px_rgb(18_199_195_/_0.5)] lg:block" /> : null}
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-aqua/20 bg-aqua/10 text-aqua">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">{item.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-silver">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
