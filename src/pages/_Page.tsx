
export default function Page({ title }: { title: string }) {
  return (
    <div className="card">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-gray-500 mt-2">Content goes here...</div>
    </div>
  )
}
