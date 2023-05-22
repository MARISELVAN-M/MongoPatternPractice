import { CreateOrgPatientInput } from './create-org-patient.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrgPatientInput extends PartialType(CreateOrgPatientInput) {
  patientOrgId:string;
}
