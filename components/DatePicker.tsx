'use client'

interface DatePickerProps {
  selectedDate: string
  onDateChange: (date: string) => void
}

export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const today = new Date().toISOString().split('T')[0]
  const minDate = '1958-01-01'
  const maxDate = today

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <label htmlFor="date-picker" className="text-sm font-medium text-gray-300">
        Select Date:
      </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        min={minDate}
        max={maxDate}
        className="date-picker"
      />
      <button
        onClick={() => onDateChange(today)}
        className="btn-secondary text-sm"
      >
        Today
      </button>
    </div>
  )
}
