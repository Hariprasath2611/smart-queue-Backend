
import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateHospitalDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    // @IsPhoneNumber() // Optional: validating phone number format, can be restrictive so sticking to string for now or use region code
    contactNumber: string;
}
