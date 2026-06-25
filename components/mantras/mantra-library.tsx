"use client";

import * as React from "react";
import { MantraCard } from "@/components/cards/mantra-card";
import { FilterChips } from "@/components/shared/filter-chips";
import { EmptyState } from "@/components/shared/empty-state";
import { mantras, mantraCategories } from "@/lib/data/mantras";

export function MantraLibrary() {
  const [category, setCategory] = React.useState<string | null>(null);

  const filtered = category
    ? mantras.filter((m) => m.category === category)
    : mantras;

  return (
    <div className="space-y-6">
      <FilterChips
        options={mantraCategories}
        value={category}
        onChange={setCategory}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No mantras found"
          description="Try a different category."
          icon="🔱"
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((m) => (
            <MantraCard key={m.id} mantra={m} />
          ))}
        </div>
      )}
    </div>
  );
}
