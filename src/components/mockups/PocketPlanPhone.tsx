// PocketPlan phone mockup — 3 screens: balance, budget, forecast
// Pure CSS/SVG, no images needed.

type Screen = "balance" | "budget" | "forecast";

interface Props {
  screen?: Screen;
  variant?: "full" | "thumbnail";
}

function Glyph({
  name,
  size = 18,
  color = "currentColor",
  sw = 1.5,
}: {
  name: string;
  size?: number;
  color?: string;
  sw?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<string, React.ReactNode> = {
    home: (
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </>
    ),
    budget: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v9l6 4" />
      </>
    ),
    insights: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7 15l4-5 3 3 4-6" />
      </>
    ),
    cards: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function PhoneTabBar({ active = "home" }: { active?: string }) {
  const tabs = [
    ["home", "Home"],
    ["budget", "Budget"],
    ["insights", "Insights"],
    ["cards", "Cards"],
  ];
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        borderTop: "1px solid rgba(232,223,211,0.1)",
        background: "var(--surface-overlay)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around",
        paddingTop: 12,
      }}
    >
      {tabs.map(([id, label]) => (
        <div
          key={id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            color: active === id ? "var(--accent)" : "var(--text-dim)",
          }}
        >
          <Glyph name={id} size={19} color="currentColor" />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 8.5,
              letterSpacing: "0.04em",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function PPBalance() {
  return (
    <>
      <div style={{ padding: "4px 22px 0", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 19,
              color: "var(--cream)",
            }}
          >
            PocketPlan
          </span>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#C8412B,#7B5E3C)",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-soft)",
          }}
        >
          Available balance
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 52,
            lineHeight: 1,
            color: "var(--cream)",
            marginTop: 8,
            letterSpacing: "-0.02em",
          }}
        >
          $4,210
          <span style={{ color: "var(--text-dim)", fontSize: 30 }}>.06</span>
        </div>
        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent)",
            border: "1px solid rgba(200,65,43,0.33)",
            borderRadius: 999,
            padding: "4px 10px",
          }}
        >
          ↑ $320 today
        </div>
        <svg
          viewBox="0 0 260 70"
          style={{ width: "100%", height: 70, marginTop: 22 }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ppg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C8412B" stopOpacity="0.35" />
              <stop offset="1" stopColor="#C8412B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 55 C 30 48, 50 30, 80 36 S 130 20, 160 28 S 210 8, 260 18 L 260 70 L 0 70 Z"
            fill="url(#ppg)"
          />
          <path
            d="M0 55 C 30 48, 50 30, 80 36 S 130 20, 160 28 S 210 8, 260 18"
            fill="none"
            stroke="#C8412B"
            strokeWidth="1.5"
          />
        </svg>
        <div
          style={{
            marginTop: 16,
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-soft)",
          }}
        >
          Upcoming
        </div>
        {[
          ["Rent", "Jun 1", "−$1,450"],
          ["Spotify", "Jun 3", "−$11"],
          ["Salary", "Jun 5", "+$2,800"],
        ].map(([a, b, c]) => (
          <div
            key={a}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "11px 0",
              borderBottom: "1px solid rgba(232,223,211,0.08)",
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: "var(--cream)" }}>{a}</div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--text-dim)",
                  marginTop: 2,
                }}
              >
                {b}
              </div>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: c[0] === "+" ? "var(--accent)" : "var(--text-soft)",
              }}
            >
              {c}
            </span>
          </div>
        ))}
      </div>
      <PhoneTabBar active="home" />
    </>
  );
}

function PPBudget() {
  const env = [
    ["Groceries", 312, 400],
    ["Transit", 84, 120],
    ["Dining", 96, 150],
    ["Joy", 40, 80],
    ["Subscriptions", 54, 60],
  ] as [string, number, number][];
  return (
    <>
      <div style={{ padding: "4px 22px 0", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 24,
              color: "var(--cream)",
            }}
          >
            Budgets
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-soft)",
            }}
          >
            October
          </span>
        </div>
        <div
          style={{
            marginTop: 18,
            padding: "14px 16px",
            border: "1px solid rgba(200,65,43,0.25)",
            borderRadius: 12,
            background: "rgba(200,65,43,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-soft)",
            }}
          >
            Left to spend
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 26,
              color: "var(--accent)",
            }}
          >
            $260
          </span>
        </div>
        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {env.map(([name, spent, limit]) => (
            <div key={name}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12.5,
                  color: "var(--cream)",
                  marginBottom: 7,
                }}
              >
                <span>{name}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-soft)",
                  }}
                >
                  {spent} / {limit}
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  borderRadius: 4,
                  background: "rgba(232,223,211,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(spent / limit) * 100}%`,
                    background:
                      spent / limit > 0.9 ? "#D9A452" : "var(--accent)",
                    borderRadius: 4,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PhoneTabBar active="budget" />
    </>
  );
}

