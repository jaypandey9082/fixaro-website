"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroAC3DProps = {
  className?: string;
};

const particles = [
  { left: "34%", top: "48%", size: "6px", delay: "0s" },
  { left: "42%", top: "56%", size: "4px", delay: "0.8s" },
  { left: "52%", top: "50%", size: "7px", delay: "1.4s" },
  { left: "62%", top: "60%", size: "5px", delay: "2.1s" },
  { left: "48%", top: "67%", size: "4px", delay: "2.9s" },
  { left: "70%", top: "52%", size: "6px", delay: "3.5s" },
];

const statusPills = [
  { label: "Cooling Check", className: "left-3 top-10 sm:left-8 sm:top-16" },
  { label: "Clean Airflow", className: "right-2 top-28 hidden sm:flex" },
  { label: "Technician Ready", className: "bottom-7 left-1/2 hidden -translate-x-1/2 md:flex" },
];

export function HeroAC3D({ className }: HeroAC3DProps) {
  const [tilt, setTilt] = useState({ rotateX: -4, rotateY: 8 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateX: -4 - y * 8,
      rotateY: 8 + x * 10,
    });
  };

  return (
    <div className={cn("relative mx-auto w-full max-w-[680px]", className)}>
      <div className="absolute left-[18%] top-[10%] h-40 w-40 rounded-full bg-aqua/10 blur-3xl sm:h-56 sm:w-56 sm:bg-aqua/12 sm:animate-float-slow" />
      <div className="absolute right-[8%] top-[28%] h-44 w-44 rounded-full bg-teal/16 blur-3xl sm:h-64 sm:w-64 sm:bg-teal/20 sm:animate-pulse-glow" />

      <div className="relative min-h-[310px] sm:min-h-[500px]" role="img" aria-label="Premium 3D split AC cooling visual">
        {statusPills.map((pill) => (
          <div
            key={pill.label}
            className={cn(
              "glass-card absolute z-30 flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold text-white shadow-[0_0_22px_rgb(18_199_195_/_0.14)]",
              pill.className,
            )}
          >
            <CheckCircle2 aria-hidden="true" size={14} className="text-aqua" />
            {pill.label}
          </div>
        ))}

        <div
          className="relative z-10 mx-auto flex min-h-[300px] items-center justify-center pt-8 sm:min-h-[500px] sm:pt-16"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setTilt({ rotateX: -4, rotateY: 8 })}
        >
          <div
            className="relative h-[190px] w-[92%] max-w-[540px] transition-transform duration-300 ease-out [transform-style:preserve-3d] sm:h-[242px]"
            style={
              {
                transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(0)`,
              } as CSSProperties
            }
          >
            <div className="absolute -bottom-20 left-1/2 h-20 w-[82%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(18_199_195_/_0.3),rgb(0_0_0_/_0.42)_48%,transparent_72%)] blur-xl" />

            <div className="absolute inset-x-4 top-7 h-[142px] rounded-[1.5rem] border border-white/70 bg-[linear-gradient(145deg,#F5F7F8,#B9C2C7_48%,#EEF5F7)] shadow-[0_38px_90px_rgb(0_0_0_/_0.46),inset_0_1px_0_rgb(255_255_255_/_0.95)] [transform:translateZ(58px)] sm:h-[178px] sm:rounded-[2rem]">
              <div className="absolute inset-x-8 top-7 h-14 rounded-2xl bg-[linear-gradient(180deg,rgb(255_255_255_/_0.78),rgb(185_194_199_/_0.32))] shadow-[inset_0_-1px_0_rgb(5_123_128_/_0.18)]" />
              <div className="absolute inset-x-10 bottom-10 h-8 overflow-hidden rounded-full border border-charcoal/10 bg-[linear-gradient(180deg,#17212A,#0B0F12)] shadow-[inset_0_0_24px_rgb(18_199_195_/_0.28)]">
                <div className="absolute inset-x-8 top-1/2 h-px bg-aqua/70 shadow-[0_0_14px_rgb(110_244_234_/_0.8)]" />
                <div className="absolute inset-y-1 left-[12%] w-px bg-white/12" />
                <div className="absolute inset-y-1 left-[24%] w-px bg-white/12" />
                <div className="absolute inset-y-1 left-[36%] w-px bg-white/12" />
                <div className="absolute inset-y-1 left-[48%] w-px bg-white/12" />
                <div className="absolute inset-y-1 left-[60%] w-px bg-white/12" />
                <div className="absolute inset-y-1 left-[72%] w-px bg-white/12" />
                <div className="absolute inset-y-1 left-[84%] w-px bg-white/12" />
              </div>
              <div className="absolute right-8 top-[62px] flex h-12 w-12 items-center justify-center rounded-full border border-aqua/45 bg-charcoal shadow-[0_0_28px_rgb(18_199_195_/_0.24)] sm:right-10 sm:top-[72px] sm:h-16 sm:w-16">
                <svg className="h-8 w-8 text-aqua animate-fan-spin sm:h-10 sm:w-10" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="5" fill="currentColor" />
                  <path d="M24 7c8 1 12 8 8 14-7-1-11-6-8-14Z" fill="currentColor" opacity=".86" />
                  <path d="M39 28c-5 7-13 7-17 1 5-5 12-6 17-1Z" fill="currentColor" opacity=".72" />
                  <path d="M12 32c-3-8 2-15 10-14 2 7-1 13-10 14Z" fill="currentColor" opacity=".78" />
                </svg>
              </div>
              <div className="absolute left-8 top-10 h-3 w-24 rounded-full bg-white/70 sm:left-10 sm:top-12 sm:h-4 sm:w-28" />
              <div className="absolute left-8 top-16 h-2 w-36 rounded-full bg-charcoal/10 sm:left-10 sm:top-20 sm:w-44" />
              <div className="absolute -right-3 top-8 h-[148px] w-12 rounded-r-[2rem] bg-[linear-gradient(120deg,#9CA8AE,#EEF5F7)] opacity-80 blur-[0.2px] [transform:translateZ(-34px)_skewY(-10deg)]" />
            </div>

            <div className="absolute left-10 top-[186px] h-7 w-[82%] rounded-full bg-charcoal/45 blur-md [transform:translateZ(20px)]" />

            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="animate-airflow absolute left-[18%] top-[62%] hidden h-9 w-72 rounded-full bg-[linear-gradient(90deg,transparent,rgb(110_244_234_/_0.48),transparent)] blur-[1px] [transform:translateZ(64px)] sm:block"
                style={{ animationDelay: `${index * 0.9}s` }}
              />
            ))}

            {particles.map((particle) => (
              <span
                key={`${particle.left}-${particle.top}`}
                className="animate-particle-drift absolute hidden rounded-full bg-aqua shadow-[0_0_14px_rgb(110_244_234_/_0.85)] [transform:translateZ(70px)] sm:block"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDelay: particle.delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
