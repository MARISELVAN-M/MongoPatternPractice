import { Field, ObjectType} from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
@ObjectType()
export class PatientOrg {
  @ObjectIdColumn()
  Id:Number;

  @Column()
  patientOrgId:string;

  @Column()
  patientId: string;

  @Column()
  active: Boolean;

  @CreateDateColumn()
  activatedAt: Date;

  @UpdateDateColumn()
  deactivatedAt:Date;
  
  @Field(() => [Patient]) 
  @Column({ type: 'varchar', length: 100, array: true })
  patientDtail: Patient[]; 
}
