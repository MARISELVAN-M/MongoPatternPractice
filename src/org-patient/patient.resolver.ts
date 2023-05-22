import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { PatientInput } from './dto/patient.input';


@Resolver('User')
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}
  

  @Query(() => [Patient], { name: 'Patients' })
  async patients() {
    return this.patientService.findAll();
  }

  @Mutation(() => Patient)
  async createPatient(@Args('input') input: PatientInput) {
    return await this.patientService.createPatient(input);
  }

  @Query(() => [Patient], {name : 'polyPattern'})
  async polyPatient(@Args('dateOfBirth') dateOfBirth : string){
    return await this.patientService.findPollyPatient(dateOfBirth);
  }

  @Query(() => Patient, {name : 'bucketPattern'})
  async bucketPattern(){
    return await this.patientService.findPatientByBucket();
  }

}