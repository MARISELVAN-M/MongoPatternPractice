import { ObjectType} from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Patient {
  @ObjectIdColumn()
  Id:number;

  @Column()
  patientId :string;

  @Column('varchar', { name: 'name', length: 100, unique: true, primary: true })
  firstName:string;

  @Column()
  lastName:string;

  @Column()
  dateOfBirth:string;

  @Column()
  addresses:string[];

  @Column()
  phones:number[];

  @Column()
  user_id:string;

  @CreateDateColumn()
  activatedAt: Date;

  @UpdateDateColumn()
  deactivatedAt:Date;
  
}