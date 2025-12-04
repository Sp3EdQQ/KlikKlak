import { z } from 'zod';

export const LoginDto = z.object({
    email: z.string().email('Nieprawidłowy adres email'),
    password: z.string().min(6, 'Hasło musi mieć minimum 6 znaków'),
});

export const RegisterDto = z.object({
    email: z.string().email('Nieprawidłowy adres email'),
    password: z.string().min(6, 'Hasło musi mieć minimum 6 znaków'),
    firstName: z.string().min(2, 'Imię musi mieć minimum 2 znaki'),
    lastName: z.string().min(2, 'Nazwisko musi mieć minimum 2 znaki'),
});

export const RefreshTokenDto = z.object({
    refreshToken: z.string(),
});

export type LoginDtoType = z.infer<typeof LoginDto>;
export type RegisterDtoType = z.infer<typeof RegisterDto>;
export type RefreshTokenDtoType = z.infer<typeof RefreshTokenDto>;
