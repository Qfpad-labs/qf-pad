"use client";

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        {/* Header */}
        <h1 className="text-6xl md:text-7xl font-black uppercase mb-6 tracking-tight">
          CREATE<br />PROJECT
        </h1>

        {/* Coming soon state */}
        <div className="neo-frame max-w-3xl -rotate-[0.45deg] bg-[#FFF2D5] p-8 sm:p-10">
          <p className="inline-block border-[3px] border-black bg-[#B8EF53] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">
            Coming Soon
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black uppercase leading-tight">
            Apply to Get Whitelisted
          </h2>
          <p className="mt-4 text-base sm:text-lg font-bold text-black/80">
            The whitelist application form is being prepared. Soon you will be able to submit
            your project details for review directly from this page.
          </p>
          <div className="mt-6 rotate-[0.55deg] border-[3px] border-black bg-white px-5 py-4">
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-black/70">
              We&apos;ll notify you here once applications are live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
