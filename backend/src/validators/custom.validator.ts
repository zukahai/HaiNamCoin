import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../user/entities/user.entity';

export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'Match',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return value === relatedValue;
                },
            },
        });
    };
}

@ValidatorConstraint({ name: 'Match', async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }
}

const checkIsUniqueEmail = async (email: string) => {
    if (email) {
        const user = await User.findOne({ where: { email } });
        return !user;
    }
    return false;
};

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'IsUniqueEmail',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value: any) {
                    return await checkIsUniqueEmail(value);
                },
            },
        });
    };
}

@ValidatorConstraint({ name: 'IsUniqueEmail', async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
    async validate(value: any) {
        return await checkIsUniqueEmail(value);
    }
}
