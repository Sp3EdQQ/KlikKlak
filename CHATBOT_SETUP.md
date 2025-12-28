# Instrukcje konfiguracji chatbota

## Konfiguracja chatbota GPT-4o

### 1. Klucz API OpenAI

Chatbot KlikKlak wykorzystuje model GPT-4o od OpenAI. Aby chatbot działał, musisz skonfigurować klucz API:

1. Zarejestruj się na [platform.openai.com](https://platform.openai.com/)
2. Przejdź do sekcji API Keys
3. Wygeneruj nowy klucz API
4. Skopiuj klucz do pliku `.env` w folderze `backend`:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 2. Backend

Backend chatbota jest już skonfigurowany w module `backend/src/modules/chatbot/`:

- `chatbot.controller.ts` - endpoint POST `/chatbot/chat`
- `chatbot.service.ts` - logika integracji z OpenAI
- `chatbot.dto.ts` - definicje typów

Chatbot automatycznie:
- Pobiera kontekst produktów ze wszystkich kategorii
- Generuje system prompt z informacjami o dostępnych produktach
- Zarządza historią konwersacji
- Sugeruje odpowiednie produkty na podstawie zapytania

### 3. Frontend

Chatbot jest dostępny na wszystkich głównych stronach:
- Strona główna
- Lista produktów
- Szczegóły produktu
- Kategorie
- Koszyk

Komponent chatbota (`frontend/src/components/Chatbot.tsx`) pojawia się jako pływające okno w prawym dolnym rogu ekranu.

### 4. Funkcjonalności chatbota

Chatbot może pomóc użytkownikom:
- Znaleźć odpowiednie komponenty komputerowe
- Odpowiedzieć na pytania techniczne
- Zasugerować produkty w określonym budżecie
- Sprawdzić kompatybilność podzespołów
- Skomponować kompletny zestaw komputerowy

### 5. Testowanie

Po skonfigurowaniu klucza API i uruchomieniu backendu, możesz przetestować chatbota:

1. Uruchom backend: `cd backend && pnpm run start:dev`
2. Uruchom frontend: `cd frontend && pnpm run dev`
3. Otwórz stronę główną w przeglądarce
4. Kliknij ikonę chatbota w prawym dolnym rogu
5. Zadaj pytanie, np. "Jaki procesor polecasz do 1000 zł?"

### 6. Koszty

Pamiętaj, że używanie API OpenAI jest płatne. Model GPT-4o ma następujące koszty:
- Input: ~$5 za 1M tokenów
- Output: ~$15 za 1M tokenów

Monitoruj wykorzystanie w panelu OpenAI.

### 7. Ograniczenia

- Chatbot działa tylko gdy backend ma skonfigurowany klucz API
- Jeśli klucz API nie jest skonfigurowany, backend loguje ostrzeżenie
- Historia konwersacji jest przechowywana tylko w pamięci klienta (localStorage można dodać)
