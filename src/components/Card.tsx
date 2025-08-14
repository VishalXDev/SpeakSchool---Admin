
import { PropsWithChildren, ReactNode } from 'react'

export default function Card({ children }: PropsWithChildren) {
  return <div className="card">{children}</div>
}

export function Stat({ label, value, foot }: { label: string, value: ReactNode, foot?: ReactNode }) {
  return (
    <div className="card">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {foot ? <div className="text-xs text-gray-500 mt-1">{foot}</div> : null}
    </div>
  )
}
