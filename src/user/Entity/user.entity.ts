import { ObjectType, Field } from '@nestjs/graphql';
import { Patient } from 'src/org-patient/entities/patient.entity';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  age: string;

  @Field()
  @Column()
  village: string;

  @Field(() => [Patient]) 
  @Column({ type: 'varchar', length: 100, array: true })
  patientDtail: Patient[]; 
}

