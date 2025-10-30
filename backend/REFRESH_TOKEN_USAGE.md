# Refresh Token - Dokumentacja użycia

## Co zostało dodane:

### 1. Schemat bazy danych
- Dodane pole `refreshToken` do tabeli `users` (varchar 512)
- Migracja: `drizzle/0004_complex_scorpion.sql`

### 2. Endpointy API

#### POST `/users/login`
Logowanie użytkownika - zwraca access token i refresh token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2025-10-30T10:00:00Z",
    "updatedAt": "2025-10-30T10:00:00Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // ważny 15 minut
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // ważny 7 dni
}
```

#### POST `/users/refresh`
Odświeżenie access tokena przy użyciu refresh tokena.

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // nowy token ważny 15 minut
}
```

**Błędy:**
- `401 Unauthorized` - nieprawidłowy lub wygasły refresh token

#### POST `/users/logout/:id`
Wylogowanie użytkownika - usuwa refresh token z bazy danych.

**Request:**
```
POST /users/logout/user-uuid-here
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

## Jak używać na frontendzie:

### 1. Logowanie
```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  // Zapisz tokeny (NIE w localStorage!)
  // Opcja 1: W pamięci (React state, Zustand, Pinia)
  setAccessToken(data.access_token);
  
  // Opcja 2: Refresh token w localStorage (mniej bezpieczne, ale wygodne)
  localStorage.setItem('refresh_token', data.refresh_token);
  
  return data;
};
```

### 2. Request z access tokenem
```typescript
const getProducts = async () => {
  const response = await fetch('http://localhost:3000/products', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  if (response.status === 401) {
    // Token wygasł - odśwież
    await refreshAccessToken();
    // Powtórz request
    return getProducts();
  }
  
  return response.json();
};
```

### 3. Odświeżanie tokena
```typescript
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (!refreshToken) {
    // Brak refresh tokena - przekieruj do logowania
    window.location.href = '/login';
    return;
  }
  
  try {
    const response = await fetch('http://localhost:3000/users/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    
    if (!response.ok) {
      // Refresh token wygasł - przekieruj do logowania
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
      return;
    }
    
    const data = await response.json();
    setAccessToken(data.access_token);
    
  } catch (error) {
    console.error('Refresh token error:', error);
    window.location.href = '/login';
  }
};
```

### 4. Wylogowanie
```typescript
const logout = async (userId: string) => {
  const accessToken = getAccessToken();
  
  await fetch(`http://localhost:3000/users/logout/${userId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  // Wyczyść tokeny
  setAccessToken(null);
  localStorage.removeItem('refresh_token');
  
  window.location.href = '/login';
};
```

### 5. Automatyczne odświeżanie (React przykład)
```typescript
import { useEffect } from 'react';

const useTokenRefresh = () => {
  useEffect(() => {
    // Odśwież token 1 minutę przed wygaśnięciem (access token: 15 min)
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000); // 14 minut
    
    return () => clearInterval(interval);
  }, []);
};
```

## Bezpieczeństwo:

### ✅ Co zostało zaimplementowane:
- Access token krótkotrwały (15 min) - ogranicza ryzyko przy kradzieży
- Refresh token długotrwały (7 dni) - wygoda dla użytkownika
- Refresh token hashowany w bazie (bcrypt) - nie można ukraść z bazy
- Weryfikacja typu tokena - refresh token nie może być użyty jako access token

### ⚠️ Rekomendacje:
1. **Zmień JWT_SECRET** w pliku `.env`:
   ```
   JWT_SECRET=your-very-long-random-secret-key-at-least-32-characters
   ```

2. **Używaj HTTPS** w produkcji - tokeny przesyłane przez HTTP mogą być przechwycone

3. **Rozważ HTTPOnly Cookies** dla refresh tokena (bezpieczniejsze niż localStorage):
   - Dodaj parametr `res: Response` do metody `login()`
   - Użyj `res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' })`

4. **Dodaj rate limiting** do endpointów `/login` i `/refresh` (zabezpieczenie przed brute force)

## Testowanie:

### 1. Zainstaluj narzędzie HTTP (np. curl lub Postman)

### 2. Test logowania:
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 3. Test odświeżania tokena:
```bash
curl -X POST http://localhost:3000/users/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"YOUR_REFRESH_TOKEN_HERE"}'
```

### 4. Test wylogowania:
```bash
curl -X POST http://localhost:3000/users/logout/USER_ID_HERE \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

## Migracja bazy danych:

Migracja została wygenerowana w: `drizzle/0004_complex_scorpion.sql`

Aby zastosować migrację, uruchom:
```bash
pnpm drizzle-kit push
```

Lub ręcznie wykonaj SQL:
```sql
ALTER TABLE "users" ADD COLUMN "refresh_token" varchar(512);
```
