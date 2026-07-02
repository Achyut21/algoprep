"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addPlayer, resetPin } from "./actions";

type ManagedProfile = { id: number; name: string; hasPin: boolean };

export function ManagePlayers({ profiles }: { profiles: ManagedProfile[] }) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function add(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await addPlayer({ name });
      if (result.error) setError(result.error);
      else setName("");
    });
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        <form onSubmit={add} className="flex gap-2">
          <Input
            value={name}
            placeholder="new player name"
            maxLength={30}
            className="font-mono"
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
          />
          <Button
            type="submit"
            disabled={name.trim().length === 0 || isPending}
            className="font-mono"
          >
            {isPending ? "adding…" : "add player"}
          </Button>
        </form>
        {error && <p className="font-mono text-sm text-destructive">{error}</p>}
        {profiles.length > 0 && (
          <ul className="divide-y divide-border font-mono text-sm">
            {profiles.map((profile) => (
              <li
                key={profile.id}
                className="flex items-center justify-between py-2"
              >
                <span>
                  {profile.name}
                  <span className="ml-3 text-xs text-muted-foreground">
                    {profile.hasPin ? "pin set" : "no pin yet"}
                  </span>
                </span>
                {profile.hasPin && (
                  <form action={resetPin.bind(null, profile.id)}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-mono text-xs"
                    >
                      reset pin
                    </Button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
