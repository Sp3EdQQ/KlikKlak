# Architektura Chatbota z Function Calling

## 🎯 Problem

Sklep ma **tysiące produktów**. Tradycyjne podejście:
```
❌ Wysyłaj wszystkie produkty w prompcie → 50,000+ tokenów → Bardzo drogo
```

## ✅ Rozwiązanie: Function Calling (Tools API)

Model AI **sam decyduje** które zapytania wykonać do bazy danych.

## 🔄 Wybór AI

Aplikacja obsługuje **dwa tryby**:

### 1. **Lokalny AI** (Rozwój i testy) 🏠
- Ollama (llama3.2, mistral)
- LM Studio
- LocalAI
- **Koszt:** 0 zł
- **Konfiguracja:** `USE_LOCAL_AI=true`

### 2. **OpenAI GPT-4o** (Produkcja) ☁️
- Najwyższa jakość odpowiedzi
- Koszt: ~$0.014 za zapytanie
- **Konfiguracja:** `USE_LOCAL_AI=false`

📚 **Szczegóły:** Zobacz [CHATBOT_LOCAL_AI_SETUP.md](./CHATBOT_LOCAL_AI_SETUP.md)

### Jak to działa?

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Użytkownik: "Pokaż mi procesory Intel do 1500 zł"       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Model AI otrzymuje:                                      │
│    - System prompt (bez produktów!)                         │
│    - Lista dostępnych funkcji (tools)                       │
│    - Pytanie użytkownika                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Model AI decyduje:                                       │
│    "Muszę wywołać search_cpus(producer: Intel, max: 1500)" │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Backend wykonuje zapytanie do bazy:                     │
│    SELECT * FROM cpus WHERE producer='Intel' AND price<=1500│
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Backend zwraca 10-20 produktów do modelu AI             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Model AI generuje odpowiedź na podstawie TYLKO tych      │
│    konkretnych produktów                                    │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Porównanie kosztów

### Tradycyjne podejście (bez Function Calling):
```
Request 1: System prompt (100 tokenów) + 5000 produktów (50,000 tokenów) + pytanie (20 tokenów)
Total: ~50,120 tokenów INPUT

Koszt: 50,120 × $5/1M = $0.25 za jedno zapytanie
```

### Z Function Calling:
```
Request 1: System prompt (200 tokenów) + tools definition (500 tokenów) + pytanie (20 tokenów)
Total: ~720 tokenów INPUT

Request 2 (z wynikami): 720 + wyniki z bazy (2000 tokenów)
Total: ~2,720 tokenów INPUT

Koszt: 2,720 × $5/1M = $0.014 za jedno zapytanie

💰 Oszczędność: 94% (18x taniej!)
```

## 🛠️ Dostępne funkcje (tools)

### 1. `search_cpus`
```typescript
{
  producer?: string,      // "Intel", "AMD"
  minPrice?: number,
  maxPrice?: number,
  socket?: string,        // "AM5", "LGA1700"
  minCores?: number
}
```

### 2. `search_gpus`
```typescript
{
  producer?: string,      // "NVIDIA", "AMD"
  minPrice?: number,
  maxPrice?: number,
  minVram?: string       // "8GB", "12GB"
}
```

### 3. `search_rams`
```typescript
{
  producer?: string,
  ramType?: string,      // "DDR4", "DDR5"
  minPrice?: number,
  maxPrice?: number,
  size?: string          // "16GB", "32GB"
}
```

### 4. `search_motherboards`
```typescript
{
  producer?: string,
  socket?: string,       // "AM5", "LGA1700"
  chipset?: string,
  minPrice?: number,
  maxPrice?: number,
  formFactor?: string    // "ATX", "mATX", "ITX"
}
```

### 5. `search_psus`
```typescript
{
  producer?: string,
  minWatt?: number,
  maxPrice?: number,
  efficiencyRating?: string  // "80+ Bronze", "80+ Gold"
}
```

### 6. `search_ssds`
```typescript
{
  producer?: string,
  minPrice?: number,
  maxPrice?: number,
  size?: string          // "512GB", "1TB"
}
```

## 📝 Przykłady użycia

