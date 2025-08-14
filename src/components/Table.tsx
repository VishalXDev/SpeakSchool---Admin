
import { ReactNode } from 'react'

export default function Table({ columns, children }: { columns: string[], children: ReactNode }) {
  return (
    <div className="overflow-auto rounded-2xl border border-gray-200 bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-50 text-left text-sm text-gray-600">
          <tr>
            {columns.map((c, i) => <th key={i} className="px-3 py-3">{c}</th>)}
          </tr>
        </thead>
        <tbody className="text-sm">
          {children}
        </tbody>
      </table>
    </div>
  )
}
