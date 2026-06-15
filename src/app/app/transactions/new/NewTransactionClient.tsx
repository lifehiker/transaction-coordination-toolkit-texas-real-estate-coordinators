"use client";

import { TransactionForm } from "@/components/app/TransactionForm";
import { createTransaction } from "@/app/app/transactions/actions";
import Link from "next/link";

export function NewTransactionClient() {
  return (
    <div className="max-w-2xl">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/app/transactions" className="hover:text-foreground">Transactions</Link>
        {" / "}
        <span>New Transaction</span>
      </nav>
      <h1 className="text-2xl font-bold mb-6">Create New Transaction</h1>
      <TransactionForm action={createTransaction} submitLabel="Create Transaction" />
    </div>
  );
}
