import { Link } from "react-router-dom";
import { Card } from "../components/ui.jsx";

export default function Placeholder({ title, owner }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Card className="p-8 text-center">
        <h1 className="text-2xl font-bold text-navy-700">{title}</h1>
        <p className="mt-2 text-muted">
          {owner ? `This screen is built by ${owner}. Placeholder until merged.` : "This page does not exist."}
        </p>
        <Link to="/features" className="mt-5 inline-block font-semibold text-navy-700 underline">
          Go to Features
        </Link>
      </Card>
    </div>
  );
}
