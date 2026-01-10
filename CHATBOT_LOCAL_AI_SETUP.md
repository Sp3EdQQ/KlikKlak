# Konfiguracja Lokalnego AI dla Chatbota

## 🎯 Cel

Możliwość płynnego przełączania między lokalnym modelem AI a OpenAI (GPT-4o) dla:
- **Lokalnie**: Testy i rozwój bez kosztów
- **Produkcja**: OpenAI GPT-4o dla lepszej jakości

## 🔧 Konfiguracja

### Zmienne środowiskowe (`.env`)

```env
# Przełączanie między lokalnym AI a OpenAI
USE_LOCAL_AI=true                    # true = lokalny AI, false = OpenAI

# Konfiguracja lokalnego AI
LOCAL_AI_URL=http://localhost:11434/v1
LOCAL_AI_MODEL=llama3.2

# Konfiguracja OpenAI (dla produkcji)
OPENAI_API_KEY=sk-proj-your-key-here
OPENAI_MODEL=gpt-4o
```

## 📦 Rekomendowane lokalne AI

### 1. **Ollama** (Najprostsze, Zalecane) ⭐

```bash
# Instalacja (Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Lub ręczne pobranie
# https://ollama.ai/download

# Uruchom model
ollama pull llama3.2
ollama serve

# Model dostępny na: http://localhost:11434
```

**Konfiguracja w `.env`:**
```env
USE_LOCAL_AI=true
LOCAL_AI_URL=http://localhost:11434/v1
LOCAL_AI_MODEL=llama3.2
```

**Rekomendowane modele:**
- `llama3.2` (8GB RAM) - Dobry początek
- `llama3.1` (16GB RAM) - Lepsza jakość
- `mistral` (8GB RAM) - Alternatywa

### 2. **LM Studio** (GUI, łatwe w użyciu)

1. Pobierz: https://lmstudio.ai/
2. Zainstaluj model (np. Llama 3, Mistral)
3. Uruchom serwer lokalny (zakładka "Local Server")
4. Domyślny port: `1234`

**Konfiguracja w `.env`:**
```env
USE_LOCAL_AI=true
LOCAL_AI_URL=http://localhost:1234/v1
LOCAL_AI_MODEL=llama-3.2-8b
```

### 3. **LocalAI** (Samodzielny serwer)

```bash
# Docker
docker run -p 8080:8080 localai/localai:latest

# Lub z docker-compose
```

**Konfiguracja w `.env`:**
```env
USE_LOCAL_AI=true
LOCAL_AI_URL=http://localhost:8080/v1
LOCAL_AI_MODEL=your-model-name
```

## 🚀 Szybki Start

### Opcja 1: Lokalne testy (Ollama)

```bash
# 1. Zainstaluj Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 2. Pobierz model
ollama pull llama3.2

# 3. Uruchom serwer Ollama (w osobnym terminalu)
ollama serve

# 4. Skonfiguruj backend
cd backend
cat > .env << EOF
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/klikklak
JWT_SECRET=dev-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=dev-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# LOKALNY AI
USE_LOCAL_AI=true
LOCAL_AI_URL=http://localhost:11434/v1
LOCAL_AI_MODEL=llama3.2

PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
EOF

# 5. Uruchom backend
pnpm install
pnpm run start:dev
```

### Opcja 2: Produkcja (OpenAI)

```bash
# Skonfiguruj backend z OpenAI
cd backend
cat > .env << EOF
DATABASE_URL=postgresql://postgres:postgres@production-db:5432/klikklak
JWT_SECRET=strong-production-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=strong-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# OPENAI
USE_LOCAL_AI=false
OPENAI_API_KEY=sk-proj-YOUR-REAL-KEY-HERE
OPENAI_MODEL=gpt-4o

PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
EOF

# Uruchom backend
pnpm install
pnpm run build
pnpm run start:prod
```

## 🔄 Przełączanie między środowiskami

### Z lokalnego AI na OpenAI:

```bash
# W pliku .env zmień:
USE_LOCAL_AI=false
OPENAI_API_KEY=sk-proj-your-key-here
OPENAI_MODEL=gpt-4o
```

### Z OpenAI na lokalny AI:

```bash
# W pliku .env zmień:
USE_LOCAL_AI=true
LOCAL_AI_URL=http://localhost:11434/v1
LOCAL_AI_MODEL=llama3.2
```

