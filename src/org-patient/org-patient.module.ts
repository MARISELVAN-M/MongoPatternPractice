import { Module } from '@nestjs/common';
import { OrgPatientService } from './org-patient.service';
import { OrgPatientResolver } from './org-patient.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientOrg } from './entities/org-patient.entity';
import { Patient } from './entities/patient.entity';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientOrg,Patient])],
  providers: [OrgPatientResolver, OrgPatientService, PatientResolver, PatientService]
})
export class OrgPatientModule {}
