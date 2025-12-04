# Relacje w bazie danych KlikKlak

## Stan aktualny (po migracji do komponentów)

### 📊 Struktura tabel

#### 1. **Tabele użytkowników i autoryzacji**
```
users
├── id (uuid, PK)
├── email (varchar)
├── password (varchar)
├── first_name (varchar)
├── last_name (varchar)
├── role (varchar) - 'user' lub 'admin'
└── timestamps (created_at, updated_at)
```

#### 2. **Tabele kategorii**
```
categories
├── id (uuid, PK)
├── name (varchar)
└── description (text)

Przykładowe kategorie:
- Procesory, Karty graficzne, Pamięć RAM, Dyski SSD, Dyski HDD
- Płyty główne, Zasilacze, Chłodzenia CPU, Monitory, Obudowy
```

#### 3. **Tabele komponentów komputerowych (10 tabel)**

**Procesory (cpus)**
- id, name, price, producer, mpn, ean, upc
- base_clock, turbo_clock, unlocked_multiplier
- cores, threads, tdp, socket, integrated_gpu
- category_id → categories.id (brak FK w bazie!)
- stock, image_url, product_page
- timestamps

**Karty graficzne (gpus)**
- id, name, price, producer, mpn, ean, upc
- length, slots, pin8_connectors, pin6_connectors
- hdmi, display_port, dvi, vga
- boost_clock, vram, memory_clock, tdp
- category_id → categories.id
- stock, image_url, product_page, timestamps

**Pamięć RAM (rams)**
- id, name, price, producer, mpn, ean, upc
- ram_type, size, clock, timings, sticks
- category_id, stock, image_url, timestamps

**Dyski SSD (ssds)**
- id, name, price, producer, mpn, ean, upc
- form_factor, protocol, size, nand, controller
- category_id, stock, image_url, timestamps

**Dyski HDD (hdds)**
- id, name, price, producer, mpn, ean, upc
- form_factor, size, rpm, cache
- category_id, stock, image_url, timestamps

**Płyty główne (motherboards)**
- id, name, price, producer, mpn, ean, upc
- socket, chipset, unlocked, form_factor
- memory_type, memory_capacity, ram_slots
- sata, vga, dvi, display_port, hdmi, wifi
- integrated_graphics
- category_id, stock, image_url, timestamps

**Zasilacze (psus)**
- id, name, price, producer, mpn, ean, upc
- watt, size, efficiency_rating
- category_id, stock, image_url, timestamps

**Chłodzenia CPU (cpu_coolers)**
- id, name, price, producer, mpn, ean, upc
- supported_sockets, height, tdp
- fans_80mm, fans_92mm, fans_120mm, fans_140mm, fans_200mm
- additional_fan_support
- category_id, stock, image_url, timestamps

**Monitory (monitors)**
- id, name, price, producer, mpn, ean, upc
- resolution, refresh_rate, size, panel, response_time
- hdmi, display_port, dvi, vga, speaker
- curved, adjustable_height, sync
- category_id, stock, image_url, timestamps

**Obudowy (cases)**
- id, name, price, producer, mpn, ean, upc
- width, depth, height, motherboard, power_supply
- supported_gpu_length, supported_cpu_cooler_height
- fans_80mm, fans_120mm, fans_140mm, fans_200mm
- radiator_120mm, radiator_140mm, radiator_240mm, radiator_280mm, radiator_360mm
- disk_25, disk_35, disk_25_35, disk_525
- primary_colors, has_window, dust_filter
- cable_management, noise_isolation
- category_id, stock, image_url, timestamps

#### 4. **Tabela produktów (PUSTA - legacy)**
```
products (OPRÓŻNIONA)
├── id (uuid, PK)
├── name, description, price, stock
├── image_url
├── category_id (varchar) - brak FK!
└── timestamps
```

#### 5. **Tabele koszyka**
```
carts
├── id (uuid, PK)
├── user_id (varchar) → users.id (brak FK!)
├── is_active (boolean)
└── timestamps

cart_items
├── id (uuid, PK)
├── cart_id (varchar) → carts.id (brak FK!)
├── product_id (varchar) → products.id (brak FK!)
└── quantity (integer)
```

