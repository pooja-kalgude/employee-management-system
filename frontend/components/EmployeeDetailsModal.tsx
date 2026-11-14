import type { Employee } from "@/types/employee";

function currency(value?: number | string | null) {
  if (value === null || value === undefined || value === "") return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value));
}

type Props = { employee: Employee; loading: boolean; onClose: () => void; onEdit: () => void };

export function EmployeeDetailsModal({ employee, loading, onClose, onEdit }: Props) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="employee-modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title"><div className="modal-heading"><div><span className="eyebrow"><span className="eyebrow-dot" /> EMPLOYEE PROFILE</span><h2 id="detail-title">{loading ? "Loading profile…" : employee.name}</h2><p>{loading ? "Fetching the latest employee details." : employee.position || "Team member"}</p></div><button className="modal-close" onClick={onClose} aria-label="Close dialog">×</button></div>{loading ? <div className="empty-state"><span className="spinner" /></div> : <div className="detail-grid"><div><span>Email</span><strong>{employee.email}</strong></div><div><span>Phone</span><strong>{employee.phone || "Not provided"}</strong></div><div><span>Department</span><strong>{employee.department || "Unassigned"}</strong></div><div><span>Position</span><strong>{employee.position || "Not provided"}</strong></div><div><span>Annual salary</span><strong>{currency(employee.salary)}</strong></div></div>}<div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Close</button>{!loading && <button className="primary-button" onClick={onEdit}>Edit employee</button>}</div></section></div>;
}
