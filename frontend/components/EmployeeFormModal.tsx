import type { FormEvent } from "react";
import type { Employee, EmployeeFormValues } from "@/types/employee";

const departments = ["Engineering", "Design", "Marketing", "Human Resources", "Finance", "Operations", "Sales"];

type Props = {
  employee: Employee | null;
  values: EmployeeFormValues;
  saving: boolean;
  error: string;
  onChange: (values: EmployeeFormValues) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function EmployeeFormModal({ employee, values, saving, error, onChange, onClose, onSubmit }: Props) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="employee-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><span className="eyebrow"><span className="eyebrow-dot" /> TEAM DIRECTORY</span><h2 id="modal-title">{employee ? "Edit employee" : "Add a teammate"}</h2><p>{employee ? "Update this employee’s information." : "Add someone new to your organization."}</p></div><button className="modal-close" onClick={onClose} aria-label="Close dialog">×</button></div><form onSubmit={onSubmit}><div className="form-grid">
    <label className="form-field full-field">Full name <span>*</span><input autoFocus required value={values.name} onChange={(event) => onChange({ ...values, name: event.target.value })} placeholder="e.g. Alex Morgan" /></label>
    <label className="form-field">Email address <span>*</span><input type="email" required value={values.email} onChange={(event) => onChange({ ...values, email: event.target.value })} placeholder="alex@company.com" /></label>
    <label className="form-field">Phone number<input value={values.phone || ""} onChange={(event) => onChange({ ...values, phone: event.target.value })} placeholder="+1 (555) 000-0000" /></label>
    <label className="form-field">Department<select value={values.department || ""} onChange={(event) => onChange({ ...values, department: event.target.value })}><option value="">Select department</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label className="form-field">Job title<input value={values.position || ""} onChange={(event) => onChange({ ...values, position: event.target.value })} placeholder="e.g. Product designer" /></label>
    <label className="form-field full-field">Annual salary <span className="optional">(optional)</span><div className="salary-input"><span>$</span><input type="number" min="0" step="100" value={values.salary ?? ""} onChange={(event) => onChange({ ...values, salary: event.target.value })} placeholder="0.00" /></div></label>
  </div>{error && <p className="form-error" role="alert">{error}</p>}<div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={saving}>{saving ? "Saving..." : employee ? "Save changes" : "Add employee"}</button></div></form></section></div>;
}
