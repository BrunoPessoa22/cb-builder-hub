export default function PartnerBadges({ className = "" }: { className?: string }) {
  return (
    <div className={"flex items-center gap-8 flex-wrap " + className}>
      <span className="tag">Powered by</span>
      <a
        href="https://aws.amazon.com/partners/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 hover:opacity-80 transition"
        title="AWS Partner Network"
        style={{ color: "#FAFAFA" }}
      >
        <img src="/aws.svg" alt="AWS" className="h-7 w-auto" />
        <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-mute)]">Partner</span>
      </a>
      <a
        href="https://www.nvidia.com/en-us/startups/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center hover:opacity-90 transition"
        title="NVIDIA Inception Program"
      >
        <img src="/nvidia-inception.svg" alt="NVIDIA Inception Program Member" className="h-12 w-auto" />
      </a>
    </div>
  );
}
