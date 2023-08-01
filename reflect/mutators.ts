import { WriteTransaction } from "@rocicorp/reflect/server";

export const mutators = {
  async increment(
    tx: WriteTransaction,
    { key, delta }: { key: string; delta: number }
  ) {
    const value = ((await tx.get(key)) as number | undefined) ?? 0;
    await tx.put(key, value + delta);
  },
};
