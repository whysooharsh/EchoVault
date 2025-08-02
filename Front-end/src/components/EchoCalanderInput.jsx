

export default function CalendarInput({ value, onChange, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Unlock Date and TIme</label>
      <input
        type="datetime-local"
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 rounded-full border border-gray-300 focus:border-amber-500 focus:outline-none shadow focus:shadow-amber-200 transition"
        {...props}
      />
    </div>
  );
}
