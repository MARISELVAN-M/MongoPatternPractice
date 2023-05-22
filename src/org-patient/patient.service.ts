import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { MongoRepository } from 'typeorm';
import { PatientInput } from './dto/patient.input';
import * as uuid from 'uuid';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: MongoRepository<Patient>,
    ) {}

    async findAll(): Promise<Patient[]> {
        return this.patientRepository.find();
    }

    async createPatient(input: PatientInput) {
        const patient = new Patient();
        patient.patientId = uuid.v4();
        patient.firstName = input.firstName;
        patient.lastName = input.lastName;
        patient.dateOfBirth = input.dateOfBirth;
        patient.addresses = input.addresses;
        patient.phones = input.phones;
        patient.user_id = input.user_id;

        const patie = await this.patientRepository.save(patient);
        console.log('gh ', patie);
        return patie;
    }

    async findPollyPatient(dateOfBirth: string) {
        const pipeline = [
            {
                $match: { dateOfBirth: dateOfBirth }
            },
            {
                $project: {
                    _id: 0,
                    patientId: "$patientId",
                    firstName: "$firstName",
                    lastName: "$lastName",
                    dateOfBirth:"$dateOfBirth",
                    addresses: "$addresses",
                    phones: "$phones",
                    user_id:"$user_id"
                }
            }
        ];

        const result = await this.patientRepository.aggregate(pipeline).toArray();
        console.log(result);
        return result;
    };

    async findPatientByBucket() {
        try {
            const patientName =[
                {
                    $bucket: {
                        groupBy: "$firstName",
                        boundaries: ["A", "R"],
                        default: "patient",
                        output: {
                            count: { $sum: 1 },
                            patient: {
                                $push: {
                                  _id: 0,
                                  patientId: "$patientId",
                                  firstName: "$firstName",
                                  lastName: "$lastName",
                                  dateOfBirth:"$dateOfBirth",
                                  addresses: "$addresses",
                                  phones: "$phones",
                                  user_id:"$user_id"
                                },
                            },
                        },
                    },
                }];

            const cursor = await this.patientRepository.aggregate(patientName).toArray();
        
            console.log(cursor);
            return cursor[0];
        } catch (error) {
            console.error(error);
            throw new Error("Failed to aggregate patients by bucket.");
        }
    }
}
