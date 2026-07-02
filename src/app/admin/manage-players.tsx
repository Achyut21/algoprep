"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addPlayer, deletePlayer, renamePlayer, resetPin } from "./actions";

type ManagedProfile = { id: number; name: string; hasPin: boolean };

type RowMode =
  | { kind: "idle" }
  | { kind: "confirmDelete"; id: number }
  | { kind: "rename"; id: number; value: string };

export function ManagePlayers({ profiles }: { profiles: ManagedProfile[] }) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<RowMode>({ kind: "idle" });
  const [isPending, startTransition] = useTransition();

  function add(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await addPlayer({ name });
      if (result.error) setError(result.error);
      else setName("");
    });
  }

  function remove(profileId: number) {
    startTransition(async () => {
      await deletePlayer(profileId);
      setMode({ kind: "idle" });
    });
  }

  function rename(profileId: number, value: string) {
    startTransition(async () => {
      const result = await renamePlayer({ profileId, name: value });
      if (result.error) setError(result.error);
      else setMode({ kind: "idle" });
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
            {profiles.map((profile) => {
              const renaming =
                mode.kind === "rename" && mode.id === profile.id;
              const confirming =
                mode.kind === "confirmDelete" && mode.id === profile.id;
              return (
                <li
                  key={profile.id}
                  className="flex items-center justify-between gap-3 py-2"
                >
                  {renaming ? (
                    <form
                      className="flex w-full items-center gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        rename(profile.id, mode.value);
                      }}
                    >
                      <Input
                        value={mode.value}
                        maxLength={30}
                        className="h-8 font-mono text-sm"
                        autoFocus
                        onChange={(e) => {
                          setMode({
                            kind: "rename",
                            id: profile.id,
                            value: e.target.value,
                          });
                          setError(null);
                        }}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="font-mono text-xs"
                        disabled={mode.value.trim().length === 0 || isPending}
                      >
                        {isPending ? "saving…" : "save"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="font-mono text-xs"
                        onClick={() => setMode({ kind: "idle" })}
                      >
                        cancel
                      </Button>
                    </form>
                  ) : (
                    <>
                      <span className="min-w-0 truncate">
                        {profile.name}
                        <span className="ml-3 text-xs text-muted-foreground">
                          {profile.hasPin ? "pin set" : "no pin yet"}
                        </span>
                      </span>
                      {confirming ? (
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="text-xs text-destructive">
                            deletes all their runs too!
                          </span>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="font-mono text-xs"
                            disabled={isPending}
                            onClick={() => remove(profile.id)}
                          >
                            {isPending ? "deleting…" : "really delete"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="font-mono text-xs"
                            onClick={() => setMode({ kind: "idle" })}
                          >
                            cancel
                          </Button>
                        </span>
                      ) : (
                        <span className="flex shrink-0 items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-mono text-xs"
                            onClick={() =>
                              setMode({
                                kind: "rename",
                                id: profile.id,
                                value: profile.name,
                              })
                            }
                          >
                            rename
                          </Button>
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
                          <Button
                            variant="destructive"
                            size="sm"
                            className="font-mono text-xs"
                            onClick={() =>
                              setMode({ kind: "confirmDelete", id: profile.id })
                            }
                          >
                            delete
                          </Button>
                        </span>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
