import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {AuthService} from "../auth.service";
import {ForbiddenException, Inject} from "@nestjs/common";

export interface JwtPayload {
    email: string;
    sub: number;
}

export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'at-secret',
            passReqToCallback: true,

        });
    }

    async validate(req: Request, payload: JwtPayload) {
        if (!payload) throw new Error('Invalid token');
        if (await this.authService.validateUser(payload)) {
            return payload;
        }
        throw new ForbiddenException({message: 'Invalid token'});
    }
}

