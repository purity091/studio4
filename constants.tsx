
import React from 'react';
import { 
  Train, 
  Satellite, 
  Car, 
  Smartphone, 
  Coins, 
  Globe, 
  ShoppingBag, 
  Cpu, 
  Factory, 
  Rocket,
  ShieldCheck,
  Zap,
  TrendingUp,
  Target,
  BarChart,
  Lightbulb,
  Award,
  Globe2
} from 'lucide-react';
import { ColorTheme } from './types';

export const ICON_MAP: Record<string, React.ReactNode> = {
  train: <Train />,
  satellite: <Satellite />,
  car: <Car />,
  phone: <Smartphone />,
  gold: <Coins />,
  globe: <Globe />,
  shopping: <ShoppingBag />,
  cpu: <Cpu />,
  factory: <Factory />,
  rocket: <Rocket />,
  security: <ShieldCheck />,
  energy: <Zap />,
  trend: <TrendingUp />,
  target: <Target />,
  chart: <BarChart />,
  idea: <Lightbulb />,
  award: <Award />,
  world: <Globe2 />,
};

export const COLOR_THEMES: ColorTheme[] = [
  {
    name: "الأحمر الصيني",
    primary: "#CC0000",
    secondary: "#FFDE00",
    bg: "#FFFFFF",
    text: "#1A1A1A"
  },
  {
    name: "كحلي المستثمر",
    primary: "#0D1137",
    secondary: "#00E1C1",
    bg: "#FFFFFF",
    text: "#334155"
  },
  {
    name: "سيان الابتكار",
    primary: "#00E1C1",
    secondary: "#0D1137",
    bg: "#F8FAFC",
    text: "#1E293B"
  },
  {
    name: "فوشيا التحليل",
    primary: "#FF006E",
    secondary: "#3A86FF",
    bg: "#FFFFFF",
    text: "#2B2D42"
  },
  {
    name: "برتقالي الحركة",
    primary: "#FB5607",
    secondary: "#FFBE0B",
    bg: "#FFFFFF",
    text: "#14213D"
  },
  {
    name: "لايم النمو",
    primary: "#8AC926",
    secondary: "#1982C4",
    bg: "#FFFFFF",
    text: "#2D3142"
  },
  {
    name: "بنفسجي العمق",
    primary: "#7209B7",
    secondary: "#4361EE",
    bg: "#FDFCFE",
    text: "#011627"
  },
  {
    name: "الوضع الداكن",
    primary: "#00E1C1",
    secondary: "#FF006E",
    bg: "#0D1137",
    text: "#F8FAFC"
  }
];

export const DEFAULT_PROJECT = {
  title: "مشروع إنفوجرافيك جديد",
  slides: [
    {
      id: '1',
      header: '"صُنع في الصين"',
      subHeader: "شعار يقود بكين للتواجد في كل منزل بالعالم",
      mainImageUrl: "https://picsum.photos/seed/china/800/800",
      logoUrl: "",
      accentColor: "#CC0000",
      secondaryColor: "#FFDE00",
      backgroundColor: "#FFFFFF",
      textColor: "#1A1A1A",
      customCSS: "/* أضف أكواد CSS هنا لتخصيص الشريحة */\n.canvas-header {\n  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);\n}",
      points: [
        { id: 'p1', title: 'الأقمار الصناعية', description: '48.5 مليار دولار.. قيمة الإنتاج في 2019', icon: 'satellite', angle: 270 },
        { id: 'p2', title: 'السيارات', description: 'الصين مركزاً عالمياً للتصنيع. 26 مليون سيارة مبيعات', icon: 'car', angle: 330 },
        { id: 'p3', title: 'الهواتف', description: 'تصنع 70% من الهواتف الذكية حول العالم', icon: 'phone', angle: 30 },
        { id: 'p4', title: 'الذهب', description: 'ضمن قائمة أكبر 10 دول لديها أكبر احتياطي', icon: 'gold', angle: 90 },
        { id: 'p5', title: 'التكنولوجيا', description: 'رائدة عالمياً في صناعة القطارات المتطورة', icon: 'cpu', angle: 150 },
        { id: 'p6', title: 'الفضاء', description: 'طموحات عالمية في استكشاف الفضاء الخارجي', icon: 'rocket', angle: 210 },
      ]
    }
  ]
};
