export function InnerPageShell({ children }: { children: React.ReactNode }) {
  return <div className="inner-page"><main>{children}</main></div>;
}
