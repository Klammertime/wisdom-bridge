interface UseCaseCardProps {
  title: string
  description: string
}

export function UseCaseCard({ title, description }: UseCaseCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}