import { EmploymentDate } from './EmploymentDate.interface';

interface Employee {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  title: string;
  status: string;
  imageType: string;
  imageBytes: string;
  isManager: boolean;
  employmentDates: EmploymentDate[];
  email: string;
}

export default Employee;
