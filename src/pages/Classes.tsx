
import { useEffect } from 'react'
import { useStore } from '@/store'
import Table from '@/components/Table'

export default function Classes() {
  const { load, classes } = useStore()
  useEffect(() => { load() }, [load])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Classes</div>
      </div>
      <Table columns={['Class','Grade','Teacher','Schedule','Students']}>
        {classes.map(c => (
          <tr key={c.id} className="border-t">
            <td className="px-3 py-2">{c.name}</td>
            <td className="px-3 py-2">Grade {c.grade}</td>
            <td className="px-3 py-2">{c.teacher}</td>
            <td className="px-3 py-2">{c.schedule}</td>
            <td className="px-3 py-2">{/* computed client-side */}<ClassCount id={c.id}/></td>
          </tr>
        ))}
      </Table>
    </div>
  )
}

function ClassCount({ id }: { id: string }) {
  const { students } = useStore()
  const count = students.filter(s => s.classId === id).length
  return <span className="badge gray">{count}</span>
}
