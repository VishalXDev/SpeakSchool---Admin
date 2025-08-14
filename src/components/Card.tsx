import { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={clsx("bg-white rounded-lg border border-gray-200", className)}>
      {children}
    </div>
  );
}

interface StatProps {
  label: string;
  value: ReactNode;
  foot?: ReactNode;
  className?: string;
}

export function Stat({ label, value, foot, className = "" }: StatProps) {
  return (
    <div className={clsx("bg-white rounded-lg border border-gray-200", className)}>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {foot && <div className="text-xs text-gray-500 mt-1">{foot}</div>}
    </div>
  );
}
