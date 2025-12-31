# Optymalizacja KlikKlak - Lista zmian

## 🚀 Główne optymalizacje

### 1. Docker i Infrastruktura
- ✅ **Backend Dockerfile**: Dodano cache dla pnpm, multi-stage build, non-root user, dumb-init
- ✅ **Frontend Dockerfile**: Zmiana z dev mode na production build z nginx
- ✅ **nginx.conf**: Kompresja gzip, cache dla statycznych plików, security headers
- ✅ **docker-compose.yml**: 
  - PostgreSQL tuning (shared_buffers, effective_cache_size, work_mem)
  - Healthchecks dla wszystkich serwisów
  - Resource limits (CPU i memory)
  - BuildKit cache

### 2. Backend Optymalizacje
- ✅ **Kompresja HTTP**: Dodano middleware compression (gzip/deflate)
- ✅ **Cache headers**: CacheInterceptor dla GET requestów (5 minut)
- ✅ **Health endpoint**: `/health` dla healthchecków
- ✅ **Logging**: Mniejsza ilość logów w production
- ✅ **Database indexes**: Skrypt `db-indexes.sql` z optymalizacją indeksów

### 3. Frontend Optymalizacje
- ✅ **Vite build config**: 
  - Manual chunks (vendor splitting)
  - Terser minification
  - Drop console.log w production
  - OptimizeDeps
- ✅ **Production build**: Nginx zamiast Vite dev server
- ✅ **Gzip compression**: Wszystkie assety
- ✅ **Cache headers**: 1 rok dla statycznych plików

### 4. Database Optymalizacje
- ✅ **PostgreSQL tuning**: Parametry w docker-compose
- ✅ **Indeksy**: component_type, category_id, slug, price
- ✅ **Composite indexes**: często używane kombinacje filtrów

## 📋 Następne kroki

### Uruchomienie zoptymalizowanej wersji:

```bash
# 1. Zainstaluj brakujące zależności (backend)
cd backend
pnpm install

# 2. Wykonaj indeksy w bazie danych (jednorazowo)
docker-compose exec postgres psql -U postgres -d klikklakdb < backend/db-indexes.sql

# 3. Przebuduj kontenery z nową konfiguracją
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 4. Sprawdź logi
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Monitoring wydajności:

```bash
# Sprawdź użycie zasobów
docker stats

# Sprawdź czas odpowiedzi
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/products?page=1&limit=20
```

## 🎯 Oczekiwane rezultaty

- **Frontend**: 70-90% szybsze ładowanie (nginx + gzip + cache)
- **Backend**: 30-50% szybsze odpowiedzi (compression + indexes + cache)
- **Database**: 50-80% szybsze zapytania (indexes + tuning)
- **Bundle size**: ~40% mniejszy (vendor splitting + minification)

## ⚠️ Uwagi

1. Port frontendu zmieniony z 5173 na 80
2. Dodano compression package do backend/package.json
3. Skrypt db-indexes.sql trzeba wykonać raz po rebuildzie
4. W production należy użyć env variables zamiast hardcoded secrets
