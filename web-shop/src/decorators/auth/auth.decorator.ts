import { User } from '../../user/entities/user.entity';
import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/at.strategy';

export const GetCurrentUser = createParamDecorator((data: string | undefined, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    console.log('request.user', request.user);
    if (!data) {
        return request.user;
    }
    return request.user && request.user[data];
});
export const GetCurrentUserId = createParamDecorator((_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    const user = (request.user) ? request.user.payload as JwtPayload : null;
    return (user != null) ? user.sub : null;
});
export const Public = () => SetMetadata('isPublic', true);