#### 6. **Tabele zamówień**
```
orders
├── id (uuid, PK)
├── user_id (varchar) → users.id (brak FK!)
├── address_id (varchar) → addresses.id (brak FK!)
├── total_amount (numeric)
├── status (varchar)
└── timestamps

order_items
├── id (uuid, PK)
├── order_id (varchar) → orders.id (brak FK!)
├── product_id (varchar) → products.id (brak FK!)
├── quantity (integer)
└── price (numeric)
```

#### 7. **Tabele recenzji**
```
reviews
├── id (uuid, PK)
├── user_id (varchar) → users.id (brak FK!)
├── product_id (varchar) → products.id (brak FK!)
├── rating (integer)
├── comment (text)
└── timestamps
```

#### 8. **Tabele wishlist**
```
wishlists
├── id (uuid, PK)
├── user_id (varchar) → users.id (brak FK!)
├── is_active (boolean)
└── timestamps
```

#### 9. **Tabele adresów**
```
addresses
├── id (uuid, PK)
├── user_id (varchar) → users.id (brak FK!)
├── street, city, state, postal_code, country
└── timestamps
```

#### 10. **Tabele tagów**
```
tags
├── id (uuid, PK)
└── name (varchar)

product_tags
├── product_id (varchar) → products.id (brak FK!)
└── tag_id (varchar) → tags.id (brak FK!)
```

---

## 🔴 PROBLEM: Brak Foreign Keys!

**Aktualnie w bazie NIE MA żadnych foreign keys!**

Wszystkie relacje są tylko koncepcyjne - w kodzie, ale nie wymuszane na poziomie bazy danych.

### Konsekwencje:
1. ❌ Brak integralności referencyjnej
2. ❌ Można dodać cart_item z nieistniejącym product_id
3. ❌ Można usunąć produkt, a jego cart_items/order_items pozostaną
4. ❌ Brak CASCADE DELETE/UPDATE

---

## 🎯 Problem do rozwiązania

### Aktualny stan:
- `cart_items.product_id` → wskazuje na `products.id` (pusta tabela!)
- `order_items.product_id` → wskazuje na `products.id` (pusta tabela!)
- `reviews.product_id` → wskazuje na `products.id` (pusta tabela!)

### Nowe komponenty:
- Mamy 10 tabel z produktami (cpus, gpus, rams, etc.)
- Każda ma własne ID i specyficzne pola
- Ale cart_items/order_items nie wiedzą, z której tabeli pochodzi produkt!

---

## 💡 Możliwe rozwiązania

### Opcja 1: Polymorphic Relationships
```sql
cart_items
├── product_type (varchar) - 'cpu', 'gpu', 'ram', etc.
├── product_id (uuid) - ID z odpowiedniej tabeli
└── quantity
```

**Plusy:** Elastyczne, czyste
**Minusy:** Brak FK, trudniejsze zapytania

### Opcja 2: Unified Products Table (rekomendowane)
```sql
products (wspólne dane)
├── id (uuid, PK)
├── component_type (varchar) - 'cpu', 'gpu', 'ram'
├── component_id (uuid) - FK do cpus/gpus/rams
├── name, price, stock
└── category_id

cart_items.product_id → products.id (FK)
```

**Plusy:** FK działają, łatwe zapytania
**Minusy:** Dodatkowa warstwa abstrakcji

### Opcja 3: Separate Cart Tables
```sql
cart_cpu_items, cart_gpu_items, cart_ram_items...
```

**Plusy:** Czyste FK
**Minusy:** Mnóstwo tabel, skomplikowane

---

## 📈 Statystyki aktualnych danych

```
Komponenty w bazie:
- CPUs: 360 produktów
- GPUs: 752 produktów
- RAMs: 1,334 produktów
- SSDs: 422 produktów
- HDDs: 272 produktów
- Motherboards: 858 produktów
- PSUs: 320 produktów
- CPU Coolers: 494 produktów
- Monitors: 218 produktów
- Cases: 449 produktów

RAZEM: 5,479 produktów w 10 tabelach
```

---

## 🔧 Następne kroki

1. **Zdecydować o architekturze relacji** (opcja 1, 2 lub 3)
2. **Dodać foreign keys** do istniejących tabel
3. **Zmigrować cart_items/order_items/reviews** do nowej struktury
4. **Zaktualizować backend API** do obsługi nowej struktury
5. **Zaktualizować frontend** do pracy z nowym API
