import { AdminLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ustawienia</h1>
          <p className="mt-1 text-gray-500">Konfiguruj ustawienia sklepu</p>
        </div>

        {/* Store Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Ustawienia sklepu</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nazwa sklepu
              </label>
              <Input defaultValue="KlikKlak" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email kontaktowy
              </label>
              <Input type="email" defaultValue="kontakt@klikklak.pl" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <Input type="tel" defaultValue="+48 123 456 789" />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Ustawienia wysyłki</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Koszt wysyłki standardowej (zł)
              </label>
              <Input type="number" defaultValue="15" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Darmowa wysyłka od (zł)
              </label>
              <Input type="number" defaultValue="500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Koszt wysyłki ekspresowej (zł)
              </label>
              <Input type="number" defaultValue="25" />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Ustawienia płatności</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Płatność przy odbiorze</div>
                <div className="text-sm text-gray-500">
                  Akceptuj płatność gotówką przy odbiorze
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Płatność online</div>
                <div className="text-sm text-gray-500">
                  Akceptuj płatności kartą i przelewem
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Anuluj</Button>
          <Button className="bg-blue-500 hover:bg-blue-600">Zapisz zmiany</Button>
        </div>
      </div>
    </AdminLayout>
  )
}
