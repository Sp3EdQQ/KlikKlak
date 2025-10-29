import { Cpu, Monitor, HardDrive, Keyboard, Mouse, Headphones, MemoryStick, Zap } from 'lucide-react';
import type { CategoryData } from '@/types';

export const categories: CategoryData[] = [
    {
        title: 'Procesory',
        description: 'Intel & AMD CPUs',
        icon: Cpu,
        productsCount: 245,
    },
    {
        title: 'Monitory',
        description: 'NVIDIA & AMD GPUs',
        icon: Monitor,
        productsCount: 189,
    },
    {
        title: 'Dyski',
        description: 'SSD, NVMe, HDD',
        icon: HardDrive,
        productsCount: 312,
    },
    {
        title: 'Pamięć',
        description: 'DDR4 & DDR5 RAM',
        icon: MemoryStick,
        productsCount: 428,
    },
    {
        title: 'Klawiatury',
        description: 'Mechaniczne i membranowe',
        icon: Keyboard,
        productsCount: 567,
    },
    {
        title: 'Myszki',
        description: 'Gaming & biurowe',
        icon: Mouse,
        productsCount: 198,
    },
    {
        title: 'Słuchawki',
        description: 'Gaming & profesjonalne',
        icon: Headphones,
        productsCount: 276,
    },
    {
        title: 'Zasilacze',
        description: 'Modułowe i standardowe',
        icon: Zap,
        productsCount: 334,
    },
];
