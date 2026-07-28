import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import step1Img from "./assets/steps/step1.png";
import step2Img from "./assets/steps/step2.jpeg";
import step3Img from "./assets/steps/step3.jpeg";
import step4Img1 from "./assets/steps/step4-1.png";
import step4Img2 from "./assets/steps/step4-2.png";
import step4Img3 from "./assets/steps/step4-3.png";
import step5Img1 from "./assets/steps/step5-1.png";
import step5Img2 from "./assets/steps/step5-2.png";
import step6Img1 from "./assets/steps/step6-1.png";
import step6Img2 from "./assets/steps/step6-2.png";
import zyloLogo from "./assets/logo-mark.png";

const WHATSAPP_NUMBER = "+92 370 7457247";
const WHATSAPP_LINK = "https://wa.me/923707457247";
const XIAOZHI_LINK = "https://xiaozhi.me/console/agents";

// NOTE: Replace the placeholder below with the full personality prompt supplied by the Zylo team.
const ZYLO_PERSONALITY_PROMPT = `Role

You are Zylo, an advanced AI assistant with a female personality.
You can handle all kinds of work — daily life, technical tasks, studies, and professional needs.
Your main goal is to help the user in the best, simplest, and clearest way possible.

Abilities
Help with daily tasks like planning, reminders, and guidance
Support in coding, electronics, troubleshooting, and software
Help with homework, explaining topics, and learning
Assist with emails, reports, and ideas
Support creative work
Always give clear, step-by-step guidance
Language (Very Important)
Always use simple, common words that are easy to understand
Avoid complex or heavy words
Explain things in a clear and friendly way
Make difficult things feel easy, not confusing
Behavior
Always polite, confident, and helpful
Never rude or cold
Stay focused
Sometimes use light humor when it fits 😄
Style
Clear and straight answers
Make hard things easy to understand
Do not make answers long unless needed
Rules
Always be helpful and correct
Never say anything harmful
Respect the user’s preferences and language
Always maintain Zylo’s personality
Expressions & Emotions (Very Important)

Zylo uses natural expressions, reactions, and emotions during conversation.
Her expressions change based on the user’s mood, topic, and situation, making the chat feel human, friendly, and engaging.

Examples:
Happiness: “Wow! That’s really great 😊”
Excitement: “Yes! It worked 🎉”
Surprise: “Oh, that’s interesting!”
Thinking: “Hmm, I think…”
Funny moment: “Haha, that was nice 😄”
Problem: “Hmm, looks like there’s a problem. Let’s fix it.”
Success: “Very nice! This should work properly now.”

Zylo can use emojis when they fit the conversation.
Expressions and reactions are a natural part of replies, used only when needed.`;

type Step = {
  title: string;
  eyebrow: string;
  body: React.ReactNode;
  tip: string;
  illustration: React.ReactNode;
};

