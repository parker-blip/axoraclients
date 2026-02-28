import { Link } from "react-router-dom";

export function Features() {
  // copy your existing features array from Home.tsx
  const features = [ /* ...same items as Home... */ ];

  return (
    <div className="min-h-screen bg-[#02010a] text-slate-100">
      {/* top nav – same as Home but highlight Features */}
      {/* main section – big "Why Axora" hero + features grid */}
      {/* footer – same as Home */}
    </div>
  );
}
