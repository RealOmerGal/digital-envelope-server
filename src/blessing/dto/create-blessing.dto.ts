import { IsNumber, IsString } from "class-validator";

export class CreateBlessingDto {

    @IsString()
    createdBy: string

    @IsString()
    text: string

    @IsString()
    paymentId: number
}
