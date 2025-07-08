import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = '7d';

export function signToken(userId: number) : string{
    return jwt.sign({id:userId}, JWT_SECRET, {expiresIn: EXPIRES_IN});
}

export function verifyToken(token : string): {id: number}{
    return jwt.verify(token, JWT_SECRET) as {id: number};
}

