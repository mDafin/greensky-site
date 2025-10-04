"use client";

export default function RequestAccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Request Access</h1>
        <p className="mt-2 text-slate-300 text-sm">Submit your details; our team will review and provision access if appropriate.</p>
        <form
          className="mt-6 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Submitted — our team will follow up.");
          }}
        >
          <input className="h-11 rounded-xl bg-white/5 border border-white/10 px-4" placeholder="Full Name" required />
          <input className="h-11 rounded-xl bg-white/5 border border-white/10 px-4" type="email" placeholder="Work Email" required />
          <input className="h-11 rounded-xl bg-white/5 border border-white/10 px-4" placeholder="Company" required />
          <textarea className="rounded-xl bg-white/5 border border-white/10 px-4 py-3" placeholder="Context / Purpose" rows={4} />
          <button className="h-11 rounded-xl bg-cyan-400 text-slate-950 font-semibold">Submit</button>
        </form>
      </section>
    </main>
  );
}
