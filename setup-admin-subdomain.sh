#!/bin/bash

# Skrypt do dodania wpisu admin.localhost do pliku /etc/hosts
# Ten skrypt wymaga uprawnień sudo

echo "🔧 Konfiguracja subdomeny admin.localhost dla panelu administracyjnego"
echo ""

# Sprawdź czy wpis już istnieje
if grep -q "admin.localhost" /etc/hosts; then
    echo "✅ Wpis admin.localhost już istnieje w /etc/hosts"
else
    echo "➕ Dodawanie wpisu admin.localhost do /etc/hosts..."
    echo ""
    echo "Wykonaj następującą komendę (będzie wymagane hasło sudo):"
    echo ""
    echo "sudo sh -c 'echo \"127.0.0.1 admin.localhost\" >> /etc/hosts'"
    echo ""
    read -p "Czy chcesz to zrobić teraz? (t/n): " choice
    
    if [ "$choice" = "t" ] || [ "$choice" = "T" ]; then
        sudo sh -c 'echo "127.0.0.1 admin.localhost" >> /etc/hosts'
        if [ $? -eq 0 ]; then
            echo "✅ Wpis został dodany pomyślnie!"
        else
            echo "❌ Nie udało się dodać wpisu"
            exit 1
        fi
    else
        echo "⏭️  Pominięto. Dodaj wpis ręcznie:"
        echo "   sudo sh -c 'echo \"127.0.0.1 admin.localhost\" >> /etc/hosts'"
    fi
fi

echo ""
echo "📝 Instrukcje:"
echo "1. Uruchom serwer dev: cd frontend && pnpm dev"
echo "2. Sklep: http://localhost:5173"
echo "3. Panel Admin: http://admin.localhost:5173"
echo ""
echo "✨ Gotowe!"
