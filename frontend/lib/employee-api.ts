import axios from "axios";
import type { Employee, EmployeeFormValues } from "@/types/employee";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/employees`;

export async function getEmployees() {
  const response = await axios.get<{ data: Employee[] }>(API_URL);
  return response.data.data;
}

export async function getEmployee(id: number) {
  const response = await axios.get<{ data: Employee }>(`${API_URL}/${id}`);
  return response.data.data;
}

export async function createEmployee(employee: EmployeeFormValues) {
  const response = await axios.post<{ data: Employee }>(API_URL, normalizePayload(employee));
  return response.data.data;
}

export async function updateEmployee(id: number, employee: EmployeeFormValues) {
  const response = await axios.put<{ data: Employee }>(`${API_URL}/${id}`, normalizePayload(employee));
  return response.data.data;
}

export async function deleteEmployee(id: number) {
  await axios.delete(`${API_URL}/${id}`);
}

function normalizePayload(employee: EmployeeFormValues) {
  return { ...employee, salary: employee.salary === "" ? null : Number(employee.salary) };
}