function PPForecast() {
  return (
    <>
      <div style={{ padding: "4px 22px 0", flex: 1, overflow: "hidden" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 24,
            color: "var(--cream)",
          }}
        >
          Forecast
        </span>
        <div
          style={{
            marginTop: 22,
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-soft)",
          }}
        >
          Projected · Dec 31
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 46,
            lineHeight: 1,
            color: "var(--cream)",
            marginTop: 8,
          }}
        >
          $6,420
        </div>
        <div
          style={{
            marginTop: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent)",
          }}
        >
          ● On track
        </div>
        <svg
          viewBox="0 0 260 120"
          style={{ width: "100%", height: 130, marginTop: 18 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              y1={20 + i * 28}
              x2="260"
              y2={20 + i * 28}
              stroke="rgba(232,223,211,0.07)"
              strokeWidth="1"
            />
          ))}
          <path
            d="M0 95 C 40 88, 60 80, 90 70 S 140 60, 160 50"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M160 50 C 190 42, 210 30, 260 16"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.7"
          />
          <circle cx="160" cy="50" r="3.5" fill="var(--accent)" />
          <circle
            cx="260"
            cy="16"
            r="3.5"
            fill="var(--accent)"
            stroke="var(--ink-screen)"
            strokeWidth="2"
          />
        </svg>
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          {["3M", "6M", "1Y"].map((c, i) => (
            <span
              key={c}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: "6px 14px",
                borderRadius: 999,
                border: `1px solid ${
                  i === 1 ? "var(--accent)" : "var(--rule)"
                }`,
                color: i === 1 ? "var(--accent)" : "var(--text-soft)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <p
          style={{
            marginTop: 20,
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: 13,
            lineHeight: 1.5,
            color: "var(--text-soft)",
          }}
        >
          If you keep this pace, you&apos;ll clear your goal three weeks early.
        </p>
      </div>
      <PhoneTabBar active="insights" />
    </>
  );
}

export default function PocketPlanPhone({
  screen = "balance",
  variant = "full",
}: Props) {
  const isThumbnail = variant === "thumbnail";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: isThumbnail ? "flex-start" : "center",
        justifyContent: "center",
        paddingTop: isThumbnail ? 22 : 0,
      }}
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: isThumbnail ? 340 : 420,
          height: isThumbnail ? 340 : 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,65,43,0.2), transparent 65%)",
          filter: "blur(20px)",
          top: isThumbnail ? -16 : undefined,
        }}
      />
      {/* phone shell */}
      <div
        style={{
          position: "relative",
          width: isThumbnail
            ? "min(248px, calc(100% - 32px))"
            : "min(296px, calc(100vw - 44px))",
          height: isThumbnail ? 392 : "min(620px, 80%)",
          minHeight: isThumbnail ? 0 : 540,
          borderRadius: isThumbnail ? 34 : 42,
          background: "var(--ink-screen)",
          border: "1px solid rgba(232,223,211,0.14)",
          boxShadow: isThumbnail
            ? "0 30px 70px rgba(0,0,0,0.55), inset 0 0 0 5px #1a1512"
            : "0 50px 110px rgba(0,0,0,0.55), inset 0 0 0 6px #1a1512",
          overflow: "hidden",
          fontFamily: "var(--font-ui)",
        }}
      >
        {/* status bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: isThumbnail ? 40 : 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isThumbnail ? "0 20px" : "0 24px",
            zIndex: 5,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--cream)",
            }}
          >
            9:41
          </span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span
              style={{
                width: 16,
                height: 9,
                border: "1px solid var(--text-soft)",
                borderRadius: 2,
              }}
            />
          </div>
        </div>
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: isThumbnail ? 11 : 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: isThumbnail ? 82 : 96,
            height: isThumbnail ? 21 : 24,
            background: "#000",
            borderRadius: 14,
            zIndex: 6,
          }}
        />
        {/* screen content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            paddingTop: isThumbnail ? 48 : 52,
            paddingBottom: isThumbnail ? 58 : 70,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {screen === "balance" && <PPBalance />}
          {screen === "budget" && <PPBudget />}
          {screen === "forecast" && <PPForecast />}
        </div>
        {/* home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: isThumbnail ? 7 : 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: isThumbnail ? 92 : 110,
            height: 4,
            borderRadius: 4,
            background: "rgba(232,223,211,0.35)",
            zIndex: 6,
          }}
        />
      </div>
    </div>
  );
}
