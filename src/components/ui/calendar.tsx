import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function Calendar({ selected, onSelect }: { selected?: Date; onSelect?: (d?: Date)=>void }) {
  return (
    <div className="rounded-md border bg-black/30 p-2">
      <DayPicker mode="single" selected={selected} onSelect={onSelect} />
    </div>
  )
}
