import { Injectable } from '@nestjs/common';
import { CreateOrgPatientInput } from './dto/create-org-patient.input';
import { UpdateOrgPatientInput } from './dto/update-org-patient.input';
import { PatientOrg } from './entities/org-patient.entity';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class OrgPatientService {

  constructor(
    @InjectRepository(PatientOrg)
    private readonly patientOrgRepository: MongoRepository<PatientOrg>,
  ) {}


  create(createOrgPatientInput: CreateOrgPatientInput) {
   const patientOrg = new PatientOrg();
   patientOrg.patientOrgId = uuid.v4();
   patientOrg.active = createOrgPatientInput.active;
   patientOrg.patientId = createOrgPatientInput.patientId;

   const patientOrgDetails = this.patientOrgRepository.save(patientOrg);
   return(patientOrgDetails)
  }

  findAll() {
    return this.patientOrgRepository.find();
  }

  findOrgPatient(patientOrgId: string) {
  return this.patientOrgRepository.findOne({ where: {  patientOrgId } });

  }

  async updateOrgPatient(patientOrgId: string, updateOrgPatientInput: UpdateOrgPatientInput) {
    const existingOrgPatient = await this.patientOrgRepository.findOne({ where: { patientOrgId } });
  
    if (!existingOrgPatient) {
      throw new Error(`OrgPatient with ID ${patientOrgId} not found.`);
    }
    const updateResult = await this.patientOrgRepository.update(
      { patientOrgId: patientOrgId },
      updateOrgPatientInput, 
    );
    console.log(updateResult);

    const updatedOrgPatient = await this.patientOrgRepository.findOne({ where: { patientOrgId } });
    return updatedOrgPatient;
  }
  


  removeOrgPatient(patientOrgId: string) {
    return this.patientOrgRepository.delete({patientOrgId:patientOrgId})
  }
}
