import type { ReactNode } from "react";
import { PageHeader } from "./page-header";
import { Button } from "./ui/button";
import { ErrorState, PageLoader } from "./ui/states";

export function Screen({ title, children, back = true }: { title: string; children: ReactNode; back?: boolean }) {
  return <div className="detail-screen"><PageHeader title={title} back={back} /><div className="page-pad list-stack">{children}</div></div>;
}

export function QueryState({ query, children }: { query: { isPending: boolean; isError: boolean; refetch(): unknown }; children: ReactNode }) {
  if (query.isPending) return <PageLoader />;
  if (query.isError) return <ErrorState retry={() => void query.refetch()} />;
  return <>{children}</>;
}

export function Pagination({ offset, total, size = 20, onChange }: { offset: number; total: number; size?: number; onChange(value: number): void }) {
  if (total <= size) return null;
  return <nav className="pagination" aria-label="Pagination"><Button variant="secondary" size="sm" disabled={!offset} onClick={() => onChange(Math.max(0, offset - size))}>Previous</Button><span>{offset + 1}–{Math.min(offset + size, total)} of {total}</span><Button variant="secondary" size="sm" disabled={offset + size >= total} onClick={() => onChange(offset + size)}>Next</Button></nav>;
}

export function FormError({ error }: { error: unknown }) {
  return error ? <p className="form-error" role="alert">{error instanceof Error ? error.message : "Something went wrong. Please try again."}</p> : null;
}
