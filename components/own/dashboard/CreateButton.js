import Link from "next/link"

export default function CreateButton({location}) {
  return (
    <div>
      <a href={location} className="rounded-lg p-2 bg-lime-500 text-white">
        Creează
      </a>
    </div>
  )
}
