interface Props {
  value: string
  label: string
  tone?: 'light' | 'dark'
}

export function StatFigure({ value, label, tone = 'light' }: Props) {
  return (
    <div>
      <p className={`text-h2 tabular-nums ${tone === 'dark' ? 'text-cyan-500' : 'text-navy-800'}`}>
        {value}
      </p>
      <p className={`mt-1 text-base ${tone === 'dark' ? 'text-white/70' : 'text-navy-600'}`}>
        {label}
      </p>
    </div>
  )
}
