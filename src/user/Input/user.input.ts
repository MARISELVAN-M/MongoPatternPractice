import { PatientInput } from "src/org-patient/dto/patient.input";

export class UserInput {
  username: string;
  age: string;
  village: string;
  patientDetail : [PatientInput];
}
  