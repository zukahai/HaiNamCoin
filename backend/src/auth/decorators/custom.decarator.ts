import { User } from '../../user/entities/user.entity';
import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { JwtPayload } from '../auth.service';

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
    console.log('request.user', request.user);
    const user = request.user as JwtPayload;
    return user.sub;
});
export const Public = () => SetMetadata('isPublic', true);
