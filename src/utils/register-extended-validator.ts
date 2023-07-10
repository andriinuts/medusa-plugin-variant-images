import { ValidatorOptions } from 'class-validator';
import { ClassConstructor } from '@medusajs/medusa';

const extendedValidators: any = [];
let isInitialized = false;

export async function registerExtendedValidator<
  T extends ClassConstructor<any>
>(classValidator: T): Promise<void> {
  extendedValidators.push(classValidator);

  if (isInitialized) {
    return;
  }

  isInitialized = true;

  const module = await import('@medusajs/medusa/dist/utils/validator');
  const originalValidator = module.validator;
  module.validator = <T extends ClassConstructor<any> = any, V = any>(
    typedClass: T,
    plain: V,
    config?: ValidatorOptions
  ): Promise<any> => {
    for (const extendedValidator of extendedValidators) {
      if (extendedValidator.name === typedClass.name) {
        typedClass = extendedValidator;
        break;
      }
    }
    return originalValidator(typedClass, plain, config);
  };
}