### Przykład 1: Proste wyszukiwanie
```
User: "Pokaż mi procesory AMD do 1000 zł"

GPT wywołuje:
→ search_cpus(producer: "AMD", maxPrice: 1000)

Backend zwraca:
→ [AMD Ryzen 5 5600, AMD Ryzen 5 5600X, ...]

GPT odpowiada:
→ "Znalazłem 8 procesorów AMD do 1000 zł:
   1. AMD Ryzen 5 5600 - 899 zł
   2. AMD Ryzen 5 5600X - 989 zł
   ..."
```

### Przykład 2: Komponowanie zestawu
```
User: "Złóż mi komputer do grania za 5000 zł"

GPT wywołuje (sekwencyjnie):
→ search_cpus(maxPrice: 1500)
→ search_gpus(maxPrice: 2000)
→ search_motherboards(socket: "AM5", maxPrice: 600)
→ search_rams(ramType: "DDR5", size: "16GB", maxPrice: 400)
→ search_ssds(size: "1TB", maxPrice: 300)
→ search_psus(minWatt: 650, maxPrice: 200)

GPT odpowiada:
→ "Proponuję taki zestaw:
   - CPU: AMD Ryzen 5 7600 (1299 zł)
   - GPU: RTX 4060 Ti (1899 zł)
   - Płyta: ASUS TUF B650 (599 zł)
   - RAM: Kingston Fury DDR5 16GB (349 zł)
   - SSD: Samsung 980 1TB (289 zł)
   - Zasilacz: be quiet! 650W (189 zł)
   
   Razem: 4624 zł (zostaje 376 zł)"
```

### Przykład 3: Sprawdzanie kompatybilności
```
User: "Czy ten procesor Intel i7-12700K pasuje do płyty ASUS ROG STRIX B550?"

GPT wywołuje:
→ search_cpus(producer: "Intel")  // znajdzie socket LGA1700
→ search_motherboards(producer: "ASUS")  // znajdzie socket AM4

GPT odpowiada:
→ "Nie, nie są kompatybilne:
   - Intel i7-12700K używa socketu LGA1700
   - ASUS ROG STRIX B550 ma socket AM4 (dla AMD)
   
   Potrzebujesz płyty z socketem LGA1700, np. ASUS ROG STRIX Z690"
```

## 🔧 Implementacja techniczna

### Backend (chatbot.service.ts)

```typescript
// 1. Definicja narzędzi
private getTools(): OpenAI.Chat.ChatCompletionTool[] {
  return [{
    type: 'function',
    function: {
      name: 'search_cpus',
      description: 'Wyszukuje procesory w bazie danych',
      parameters: { /* schema JSON */ }
    }
  }];
}

// 2. Wykonanie funkcji
private async executeFunction(functionName: string, args: any) {
  const allCpus = await this.cpusService.findAll();
  const filtered = allCpus.filter(/* kryteria z args */);
  return JSON.stringify(filtered.slice(0, 20));
}

// 3. Pętla wywołań
while (assistantMessage?.tool_calls) {
  // Wykonaj funkcje
  // Wyślij wyniki do GPT
  // Pobierz kolejną odpowiedź
}
```

## ⚡ Optymalizacje

1. **Max 20 wyników** na funkcję - wystarczająco, żeby GPT miał wybór
2. **Filtrowanie w pamięci** - dla małych/średnich baz (tysiące rekordów)
3. **Dla bardzo dużych baz** - można dodać indeksy i filtrowanie SQL
4. **Cache** - można cache'ować popularne zapytania

## 🎓 Dla projektu studenckiego

**Co możesz napisać w dokumentacji:**

1. **Analiza problemu:**
   - "Sklep zawiera X produktów"
   - "Przesłanie wszystkich w prompcie = Y tokenów = $Z koszt"

2. **Wybór rozwiązania:**
   - "Zastosowano Function Calling (Tools API) OpenAI"
   - "GPT-4o sam decyduje które zapytania wykonać"

3. **Implementacja:**
   - Definicja 6 funkcji wyszukiwania
   - Dynamiczne filtrowanie w pamięci
   - Obsługa wielokrotnych wywołań funkcji

4. **Wyniki:**
   - Redukcja kosztów o 94%
   - Czas odpowiedzi: 2-5 sekund
   - Dokładność: GPT pracuje tylko na rzeczywistych produktach z bazy

5. **Możliwe rozszerzenia:**
   - Dodanie więcej filtrów (TDP, waga, kolor, etc.)
   - Integracja z systemem rekomendacji
   - Historia rozmów użytkownika
   - Analityka popularnych zapytań
