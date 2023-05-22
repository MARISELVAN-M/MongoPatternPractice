import { PatientInput } from "./patient.input";

export class CreateOrgPatientInput {
    patientOrgId:string;
    patientId: string;
    active: Boolean;
    patientDetail : [PatientInput];
}