**Restart backendu:** Wystarczy zrestartować aplikację - zmiana zostanie automatycznie załadowana.

## 🧪 Testowanie

### Test lokalnego API:

```bash
# Sprawdź czy Ollama działa
curl http://localhost:11434/api/version

# Test prostego zapytania
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### Test chatbota w aplikacji:

```bash
# Wyślij zapytanie do chatbota
curl http://localhost:3000/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Pokaż mi procesory Intel do 1500 zł",
    "conversationHistory": []
  }'
```

## ⚙️ Kompatybilność z Function Calling

**WAŻNE:** Nie wszystkie lokalne modele wspierają Function Calling (Tools API).

### Modele z pełnym wsparciem Function Calling:
- ✅ **Llama 3.1 i 3.2** (8B+) - Bardzo dobre wsparcie
- ✅ **Mistral 7B v0.3+** - Dobre wsparcie
- ✅ **Hermes 2 Pro** - Specjalnie trenowany do function calling

### Modele z ograniczonym wsparciem:
- ⚠️ **Llama 3.0** - Częściowe wsparcie
- ⚠️ **Starsze modele** - Mogą nie działać poprawnie

### Rozwiązania problemów:

Jeśli lokalne AI nie obsługuje function calling:
1. **Zmień na model z pełnym wsparciem** (Llama 3.2)
2. **Użyj OpenAI do testów funkcji** (ustaw `USE_LOCAL_AI=false`)
3. **Dostosuj prompty** - niektóre modele wymagają innych formatów

## 💰 Porównanie kosztów

### Lokalny AI:
- ✅ **Koszt:** 0 zł
- ✅ **Prywatność:** Dane nie opuszczają serwera
- ⚠️ **Wydajność:** Zależy od sprzętu
- ⚠️ **Jakość:** Niższa niż GPT-4o

### OpenAI GPT-4o:
- ⚠️ **Koszt:** ~$5 za 1M tokenów wejściowych
- ⚠️ **Prywatność:** Dane wysyłane do OpenAI
- ✅ **Wydajność:** Bardzo szybkie
- ✅ **Jakość:** Najwyższa dostępna

### Rekomendacja:
- **Rozwój i testy:** Lokalny AI (Ollama + Llama 3.2)
- **Produkcja:** OpenAI GPT-4o

## 🔍 Monitorowanie

Backend automatycznie loguje informacje o używanym AI:

```
[ChatbotService] Using LOCAL AI: http://localhost:11434/v1 with model: llama3.2
```

lub

```
[ChatbotService] Using OpenAI with model: gpt-4o
```

## 🐛 Rozwiązywanie problemów

### Problem: "Connection refused" do lokalnego AI

```bash
# Sprawdź czy serwer działa
curl http://localhost:11434/api/version

# Jeśli nie działa, uruchom ponownie
ollama serve
```

### Problem: Model nie wspiera function calling

Zmień model na nowszy:
```bash
ollama pull llama3.2
# Zaktualizuj LOCAL_AI_MODEL=llama3.2
```

### Problem: Backend nie łączy się z AI

Sprawdź logi backendu:
```bash
pnpm run start:dev
# Szukaj "Using LOCAL AI" lub "Using OpenAI"
```

### Problem: Słaba jakość odpowiedzi z lokalnego modelu

1. Użyj większego/lepszego modelu:
   ```bash
   ollama pull llama3.1:70b  # Wymaga więcej RAM
   ```
2. Lub przełącz się tymczasowo na OpenAI:
   ```env
   USE_LOCAL_AI=false
   ```

## 📚 Dodatkowe zasoby

- Ollama: https://ollama.ai/
- LM Studio: https://lmstudio.ai/
- LocalAI: https://github.com/mudler/LocalAI
- Lista modeli: https://ollama.ai/library

## 🎓 Najlepsze praktyki

1. **Lokalnie testuj z małymi modelami** (Llama 3.2 8B)
2. **Na produkcji użyj OpenAI** dla najlepszej jakości
3. **Zawsze testuj function calling** przed wdrożeniem
4. **Monitoruj logi** aby upewnić się który AI jest używany
5. **Dodaj .env do .gitignore** - nie commituj kluczy API
