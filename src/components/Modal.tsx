
import { PropsWithChildren } from 'react'

export default function Modal({ open, onClose, title, children }: PropsWithChildren<{ open: boolean, onClose: () => void, title: string }>) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[95vw] max-w-xl shadow-soft">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="font-medium">{title}</div>
          <button onClick={onClose} className="btn-outline">Close</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
