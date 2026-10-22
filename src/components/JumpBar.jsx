export default function JumpBar({ items }) {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
        {items.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-semibold text-navy-700 hover:bg-navy-50"
          >
            <Icon size={16} /> {name}
          </button>
        ))}
      </div>
    </div>
  );
}
