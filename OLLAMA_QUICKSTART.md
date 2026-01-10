# Szybki Start - Ollama z Chatbotem

## 1. Instalacja Ollama (Linux)

```bash
# Automatyczna instalacja
curl -fsSL https://ollama.com/install.sh | sh

# Ollama zostanie zainstalowany jako usługa systemd
```

## 2. Pobierz model AI

```bash
# Llama 3.2 (8GB RAM wymagane) - Zalecany
ollama pull llama3.2

# Alternatywy:
# ollama pull llama3.1      # Większy, lepsza jakość (16GB RAM)
# ollama pull mistral       # Lżejszy, dobry do testów (8GB RAM)
```

## 3. Uruchom serwer Ollama

```bash
# Ollama działa automatycznie jako usługa systemd
# Sprawdź status:
systemctl status ollama

# Jeśli nie działa, uruchom:
ollama serve
```

## 4. Sprawdź czy działa

```bash
# Test API
curl http://localhost:11434/api/version

# Test prostego zapytania
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## 5. Skonfiguruj backend

Backend jest już skonfigurowany w pliku `.env`:

```env
USE_LOCAL_AI=true
LOCAL_AI_URL=http://localhost:11434/v1
LOCAL_AI_MODEL=llama3.2
```

## 6. Uruchom backend

```bash
cd backend
pnpm install
pnpm run start:dev
```

## 7. Testuj chatbota

```bash
# Test przez API
curl http://localhost:3000/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Pokaż mi procesory Intel",
    "conversationHistory": []
  }'
```

## Przełączanie na OpenAI (Produkcja)

Gdy jesteś gotowy do wdrożenia na produkcję z OpenAI GPT-4o:

```bash
# W pliku backend/.env zmień:
USE_LOCAL_AI=false
OPENAI_API_KEY=sk-proj-twoj-prawdziwy-klucz
OPENAI_MODEL=gpt-4o
```

Restart backendu i gotowe!

## Rozwiązywanie problemów

### Ollama nie uruchamia się

```bash
# Ręczne uruchomienie
ollama serve

# W osobnym terminalu sprawdź
curl http://localhost:11434/api/version
```

### Model nie wspiera function calling

Llama 3.2+ powinno działać. Jeśli nie:

```bash
# Pobierz nowszą wersję
ollama pull llama3.1
# lub
ollama pull mistral
```

### Backend nie może połączyć się z Ollama

Sprawdź logi:

```bash
# W terminalu backendu szukaj:
[ChatbotService] Using LOCAL AI: http://localhost:11434/v1 with model: llama3.2
```

Jeśli widzisz błędy połączenia, sprawdź czy Ollama działa:

```bash
systemctl status ollama
# lub
ps aux | grep ollama
```

## Wskazówki

- **Rozwój lokalny:** Używaj Ollama (darmowe, prywatne)
- **Testy produkcyjne:** Krótko przełącz na OpenAI
- **Produkcja:** OpenAI GPT-4o dla najlepszej jakości
- **Koszt:** Ollama = 0 zł, OpenAI ≈ $0.01-0.02 za rozmowę

## Więcej informacji

Zobacz szczegółowy przewodnik: [CHATBOT_LOCAL_AI_SETUP.md](./CHATBOT_LOCAL_AI_SETUP.md)
