import FloatingFeatureCards, {
  MobileFeatureCarousel,
} from "@/components/FloatingFeatureCards";
import FutureScene from "@/components/FutureScene";
import SignupForm from "@/components/SignupForm";

const flow = [
  ["01", "Tell us the event", "Demo day. Hackathon. Founder dinner. Something stranger."],
  ["02", "We build the plan", "Venues, constraints, partners, ops. The pieces start clicking."],
];

const riskChecklist = [
  "Venue capacity",
  "Insurance",
  "Security guards",
  "Door staff",
  "Permits",
  "Sound limits",
  "Food and beverage",
  "Backup vendors",
  "Ticketing setup",
  "Refund policy",
  "Sponsor fit",
  "Guest flow",
  "Load-in timing",
  "Emergency plan",
  "Weather backup",
  "Cleanup",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <section
        id="top"
        className="relative isolate min-h-screen overflow-hidden bg-[#050507] px-5 py-6 text-paper sm:px-8 lg:px-12"
      >
        <div className="absolute inset-0 -z-30 bg-black" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute inset-0 -z-10 opacity-75">
          <FutureScene />
        </div>

        <FloatingFeatureCards />

        <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-center">
          <a href="#top" className="flex items-center gap-3">
            <span className="font-mono text-2xl font-black italic tracking-tight text-white">
              LIVLIVE
            </span>
          </a>
        </nav>

        <div className="mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-7xl items-center justify-center pb-12 pt-10 text-center">
          <div className="relative z-10 mx-auto flex w-full flex-col items-center">
            <h1 className="mx-auto w-full max-w-6xl text-center font-mono text-[clamp(1.75rem,7.4vw,8rem)] font-black uppercase leading-[0.96] tracking-[0.02em] text-white">
              <span className="block whitespace-nowrap text-center">Host offline events</span>
              <br />
              <span className="block whitespace-nowrap text-center text-white">in 10 minutes.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-mono text-base leading-7 text-white/48">
              The operating system for startup events.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <SignupForm compact />
            </div>
            <MobileFeatureCarousel />
          </div>
        </div>
        <a
          href="#scout"
          className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 text-center font-mono text-xs text-white/35 sm:block"
        >
          keep going
          <span className="mx-auto mt-2 block text-lg leading-none">⌄</span>
        </a>
      </section>

      <section
        id="scout"
        className="relative overflow-hidden bg-[#050507] px-5 py-28 text-paper sm:px-8 lg:px-12"
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:100%_76px]" />

        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">
            How this works
          </p>
          <h2 className="mt-4 max-w-6xl font-mono text-[clamp(3rem,7.2vw,7.2rem)] font-black uppercase leading-[0.96] tracking-tight">
            Throw the idea in.
            <br />
            We make it land.
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-7xl border-y border-paper/18">
          {flow.map(([num, title, body]) => (
            <article
              key={num}
              className="grid gap-5 border-b border-paper/18 py-10 last:border-b-0 md:grid-cols-[120px_0.85fr_1.15fr] md:items-center"
            >
              <p className="font-mono text-sm text-white/45">{num}</p>
              <h3 className="font-mono text-4xl font-black uppercase leading-none">{title}</h3>
              <p className="font-mono text-base leading-7 text-paper/50">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper px-5 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-ink/60">
              What can go wrong?
            </p>
            <h2 className="mt-3 font-mono text-[clamp(2.8rem,5.5vw,5.5rem)] font-black uppercase leading-[0.96] tracking-tight">
              Every event has boxes to check.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              Based on your event profile, LivLive uses AI plus deterministic
              checks to show what needs to be filled out, then makes the
              repetitive planning work easier to finish.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-3xl rounded-2xl border-2 border-ink bg-ink p-4 shadow-hard">
            <div className="absolute left-1/2 top-0 z-20 h-12 w-40 -translate-x-1/2 -translate-y-1/2 rounded-b-xl rounded-t-md border-2 border-ink bg-[#cfc7b2] shadow-hard-sm">
              <div className="mx-auto mt-3 h-3 w-16 rounded-full border-2 border-ink bg-paper" />
            </div>

            <div className="relative rounded-xl border-2 border-ink bg-[#fffaf0] px-5 pb-6 pt-9">
              <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-4">
                <div>
                  <p className="font-mono text-xs font-black uppercase tracking-[0.08em] text-ink/60">
                    Pre-launch checklist
                  </p>
                  <p className="mt-1 text-2xl font-black">Before anyone pays</p>
                </div>
                <span className="rounded-sm border-2 border-ink bg-white px-3 py-2 font-mono text-sm font-black shadow-hard-sm">
                  16 / 16
                </span>
              </div>

              <div className="mt-5 grid gap-x-7 gap-y-3 sm:grid-cols-2">
                {riskChecklist.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 border-b border-ink/15 pb-2"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm border-2 border-ink bg-white text-sm font-black text-ink">
                      ✓
                    </span>
                    <span className="text-sm font-black leading-tight text-ink/82">
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-6 rotate-[-1deg] rounded-sm border-2 border-ink bg-white p-4 shadow-hard-sm">
                <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-ink/60">
                  Notes
                </p>
                <p className="mt-2 text-sm font-black leading-6">
                  And then there are the extra variables: neighborhood fit, age
                  restrictions, sponsor obligations, vendor minimums,
                  accessibility, rain plans, power needs, and all the tiny
                  operational details that make an event feel easy when they are
                  handled early.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="relative bg-[#050507] px-5 py-28 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">
            Waitlist
          </p>
          <h2 className="mt-4 font-mono text-[clamp(3rem,6.4vw,6.4rem)] font-black uppercase leading-[0.96] tracking-tight">
            Bring the next one offline.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-mono text-base leading-7 text-paper/48">
            Founders, operators, community builders. Drop your email.
          </p>
          <div id="signup" className="mx-auto mt-8 max-w-xl">
            <SignupForm compact />
          </div>
        </div>
      </section>
    </main>
  );
}
