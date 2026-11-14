const links = [
  { icon: "◫", label: "Overview", href: "#overview" },
  { icon: "♙", label: "Employees", href: "#employees", active: true },
  { icon: "▦", label: "Departments", href: "#departments" },
  { icon: "⌁", label: "Reports", href: "#reports" },
];

export function Sidebar({ employeeCount }: { employeeCount: number }) {
  return <aside className="sidebar">
    <a className="brand" href="#top" aria-label="Peopleboard home"><span className="brand-mark">p<span>.</span></span><span>peopleboard</span></a>
    <div className="workspace-label">WORKSPACE</div>
    <nav className="side-nav" aria-label="Main navigation">{links.map((link) => <a key={link.label} className={`nav-item${link.active ? " active" : ""}`} href={link.href}><span className="nav-icon">{link.icon}</span>{link.label}{link.active && <span className="nav-count">{employeeCount}</span>}</a>)}</nav>
    <div className="sidebar-bottom"><div className="help-card"><div className="help-spark">✳</div><strong>Need a hand?</strong><p>Visit our help center to find answers and tips.</p><a href="mailto:support@example.com">Visit help center <span>↗</span></a></div><button className="profile-button"><span className="profile-avatar">JD</span><span className="profile-copy"><strong>Jordan Davis</strong><small>Workspace admin</small></span><span className="profile-more">···</span></button></div>
  </aside>;
}
