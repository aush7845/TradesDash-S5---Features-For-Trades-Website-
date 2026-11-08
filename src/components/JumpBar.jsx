export default function JumpBar({ items }) {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => go(id)}
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-navy-700 shadow-sm hover:border-accent hover:text-accent"
        >
          <Icon size={16} /> {name}
        </button>
      ))}
    </div>
  );
}
