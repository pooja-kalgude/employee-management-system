export type Employee = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  department?: string | null;
  position?: string | null;
  salary?: number | string | null;
};

export type EmployeeFormValues = Omit<Employee, "id">;
