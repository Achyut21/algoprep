"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { loginProfile } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type PickerProfile = { id: number; name: string; hasPin: boolean };

export function ProfilePicker({ profiles }: { profiles: PickerProfile[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<PickerProfile | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function open(profile: PickerProfile) {
    setSelected(profile);
    setPin("");
    setError(null);
  }

  function login() {
    if (!selected) return;
    startTransition(async () => {
      const result = await loginProfile({ profileId: selected.id, pin });
      if (result.error) {
        setError(result.error);
        setPin("");
      } else {
        router.refresh();
      }
    });
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {profiles.map((profile) => (
          <Button
            key={profile.id}
            variant="outline"
            size="lg"
            className="hover-glow font-mono hover:border-primary/50"
            onClick={() => open(profile)}
          >
            <span className="text-primary">&gt;</span> {profile.name}
          </Button>
        ))}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(isOpen) => !isOpen && setSelected(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-mono">
              Hi {selected?.name}!
            </DialogTitle>
            <DialogDescription>
              {selected?.hasPin
                ? "Enter your 4-digit PIN."
                : "First time? Pick a 4-digit PIN — you'll use it to log in from now on, so remember it!"}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="space-y-3"
          >
            <Input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ""));
                setError(null);
              }}
              className="text-center font-mono text-lg tracking-[0.5em]"
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="submit" disabled={pin.length !== 4 || isPending}>
                {isPending
                  ? "Checking…"
                  : selected?.hasPin
                    ? "Log in"
                    : "Set my PIN"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
