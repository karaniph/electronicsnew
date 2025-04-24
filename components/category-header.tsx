export function CategoryHeader({
  title,
  description,
  count,
}: {
  title: string
  description: string
  count: number
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center gap-2">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          {count} {count === 1 ? "component" : "components"}
        </span>
      </div>
    </div>
  )
}
