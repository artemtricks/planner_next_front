"use client";

import Loader from "@/components/Loader";
import { useProfile } from "@/hook/useProfile";

export function Statistics() {
  const { data, isLoading } = useProfile();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="grid grid-cols-4 gap-12 mt-7">
      {data?.statistics.length ? (
        data.statistics.map((item) => (
          <div
            className="bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500"
            key={item.label}
          >
            <div className="text-xl">{item.label}</div>
            <div className="text-3xl font-semibold">{item.value}</div>
          </div>
        ))
      ) : (
        <div>Statistics not loaded</div>
      )}
    </div>
  );
}
