import type { Employee } from "@/types/employee";

const colors = ["lavender", "peach", "mint", "blue", "rose", "gold"];
const departments = ["Engineering", "Design", "Marketing", "Human Resources", "Finance", "Operations", "Sales"];

function initials(name: string) { return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?"; }
function currency(value?: number | string | null) {
  if (value === null || value === undefined || value === "") return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value));
}

type Props = {
  employees: Employee[];
  loading: boolean;
  query: string;
  department: string;
  onQueryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onAdd: () => void;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

export function EmployeeTable({ employees, loading, query, department, onQueryChange, onDepartmentChange, onAdd, onView, onEdit, onDelete }: Props) {
  return <section className="directory-card">
    <div className="directory-heading"><div><h2>All employees <span className="table-count">{employees.length}</span></h2><p>A complete list of everyone on your team.</p></div><button className="export-button" onClick={() => window.print()}><span>↓</span> Export</button></div>
    <div className="table-tools"><label className="search-box"><span>⌕</span><input aria-label="Search employees" placeholder="Search by name, role, or email..." value={query} onChange={(event) => onQueryChange(event.target.value)} /><kbd>⌘ K</kbd></label><label className="filter-select"><span>☷</span><select aria-label="Filter by department" value={department} onChange={(event) => onDepartmentChange(event.target.value)}><option>All departments</option>{departments.map((item) => <option key={item}>{item}</option>)}</select><span className="select-chevron">⌄</span></label></div>
    <div className="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>POSITION</th><th>ANNUAL SALARY</th><th className="actions-head">ACTIONS</th></tr></thead><tbody>
      {loading ? <tr><td colSpan={5}><div className="empty-state"><span className="spinner" />Loading your team...</div></td></tr> : employees.length === 0 ? <tr><td colSpan={5}><div className="empty-state"><span className="empty-icon">♙</span><strong>No employees found</strong><span>{query || department !== "All departments" ? "Try another name or department." : "Add your first employee to get started."}</span>{!query && department === "All departments" && <button className="text-button" onClick={onAdd}>＋ Add your first employee</button>}</div></td></tr> : employees.map((employee, index) => <tr key={employee.id}><td><div className="employee-cell"><span className={`employee-avatar ${colors[index % colors.length]}`}>{initials(employee.name)}</span><span className="employee-copy"><strong>{employee.name}</strong><small>{employee.email}</small></span></div></td><td><span className="department-tag">{employee.department || "Unassigned"}</span></td><td className="position-cell">{employee.position || "—"}</td><td className="salary-cell">{currency(employee.salary)}</td><td><div className="row-actions"><button aria-label={`View ${employee.name}`} title="View employee" onClick={() => onView(employee)}>◉</button><button aria-label={`Edit ${employee.name}`} title="Edit employee" onClick={() => onEdit(employee)}>✎</button><button aria-label={`Delete ${employee.name}`} title="Delete employee" onClick={() => onDelete(employee)}>⌫</button></div></td></tr>)}
    </tbody></table></div>
    <footer className="table-footer"><span>Showing <strong>{employees.length ? 1 : 0}–{employees.length}</strong> employees</span><div className="pagination"><button disabled aria-label="Previous page">‹</button><button className="page-current">1</button><button disabled aria-label="Next page">›</button></div></footer>
  </section>;
}
