export function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-float" />
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-primary-glow/15 blur-[140px] animate-float" />
    </div>
  );
}
