import { IsInt, IsPositive, IsNotEmpty } from "class-validator";

export class ScoreParamDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  score: number;
}
