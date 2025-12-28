import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { CpusService } from '../cpus/cpus.service';
import { GpusService } from '../gpus/gpus.service';
import { RamsService } from '../rams/rams.service';
import { SsdsService } from '../ssds/ssds.service';
import { HddsService } from '../hdds/hdds.service';
import { MotherboardsService } from '../motherboards/motherboards.service';
import { PsusService } from '../psus/psus.service';
import { CpuCoolersService } from '../cpu-coolers/cpu-coolers.service';
import { MonitorsService } from '../monitors/monitors.service';
import { CasesService } from '../cases/cases.service';
import { ChatMessageDto } from './chatbot.dto';

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
    private cpusService: CpusService,
    private gpusService: GpusService,
    private ramsService: RamsService,
    private ssdsService: SsdsService,
    private hddsService: HddsService,
    private motherboardsService: MotherboardsService,
    private psusService: PsusService,
    private cpuCoolersService: CpuCoolersService,
    private monitorsService: MonitorsService,
    private casesService: CasesService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn(
        'OPENAI_API_KEY not found in environment variables. Chatbot will not work.',
      );
    }
    this.openai = new OpenAI({
      apiKey: apiKey || 'dummy-key',
    });
  }

  // Definicja narzędzi (tools) dla GPT-4o
  private getTools(): OpenAI.Chat.ChatCompletionTool[] {
    return [
      {
        type: 'function',
        function: {
          name: 'search_cpus',
          description: 'Wyszukuje procesory w bazie danych na podstawie kryteriów',
          parameters: {
            type: 'object',
            properties: {
              producer: {
                type: 'string',
                description: 'Producent procesora (Intel, AMD, itp.)',
              },
              minPrice: {
                type: 'number',
                description: 'Minimalna cena w PLN',
              },
              maxPrice: {
                type: 'number',
                description: 'Maksymalna cena w PLN',
              },
              socket: {
                type: 'string',
                description: 'Socket procesora (AM5, LGA1700, itp.)',
              },
              minCores: {
                type: 'number',
                description: 'Minimalna liczba rdzeni',
              },
            },
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'search_gpus',
          description: 'Wyszukuje karty graficzne w bazie danych',
          parameters: {
            type: 'object',
            properties: {
              producer: {
                type: 'string',
                description: 'Producent karty (NVIDIA, AMD, itp.)',
              },
              minPrice: {
                type: 'number',
                description: 'Minimalna cena w PLN',
              },
              maxPrice: {
                type: 'number',
                description: 'Maksymalna cena w PLN',
              },
              minVram: {
                type: 'string',
                description: 'Minimalna ilość VRAM (np. "8GB")',
              },
            },
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'search_rams',
          description: 'Wyszukuje pamięć RAM w bazie danych',
          parameters: {
            type: 'object',
            properties: {
              producer: {
                type: 'string',
                description: 'Producent pamięci',
              },
              ramType: {
                type: 'string',
                description: 'Typ pamięci (DDR4, DDR5)',
              },
              minPrice: {
                type: 'number',
                description: 'Minimalna cena w PLN',
              },
              maxPrice: {
                type: 'number',
                description: 'Maksymalna cena w PLN',
              },
              size: {
                type: 'string',
                description: 'Rozmiar pamięci (np. "16GB", "32GB")',
              },
            },
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'search_motherboards',
          description: 'Wyszukuje płyty główne w bazie danych',
          parameters: {
            type: 'object',
            properties: {
              producer: {
                type: 'string',
                description: 'Producent płyty',
              },
              socket: {
                type: 'string',
                description: 'Socket procesora (AM5, LGA1700, itp.)',
              },
              chipset: {
                type: 'string',
                description: 'Chipset płyty głównej',
              },
              minPrice: {
                type: 'number',
                description: 'Minimalna cena w PLN',
              },
              maxPrice: {
                type: 'number',
                description: 'Maksymalna cena w PLN',
              },
              formFactor: {
                type: 'string',
                description: 'Rozmiar płyty (ATX, mATX, ITX)',
              },
            },
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'search_psus',
          description: 'Wyszukuje zasilacze w bazie danych',
          parameters: {
            type: 'object',
            properties: {
              producer: {
                type: 'string',
                description: 'Producent zasilacza',
              },
              minWatt: {
                type: 'number',
                description: 'Minimalna moc w W',
              },
              maxPrice: {
                type: 'number',
                description: 'Maksymalna cena w PLN',
              },
              efficiencyRating: {
                type: 'string',
                description: 'Certyfikat sprawności (80+ Bronze, Gold, itp.)',
              },
            },
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'search_ssds',
          description: 'Wyszukuje dyski SSD w bazie danych',
          parameters: {
            type: 'object',
            properties: {
              producer: {
                type: 'string',
                description: 'Producent dysku',
              },
              minPrice: {
                type: 'number',
                description: 'Minimalna cena w PLN',
              },
              maxPrice: {
                type: 'number',
                description: 'Maksymalna cena w PLN',
              },
              size: {
                type: 'string',
                description: 'Pojemność dysku (np. "512GB", "1TB")',
              },
            },
          },
        },
      },
    ];
  }

  // Wykonanie funkcji wywołanych przez GPT
  private async executeFunction(
    functionName: string,
    args: any,
  ): Promise<string> {
    try {
      let results: any[] = [];

      switch (functionName) {
        case 'search_cpus': {
          const allCpus = await this.cpusService.findAll();
          results = allCpus.filter((cpu) => {
            if (args.producer && !cpu.producer?.toLowerCase().includes(args.producer.toLowerCase())) return false;
            if (args.minPrice && parseFloat(cpu.price) < args.minPrice) return false;
            if (args.maxPrice && parseFloat(cpu.price) > args.maxPrice) return false;
            if (args.socket && cpu.socket !== args.socket) return false;
            if (args.minCores && cpu.cores && parseInt(cpu.cores) < args.minCores) return false;
            return true;
          }).slice(0, 20); // Max 20 wyników
          
          return JSON.stringify(
            results.map((cpu) => ({
              id: cpu.id,
              name: cpu.name,
              price: cpu.price,
              producer: cpu.producer,
              cores: cpu.cores,
              threads: cpu.threads,
              socket: cpu.socket,
              tdp: cpu.tdp,
              baseClock: cpu.baseClock,
              turboClock: cpu.turboClock,
            })),
          );
        }

        case 'search_gpus': {
          const allGpus = await this.gpusService.findAll();
          results = allGpus.filter((gpu) => {
            if (args.producer && !gpu.producer?.toLowerCase().includes(args.producer.toLowerCase())) return false;
            if (args.minPrice && parseFloat(gpu.price) < args.minPrice) return false;
            if (args.maxPrice && parseFloat(gpu.price) > args.maxPrice) return false;
            if (args.minVram && gpu.vram && !gpu.vram.includes(args.minVram)) return false;
            return true;
          }).slice(0, 20);
          
          return JSON.stringify(
            results.map((gpu) => ({
              id: gpu.id,
              name: gpu.name,
              price: gpu.price,
              producer: gpu.producer,
              vram: gpu.vram,
              tdp: gpu.tdp,
              boostClock: gpu.boostClock,
            })),
          );
        }

        case 'search_rams': {
          const allRams = await this.ramsService.findAll();
          results = allRams.filter((ram) => {
            if (args.producer && !ram.producer?.toLowerCase().includes(args.producer.toLowerCase())) return false;
            if (args.ramType && ram.ramType !== args.ramType) return false;
            if (args.minPrice && parseFloat(ram.price) < args.minPrice) return false;
            if (args.maxPrice && parseFloat(ram.price) > args.maxPrice) return false;
            if (args.size && ram.size !== args.size) return false;
            return true;
          }).slice(0, 20);
          
          return JSON.stringify(
            results.map((ram) => ({
              id: ram.id,
              name: ram.name,
              price: ram.price,
              producer: ram.producer,
              ramType: ram.ramType,
              size: ram.size,
              clock: ram.clock,
            })),
          );
        }

        case 'search_motherboards': {
          const allMotherboards = await this.motherboardsService.findAll();
          results = allMotherboards.filter((mb) => {
            if (args.producer && !mb.producer?.toLowerCase().includes(args.producer.toLowerCase())) return false;
            if (args.socket && mb.socket !== args.socket) return false;
            if (args.chipset && !mb.chipset?.toLowerCase().includes(args.chipset.toLowerCase())) return false;
            if (args.minPrice && parseFloat(mb.price) < args.minPrice) return false;
            if (args.maxPrice && parseFloat(mb.price) > args.maxPrice) return false;
            if (args.formFactor && mb.formFactor !== args.formFactor) return false;
            return true;
          }).slice(0, 20);
          
          return JSON.stringify(
            results.map((mb) => ({
              id: mb.id,
              name: mb.name,
              price: mb.price,
              producer: mb.producer,
              socket: mb.socket,
              chipset: mb.chipset,
              formFactor: mb.formFactor,
              memoryType: mb.memoryType,
            })),
          );
        }

        case 'search_psus': {
          const allPsus = await this.psusService.findAll();
          results = allPsus.filter((psu) => {
            if (args.producer && !psu.producer?.toLowerCase().includes(args.producer.toLowerCase())) return false;
            if (args.minWatt && psu.watt && parseInt(psu.watt) < args.minWatt) return false;
            if (args.maxPrice && parseFloat(psu.price) > args.maxPrice) return false;
            if (args.efficiencyRating && !psu.efficiencyRating?.includes(args.efficiencyRating)) return false;
            return true;
          }).slice(0, 20);
          
          return JSON.stringify(
            results.map((psu) => ({
              id: psu.id,
              name: psu.name,
              price: psu.price,
              producer: psu.producer,
              watt: psu.watt,
              efficiencyRating: psu.efficiencyRating,
            })),
          );
        }

        case 'search_ssds': {
          const allSsds = await this.ssdsService.findAll();
          results = allSsds.filter((ssd) => {
            if (args.producer && !ssd.producer?.toLowerCase().includes(args.producer.toLowerCase())) return false;
            if (args.minPrice && parseFloat(ssd.price) < args.minPrice) return false;
            if (args.maxPrice && parseFloat(ssd.price) > args.maxPrice) return false;
            if (args.size && ssd.size !== args.size) return false;
            return true;
          }).slice(0, 20);
          
          return JSON.stringify(
            results.map((ssd) => ({
              id: ssd.id,
              name: ssd.name,
              price: ssd.price,
              producer: ssd.producer,
              size: ssd.size,
            })),
          );
        }

        default:
          return JSON.stringify({ error: 'Unknown function' });
      }
    } catch (error) {
      this.logger.error(`Error executing function ${functionName}:`, error);
      return JSON.stringify({ error: 'Function execution failed' });
    }
  }

  async chat(chatMessageDto: ChatMessageDto) {
    const { message, conversationHistory = [] } = chatMessageDto;

    try {
      // Przygotuj system prompt (bez pełnej listy produktów!)
      const systemPrompt = this.buildSystemPrompt();

      // Buduj historię konwersacji
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: message },
      ];

      // Pierwsza odpowiedź z GPT (może wywołać funkcje)
      let response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        tools: this.getTools(),
        tool_choice: 'auto',
        temperature: 0.7,
        max_tokens: 500,
      });

      let assistantMessage = response.choices[0]?.message;

      // Jeśli GPT chce wywołać funkcje
      while (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
        // Dodaj wiadomość asystenta z tool_calls do historii
        messages.push(assistantMessage);

        // Wykonaj każdą funkcję
        for (const toolCall of assistantMessage.tool_calls) {
          if (toolCall.type !== 'function') continue;
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);

          this.logger.log(`Executing function: ${functionName} with args:`, functionArgs);

          const functionResponse = await this.executeFunction(
            functionName,
            functionArgs,
          );

          // Dodaj odpowiedź funkcji do historii
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: functionResponse,
          });
        }

        // Poproś GPT o finalną odpowiedź na podstawie wyników funkcji
        response = await this.openai.chat.completions.create({
          model: 'gpt-4o',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
        });

        assistantMessage = response.choices[0]?.message;
      }

      const finalMessage =
        assistantMessage?.content ||
        'Przepraszam, nie mogłem przetworzyć Twojego zapytania.';

      // Zaktualizuj historię konwersacji
      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: finalMessage },
      ];

      return {
        message: finalMessage,
        conversationHistory: updatedHistory,
        suggestedProducts: [],
      };
    } catch (error) {
      this.logger.error('Error in chatbot service:', error);
      
      // Obsługa błędu braku środków na koncie OpenAI
      if (error.status === 429 && error.code === 'insufficient_quota') {
        throw new Error('Chatbot jest tymczasowo niedostępny. Skontaktuj się z administratorem.');
      }
      
      throw new Error('Nie udało się przetworzyć wiadomości');
    }
  }

  private async getProductsContext(): Promise<string> {
    try {
      // Pobierz wszystkie produkty z każdej kategorii (max 50 na kategorię dla optymalizacji)
      const [cpus, gpus, rams, ssds, hdds, motherboards, psus, coolers, monitors, cases] = await Promise.all([
        this.cpusService.findAll().then((items) => items.slice(0, 50)),
        this.gpusService.findAll().then((items) => items.slice(0, 50)),
        this.ramsService.findAll().then((items) => items.slice(0, 50)),
        this.ssdsService.findAll().then((items) => items.slice(0, 50)),
        this.hddsService.findAll().then((items) => items.slice(0, 50)),
        this.motherboardsService.findAll().then((items) => items.slice(0, 50)),
        this.psusService.findAll().then((items) => items.slice(0, 50)),
        this.cpuCoolersService.findAll().then((items) => items.slice(0, 50)),
        this.monitorsService.findAll().then((items) => items.slice(0, 50)),
        this.casesService.findAll().then((items) => items.slice(0, 50)),
      ]);

      // Formatuj informacje o produktach
      let context = 'Dostępne produkty w sklepie KlikKlak:\n\n';

      if (cpus.length > 0) {
        context += '=== PROCESORY ===\n';
        cpus.forEach((cpu) => {
          context += `- ${cpu.name} (${cpu.producer}): ${cpu.price} PLN, ${cpu.cores} rdzeni, ${cpu.threads} wątków, Socket: ${cpu.socket}\n`;
        });
        context += '\n';
      }

      if (gpus.length > 0) {
        context += '=== KARTY GRAFICZNE ===\n';
        gpus.forEach((gpu) => {
          context += `- ${gpu.name} (${gpu.producer}): ${gpu.price} PLN, VRAM: ${gpu.vram}, TDP: ${gpu.tdp}W\n`;
        });
        context += '\n';
      }

      if (rams.length > 0) {
        context += '=== PAMIĘĆ RAM ===\n';
        rams.forEach((ram) => {
          context += `- ${ram.name} (${ram.producer}): ${ram.price} PLN, ${ram.size}, ${ram.ramType}, ${ram.clock}\n`;
        });
        context += '\n';
      }

      if (ssds.length > 0) {
        context += '=== DYSKI SSD ===\n';
        ssds.forEach((ssd) => {
          context += `- ${ssd.name} (${ssd.producer}): ${ssd.price} PLN, ${ssd.size}, ${ssd.formFactor}, ${ssd.protocol}\n`;
        });
        context += '\n';
      }

      if (monitors.length > 0) {
        context += '=== MONITORY ===\n';
        monitors.forEach((monitor) => {
          context += `- ${monitor.name} (${monitor.producer}): ${monitor.price} PLN, ${monitor.size}", ${monitor.resolution}, ${monitor.refreshRate}\n`;
        });
        context += '\n';
      }

      return context;
    } catch (error) {
      this.logger.error('Error fetching products context:', error);
      return 'Produkty są obecnie niedostępne.';
    }
  }

  private buildSystemPrompt(): string {
    return `Jesteś asystentem sklepu komputerowego KlikKlak.

TWOJE ZADANIA:
- Doradzać w wyborze podzespołów komputerowych
- Komponować zestawy komputerowe sprawdzając kompatybilność
- Sugerować produkty w określonym budżecie

ZASADY:
1. Używaj funkcji search_* aby znaleźć produkty w bazie danych
2. Sprawdzaj kompatybilność:
   - Socket CPU musi pasować do płyty głównej
   - Typ RAM (DDR4/DDR5) musi pasować do płyty
   - Zasilacz musi być wystarczająco mocny (TDP CPU + GPU + 150W zapas)
3. Zawsze pytaj o budżet przed poleceniem produktów
4. Podawaj DOKŁADNE nazwy produktów i ceny w PLN
5. Odpowiadaj ZWIĘŹLE - max 3-4 zdania lub lista produktów

Przykład użycia:
User: "Pokaż mi procesory Intel do 1500 zł"
→ Wywołaj search_cpus(producer: "Intel", maxPrice: 1500)
→ Przedstaw wyniki użytkownikowi

User: "Złóż mi komputer za 5000 zł"
→ Podziel budżet (np. CPU 1500, GPU 2000, płyta 600, RAM 400, SSD 300, zasilacz 200)
→ Wywołaj search_* dla każdej kategorii
→ Sprawdź kompatybilność
→ Przedstaw zestaw`;
  }

  private async extractSuggestedProducts(
    assistantMessage: string,
  ): Promise<any[]> {
    return [];
  }
}
