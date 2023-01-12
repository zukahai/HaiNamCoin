import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Request} from "express";
import {JwtPayload} from "./at.strategy";

export interface JwtPayloadRefresh extends JwtPayload {
    refreshToken: string;
}

export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rt-secret',
            passReqToCallback: true,
        });
    }
    //  and

    validate(req: Request, payload: JwtPayload): JwtPayloadRefresh {
        const refreshToken = req.headers.authorization.replace('Bearer ', '').trim();
        console.log('payload: ' + payload, 'refreshToken: ' + refreshToken);
        if (!payload) throw new Error('Invalid token');
        return {...payload, refreshToken};
    }
}
