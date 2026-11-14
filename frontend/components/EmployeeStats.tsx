import type { Employee } from "@/types/employee";

function currency(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }

export function EmployeeStats({ employees, loading }: { employees: Employee[]; loading: boolean }) {
  const departments = new Set(employees.map((employee) => employee.department).filter(Boolean)).size;
  const averageSalary = employees.length ? employees.reduce((sum, employee) => sum + Number(employee.salary || 0), 0) / employees.length : 0;
  return <div className="stats-grid" id="overview">
    <article className="stat-card"><div className="stat-top"><span>Total employees</span><span className="stat-icon violet">♙</span></div><div className="stat-value">{loading ? "—" : employees.length.toString().padStart(2, "0")}</div><div className="stat-foot"><span className="stat-caption">Across your organization</span><span className="stat-trend">↗ Growing team</span></div></article>
    <article className="stat-card"><div className="stat-top"><span>Departments</span><span className="stat-icon peach-icon">▦</span></div><div className="stat-value">{loading ? "—" : departments.toString().padStart(2, "0")}</div><div className="stat-foot"><span className="stat-caption">Teams working together</span><span className="stat-neutral">Active</span></div></article>
    <article className="stat-card"><div className="stat-top"><span>Average salary</span><span className="stat-icon mint-icon">＄</span></div><div className="stat-value salary-stat">{loading ? "—" : currency(averageSalary)}</div><div className="stat-foot"><span className="stat-caption">Annual compensation</span><span className="stat-neutral">Per employee</span></div></article>
  </div>;
}
