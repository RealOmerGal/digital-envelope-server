import { IsNumber, IsString } from "class-validator";

export class CreateBlessingDto {

    @IsString()
    createdBy: string

    @IsString()
    text: string

    @IsNumber()
    paymentId: number

    @IsNumber()
    eventId: number
}
