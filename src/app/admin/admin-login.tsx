"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLogin } from "./actions";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await adminLogin({ password });
      if (result.error) {
        setError(result.error);
        setPassword("");
      } else {
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Input
        type="password"
        placeholder="admin password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null);
        }}
        className="font-mono"
        autoFocus
      />
      {error && (
        <p className="font-mono text-sm text-destructive">{error}</p>
      )}
      <Button
        type="submit"
        disabled={password.length === 0 || isPending}
        className="w-full font-mono"
      >
        {isPending ? "checking…" : "sudo login"}
      </Button>
    </form>
  );
}