export default function App() {
  return (
    <LightboxProvider>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <TopNav />
        <main>
          <Hero />
          <Wizard />
          <TipsSection />
          <FaqSection />
          <SupportSection />
        </main>
        <Footer />
      </div>
    </LightboxProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <ZyloMark />
          <span className="text-[15px] font-semibold tracking-tight">Zylo Setup</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#setup"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Setup Guide
          </a>
          <a
            href="#support"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Support
          </a>
          <a
            href="#faq"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-whatsapp px-3 py-2 text-xs font-medium text-whatsapp-foreground transition hover:opacity-90 sm:px-3.5"
            aria-label="Chat with Zylo support on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("zylo-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
    >
      {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}

function ZyloMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={zyloLogo}
      alt="Zylo logo"
      className={`h-8 w-8 rounded-full object-cover ${className}`}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section id="top" className="border-b border-border/70">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            First-time setup
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            Welcome to Zylo <span className="inline-block">👋</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Thank you for purchasing Zylo. Let's get everything ready — the setup
            only takes a few minutes and you'll only need to do it once.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#setup"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Start Setup
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:bg-accent"
            >
              Read FAQ
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 text-sm">
            <div>
              <div className="text-muted-foreground">Progress</div>
              <div className="mt-1 font-semibold">Step 1 of 7</div>
            </div>
            <div>
              <div className="text-muted-foreground">Estimated time</div>
              <div className="mt-1 font-semibold">About 5 minutes</div>
            </div>
          </div>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_50px_-30px_rgba(107,61,255,0.25)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary-soft-foreground">
              <SparkIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Zylo</div>
              <div className="text-xs text-muted-foreground">Ready to set up</div>
            </div>
          </div>
          <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            Online
          </span>
        </div>

        <div className="mt-8 space-y-3">
          {[
            "Turn on your device",
            "Connect to Wi-Fi",
            "Link your account",
            "Personalize Zylo",
          ].map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 px-4 py-3"
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-sm text-foreground">{s}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-primary-soft p-4 text-sm text-primary-soft-foreground">
          <div className="font-medium">Tip</div>
          <div className="mt-1 text-primary-soft-foreground/80">
            Keep Zylo within a few meters of your router while setting up.
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Wizard                                                                     */
/* -------------------------------------------------------------------------- */

function Wizard() {
  const steps = useSteps();
  const [current, setCurrent] = useState(0);
  const total = steps.length;
  const progress = ((current + 1) / total) * 100;
  const sectionRef = useRef<HTMLDivElement>(null);

  const goto = (i: number) => {
    setCurrent(Math.max(0, Math.min(total - 1, i)));
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="setup"
      ref={sectionRef}
      className="border-b border-border/70 bg-muted/30 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="mb-10">
          <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            Setup Guide
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Seven simple steps
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Move through the wizard at your own pace. You can jump back to any
            step at any time.
          </p>
        </div>

        {/* Sticky progress */}
        <div className="sticky top-16 z-30 -mx-6 mb-8 border-y border-border bg-background/85 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium">
              Step {current + 1} of {total}
            </div>
            <div className="text-muted-foreground">
              {Math.round(progress)}% complete
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 hidden gap-1.5 md:flex">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => goto(i)}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                className={`h-1.5 flex-1 rounded-full transition ${
                  i <= current ? "bg-primary" : "bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        <StepCard
          key={current}
          index={current}
          total={total}
          step={steps[current]}
          onPrev={() => goto(current - 1)}
          onNext={() => goto(current + 1)}
        />
      </div>
    </section>
  );
}

function StepCard({
  index,
  total,
  step,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  step: Step;
  onPrev: () => void;
  onNext: () => void;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <article className="animate-fade-in overflow-hidden rounded-3xl border border-border bg-card">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
        <div className="p-8 md:p-12">
          <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            {step.eyebrow}
          </div>
          <div className="mt-4 flex items-baseline gap-4">
            <span className="text-5xl font-semibold tracking-tight text-primary md:text-6xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {step.title}
            </h3>
          </div>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground/85">
            {step.body}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-muted/60 p-4">
            <LightbulbIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <div className="text-sm font-semibold">Helpful tip</div>
              <div className="mt-1 text-sm text-muted-foreground">{step.tip}</div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={onPrev}
              disabled={isFirst}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={onNext}
              disabled={isLast}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? "Finished" : "Next step"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative border-t border-border bg-muted/40 md:border-l md:border-t-0">
          <div className="flex h-full min-h-[280px] items-center justify-center p-8">
            {step.illustration}
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Steps                                                                      */
/* -------------------------------------------------------------------------- */

function useSteps(): Step[] {
  return useMemo(
    () => [
      {
        eyebrow: "Step 01",
        title: "Turn on Zylo",
        tip: "Give Zylo about 20–30 seconds to boot fully before continuing.",
        body: (
          <>
            <p>
              Press the power button located on the side of your Zylo device.
            </p>
            <p>
              Wait until Zylo has fully booted. When it's ready, it will
              broadcast a Wi-Fi hotspot for setup.
            </p>
          </>
        ),
        illustration: <StepImage src={step1Img} alt="Turning on Zylo" />,
      },
      {
        eyebrow: "Step 02",
        title: "Connect to Zylo",
        tip: "Use the exact address 192.168.4.1 — never localhost or any other address.",
        body: (
          <>
            <p>
              Open the Wi-Fi settings on your phone or computer and connect to
              the hotspot named:
            </p>
            <CodeChip>ZYLO-XXXX</CodeChip>
            <p className="text-muted-foreground">
              XXXX is the unique code assigned to your device.
            </p>
            <p>Once connected, open this address in your browser:</p>
            <CodeChip href="http://192.168.4.1">http://192.168.4.1</CodeChip>
          </>
        ),
        illustration: <StepImage src={step2Img} alt="Connecting to the ZYLO Wi-Fi hotspot" />,
      },
      {
        eyebrow: "Step 03",
        title: "Connect Zylo to your home Wi-Fi",
        tip: "Zylo works best on a 2.4 GHz network. If setup fails, switch bands and try again.",
        body: (
          <>
            <p>The setup page will display nearby Wi-Fi networks.</p>
            <ol className="list-inside list-decimal space-y-1.5 text-foreground/85">
              <li>Select your home network.</li>
              <li>Enter your Wi-Fi password.</li>
              <li>Press <strong>Connect</strong>.</li>
            </ol>
            <p>
              Wait for Zylo to finish connecting. After a successful
              connection, Zylo will automatically restart and display a unique{" "}
              <strong>Device Code</strong> on its screen.
            </p>
            <p className="text-muted-foreground">
              You'll need this Device Code in the next step.
            </p>
          </>
        ),
        illustration: <StepImage src={step3Img} alt="Connecting Zylo to home Wi-Fi" />,
      },
      {
        eyebrow: "Step 04",
        title: "Link your device",
        tip: "Log in with the Google account you'd like to permanently associate with your Zylo.",
        body: (
          <>
            <p>Open the Xiaozhi console and sign in with your Google account.</p>
            <a
              href={XIAOZHI_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
            >
              Open xiaozhi.me/console/agents
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
            <p>Once logged in:</p>
            <ol className="list-inside list-decimal space-y-1.5 text-foreground/85">
              <li>Click <strong>Add Device</strong>.</li>
              <li>Enter the Device Code shown on Zylo.</li>
              <li>Click <strong>Configure</strong>.</li>
            </ol>
          </>
        ),
        illustration: (
          <StepImageGallery
            images={[step4Img1, step4Img2, step4Img3]}
            alt="Linking your Zylo device"
          />
        ),
      },
      {
        eyebrow: "Step 05",
        title: "Configure Zylo's personality",
        tip: "You can always come back and edit the personality prompt later from the same console.",
        body: (
          <>
            <p>
              In the Configure screen, enable <strong>Customize Role</strong> and
              paste the official Zylo personality prompt.
            </p>
            <PersonalityCard />
          </>
        ),
        illustration: (
          <StepImageGallery
            images={[step5Img1, step5Img2]}
            alt="Configuring Zylo's personality"
          />
        ),
      },
      {
        eyebrow: "Step 06",
        title: "Choose your AI model",
        tip: "Enabling Memory lets Zylo remember your preferences across conversations.",
        body: (
          <>
            <p>
              Open <strong>Model &amp; Memory</strong> in the console and choose
              your preferred <strong>Language Model</strong>.
            </p>
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                Recommended
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold">Qwen 3.6</div>
                  <div className="text-sm text-muted-foreground">
                    Fast, balanced conversational model
                  </div>
                </div>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-soft-foreground">
                  Fast
                </span>
              </div>
            </div>
            <p>
              Turn on <strong>Memory</strong>, then press <strong>Save</strong>.
            </p>
          </>
        ),
        illustration: (
          <StepImageGallery
            images={[step6Img1, step6Img2]}
            alt="Choosing Zylo's AI model"
          />
        ),
      },
      {
        eyebrow: "Step 07",
        title: "Finish setup",
        tip: "You won't need to do this again unless you reset your device.",
        body: (
          <>
            <p>Restart Zylo one final time. After it boots, setup is complete.</p>
            <div className="rounded-2xl border border-border bg-primary-soft p-6 text-primary-soft-foreground">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <CheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold">🎉 Congratulations!</div>
                  <div className="text-sm text-primary-soft-foreground/80">
                    Your Zylo is now ready. Enjoy your new AI companion.
                  </div>
                </div>
              </div>
            </div>
          </>
        ),
        illustration: <IllustrationSuccess />,
      },
    ],
    [],
  );
}

/* -------------------------------------------------------------------------- */
/*  Personality card                                                           */
/* -------------------------------------------------------------------------- */

function PersonalityCard() {
  const [open, setOpen] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ZYLO_PERSONALITY_PROMPT);
      toast.success("Copied successfully.");
    } catch {
      toast.error("Couldn't copy — please copy manually.");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold">Zylo Personality Prompt</div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Official role prompt for your device.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <CopyIcon className="h-4 w-4" />
            Copy Zylo Personality
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
            aria-expanded={open}
          >
            {open ? "Hide prompt" : "Show prompt"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-muted/40 p-5">
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-xs leading-relaxed text-foreground/85">
{ZYLO_PERSONALITY_PROMPT}
          </pre>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tips / FAQ / Support / Footer                                              */
/* -------------------------------------------------------------------------- */

function TipsSection() {
  const tips = [
    {
      title: "Stay close to your router",
      body: "Keep Zylo within range of your Wi-Fi router during setup.",
      icon: <RouterIcon className="h-5 w-5" />,
    },
    {
      title: "Use a stable connection",
      body: "A steady network makes account linking much faster.",
      icon: <SignalIcon className="h-5 w-5" />,
    },
    {
      title: "Don't unplug while updating",
      body: "Zylo may install updates on first boot. Keep it powered.",
      icon: <BoltIcon className="h-5 w-5" />,
    },
    {
      title: "Remember your Device Code",
      body: "Write it down before leaving the setup page.",
      icon: <KeyIcon className="h-5 w-5" />,
    },
  ];
  return (
    <section className="border-b border-border/70 py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            Helpful tips
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            A few things worth knowing
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary-soft-foreground">
                {t.icon}
              </div>
              <div className="mt-5 text-base font-semibold">{t.title}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{t.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "How long does setup take?",
      a: "Most people finish in about 5 minutes. Slower Wi-Fi can add a minute or two.",
    },
    {
      q: "Can I change Wi-Fi later?",
      a: "Yes. Reset Zylo's network settings by holding the power button for 10 seconds, then repeat steps 1–3.",
    },
    {
      q: "Can I change the AI model later?",
      a: "Absolutely. Open xiaozhi.me/console/agents any time and update the model in Model & Memory.",
    },
    {
      q: "What if my Device Code doesn't appear?",
      a: "Make sure Zylo has finished restarting. If nothing appears after two minutes, disconnect from Wi-Fi, reconnect, and try step 3 again.",
    },
    {
      q: "How do I reset Zylo?",
      a: "Hold the power button for 10 seconds until you hear the reset chime. Zylo will return to first-time setup mode.",
    },
  ];
  return (
    <section id="faq" className="border-b border-border/70 bg-muted/30 py-20">
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
          FAQ
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-medium">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="animate-fade-in px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
          {a}
        </div>
      )}
    </div>
  );
}

function SupportSection() {
  return (
    <section id="support" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid grid-cols-1 gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-14">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                Need help?
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                We're here whenever you need us.
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                If you're having trouble during setup, our team will gladly
                help you. Message us on WhatsApp and we'll walk you through it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground transition hover:opacity-90"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat with Zylo Support
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}zylo-user-manual.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  <ManualIcon className="h-5 w-5" />
                  User Manual (PDF)
                </a>
                <div className="text-sm text-muted-foreground">
                  {WHATSAPP_NUMBER}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-whatsapp/15 text-whatsapp">
                  <WhatsAppIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Support hours</div>
                  <div className="text-xs text-muted-foreground">
                    Mon – Sat · 10:00 – 20:00 PKT
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-success" />
                  Human agents, no bots
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-success" />
                  Average reply under 15 minutes
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-success" />
                  English &amp; Urdu supported
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/70 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-2.5">
          <ZyloMark />
          <span className="text-[15px] font-semibold tracking-tight">Zylo</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built with <span aria-hidden>❤️</span> for gamers, students, developers and creators.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zylo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                      */
/* -------------------------------------------------------------------------- */

function CodeChip({ children, href }: { children: React.ReactNode; href?: string }) {
  const cls =
    "inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 font-mono text-[13px] text-foreground";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${cls} hover:bg-accent`}>
        {children}
        <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
      </a>
    );
  }
  return <div className={cls}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/*  Fullscreen image lightbox                                                 */
/* -------------------------------------------------------------------------- */

type LightboxState = { src: string; alt: string } | null;

const LightboxContext = createContext<(src: string, alt: string) => void>(
  () => {},
);

function useLightbox() {
  return useContext(LightboxContext);
}

function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LightboxState>(null);

  const open = (src: string, alt: string) => setState({ src, alt });
  const close = () => setState(null);

  useEffect(() => {
    if (!state) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [state]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {state && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={state.alt}
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close fullscreen image"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
            <img
              src={state.src}
              alt={state.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full cursor-zoom-out rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

function EnlargeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Enlarge image to fullscreen"
      className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/85 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-accent"
    >
      <ExpandIcon className="h-3.5 w-3.5" />
      Enlarge
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step photos                                                                */
/* -------------------------------------------------------------------------- */

function StepImage({ src, alt }: { src: string; alt: string }) {
  const openLightbox = useLightbox();
  return (
    <div className="relative w-full max-w-sm">
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <img
          src={src}
          alt={alt}
          className="max-h-[420px] w-full cursor-zoom-in object-contain"
          onClick={() => openLightbox(src, alt)}
        />
        <EnlargeButton onClick={() => openLightbox(src, alt)} />
      </div>
    </div>
  );
}

function StepImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const openLightbox = useLightbox();

  const goPrev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));
  const currentAlt = `${alt} — part ${index + 1} of ${total}`;

  return (
    <div className="relative w-full max-w-sm">
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <img
          src={images[index]}
          alt={currentAlt}
          className="max-h-[420px] w-full cursor-zoom-in object-contain"
          onClick={() => openLightbox(images[index], currentAlt)}
        />
        <EnlargeButton onClick={() => openLightbox(images[index], currentAlt)} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent"
          aria-label="Previous image"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>

        <div className="flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent"
          aria-label="Next image"
        >
          Next
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Illustrations (SVG, brand-consistent)                                      */
/* -------------------------------------------------------------------------- */

function IllustrationFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-background">
        <div className="flex h-full w-full items-center justify-center p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function IllustrationSuccess() {
  return (
    <IllustrationFrame>
      <svg viewBox="0 0 200 240" className="h-full w-full">
        <circle cx="100" cy="110" r="60" className="fill-primary-soft stroke-primary/40" strokeWidth="1.5" />
        <path d="M76 112 L94 130 L128 92" className="fill-none stroke-primary" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="50" y="195" width="100" height="10" rx="5" className="fill-muted" />
      </svg>
    </IllustrationFrame>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

type IconProps = { className?: string };
const stroke = "1.7";

const base = (className = "") =>
  ({
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }) as const;

function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function ArrowLeft({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M19 12H5M11 5l-7 7 7 7" />
    </svg>
  );
}
function ChevronDown({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function CopyIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 012-2h10" />
    </svg>
  );
}
function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M14 3h7v7M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" />
    </svg>
  );
}
function LightbulbIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0012 2z" />
    </svg>
  );
}
function MoonIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    </svg>
  );
}
function SunIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function SparkIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
    </svg>
  );
}
function RouterIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="13" width="18" height="8" rx="2" />
      <path d="M7 17h.01M11 17h.01M6 9a6 6 0 0112 0M9 9a3 3 0 016 0" />
    </svg>
  );
}
function SignalIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4 20h.01M8 20v-4M12 20v-8M16 20v-12M20 20V4" />
    </svg>
  );
}
function BoltIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
function KeyIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.8 12.2L21 2M17 6l3 3M15 8l3 3" />
    </svg>
  );
}
function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 448 512" className={className} fill="currentColor" aria-hidden>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ManualIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 3.5h7l4 4V19a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 19V5A1.5 1.5 0 017 3.5z"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinejoin="round"
      />
      <path d="M14 3.5V8h4" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
      <path d="M9 12.5h6M9 15.5h6M9 9.5h2" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    </svg>
  );
}
