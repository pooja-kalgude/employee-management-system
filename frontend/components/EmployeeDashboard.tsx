"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "@/lib/employee-api";
import type { Employee, EmployeeFormValues } from "@/types/employee";
import { EmployeeDetailsModal } from "@/components/EmployeeDetailsModal";
import { EmployeeFormModal } from "@/components/EmployeeFormModal";
import { EmployeeStats } from "@/components/EmployeeStats";
import { EmployeeTable } from "@/components/EmployeeTable";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

const emptyForm: EmployeeFormValues = { name: "", email: "", phone: "", department: "", position: "", salary: "" };

function getErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return fallback;
}

export function EmployeeDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState<EmployeeFormValues>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [viewing, setViewing] = useState<Employee | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    try { setEmployees(await getEmployees()); }
    catch { setError("We couldn’t connect to the employee service. Check that the backend is running and try again."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void loadEmployees(); }, [loadEmployees]);

  const filteredEmployees = useMemo(() => employees.filter((employee) => {
    const searchText = `${employee.name} ${employee.email} ${employee.position || ""} ${employee.department || ""}`.toLowerCase();
    return searchText.includes(query.toLowerCase()) && (department === "All departments" || employee.department === department);
  }), [employees, query, department]);

  function openCreate() {
    setError(""); setEditing(null); setForm(emptyForm); setFormOpen(true);
  }

  function openEdit(employee: Employee) {
    setError(""); setEditing(employee);
    setForm({ name: employee.name, email: employee.email, phone: employee.phone || "", department: employee.department || "", position: employee.position || "", salary: employee.salary ?? "" });
    setFormOpen(true);
  }

  async function handleView(employee: Employee) {
    setLoadingDetails(true); setViewing(employee);
    try { setViewing(await getEmployee(employee.id)); }
    catch { setError("Couldn’t load this employee’s details. Please try again."); setViewing(null); }
    finally { setLoadingDetails(false); }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError("");
    try {
      if (editing) await updateEmployee(editing.id, form);
      else await createEmployee(form);
      setFormOpen(false);
      setNotice(editing ? "Employee details updated." : "Employee added to your team.");
      window.setTimeout(() => setNotice(""), 3200);
      await loadEmployees();
    } catch (submitError) { setError(getErrorMessage(submitError, "Unable to save employee. Please try again.")); }
    finally { setSaving(false); }
  }

  async function handleDelete(employee: Employee) {
    if (!window.confirm(`Delete ${employee.name} from your team? This action cannot be undone.`)) return;
    try {
      await deleteEmployee(employee.id);
      setEmployees((current) => current.filter((item) => item.id !== employee.id));
      setNotice(`${employee.name} was removed.`);
      window.setTimeout(() => setNotice(""), 3200);
    } catch { setError("Couldn’t delete this employee. Please try again."); }
  }

  return <main className="app-shell">
    <Sidebar employeeCount={employees.length} />
    <section className="main-area" id="top">
      <TopBar />
      <div className="content" id="employees">
        <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> PEOPLE DIRECTORY</div><h1>Your people, <em>at a glance.</em></h1><p className="subtitle">Manage your team and keep everyone’s details in one place.</p></div><button className="primary-button" onClick={openCreate}><span>＋</span> Add employee</button></div>
        {error && <div className="error-banner" role="alert"><span>!</span>{error}<button onClick={() => void loadEmployees()}>Retry</button></div>}
        {notice && <div className="notice-banner" role="status"><span>✓</span>{notice}</div>}
        <EmployeeStats employees={employees} loading={loading} />
        <EmployeeTable employees={filteredEmployees} loading={loading} query={query} department={department} onQueryChange={setQuery} onDepartmentChange={setDepartment} onAdd={openCreate} onView={handleView} onEdit={openEdit} onDelete={handleDelete} />
        <footer className="page-footer"><span>© 2025 Peopleboard</span><span>Made for teams that care about people <span className="footer-heart">♥</span></span><a href="mailto:support@example.com">Help &amp; support ↗</a></footer>
      </div>
    </section>
    {formOpen && <EmployeeFormModal employee={editing} values={form} saving={saving} error={error} onChange={setForm} onClose={() => setFormOpen(false)} onSubmit={handleSubmit} />}
    {viewing && <EmployeeDetailsModal employee={viewing} loading={loadingDetails} onClose={() => setViewing(null)} onEdit={() => { setViewing(null); openEdit(viewing); }} />}
  </main>;
}
