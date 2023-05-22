import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrgPatientService } from './org-patient.service';
import { CreateOrgPatientInput } from './dto/create-org-patient.input';
import { UpdateOrgPatientInput } from './dto/update-org-patient.input';

@Resolver('OrgPatient')
export class OrgPatientResolver {
  constructor(private readonly orgPatientService: OrgPatientService) {}

  @Mutation('createOrgPatient')
  createOrgPatient(@Args('createOrgPatientInput') createOrgPatientInput: CreateOrgPatientInput) {
    return this.orgPatientService.create(createOrgPatientInput);
  }

  @Query('orgPatient')
  findAllOrgPatient() {
    return this.orgPatientService.findAll();
  }

  @Query('findOrgPatient')
  findOrgPatient(@Args('patientOrgId') patientOrgId: string) {
    return this.orgPatientService.findOrgPatient(patientOrgId);
  }

  @Mutation('updateOrgPatient')
  updateOrgPatient(@Args('updateOrgPatientInput') updateOrgPatientInput: UpdateOrgPatientInput) {
    return this.orgPatientService.updateOrgPatient(updateOrgPatientInput.patientOrgId, updateOrgPatientInput);
  }

  @Mutation('removeOrgPatient')
  removeOrgPatient(@Args('patientOrgId') patientOrgId: string) {
    return this.orgPatientService.removeOrgPatient(patientOrgId);
  }
}
