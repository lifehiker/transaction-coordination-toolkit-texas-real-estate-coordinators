import { TransactionForm } from "@/components/app/TransactionForm";
import { createTransaction } from "@/app/app/transactions/actions";

export function NewTransactionClient() {
  return <TransactionForm action={createTransaction} submitLabel="Create Transaction" />;
}
