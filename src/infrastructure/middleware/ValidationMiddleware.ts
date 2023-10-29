import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { ClassType } from "class-transformer-validator";
import { ValidationError } from "../errors/ValidationError";

export function validationMiddleware<T>(dtoClass: ClassType<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = dtoClass;
    Object.assign(dto, req.body);

    // валидация не работает тк оказалось validate не поддерживает generic types
    // to do реалиовать класс фактори, который возвращает конкретный инстанс
    // и передавать в validate
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      next(new ValidationError(errorMessages));
    } else {
      next();
    }
  };
}
