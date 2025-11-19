import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/assets/svgs"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Logo className="aspect-square h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">KlikKlak</span>
            </div>
            <p className="mb-4 max-w-sm text-gray-500">
              Twój zaufany sklep z komputerami i komponentami. Budujemy marzenia, jeden
              komponent na raz.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:border-blue-500 hover:bg-blue-50"
              >
                <Facebook className="h-4 w-4 text-gray-600" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:border-blue-500 hover:bg-blue-50"
              >
                <Twitter className="h-4 w-4 text-gray-600" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:border-blue-500 hover:bg-blue-50"
              >
                <Instagram className="h-4 w-4 text-gray-600" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:border-blue-500 hover:bg-blue-50"
              >
                <Youtube className="h-4 w-4 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Sklep</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Wszystkie produkty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Nowości
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Bestsellery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Promocje
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Pomoc</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Centrum pomocy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Śledź zamówienie
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Zwroty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Firma</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  O nas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Kariera
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-blue-500"
                >
                  Regulamin
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="mb-1 font-semibold text-gray-900">
                Zapisz się na newsletter
              </h4>
              <p className="text-gray-500">
                Otrzymuj najnowsze oferty i informacje technologiczne na swoją skrzynkę.
              </p>
            </div>
            <div className="flex gap-2 md:min-w-[22.5rem]">
              <Input type="email" placeholder="Wpisz swój email" />
              <Button className="bg-blue-500 hover:bg-blue-600">Zapisz się</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-500">
          <p>&copy; 2025 KlikKlak. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}
