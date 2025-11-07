import { AdminLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminSettings() {
    return (
        <AdminLayout>
            <div className="space-y-6 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Ustawienia</h1>
                    <p className="text-gray-500 mt-1">Konfiguruj ustawienia sklepu</p>
                </div>

                {/* Store Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Ustawienia sklepu</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nazwa sklepu
                            </label>
                            <Input defaultValue="KlikKlak" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email kontaktowy
                            </label>
                            <Input type="email" defaultValue="kontakt@klikklak.pl" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Telefon
                            </label>
                            <Input type="tel" defaultValue="+48 123 456 789" />
                        </div>
                    </div>
                </div>

                {/* Shipping Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Ustawienia wysyłki</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Koszt wysyłki standardowej (zł)
                            </label>
                            <Input type="number" defaultValue="15" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Darmowa wysyłka od (zł)
                            </label>
                            <Input type="number" defaultValue="500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Koszt wysyłki ekspresowej (zł)
                            </label>
                            <Input type="number" defaultValue="25" />
                        </div>
                    </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Ustawienia płatności</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-900">Płatność przy odbiorze</div>
                                <div className="text-sm text-gray-500">Akceptuj płatność gotówką przy odbiorze</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-900">Płatność online</div>
                                <div className="text-sm text-gray-500">Akceptuj płatności kartą i przelewem</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
    );
}
