// Notes sticky-board mockup — folder sidebar + colourful sticky notes

function Glyph({
  name,
  size = 15,
  color = "currentColor",
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<string, React.ReactNode> = {
    all: <rect x="4" y="4" width="16" height="16" rx="2" />,
    pin: <path d="M12 17v5M9 3h6l-1 7 3 3H7l3-3z" />,
    task: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
    clip: (
      <path d="M18.36 7.05l-7.78 7.78a2 2 0 0 1-2.83-2.83l8.49-8.48a4 4 0 0 1 5.66 5.65l-8.49 8.49a6 6 0 0 1-8.48-8.49l7.77-7.78" />
    ),
    overdue: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    archive: (
      <>
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export default function NotesBoard() {
  const folders: [string, string, string][] = [
    ["all", "All notes", "24"],
    ["pin", "Pinned", "3"],
    ["task", "Tasks", "7"],
    ["clip", "Web clips", "5"],
    ["overdue", "Overdue", "2"],
    ["archive", "Archive", "9"],
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "var(--ink-screen)",
          border: "1px solid rgba(232,223,211,0.12)",
          borderRadius: 10,
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
        }}
      >
        {/* sidebar */}
        <aside
          style={{
            width: 178,
            flexShrink: 0,
            borderRight: "1px solid rgba(232,223,211,0.08)",
            background: "var(--surface-overlay)",
            display: "flex",
            flexDirection: "column",
            padding: "18px 14px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--cream)",
              padding: "0 4px 16px",
            }}
          >
            Notes
          </div>

          {/* search field */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 30,
              padding: "0 10px",
              borderRadius: 8,
              background: "rgba(232,223,211,0.06)",
              color: "var(--text-soft)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              marginBottom: 16,
            }}
          >
            <Glyph name="search" size={13} color="var(--text-soft)" />
            <span>Search…</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {folders.map(([icon, label, count], i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: i === 2 ? "var(--accent)" : "transparent",
                  color: i === 2 ? "#fff" : "var(--text-soft)",
                }}
              >
                <Glyph name={icon} color="currentColor" />
                <span
                  style={{
                    flex: 1,
                    fontFamily: "var(--font-ui)",
                    fontSize: 12,
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    opacity: i === 2 ? 0.85 : 0.6,
                  }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* board */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            background: "var(--ink-screen)",
            backgroundImage:
              "radial-gradient(rgba(232,223,211,0.07) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            padding: 22,
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 22,
                color: "var(--cream)",
              }}
            >
              Tasks
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-soft)",
              }}
            >
              Recently edited
            </span>
          </div>

          {/* sticky notes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              alignItems: "start",
            }}
          >
            {/* note — checklist / task */}
            <StickyNote bg="#E9C46A" rotate={-2}>
              <NoteTitle>Launch checklist</NoteTitle>
              <Check done label="Wire up reducer" />
              <Check done label="IndexedDB persist" />
              <Check label="Smart folders" />
              <Check label="Ship to Vercel" />
              <TaskBadge>2 / 4 done</TaskBadge>
            </StickyNote>

            {/* note — tags */}
            <StickyNote bg="#E8DFD3" rotate={1.5}>
              <NoteTitle>Reading list</NoteTitle>
              <NoteBody>
                Local-first software, IndexedDB patterns, and TipTap internals to
                revisit.
              </NoteBody>
              <TagRow tags={["research", "read"]} />
            </StickyNote>

            {/* note — web clip */}
            <StickyNote bg="#8FB48B" rotate={-1}>
              <ClipChip />
              <NoteTitle dark>Local-first web apps</NoteTitle>
              <NoteBody dark>inkandswitch.com</NoteBody>
            </StickyNote>

            {/* note — overdue */}
            <StickyNote bg="#D98C7A" rotate={2}>
              <NoteTitle dark>Portfolio copy</NoteTitle>
              <NoteBody dark>Rewrite the Notes case study.</NoteBody>
              <DueChip>Due yesterday</DueChip>
            </StickyNote>

            {/* note — pinned */}
            <StickyNote bg="#E9C46A" rotate={-1.5} pinned>
              <NoteTitle>Groceries</NoteTitle>
              <NoteBody>Oat milk, coffee, lemons, sticky pads.</NoteBody>
              <TagRow tags={["home"]} />
            </StickyNote>

            {/* note — plain */}
            <StickyNote bg="#E8DFD3" rotate={1}>
              <NoteTitle>Ideas</NoteTitle>
              <NoteBody>
                Drag-to-reorder. Keyboard quick-add. Export to Markdown.
              </NoteBody>
            </StickyNote>
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyNote({
  children,
  bg,
  rotate,
  pinned,
}: {
  children: React.ReactNode;
  bg: string;
  rotate: number;
  pinned?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: bg,
        color: "#1a1410",
        borderRadius: 4,
        padding: 14,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        fontFamily: "var(--font-body)",
      }}
    >
      {pinned && (
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 10px rgba(200,65,43,0.5)",
          }}
        />
      )}
      {children}
    </div>
  );
}

function NoteTitle({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <strong
      style={{
        display: "block",
        marginBottom: 8,
        fontSize: 14,
        lineHeight: 1.2,
        color: dark ? "#11100c" : "#1a1410",
      }}
    >
      {children}
    </strong>
  );
}

function NoteBody({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: 12,
        lineHeight: 1.45,
        color: dark ? "rgba(17,16,12,0.78)" : "rgba(26,20,16,0.72)",
      }}
    >
      {children}
    </p>
  );
}

function Check({ label, done }: { label: string; done?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        lineHeight: 1.5,
        color: done ? "rgba(26,20,16,0.5)" : "#1a1410",
      }}
    >
      <span
        style={{
          width: 13,
          height: 13,
          borderRadius: 3,
          border: "1.5px solid rgba(26,20,16,0.55)",
          background: done ? "rgba(26,20,16,0.55)" : "transparent",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {done && (
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E9C46A"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L20 6" />
          </svg>
        )}
      </span>
      <span style={{ textDecoration: done ? "line-through" : "none" }}>
        {label}
      </span>
    </div>
  );
}

function TaskBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        marginTop: 10,
        padding: "3px 9px",
        borderRadius: 999,
        background: "rgba(26,20,16,0.16)",
        fontFamily: "var(--font-ui)",
        fontSize: 10,
        letterSpacing: "0.04em",
        color: "#1a1410",
      }}
    >
      {children}
    </span>
  );
}

function DueChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginTop: 10,
        padding: "3px 9px",
        borderRadius: 999,
        background: "rgba(120,20,10,0.2)",
        fontFamily: "var(--font-ui)",
        fontSize: 10,
        letterSpacing: "0.04em",
        color: "#5a140c",
      }}
    >
      <Glyph name="overdue" size={11} color="#5a140c" />
      {children}
    </span>
  );
}

function ClipChip() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
        padding: "3px 8px",
        borderRadius: 6,
        background: "rgba(17,16,12,0.16)",
        fontFamily: "var(--font-ui)",
        fontSize: 9,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#11100c",
      }}
    >
      <Glyph name="clip" size={11} color="#11100c" />
      Web clip
    </span>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
      {tags.map((t) => (
        <span
          key={t}
          style={{
            padding: "2px 8px",
            borderRadius: 999,
            border: "1px solid rgba(26,20,16,0.3)",
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            color: "#1a1410",
          }}
        >
          #{t}
        </span>
      ))}
    </div>
  );
}
