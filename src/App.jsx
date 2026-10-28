import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Line, Legend, Cell, ComposedChart,
  PieChart, Pie, ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
  CheckCircle2, XCircle, ChevronDown, Filter,
  Users, Newspaper, ExternalLink
} from 'lucide-react';
import { BRAZIL_MAP_PATHS } from './data/brazilMapPaths';
import {
  TIPO_ACIDENTE_VEICULOS_DATA,
  CAUSA_PESSOAS_DATA,
  CLIMA_VITIMAS_DATA
} from './data/novasAnalisesData';
import { CADERNOS_JORNAL } from './data/noticiasJornalData';
import Version1App from './Version1App';

// 8 imagens do documento enviado pela usuária (sem títulos sobrepostos e com bordas arredondadas)
const HERO_IMAGES = [
  "https://www.uninter.com/noticias/wp-content/uploads/2022/01/noticias_acidente_em_sao_paulo.jpg",
  "https://piracicaba.sp.gov.br/wp-content/uploads/2025/05/Simulado-de-acidente-de-transito-com-multiplas-vitimas-aconteceu-no-centro-da-cidade-9-scaled.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwA5FIotKaOQ2fu5bNmnfPbOuTspoS2DepLnOcGc02kkBB8VP7IUaJDZau&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2t8fQzqYDsk1P1d2GNCEgO0N8eKqJTMXOcz7RpjL2xu_VTSA5chO5Y5_&s=10",
  "https://www.acidadeon.com/ribeiraopreto/wp-content/uploads/sites/3/2026/01/WhatsApp-Image-2026-01-08-at-09.26.06_2026-01-08_13-18-50.webp",
  "https://i.metroimg.com/rbWWhIqm7SHOTik2wtT1GTZzgfBHmggXSds8uX7BVBA/w:600/q:85/f:webp/plain/https://images.metroimg.com/2026/04/whatsapp-image-2026-04-28-at-204637-2.jpeg",
  "https://static.poder360.com.br/uploads/2025/07/Acidente-em-estrada-848x477.jpg",
  "https://s2-g1.glbimg.com/PJBzQV-H3oBrojdJIoPxQPP4mnY=/0x0:1200x900/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/z/S/7CqwNfRLexTKbN8BSXmg/whatsapp-image-2025-09-23-at-08.18.09-1-.jpeg"
];

const FASE_DIA_DATA = [
  {
    fase: 'Pleno dia',
    acidentes: 214387,
    feridos: 252853,
    mortos: 12954,
    taxa_mortalidade: 6.04,
    taxa_feridos: 117.94,
    mortos_por_100_feridos: 5.12,
    razao_mortos_por_ferido: 0.0512,
    risco: 'Moderado'
  },
  {
    fase: 'Plena noite',
    acidentes: 136482,
    feridos: 148549,
    mortos: 15728,
    taxa_mortalidade: 11.52,
    taxa_feridos: 108.84,
    mortos_por_100_feridos: 10.59,
    razao_mortos_por_ferido: 0.1059,
    risco: 'Crítico'
  },
  {
    fase: 'Anoitecer',
    acidentes: 21512,
    feridos: 25041,
    mortos: 1670,
    taxa_mortalidade: 7.76,
    taxa_feridos: 116.40,
    mortos_por_100_feridos: 6.67,
    razao_mortos_por_ferido: 0.0667,
    risco: 'Alto'
  },
  {
    fase: 'Amanhecer',
    acidentes: 19001,
    feridos: 21122,
    mortos: 2440,
    taxa_mortalidade: 12.84,
    taxa_feridos: 111.16,
    mortos_por_100_feridos: 11.55,
    razao_mortos_por_ferido: 0.1155,
    risco: 'Extremo'
  }
];

const ANOS_SERIE = [
  { ano: '2021', acidentes: 64567, feridos: 71890, mortos: 5396, letalidade: 8.36, custo_bilhoes: 12.1 },
  { ano: '2022', acidentes: 64606, feridos: 72940, mortos: 5441, letalidade: 8.42, custo_bilhoes: 12.9 },
  { ano: '2023', acidentes: 67766, feridos: 78055, mortos: 5636, letalidade: 8.32, custo_bilhoes: 14.4 },
  { ano: '2024', acidentes: 73202, feridos: 84590, mortos: 6163, letalidade: 8.42, custo_bilhoes: 16.2 },
  { ano: '2025', acidentes: 72529, feridos: 83610, mortos: 6043, letalidade: 8.33, custo_bilhoes: 16.8 },
  { ano: '2026*', acidentes: 48712, feridos: 56480, mortos: 4113, letalidade: 8.44, custo_bilhoes: 11.4 }
];

const DIAS_SEMANA_GERAL = [
  { dia: 'Segunda', acidentes: 53120, mortos: 4290, letalidade: 8.08 },
  { dia: 'Terça', acidentes: 48343, mortos: 3583, letalidade: 7.41 },
  { dia: 'Quarta', acidentes: 49890, mortos: 3720, letalidade: 7.46 },
  { dia: 'Quinta', acidentes: 51594, mortos: 3943, letalidade: 7.64 },
  { dia: 'Sexta', acidentes: 60556, mortos: 4920, letalidade: 8.12 },
  { dia: 'Sábado', acidentes: 63786, mortos: 5754, letalidade: 9.02 },
  { dia: 'Domingo', acidentes: 64093, mortos: 6582, letalidade: 10.27 }
];

// Corredores Rodoviários Federais destacados nas notícias (PRF / CNT 2021-2026)
const CORREDORES_BR_CRITICOS = [
  { br: 'BR-101 (SC/RJ/NE)', acidentes: 54820, mortos: 3680, letalidade: 6.71, perfil: 'Trecho urbano de São José/Palhoça (SC) lidera volume nacional' },
  { br: 'BR-116 (MG/BA/SP/PR)', acidentes: 52410, mortos: 5490, letalidade: 10.48, perfil: 'Líder absoluta em mortes; inclui Teófilo Otoni (MG) e sertão da BA' },
  { br: 'BR-381 (MG/SP)', acidentes: 21890, mortos: 1940, letalidade: 8.86, perfil: 'Conhecida como Rodovia da Morte em MG pelo relevo sinuoso' },
  { br: 'BR-040 (MG/RJ/DF/GO)', acidentes: 18420, mortos: 1460, letalidade: 7.93, perfil: 'Corredor pesado de mineração e ligação Brasília-Sudeste' },
  { br: 'BR-153 (GO/TO/SP/PR)', acidentes: 16750, mortos: 1890, letalidade: 11.28, perfil: 'Eixo Belém-Brasília com longas retas de pista simples' },
  { br: 'BR-277 (PR)', acidentes: 14920, mortos: 1320, letalidade: 8.85, perfil: 'Corredor de exportação ao Porto de Paranaguá e neblina na serra' },
  { br: 'BR-376 (PR/SC/MS)', acidentes: 13640, mortos: 1080, letalidade: 7.92, perfil: 'Ligação PR-SC na Serra do Mar com tráfego intenso de carretas' },
  { br: 'BR-163 (MT/MS/PR/PA)', acidentes: 12980, mortos: 1580, letalidade: 12.17, perfil: 'Corredor de escoamento da safra de grãos com colisões frontais' },
  { br: 'BR-316 (PA/MA/PI/AL)', acidentes: 9420, mortos: 1510, letalidade: 16.03, perfil: 'Conflito severo entre carretas e motocicletas no Norte e Nordeste' },
  { br: 'BR-135 (MA/PI/MG)', acidentes: 7840, mortos: 1380, letalidade: 17.60, perfil: 'Acesso ao Porto do Itaqui (MA) com altíssima letalidade por batida' }
];

const ESTADOS_COMPLETE_DATA = {
  MG: {
    nome: 'Minas Gerais', uf: 'MG', regiao: 'Sudeste',
    acidentes: 50615, feridos: 60571, mortos: 4304, veiculos: 94180,
    letalidade: 8.50, br_critica: 'BR-381 / BR-116 / BR-040',
    dias: [
      { dia: 'Seg', acidentes: 6910, mortos: 560 },
      { dia: 'Ter', acidentes: 6280, mortos: 470 },
      { dia: 'Qua', acidentes: 6490, mortos: 485 },
      { dia: 'Qui', acidentes: 6720, mortos: 512 },
      { dia: 'Sex', acidentes: 7850, mortos: 640 },
      { dia: 'Sáb', acidentes: 8140, mortos: 765 },
      { dia: 'Dom', acidentes: 8225, mortos: 872 }
    ]
  },
  SC: {
    nome: 'Santa Catarina', uf: 'SC', regiao: 'Sul',
    acidentes: 45280, feridos: 49810, mortos: 2190, veiculos: 89650,
    letalidade: 4.84, br_critica: 'BR-101 / BR-470 / BR-282',
    dias: [
      { dia: 'Seg', acidentes: 6290, mortos: 280 },
      { dia: 'Ter', acidentes: 5780, mortos: 245 },
      { dia: 'Qua', acidentes: 5950, mortos: 255 },
      { dia: 'Qui', acidentes: 6180, mortos: 270 },
      { dia: 'Sex', acidentes: 7210, mortos: 335 },
      { dia: 'Sáb', acidentes: 7040, mortos: 385 },
      { dia: 'Dom', acidentes: 6830, mortos: 420 }
    ]
  },
  PR: {
    nome: 'Paraná', uf: 'PR', regiao: 'Sul',
    acidentes: 41320, feridos: 46280, mortos: 3302, veiculos: 79410,
    letalidade: 7.99, br_critica: 'BR-277 / BR-376 / BR-116',
    dias: [
      { dia: 'Seg', acidentes: 5680, mortos: 430 },
      { dia: 'Ter', acidentes: 5120, mortos: 365 },
      { dia: 'Qua', acidentes: 5290, mortos: 380 },
      { dia: 'Qui', acidentes: 5490, mortos: 405 },
      { dia: 'Sex', acidentes: 6480, mortos: 502 },
      { dia: 'Sáb', acidentes: 6620, mortos: 580 },
      { dia: 'Dom', acidentes: 6640, mortos: 640 }
    ]
  },
  RJ: {
    nome: 'Rio de Janeiro', uf: 'RJ', regiao: 'Sudeste',
    acidentes: 30420, feridos: 34120, mortos: 1692, veiculos: 61200,
    letalidade: 5.56, br_critica: 'BR-101 / BR-116 (Dutra) / BR-040',
    dias: [
      { dia: 'Seg', acidentes: 4210, mortos: 215 },
      { dia: 'Ter', acidentes: 3840, mortos: 185 },
      { dia: 'Qua', acidentes: 3960, mortos: 192 },
      { dia: 'Qui', acidentes: 4110, mortos: 205 },
      { dia: 'Sex', acidentes: 4780, mortos: 255 },
      { dia: 'Sáb', acidentes: 4790, mortos: 305 },
      { dia: 'Dom', acidentes: 4730, mortos: 335 }
    ]
  },
  RS: {
    nome: 'Rio Grande do Sul', uf: 'RS', regiao: 'Sul',
    acidentes: 28190, feridos: 31450, mortos: 2015, veiculos: 54890,
    letalidade: 7.15, br_critica: 'BR-116 / BR-386 / BR-290',
    dias: [
      { dia: 'Seg', acidentes: 3850, mortos: 255 },
      { dia: 'Ter', acidentes: 3510, mortos: 220 },
      { dia: 'Qua', acidentes: 3620, mortos: 230 },
      { dia: 'Qui', acidentes: 3760, mortos: 245 },
      { dia: 'Sex', acidentes: 4410, mortos: 305 },
      { dia: 'Sáb', acidentes: 4540, mortos: 360 },
      { dia: 'Dom', acidentes: 4500, mortos: 400 }
    ]
  },
  SP: {
    nome: 'São Paulo', uf: 'SP', regiao: 'Sudeste',
    acidentes: 26840, feridos: 29870, mortos: 1304, veiculos: 56420,
    letalidade: 4.86, br_critica: 'BR-116 (Dutra e Régis) / BR-153',
    dias: [
      { dia: 'Seg', acidentes: 3740, mortos: 170 },
      { dia: 'Ter', acidentes: 3480, mortos: 150 },
      { dia: 'Qua', acidentes: 3590, mortos: 155 },
      { dia: 'Qui', acidentes: 3720, mortos: 165 },
      { dia: 'Sex', acidentes: 4290, mortos: 202 },
      { dia: 'Sáb', acidentes: 4080, mortos: 222 },
      { dia: 'Dom', acidentes: 3940, mortos: 240 }
    ]
  },
  BA: {
    nome: 'Bahia', uf: 'BA', regiao: 'Nordeste',
    acidentes: 21620, feridos: 25940, mortos: 3195, veiculos: 39850,
    letalidade: 14.78, br_critica: 'BR-116 / BR-101 / BR-242',
    dias: [
      { dia: 'Seg', acidentes: 2910, mortos: 410 },
      { dia: 'Ter', acidentes: 2620, mortos: 350 },
      { dia: 'Qua', acidentes: 2710, mortos: 365 },
      { dia: 'Qui', acidentes: 2840, mortos: 390 },
      { dia: 'Sex', acidentes: 3320, mortos: 480 },
      { dia: 'Sáb', acidentes: 3580, mortos: 565 },
      { dia: 'Dom', acidentes: 3640, mortos: 635 }
    ]
  },
  GO: {
    nome: 'Goiás', uf: 'GO', regiao: 'Centro-Oeste',
    acidentes: 18450, feridos: 21120, mortos: 1680, veiculos: 35120,
    letalidade: 9.11, br_critica: 'BR-153 / BR-060 / BR-040',
    dias: [
      { dia: 'Seg', acidentes: 2490, mortos: 215 },
      { dia: 'Ter', acidentes: 2240, mortos: 182 },
      { dia: 'Qua', acidentes: 2310, mortos: 190 },
      { dia: 'Qui', acidentes: 2420, mortos: 205 },
      { dia: 'Sex', acidentes: 2860, mortos: 255 },
      { dia: 'Sáb', acidentes: 3040, mortos: 298 },
      { dia: 'Dom', acidentes: 3090, mortos: 335 }
    ]
  },
  PE: {
    nome: 'Pernambuco', uf: 'PE', regiao: 'Nordeste',
    acidentes: 15890, feridos: 18420, mortos: 1790, veiculos: 29840,
    letalidade: 11.26, br_critica: 'BR-101 / BR-232 / BR-428',
    dias: [
      { dia: 'Seg', acidentes: 2150, mortos: 228 },
      { dia: 'Ter', acidentes: 1940, mortos: 192 },
      { dia: 'Qua', acidentes: 2010, mortos: 202 },
      { dia: 'Qui', acidentes: 2090, mortos: 215 },
      { dia: 'Sex', acidentes: 2450, mortos: 270 },
      { dia: 'Sáb', acidentes: 2610, mortos: 320 },
      { dia: 'Dom', acidentes: 2640, mortos: 363 }
    ]
  },
  MT: {
    nome: 'Mato Grosso', uf: 'MT', regiao: 'Centro-Oeste',
    acidentes: 13420, feridos: 15180, mortos: 1520, veiculos: 25890,
    letalidade: 11.33, br_critica: 'BR-163 / BR-364 / BR-070',
    dias: [
      { dia: 'Seg', acidentes: 1840, mortos: 198 },
      { dia: 'Ter', acidentes: 1690, mortos: 172 },
      { dia: 'Qua', acidentes: 1740, mortos: 180 },
      { dia: 'Qui', acidentes: 1810, mortos: 192 },
      { dia: 'Sex', acidentes: 2080, mortos: 232 },
      { dia: 'Sáb', acidentes: 2140, mortos: 262 },
      { dia: 'Dom', acidentes: 2120, mortos: 284 }
    ]
  },
  ES: {
    nome: 'Espírito Santo', uf: 'ES', regiao: 'Sudeste',
    acidentes: 12940, feridos: 15210, mortos: 1045, veiculos: 24980,
    letalidade: 8.08, br_critica: 'BR-101 / BR-262',
    dias: [
      { dia: 'Seg', acidentes: 1760, mortos: 135 },
      { dia: 'Ter', acidentes: 1590, mortos: 115 },
      { dia: 'Qua', acidentes: 1640, mortos: 120 },
      { dia: 'Qui', acidentes: 1710, mortos: 128 },
      { dia: 'Sex', acidentes: 2010, mortos: 160 },
      { dia: 'Sáb', acidentes: 2110, mortos: 185 },
      { dia: 'Dom', acidentes: 2120, mortos: 202 }
    ]
  },
  MS: {
    nome: 'Mato Grosso do Sul', uf: 'MS', regiao: 'Centro-Oeste',
    acidentes: 9840, feridos: 11420, mortos: 980, veiculos: 18450,
    letalidade: 9.96, br_critica: 'BR-163 / BR-262 / BR-267',
    dias: [
      { dia: 'Seg', acidentes: 1340, mortos: 125 },
      { dia: 'Ter', acidentes: 1210, mortos: 108 },
      { dia: 'Qua', acidentes: 1250, mortos: 112 },
      { dia: 'Qui', acidentes: 1300, mortos: 120 },
      { dia: 'Sex', acidentes: 1520, mortos: 148 },
      { dia: 'Sáb', acidentes: 1610, mortos: 175 },
      { dia: 'Dom', acidentes: 1610, mortos: 192 }
    ]
  },
  PB: {
    nome: 'Paraíba', uf: 'PB', regiao: 'Nordeste',
    acidentes: 9120, feridos: 10840, mortos: 920, veiculos: 16920,
    letalidade: 10.09, br_critica: 'BR-230 / BR-101',
    dias: [
      { dia: 'Seg', acidentes: 1210, mortos: 115 },
      { dia: 'Ter', acidentes: 1090, mortos: 98 },
      { dia: 'Qua', acidentes: 1130, mortos: 102 },
      { dia: 'Qui', acidentes: 1180, mortos: 110 },
      { dia: 'Sex', acidentes: 1410, mortos: 138 },
      { dia: 'Sáb', acidentes: 1530, mortos: 168 },
      { dia: 'Dom', acidentes: 1570, mortos: 189 }
    ]
  },
  CE: {
    nome: 'Ceará', uf: 'CE', regiao: 'Nordeste',
    acidentes: 8950, feridos: 10620, mortos: 1120, veiculos: 16780,
    letalidade: 12.51, br_critica: 'BR-116 / BR-222 / BR-020',
    dias: [
      { dia: 'Seg', acidentes: 1190, mortos: 140 },
      { dia: 'Ter', acidentes: 1070, mortos: 118 },
      { dia: 'Qua', acidentes: 1110, mortos: 125 },
      { dia: 'Qui', acidentes: 1160, mortos: 132 },
      { dia: 'Sex', acidentes: 1380, mortos: 168 },
      { dia: 'Sáb', acidentes: 1510, mortos: 205 },
      { dia: 'Dom', acidentes: 1530, mortos: 232 }
    ]
  },
  RN: {
    nome: 'Rio Grande do Norte', uf: 'RN', regiao: 'Nordeste',
    acidentes: 8140, feridos: 9520, mortos: 740, veiculos: 15210,
    letalidade: 9.09, br_critica: 'BR-101 / BR-304 / BR-226',
    dias: [
      { dia: 'Seg', acidentes: 1090, mortos: 92 },
      { dia: 'Ter', acidentes: 980, mortos: 78 },
      { dia: 'Qua', acidentes: 1020, mortos: 82 },
      { dia: 'Qui', acidentes: 1060, mortos: 88 },
      { dia: 'Sex', acidentes: 1260, mortos: 112 },
      { dia: 'Sáb', acidentes: 1360, mortos: 136 },
      { dia: 'Dom', acidentes: 1370, mortos: 152 }
    ]
  },
  MA: {
    nome: 'Maranhão', uf: 'MA', regiao: 'Nordeste',
    acidentes: 7620, feridos: 9140, mortos: 1340, veiculos: 13890,
    letalidade: 17.59, br_critica: 'BR-135 / BR-316 / BR-010',
    dias: [
      { dia: 'Seg', acidentes: 1010, mortos: 168 },
      { dia: 'Ter', acidentes: 910, mortos: 142 },
      { dia: 'Qua', acidentes: 940, mortos: 148 },
      { dia: 'Qui', acidentes: 980, mortos: 158 },
      { dia: 'Sex', acidentes: 1180, mortos: 202 },
      { dia: 'Sáb', acidentes: 1290, mortos: 248 },
      { dia: 'Dom', acidentes: 1310, mortos: 274 }
    ]
  },
  PI: {
    nome: 'Piauí', uf: 'PI', regiao: 'Nordeste',
    acidentes: 7210, feridos: 8690, mortos: 1060, veiculos: 13420,
    letalidade: 14.70, br_critica: 'BR-343 / BR-316 / BR-135',
    dias: [
      { dia: 'Seg', acidentes: 950, mortos: 132 },
      { dia: 'Ter', acidentes: 860, mortos: 112 },
      { dia: 'Qua', acidentes: 890, mortos: 118 },
      { dia: 'Qui', acidentes: 930, mortos: 125 },
      { dia: 'Sex', acidentes: 1110, mortos: 160 },
      { dia: 'Sáb', acidentes: 1220, mortos: 195 },
      { dia: 'Dom', acidentes: 1250, mortos: 218 }
    ]
  },
  PA: {
    nome: 'Pará', uf: 'PA', regiao: 'Norte',
    acidentes: 6980, feridos: 8340, mortos: 1150, veiculos: 12840,
    letalidade: 16.48, br_critica: 'BR-316 / BR-010 / BR-230',
    dias: [
      { dia: 'Seg', acidentes: 920, mortos: 144 },
      { dia: 'Ter', acidentes: 830, mortos: 122 },
      { dia: 'Qua', acidentes: 860, mortos: 128 },
      { dia: 'Qui', acidentes: 900, mortos: 136 },
      { dia: 'Sex', acidentes: 1080, mortos: 174 },
      { dia: 'Sáb', acidentes: 1180, mortos: 212 },
      { dia: 'Dom', acidentes: 1210, mortos: 234 }
    ]
  },
  RO: {
    nome: 'Rondônia', uf: 'RO', regiao: 'Norte',
    acidentes: 6840, feridos: 8120, mortos: 690, veiculos: 12950,
    letalidade: 10.09, br_critica: 'BR-364',
    dias: [
      { dia: 'Seg', acidentes: 920, mortos: 88 },
      { dia: 'Ter', acidentes: 830, mortos: 74 },
      { dia: 'Qua', acidentes: 860, mortos: 78 },
      { dia: 'Qui', acidentes: 890, mortos: 82 },
      { dia: 'Sex', acidentes: 1060, mortos: 104 },
      { dia: 'Sáb', acidentes: 1130, mortos: 126 },
      { dia: 'Dom', acidentes: 1150, mortos: 138 }
    ]
  },
  DF: {
    nome: 'Distrito Federal', uf: 'DF', regiao: 'Centro-Oeste',
    acidentes: 6120, feridos: 6980, mortos: 310, veiculos: 12450,
    letalidade: 5.07, br_critica: 'BR-020 / BR-040 / BR-070',
    dias: [
      { dia: 'Seg', acidentes: 860, mortos: 40 },
      { dia: 'Ter', acidentes: 790, mortos: 34 },
      { dia: 'Qua', acidentes: 810, mortos: 36 },
      { dia: 'Qui', acidentes: 840, mortos: 38 },
      { dia: 'Sex', acidentes: 970, mortos: 48 },
      { dia: 'Sáb', acidentes: 940, mortos: 54 },
      { dia: 'Dom', acidentes: 910, mortos: 60 }
    ]
  },
  AL: {
    nome: 'Alagoas', uf: 'AL', regiao: 'Nordeste',
    acidentes: 4180, feridos: 5020, mortos: 610, veiculos: 7690,
    letalidade: 14.59, br_critica: 'BR-101 / BR-316 / BR-104',
    dias: [
      { dia: 'Seg', acidentes: 550, mortos: 76 },
      { dia: 'Ter', acidentes: 500, mortos: 64 },
      { dia: 'Qua', acidentes: 520, mortos: 68 },
      { dia: 'Qui', acidentes: 540, mortos: 72 },
      { dia: 'Sex', acidentes: 640, mortos: 92 },
      { dia: 'Sáb', acidentes: 710, mortos: 112 },
      { dia: 'Dom', acidentes: 720, mortos: 126 }
    ]
  },
  SE: {
    nome: 'Sergipe', uf: 'SE', regiao: 'Nordeste',
    acidentes: 3690, feridos: 4380, mortos: 440, veiculos: 6890,
    letalidade: 11.92, br_critica: 'BR-101 / BR-235',
    dias: [
      { dia: 'Seg', acidentes: 490, mortos: 55 },
      { dia: 'Ter', acidentes: 440, mortos: 46 },
      { dia: 'Qua', acidentes: 460, mortos: 48 },
      { dia: 'Qui', acidentes: 480, mortos: 52 },
      { dia: 'Sex', acidentes: 570, mortos: 66 },
      { dia: 'Sáb', acidentes: 620, mortos: 82 },
      { dia: 'Dom', acidentes: 630, mortos: 91 }
    ]
  },
  TO: {
    nome: 'Tocantins', uf: 'TO', regiao: 'Norte',
    acidentes: 3540, feridos: 4210, mortos: 540, veiculos: 6680,
    letalidade: 15.25, br_critica: 'BR-153 (Belém-Brasília)',
    dias: [
      { dia: 'Seg', acidentes: 470, mortos: 68 },
      { dia: 'Ter', acidentes: 430, mortos: 58 },
      { dia: 'Qua', acidentes: 440, mortos: 60 },
      { dia: 'Qui', acidentes: 460, mortos: 64 },
      { dia: 'Sex', acidentes: 550, mortos: 82 },
      { dia: 'Sáb', acidentes: 590, mortos: 98 },
      { dia: 'Dom', acidentes: 600, mortos: 110 }
    ]
  },
  AC: {
    nome: 'Acre', uf: 'AC', regiao: 'Norte',
    acidentes: 1420, feridos: 1690, mortos: 145, veiculos: 2610,
    letalidade: 10.21, br_critica: 'BR-364 / BR-317',
    dias: [
      { dia: 'Seg', acidentes: 190, mortos: 18 },
      { dia: 'Ter', acidentes: 170, mortos: 15 },
      { dia: 'Qua', acidentes: 175, mortos: 16 },
      { dia: 'Qui', acidentes: 185, mortos: 17 },
      { dia: 'Sex', acidentes: 220, mortos: 22 },
      { dia: 'Sáb', acidentes: 240, mortos: 27 },
      { dia: 'Dom', acidentes: 240, mortos: 30 }
    ]
  },
  AP: {
    nome: 'Amapá', uf: 'AP', regiao: 'Norte',
    acidentes: 1120, feridos: 1380, mortos: 125, veiculos: 2040,
    letalidade: 11.16, br_critica: 'BR-156 / BR-210',
    dias: [
      { dia: 'Seg', acidentes: 150, mortos: 15 },
      { dia: 'Ter', acidentes: 135, mortos: 13 },
      { dia: 'Qua', acidentes: 140, mortos: 14 },
      { dia: 'Qui', acidentes: 145, mortos: 15 },
      { dia: 'Sex', acidentes: 175, mortos: 19 },
      { dia: 'Sáb', acidentes: 185, mortos: 23 },
      { dia: 'Dom', acidentes: 190, mortos: 26 }
    ]
  },
  RR: {
    nome: 'Roraima', uf: 'RR', regiao: 'Norte',
    acidentes: 980, feridos: 1190, mortos: 145, veiculos: 1790,
    letalidade: 14.80, br_critica: 'BR-174',
    dias: [
      { dia: 'Seg', acidentes: 130, mortos: 18 },
      { dia: 'Ter', acidentes: 115, mortos: 15 },
      { dia: 'Qua', acidentes: 120, mortos: 16 },
      { dia: 'Qui', acidentes: 125, mortos: 17 },
      { dia: 'Sex', acidentes: 150, mortos: 22 },
      { dia: 'Sáb', acidentes: 170, mortos: 27 },
      { dia: 'Dom', acidentes: 170, mortos: 30 }
    ]
  },
  AM: {
    nome: 'Amazonas', uf: 'AM', regiao: 'Norte',
    acidentes: 607, feridos: 744, mortos: 96, veiculos: 1127,
    letalidade: 15.81, br_critica: 'BR-174 / BR-319',
    dias: [
      { dia: 'Seg', acidentes: 80, mortos: 12 },
      { dia: 'Ter', acidentes: 72, mortos: 10 },
      { dia: 'Qua', acidentes: 75, mortos: 10 },
      { dia: 'Qui', acidentes: 78, mortos: 11 },
      { dia: 'Sex', acidentes: 94, mortos: 15 },
      { dia: 'Sáb', acidentes: 103, mortos: 18 },
      { dia: 'Dom', acidentes: 105, mortos: 20 }
    ]
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Em qual condição meteorológica ocorre a maior quantidade absoluta de acidentes nas rodovias federais brasileiras?",
    options: [
      { text: "Chuva intensa", isCorrect: false },
      { text: "Céu Claro (tempo aberto)", isCorrect: true },
      { text: "Nevoeiro ou Neblina", isCorrect: false },
      { text: "Nublado com vento forte", isCorrect: false }
    ],
    correctFeedback: "Correto. Sob Céu Claro ocorrem 244.639 acidentes e 21.089 mortes na base da PRF. A visibilidade plena e a pista seca reduzem a cautela do motorista, elevando a velocidade média.",
    wrongFeedback: "Incorreto. Embora a chuva e a neblina reduzam a aderência e a visibilidade, a grande maioria dos acidentes e óbitos ocorre sob Céu Claro (244.639 acidentes), quando há maior fluxo e excesso de confiança."
  },
  {
    id: 2,
    question: "Qual fase do dia registra a maior taxa proporcional de letalidade (mortes a cada 100 acidentes e mortes por ferido)?",
    options: [
      { text: "Pleno dia", isCorrect: false },
      { text: "Anoitecer", isCorrect: false },
      { text: "Amanhecer", isCorrect: true },
      { text: "Meio-dia", isCorrect: false }
    ],
    correctFeedback: "Exato. O Amanhecer registra 12,84% de taxa de mortalidade e 11,55 mortos para cada 100 feridos, combinando fadiga acumulada da madrugada, pista livre e transição de luminosidade.",
    wrongFeedback: "Incorreto. O período mais letal proporcionalmente é o Amanhecer (12,84% de letalidade e 11,55 mortos a cada 100 feridos), superando até mesmo a Plena Noite (11,52%) e o Pleno Dia (6,04%)."
  },
  {
    id: 3,
    question: "Qual estado brasileiro lidera em volume total de acidentes e também em número absoluto de vítimas fatais nas BRs?",
    options: [
      { text: "São Paulo (SP)", isCorrect: false },
      { text: "Minas Gerais (MG)", isCorrect: true },
      { text: "Santa Catarina (SC)", isCorrect: false },
      { text: "Paraná (PR)", isCorrect: false }
    ],
    correctFeedback: "Correto. Minas Gerais possui a maior malha rodoviária federal do país e lidera com 50.615 acidentes e 4.304 mortos no período analisado.",
    wrongFeedback: "Incorreto. O estado líder tanto em ocorrências (50.615) quanto em vítimas fatais (4.304) nas rodovias federais é Minas Gerais, cortado por eixos extensos de pista simples como a BR-381 e a BR-116."
  }
];

// Símbolo customizado para o ScatterChart: desenha múltiplos ícones de pessoas proporcionalmente ao total de envolvidos
const CustomPersonClusterShape = (props) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy || !payload) return null;

  const symbolCount = Math.max(1, Math.min(9, Math.round(payload.pessoas / 16000)));
  const isHighLethality = payload.mortos >= 3000;
  const fill = isHighLethality ? '#dc2626' : '#6b21a8';

  const offsets = [
    [0, 0],
    [-11, -7], [11, -7],
    [-11, 8], [11, 8],
    [0, -13], [0, 13],
    [-21, 0], [21, 0]
  ];

  return (
    <g transform={`translate(${cx},${cy})`} className="cursor-pointer">
      <circle
        r={14 + symbolCount * 2.2}
        fill={isHighLethality ? 'rgba(220, 38, 38, 0.12)' : 'rgba(107, 33, 168, 0.12)'}
        stroke={isHighLethality ? 'rgba(220, 38, 38, 0.45)' : 'rgba(107, 33, 168, 0.45)'}
        strokeWidth={1.2}
      />
      {offsets.slice(0, symbolCount).map(([dx, dy], idx) => (
        <g key={idx} transform={`translate(${dx}, ${dy})`}>
          <circle cx={0} cy={-3.5} r={2.4} fill={fill} />
          <path
            d="M -3.5 3.5 C -3.5 0, 3.5 0, 3.5 3.5 Z"
            fill={fill}
          />
        </g>
      ))}
    </g>
  );
};

export default function App() {
  const [siteVersion, setSiteVersion] = useState('v2');
  const [hoveredHeroIdx, setHoveredHeroIdx] = useState(null);

  // Tela inicial padrão é Estados (27 UFs)
  const [selectedAnalysis, setSelectedAnalysis] = useState('estados');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Estados e UF selecionada
  const [selectedUF, setSelectedUF] = useState('MG');
  const [hoveredUF, setHoveredUF] = useState(null);
  const [ufSortBy, setUfSortBy] = useState('acidentes');

  // Clima selecionado para inspeção detalhada + grade completa de pizzas
  const [selectedClima, setSelectedClima] = useState('Céu Claro');
  const [showFullClimaGrid, setShowFullClimaGrid] = useState(false);

  // Quiz interativo na capa escura
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  if (siteVersion === 'v1') {
    return (
      <div>
        <div className="bg-stone-900 text-stone-100 px-4 py-2.5 flex items-center justify-between border-b border-stone-700 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Você está visualizando a <strong>Versão 1 (Salva anteriormente)</strong></span>
          </div>
          <button
            onClick={() => setSiteVersion('v2')}
            className="px-3 py-1 rounded bg-stone-100 text-stone-900 font-semibold hover:bg-white transition"
          >
            Voltar para Versão 2 (Edição Jornalística)
          </button>
        </div>
        <Version1App />
      </div>
    );
  }

  const activeUFData = ESTADOS_COMPLETE_DATA[selectedUF] || ESTADOS_COMPLETE_DATA.MG;
  const previewUFData = hoveredUF && ESTADOS_COMPLETE_DATA[hoveredUF] ? ESTADOS_COMPLETE_DATA[hoveredUF] : activeUFData;
  const activeCaderno = CADERNOS_JORNAL.find((c) => c.id === selectedAnalysis) || CADERNOS_JORNAL[0];

  const sortedStatesList = Object.values(ESTADOS_COMPLETE_DATA).sort((a, b) => {
    if (ufSortBy === 'mortos') return b.mortos - a.mortos;
    if (ufSortBy === 'letalidade') return b.letalidade - a.letalidade;
    return b.acidentes - a.acidentes;
  });

  const activeClimaObj = CLIMA_VITIMAS_DATA.find((c) => c.condicao === selectedClima) || CLIMA_VITIMAS_DATA[0];

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-stone-900">
      {/* =====================================================================
          PARTE INICIAL ESCURA (#09090b)
         ===================================================================== */}
      <div className="bg-[#09090b] text-neutral-100 border-b border-stone-800">
        {/* Barra Superior */}
        <header className="bg-[#09090b] border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                Observatório Rodoviário • PRF
              </span>
              <span className="text-neutral-700">|</span>
              <span className="font-bold text-sm sm:text-base text-white">
                Acidentes em Rodovias Federais
              </span>
            </div>
          </div>
        </header>

        {/* Hero Section Escura */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Único título em fonte serifada, igual a como estava antes */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-5xl mx-auto">
              O quanto você sabe sobre os acidentes em rodovias brasileiras?
            </h1>

            {/* Subtítulo exato solicitado, com marca-texto vermelho apenas em "32 mil mortes" */}
            <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto">
              Entre janeiro de 2021 e os registros parciais de 2026, mais de 390 mil ocorrências registradas pela Polícia Rodoviária Federal. Mais de 447 mil feridos e <span className="mark-dark-red">32 mil mortes</span>.
            </p>
          </div>

          {/* Galeria Interativa no tamanho original (w-20 sm:w-24 hover:w-64 sm:hover:w-80) e em preto e branco (grayscale) com as 8 fotos novas */}
          <div className="mt-10 overflow-x-auto pb-4 pt-2 scrollbar-none">
            <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[750px] px-4">
              {HERO_IMAGES.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="group relative h-72 sm:h-80 w-20 sm:w-24 hover:w-64 sm:hover:w-80 transition-all duration-500 ease-out rounded-lg overflow-hidden border border-neutral-800 hover:border-red-600 shadow-lg cursor-pointer flex-shrink-0"
                >
                  <img
                    src={imgUrl}
                    alt=""
                    className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-80 group-hover:opacity-30 transition" />
                </div>
              ))}
            </div>
          </div>

          {/* 4 Contadores com redução proporcional de 10% no padding, tipografia e largura máxima */}
          <div className="mt-7 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="py-4 px-4 rounded-xl border border-neutral-800 bg-[#111113]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Total de Acidentes</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">391.382</p>
              <p className="text-[11px] text-neutral-400 mt-1">Ocorrências atendidas pela PRF</p>
            </div>
            <div className="py-4 px-4 rounded-xl border border-neutral-800 bg-[#111113]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Veículos Envolvidos</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">746.587</p>
              <p className="text-[11px] text-neutral-400 mt-1">Média de 1,91 veículo por sinistro</p>
            </div>
            <div className="py-4 px-4 rounded-xl border border-neutral-800 bg-[#111113]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Total de Feridos</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">447.565</p>
              <p className="text-[11px] text-neutral-400 mt-1">114,3 feridos a cada 100 acidentes</p>
            </div>
            <div className="py-4 px-4 rounded-xl border-2 border-red-600 bg-[#111113]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-red-400">Vítimas Fatais</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">32.792</p>
              <p className="text-[11px] text-neutral-400 mt-1">Letalidade média de 8,38%</p>
            </div>
          </div>

          {/* Quiz Opcional na Abertura Escura */}
          {showQuiz && (
            <div className="mt-6 bg-[#141417] border border-neutral-800 rounded-xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Teste rápido: percepção versus dados oficiais da PRF
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Selecione uma alternativa em cada pergunta para conferir a explicação técnica.
                  </p>
                </div>
                <button
                  onClick={() => setQuizAnswers({})}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Limpar respostas
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {QUIZ_QUESTIONS.map((q) => {
                  const selectedIdx = quizAnswers[q.id];
                  const answered = selectedIdx !== undefined;
                  const isCorrect = answered && q.options[selectedIdx]?.isCorrect;
                  return (
                    <div key={q.id} className="p-4 rounded-lg border border-neutral-800 bg-[#0d0d10] flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">Questão 0{q.id}</p>
                        <p className="text-sm font-semibold text-neutral-100 mb-3">{q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => {
                            let btnStyle = 'border-neutral-800 bg-neutral-900/70 hover:bg-neutral-800 text-neutral-300';
                            if (answered) {
                              if (opt.isCorrect) {
                                btnStyle = 'border-emerald-600/80 bg-emerald-950/50 text-emerald-200 font-medium';
                              } else if (selectedIdx === oIdx) {
                                btnStyle = 'border-red-600/80 bg-red-950/50 text-red-200 font-medium';
                              } else {
                                btnStyle = 'border-neutral-800/50 bg-neutral-950 text-neutral-600';
                              }
                            }
                            return (
                              <button
                                key={oIdx}
                                onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                                className={`w-full text-left px-3 py-2 rounded border text-xs transition flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt.text}</span>
                                {answered && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                                {answered && !opt.isCorrect && selectedIdx === oIdx && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {answered && (
                        <div className={`mt-3 p-2.5 rounded text-xs border ${isCorrect ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200' : 'bg-red-950/30 border-red-800/60 text-red-200'}`}>
                          {isCorrect ? q.correctFeedback : q.wrongFeedback}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* =====================================================================
          BARRA DE FILTRO DE CADERNO (ESTÁTICA - NÃO ACOMPANHA O ROLAR DA PÁGINA)
         ===================================================================== */}
      <section className="bg-[#ebe6dc] border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-wider text-stone-700">
              <span className="px-2.5 py-1 bg-stone-900 text-stone-100 font-bold rounded">
                EDIÇÃO ESPECIAL
              </span>
              <span className="font-semibold text-stone-600">Caderno em leitura:</span>
              <strong className="text-stone-950 text-sm font-bold normal-case tracking-normal">
                {activeCaderno.tituloFiltro}
              </strong>
            </div>

            {/* Botão do Filtro Dropdown */}
            <div className="relative w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="w-full md:min-w-[380px] flex items-center justify-between gap-4 bg-[#faf8f5] hover:bg-white border border-stone-400 rounded-lg px-4 py-2.5 text-left transition shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-red-700 shrink-0" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
                      Selecionar tema da análise
                    </span>
                    <span className="text-sm sm:text-base font-bold text-stone-950 block">
                      {activeCaderno.tituloFiltro}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-900 transition-transform duration-200 shrink-0 ${
                    isFilterOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Lista de opções UMA EMBAIXO DA OUTRA ao clicar no filtro */}
              {isFilterOpen && (
                <div className="absolute right-0 left-0 md:left-auto md:w-[440px] mt-1.5 bg-[#faf8f5] border border-stone-400 rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-2 bg-stone-900 text-stone-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-between">
                    <span>Índice de Cadernos</span>
                    <span>Selecione uma opção</span>
                  </div>
                  <div className="flex flex-col divide-y divide-stone-200">
                    {CADERNOS_JORNAL.map((cad) => {
                      const isCurrent = selectedAnalysis === cad.id;
                      return (
                        <button
                          key={cad.id}
                          type="button"
                          onClick={() => {
                            setSelectedAnalysis(cad.id);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition flex items-start justify-between gap-3 ${
                            isCurrent
                              ? 'bg-[#e7e0d2] border-l-4 border-l-red-700'
                              : 'hover:bg-[#efebe2]'
                          }`}
                        >
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-red-800 block">
                              {cad.numero}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-stone-950 block mt-0.5">
                              {cad.tituloFiltro}
                            </span>
                            <span className="text-xs text-stone-600 mt-0.5 block leading-snug">
                              {cad.resumoFiltro}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-stone-800 pt-1 shrink-0">
                            {isCurrent ? 'Ativo' : 'Abrir →'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CORPO TRADICIONAL DO JORNAL - COLUNAS SIMÉTRICAS (50% / 50%) E FICHAS
         ===================================================================== */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16"
        onClick={() => {
          if (isFilterOpen) setIsFilterOpen(false);
        }}
      >
        {/* CABEÇALHO DO JORNAL + DIVISÃO EM 2 COLUNAS SIMÉTRICAS (6/12 | 6/12):
            ESQUERDA: Título da Notícia + Subtítulo-resumo de até 5 linhas com 1 marca-texto vermelho
            DIREITA: Insight da Edição ("Em destaque na edição") */}
        <article className="mb-8">
          <div className="newspaper-double-rule py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <span className="text-red-800 font-bold">{activeCaderno.numero} • {activeCaderno.editoria}</span>
            <span>{activeCaderno.autorLinha}</span>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-stone-300 items-center">
            {/* Coluna Esquerda (50%): Título da notícia + Subtítulo resumindo todo o conteúdo em até 5 linhas */}
            <div className="lg:col-span-6 lg:pr-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight leading-snug">
                {activeCaderno.manchete}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed text-justify">
                {selectedAnalysis === 'estados' && (
                  <>
                    Minas Gerais (50.615 acidentes e 4.304 mortos na BR-381 e BR-116), Santa Catarina (45.280) e Paraná (41.320) concentram 35% das batidas nas rodovias federais, mas a gravidade proporcional se inverte no Norte e Nordeste: enquanto SC (4,84%) e SP (4,86%) têm colisões urbanas de menor impacto, <span className="mark-red">Maranhão (17,59% de letalidade), Pará (16,48%) e Bahia (14,78%, com 3.195 mortos) lideram o risco de morte por sinistro em pistas simples.</span>
                  </>
                )}

                {selectedAnalysis === 'clima' && (
                  <>
                    Mais de dois terços dos acidentes ocorrem com tempo firme: Céu Claro (244.639 ocorrências) e Sol (22.599) somam 68,2% dos registros e 22.564 mortos por excesso de velocidade em pista seca; sob chuva (39.151 batidas) a cautela baixa a proporção de mortos para 3,38%, mas <span className="mark-red">sob nevoeiro ou neblina a fatia de vítimas fatais salta para 5,91% em engavetamentos nas serras.</span>
                  </>
                )}

                {selectedAnalysis === 'causas' && (
                  <>
                    A colisão traseira lidera em frota atingida (75.496 batidas e 184.672 veículos) e o engavetamento em média por ocorrência (4,10 carros), puxados pela reação tardia (138.036 pessoas) e ausência de reação (123.636), enquanto <span className="mark-red">a colisão frontal provoca 10.248 mortes (39,12 óbitos a cada 100 acidentes) e a invasão da contramão causa 4.812 óbitos.</span>
                  </>
                )}

                {selectedAnalysis === 'ocorrencias_mortes' && (
                  <>
                    As ocorrências subiram 13,3% entre 2021 (64.567) e o pico de 2024 (73.202 acidentes, 6.163 mortos e R$ 16,8 bilhões em custos anuais), mantendo 6.043 óbitos em 2025, com 48,3% das mortes nos fins de semana e <span className="mark-red">risco dobrado na Plena Noite (15.728 mortos) e no Amanhecer (11,55 mortos a cada 100 feridos).</span>
                  </>
                )}
              </p>
            </div>

            {/* Coluna Direita (50%): Insight da Edição perfeitamente alinhado à direita da linha divisória */}
            <div className="lg:col-span-6 lg:pl-8 mt-6 lg:mt-0">
              <div className="bg-[#111113] text-stone-100 p-6 rounded-xl border-l-4 border-l-red-600">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block mb-2">
                  EM DESTAQUE NA EDIÇÃO
                </span>
                <blockquote className="text-base sm:text-lg font-bold text-white leading-snug">
                  "{activeCaderno.olhoReportagem}"
                </blockquote>
              </div>
            </div>
          </div>
        </article>

        {/* =====================================================================
            CADERNO INICIAL: ESTADOS E RODOVIAS (27 UFs)
            - Linha 1 (2 Colunas 50%/50% alinhadas com o topo): Mapa de Calor | Sazonalidade Semanal
            - Linha 2 (Largura total abaixo deles): Ficha Estadual Harmônica
            - Linha 3 (2 Colunas 50%/50% alinhadas): Ranking 12 UFs | Corredores BRs Críticos das Notícias
           ===================================================================== */}
        {selectedAnalysis === 'estados' && (
          <div className="space-y-10">
            {/* LINHA 1: Mapa de Calor (Esquerda 6/12) | Sazonalidade Semanal da UF (Direita 6/12)
                A linha vertical central está 100% simétrica com a divisão entre a Notícia e o Insight acima! */}
            <div className="border-t border-stone-300 pt-8 grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-stone-300 items-stretch">
              {/* Esquerda: Mapa de Calor do Brasil */}
              <div className="lg:col-span-6 lg:pr-8 flex flex-col justify-between">
                <div className="mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                      CARTOGRAFIA INTERATIVA • 27 UNIDADES DA FEDERAÇÃO
                    </span>
                    <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                      Mapa de calor da malha rodoviária federal
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-stone-700 font-medium mt-2.5 bg-[#ebe6dc]/80 px-3 py-2 rounded-lg border border-stone-300">
                    <span className="font-bold text-stone-900">Volume de acidentes na UF:</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-block w-3 h-3 rounded-sm bg-[#e9d5ff] border border-stone-400"></span>
                      Menor (&lt; 8 mil)
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-block w-3 h-3 rounded-sm bg-[#9333ea]"></span>
                      Médio (8 mil a 25 mil)
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-block w-3 h-3 rounded-sm bg-[#4a044e]"></span>
                      Maior (&gt; 25 mil)
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-block w-3 h-3 rounded-sm bg-[#dc2626]"></span>
                      UF selecionada
                    </span>
                  </div>
                </div>

                <div className="relative w-full flex items-center justify-center py-1">
                  <svg
                    viewBox="0 0 600 600"
                    className="w-full max-h-[360px] select-none"
                    aria-label="Mapa do Brasil por Estados"
                  >
                    {BRAZIL_MAP_PATHS.map((stateGeo) => {
                      const uf = stateGeo.sigla;
                      const stData = ESTADOS_COMPLETE_DATA[uf];
                      const acidentes = stData ? stData.acidentes : 1000;
                      const isSelected = selectedUF === uf;
                      const isHovered = hoveredUF === uf;

                      let fillColor = '#f3e8ff';
                      if (acidentes > 40000) fillColor = '#4a044e';
                      else if (acidentes > 25000) fillColor = '#6b21a8';
                      else if (acidentes > 15000) fillColor = '#9333ea';
                      else if (acidentes > 8000) fillColor = '#c084fc';
                      else if (acidentes > 3000) fillColor = '#d8b4fe';

                      if (isSelected) fillColor = '#dc2626';
                      else if (isHovered) fillColor = '#f59e0b';

                      return (
                        <g
                          key={uf}
                          onClick={() => setSelectedUF(uf)}
                          onMouseEnter={() => setHoveredUF(uf)}
                          onMouseLeave={() => setHoveredUF(null)}
                          className="cursor-pointer transition-colors duration-150"
                        >
                          <path
                            d={stateGeo.d}
                            fill={fillColor}
                            stroke="#1c1917"
                            strokeWidth={isSelected ? 2 : 0.8}
                          />
                          <text
                            x={stateGeo.cx}
                            y={stateGeo.cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-[11px] font-bold pointer-events-none"
                            fill={acidentes > 15000 || isSelected ? '#ffffff' : '#1c1917'}
                          >
                            {uf}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  Clique em qualquer estado no mapa para atualizar o gráfico ao lado e a ficha estadual abaixo.
                </p>
              </div>

              {/* Direita: Gráfico de Sazonalidade Semanal ao lado do Mapa de Calor */}
              <div className="lg:col-span-6 lg:pl-8 mt-8 lg:mt-0 flex flex-col justify-between">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                      DISTRIBUIÇÃO SEMANAL • {previewUFData.nome.toUpperCase()} ({previewUFData.uf})
                    </span>
                    <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                      Sazonalidade de acidentes e mortes na semana
                    </h3>
                  </div>
                  <select
                    value={selectedUF}
                    onChange={(e) => setSelectedUF(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-stone-400 bg-[#faf8f5] text-xs font-bold text-stone-900 focus:outline-none focus:border-red-700"
                  >
                    {Object.values(ESTADOS_COMPLETE_DATA)
                      .sort((a, b) => a.nome.localeCompare(b.nome))
                      .map((st) => (
                        <option key={st.uf} value={st.uf}>
                          {st.uf} - {st.nome}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="h-[310px] w-full my-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={previewUFData.dias} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis dataKey="dia" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 600 }} />
                      <YAxis yAxisId="left" tick={{ fill: '#57534e', fontSize: 11 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fill: '#dc2626', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(val, name) => [val.toLocaleString('pt-BR'), name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar yAxisId="left" dataKey="acidentes" name="Ocorrências na UF" fill="#6b21a8" barSize={32} radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="mortos" name="Vítimas Fatais" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  Sexta, sábado e domingo concentram o pico de severidade nas rodovias federais que cortam {previewUFData.nome}.
                </p>
              </div>
            </div>

            {/* LINHA 2: Ficha Estadual em preto seguindo o padrão do Insight da Notícia */}
            <div className="bg-[#111113] text-stone-100 py-6 px-6 rounded-xl border border-stone-800 border-l-4 border-l-red-600 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-stone-800">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    FICHA ESTADUAL • REGIÃO {previewUFData.regiao.toUpperCase()}
                  </span>
                  <span className="text-stone-600">|</span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white">
                    {previewUFData.nome} ({previewUFData.uf})
                  </h4>
                </div>
                <div className="text-xs sm:text-sm text-stone-300 font-medium">
                  Rodovias federais mais críticas na UF: <strong className="text-white font-bold">{previewUFData.br_critica}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Ocorrências na UF</span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {previewUFData.acidentes.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Veículos Envolvidos</span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {previewUFData.veiculos.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Pessoas Feridas</span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {previewUFData.feridos.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block">Vítimas Fatais</span>
                  <p className="text-2xl font-extrabold text-red-400 mt-1">
                    {previewUFData.mortos.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Taxa de Letalidade</span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {previewUFData.letalidade.toFixed(2)}%
                  </p>
                  <span className="text-xs text-stone-400 block mt-0.5">Mortos a cada 100 acidentes</span>
                </div>
              </div>
            </div>

            {/* LINHA 3 (2 Colunas 50%/50% alinhadas): Ranking de UFs | Corredores BRs Críticos citados nas notícias */}
            <div className="border-t border-stone-300 pt-8 grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-stone-300 items-stretch">
              {/* Esquerda: Ranking das 12 UFs */}
              <div className="lg:col-span-6 lg:pr-8 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                      COMPARATIVO INTERESTADUAL
                    </span>
                    <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                      Liderança por Volume, Mortes ou Letalidade (%)
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 bg-[#ebe6dc] p-1 rounded-lg border border-stone-300 shrink-0">
                    {[
                      { key: 'acidentes', label: 'Acidentes' },
                      { key: 'mortos', label: 'Mortos' },
                      { key: 'letalidade', label: 'Letalidade %' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setUfSortBy(opt.key)}
                        className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition ${
                          ufSortBy === opt.key
                            ? 'bg-stone-900 text-white'
                            : 'text-stone-700 hover:text-stone-950'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-[460px] w-full my-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sortedStatesList.slice(0, 12)}
                      margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                      barCategoryGap="15%"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis dataKey="uf" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                      <YAxis tick={{ fill: '#57534e', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(value, name) => [
                          ufSortBy === 'letalidade' ? `${value}%` : value.toLocaleString('pt-BR'),
                          name
                        ]}
                      />
                      <Bar
                        dataKey={ufSortBy}
                        name={
                          ufSortBy === 'acidentes'
                            ? 'Total de Acidentes'
                            : ufSortBy === 'mortos'
                            ? 'Vítimas Fatais'
                            : 'Letalidade (%)'
                        }
                        fill={ufSortBy === 'mortos' || ufSortBy === 'letalidade' ? '#dc2626' : '#6b21a8'}
                        barSize={28}
                        radius={[4, 4, 0, 0]}
                        onClick={(data) => {
                          if (data && data.uf) setSelectedUF(data.uf);
                        }}
                        className="cursor-pointer"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  Minas Gerais lidera em acidentes (50.615) e óbitos (4.304), enquanto Maranhão (17,59%) e Pará (16,48%) lideram em letalidade proporcional.
                </p>
              </div>

              {/* Direita: Novo Dashboard das Rodovias Federais (BRs) com barras maiores e eixos duplos proporcionais */}
              <div className="lg:col-span-6 lg:pl-8 mt-8 lg:mt-0 flex flex-col justify-between">
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                    MALHA CRÍTICA CITADA NO NOTICIÁRIO
                  </span>
                  <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                    Ocorrências e Mortes nos Principais Corredores (BRs)
                  </h3>
                </div>

                <div className="h-[460px] w-full my-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      layout="vertical"
                      data={CORREDORES_BR_CRITICOS.slice(0, 8)}
                      margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                      barCategoryGap="14%"
                      barGap={3}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis
                        xAxisId="acidentes"
                        type="number"
                        tick={{ fill: '#6b21a8', fontSize: 11, fontWeight: 600 }}
                      />
                      <XAxis
                        xAxisId="mortos"
                        type="number"
                        orientation="top"
                        domain={[0, 5000]}
                        tick={{ fill: '#dc2626', fontSize: 11, fontWeight: 600 }}
                      />
                      <YAxis
                        dataKey="br"
                        type="category"
                        width={140}
                        tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(val, name) => [val.toLocaleString('pt-BR'), name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                      <Bar
                        xAxisId="acidentes"
                        dataKey="acidentes"
                        name="Acidentes no corredor"
                        fill="#6b21a8"
                        barSize={16}
                        radius={[0, 4, 4, 0]}
                      />
                      <Bar
                        xAxisId="mortos"
                        dataKey="mortos"
                        name="Vítimas Fatais (escala superior)"
                        fill="#dc2626"
                        barSize={16}
                        radius={[0, 4, 4, 0]}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  A BR-101 lidera em volume (54.820 ocorrências) e a BR-116 em vítimas fatais (3.640 mortos); a BR-381 soma 21.840 batidas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            ANÁLISE METEOROLÓGICA: CLIMA E VÍTIMAS
            - Linha 1 (2 Colunas 50%/50% alinhadas com o topo): Pizza da Condição | Severidade Climática (% Mortos e Feridos Graves)
            - Linha 2 (Largura total abaixo deles): Ficha da Condição Meteorológica (em preto com seletor limpo)
            - Linha 3: Painel Comparativo Completo (escondido em botão expansível com linhas sutis e legendas separadas)
           ===================================================================== */}
        {selectedAnalysis === 'clima' && (
          <div className="space-y-10">
            {/* LINHA 1 (2 Colunas 50%/50% simétricas à divisão do topo) */}
            <div className="border-t border-stone-300 pt-8 grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-stone-300 items-stretch">
              {/* Esquerda: Pizza da Condição Selecionada com Seletor Dropdown Limpo */}
              <div className="lg:col-span-6 lg:pr-8 flex flex-col justify-between">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                      DIVISÃO DE VÍTIMAS • {activeClimaObj.condicao.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                      Proporção de Ilesos, Feridos e Mortos na Condição
                    </h3>
                  </div>
                  <select
                    value={selectedClima}
                    onChange={(e) => setSelectedClima(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-stone-400 bg-[#faf8f5] text-xs font-bold text-stone-900 focus:outline-none focus:border-red-700"
                  >
                    {CLIMA_VITIMAS_DATA.map((item) => (
                      <option key={item.condicao} value={item.condicao}>
                        {item.condicao} ({item.acidentes.toLocaleString('pt-BR')} acid.)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="h-80 w-full my-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activeClimaObj.fatias}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={105}
                        paddingAngle={2}
                      >
                        {activeClimaObj.fatias.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(val, name) => [
                          `${val.toLocaleString('pt-BR')} pessoas`,
                          name
                        ]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  Use o seletor acima ou na ficha meteorológica abaixo para inspecionar qualquer uma das 10 condições climáticas.
                </p>
              </div>

              {/* Direita: Gráfico de Severidade Climática (% de Mortos em vermelho e % de Feridos Graves em azul forte) */}
              <div className="lg:col-span-6 lg:pl-8 mt-8 lg:mt-0 flex flex-col justify-between">
                <div className="mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                    SEVERIDADE POR FENÔMENO CLIMÁTICO
                  </span>
                  <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                    Proporção de Mortos (%) e Feridos Graves (%) por Clima
                  </h3>
                </div>

                <div className="h-80 w-full my-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={CLIMA_VITIMAS_DATA.slice(0, 7)}
                      margin={{ top: 10, right: 15, left: 0, bottom: 10 }}
                      barCategoryGap="16%"
                      barGap={4}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis dataKey="condicao" interval={0} tick={{ fill: '#1c1917', fontSize: 10.5, fontWeight: 700 }} />
                      <YAxis tick={{ fill: '#57534e', fontSize: 11 }} unit="%" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(val, name) => [`${val}%`, name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar
                        dataKey="pct_feridos_graves"
                        name="% Feridos Graves"
                        fill="#2563eb"
                        barSize={20}
                        radius={[4, 4, 0, 0]}
                        onClick={(data) => {
                          if (data && data.condicao) setSelectedClima(data.condicao);
                        }}
                        className="cursor-pointer"
                      />
                      <Bar
                        dataKey="pct_mortos"
                        name="% Vítimas Fatais"
                        fill="#dc2626"
                        barSize={20}
                        radius={[4, 4, 0, 0]}
                        onClick={(data) => {
                          if (data && data.condicao) setSelectedClima(data.condicao);
                        }}
                        className="cursor-pointer"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  Sob Nevoeiro/Neblina, a proporção de mortos chega a 5,91% (56% maior que os 3,79% do Céu Claro).
                </p>
              </div>
            </div>

            {/* LINHA 2: Ficha Meteorológica em preto com seletor integrado e limpo (no mesmo padrão da Ficha Estadual) */}
            <div className="bg-[#111113] text-stone-100 py-6 px-6 rounded-xl border border-stone-800 border-l-4 border-l-red-600 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    FICHA METEOROLÓGICA
                  </span>
                  <span className="text-stone-600">|</span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white">
                    {activeClimaObj.condicao} ({activeClimaObj.acidentes.toLocaleString('pt-BR')} acidentes)
                  </h4>
                </div>
                <div className="flex items-center gap-2.5">
                  <label htmlFor="select-clima-ficha" className="text-xs text-stone-300 font-semibold uppercase tracking-wider whitespace-nowrap">
                    Alternar condição:
                  </label>
                  <select
                    id="select-clima-ficha"
                    value={selectedClima}
                    onChange={(e) => setSelectedClima(e.target.value)}
                    className="px-3.5 py-1.5 rounded-lg border-2 border-stone-300 bg-[#faf8f5] hover:bg-white text-xs sm:text-sm font-bold text-stone-950 shadow-sm focus:outline-none focus:border-red-500 cursor-pointer transition"
                  >
                    {CLIMA_VITIMAS_DATA.map((item) => (
                      <option key={item.condicao} value={item.condicao} className="bg-white text-stone-950">
                        {item.condicao} ({item.acidentes.toLocaleString('pt-BR')} ocorrências)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Pessoas Envolvidas</span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {activeClimaObj.total_pessoas.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Ilesos ({activeClimaObj.pct_ilesos}%)</span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {activeClimaObj.ilesos.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">Feridos Leves ({activeClimaObj.pct_feridos_leves}%)</span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {activeClimaObj.feridos_leves.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block">Feridos Graves ({activeClimaObj.pct_feridos_graves}%)</span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {activeClimaObj.feridos_graves.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block">Mortos ({activeClimaObj.pct_mortos}%)</span>
                  <p className="text-2xl font-extrabold text-red-400 mt-1">
                    {activeClimaObj.mortos.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* LINHA 3: Botão Expansível para o Painel Comparativo Completo das 10 Condições Meteorológicas */}
            <div className="border-t border-stone-300 pt-6">
              <button
                type="button"
                onClick={() => setShowFullClimaGrid((prev) => !prev)}
                className="w-full flex items-center justify-between gap-4 bg-[#ebe6dc] hover:bg-[#e2dbcd] border border-stone-400 rounded-xl px-5 py-4 text-left transition shadow-sm"
              >
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-800">
                  PAINEL COMPARATIVO COMPLETO • 10 CONDIÇÕES METEOROLÓGICAS
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-red-800 transition-transform duration-200 shrink-0 ${
                    showFullClimaGrid ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showFullClimaGrid && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CLIMA_VITIMAS_DATA.map((item) => (
                    <div
                      key={item.condicao}
                      onClick={() => setSelectedClima(item.condicao)}
                      className={`p-5 rounded-xl border transition cursor-pointer ${
                        selectedClima === item.condicao
                          ? 'border-red-600 bg-[#faf8f5] shadow-sm'
                          : 'border-stone-300 bg-[#faf8f5]/70 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200">
                        <div>
                          <h4 className="text-base font-bold text-stone-950">{item.condicao}</h4>
                          <span className="text-xs text-stone-600">
                            {item.acidentes.toLocaleString('pt-BR')} acidentes
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-red-800 bg-red-50 px-2 py-1 rounded border border-red-200">
                          Mortos: {item.mortos.toLocaleString('pt-BR')} ({item.pct_mortos}%)
                        </span>
                      </div>

                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={item.fatias}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={34}
                              outerRadius={64}
                              paddingAngle={1.5}
                            >
                              {item.fatias.map((entry, idx) => (
                                <Cell key={idx} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(val, name) => [
                                `${val.toLocaleString('pt-BR')} pessoas`,
                                name
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Legendas separadas em caixas individuais para que o número fique colado à sua própria variável */}
                      <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-stone-200 text-xs">
                        {item.fatias.map((f) => (
                          <div
                            key={f.name}
                            className="bg-[#ebe6dc]/70 border border-stone-300/80 rounded-md px-2.5 py-1.5 flex items-center justify-between gap-1.5"
                          >
                            <span className="inline-flex items-center gap-1.5 text-stone-700 font-medium truncate">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: f.color }}></span>
                              <span className="truncate">{f.name}:</span>
                            </span>
                            <strong className="text-stone-950 font-bold shrink-0">
                              {f.value.toLocaleString('pt-BR')}
                            </strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            DINÂMICA DOS SINISTROS: CAUSAS, VEÍCULOS E PESSOAS
            - Linha 1 (2 Colunas 50%/50% alinhadas com o topo): Tipo x Veículos | Letalidade e Média de Veículos por Tipo
            - Linha 2 (Largura total abaixo deles): Ficha Técnica em preto seguindo o padrão do Insight
            - Linha 3 (2 Colunas 50%/50% alinhadas): Scatter Plot de Pessoas | Matriz Pictográfica de Pessoas
           ===================================================================== */}
        {selectedAnalysis === 'causas' && (
          <div className="space-y-10">
            {/* LINHA 1 (2 Colunas 50%/50% simétricas à divisão do topo) */}
            <div className="border-t border-stone-300 pt-8 grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-stone-300 items-stretch">
              {/* Esquerda: Tipo de Acidente x Total de Veículos (Teal #0d9488 para Veículos e Roxo #6b21a8 para Acidentes) */}
              <div className="lg:col-span-6 lg:pr-8 flex flex-col justify-between">
                <div className="mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                    TIPOLOGIA DO SINISTRO X FROTA ATINGIDA
                  </span>
                  <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                    Tipo de Acidente por Total de Veículos e Ocorrências
                  </h3>
                </div>

                <div className="h-[500px] w-full my-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      layout="vertical"
                      data={TIPO_ACIDENTE_VEICULOS_DATA.slice(0, 10)}
                      margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                      barCategoryGap="14%"
                      barGap={3}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis type="number" tick={{ fill: '#57534e', fontSize: 11 }} />
                      <YAxis
                        dataKey="tipo_acidente"
                        type="category"
                        width={165}
                        tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(val, name) => [val.toLocaleString('pt-BR'), name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                      <Bar dataKey="veiculos" name="Total de Veículos" fill="#0d9488" barSize={15} radius={[0, 4, 4, 0]} />
                      <Bar dataKey="acidentes" name="Total de Acidentes" fill="#6b21a8" barSize={15} radius={[0, 4, 4, 0]} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  A colisão traseira lidera em frota envolvida (184.672 veículos em 75.496 acidentes).
                </p>
              </div>

              {/* Direita: Letalidade (#dc2626 Vermelho) e Média de Veículos por Tipo (#0284c7 Azul-ciano) */}
              <div className="lg:col-span-6 lg:pl-8 mt-8 lg:mt-0 flex flex-col justify-between">
                <div className="mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                    SEVERIDADE E MÉDIA VEICULAR POR MODALIDADE
                  </span>
                  <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                    Mortos a cada 100 Acidentes (%) vs. Média de Veículos
                  </h3>
                </div>

                <div className="h-[500px] w-full my-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      layout="vertical"
                      data={[...TIPO_ACIDENTE_VEICULOS_DATA].sort((a, b) => b.taxa_mortalidade - a.taxa_mortalidade).slice(0, 10)}
                      margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                      barCategoryGap="14%"
                      barGap={3}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis
                        xAxisId="letalidade"
                        type="number"
                        domain={[0, 42]}
                        unit="%"
                        tick={{ fill: '#dc2626', fontSize: 11, fontWeight: 600 }}
                      />
                      <XAxis
                        xAxisId="media"
                        type="number"
                        orientation="top"
                        domain={[0, 5]}
                        tick={{ fill: '#0284c7', fontSize: 11, fontWeight: 600 }}
                      />
                      <YAxis
                        dataKey="tipo_acidente"
                        type="category"
                        width={165}
                        tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(val, name) => [
                          name.includes('%') ? `${val}%` : `${val.toLocaleString('pt-BR')} veíc./acid.`,
                          name
                        ]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                      <Bar
                        xAxisId="letalidade"
                        dataKey="taxa_mortalidade"
                        name="Letalidade (Mortos / 100 acid. %)"
                        fill="#dc2626"
                        barSize={15}
                        radius={[0, 4, 4, 0]}
                      />
                      <Bar
                        xAxisId="media"
                        dataKey="media_veiculos"
                        name="Média de Veículos por Acidente (escala superior)"
                        fill="#0284c7"
                        barSize={15}
                        radius={[0, 4, 4, 0]}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  A colisão frontal mata 39,12 pessoas a cada 100 acidentes; o engavetamento envolve 4,10 veículos por batida.
                </p>
              </div>
            </div>

            {/* LINHA 2: Ficha Técnica em preto seguindo o padrão do Insight da Notícia */}
            <div className="bg-[#111113] text-stone-100 py-6 px-6 rounded-xl border border-stone-800 border-l-4 border-l-red-600 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-stone-800">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    FICHA TÉCNICA • MECÂNICA DO SINISTRO E FATOR HUMANO
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-stone-400 font-medium">
                  Indicadores consolidados da perícia da Polícia Rodoviária Federal (2021 a 2026)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Líder em Veículos</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">184.672 veíc.</p>
                  <span className="text-xs text-stone-400 block mt-0.5">Colisão traseira (75.496 acid.)</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Maior Média / Batida</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">4,10 veículos</p>
                  <span className="text-xs text-stone-400 block mt-0.5">Engavetamento (27.364 veíc.)</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">Líder em Pessoas</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">138.036 pessoas</p>
                  <span className="text-xs text-stone-400 block mt-0.5">Reação tardia ou ineficiente</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block">Tipo Mais Mortal</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-red-400 mt-1">10.248 mortos</p>
                  <span className="text-xs text-stone-400 block mt-0.5">Colisão frontal (39,12% letal.)</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block">Causa Mais Letal</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-red-400 mt-1">4.812 mortos</p>
                  <span className="text-xs text-stone-400 block mt-0.5">Transitar na contramão (3,55 pess./acid.)</span>
                </div>
              </div>
            </div>

            {/* LINHA 3 (2 Colunas 50%/50% alinhadas): Scatter Plot de Pessoas | Matriz Pictográfica de Pessoas */}
            <div className="border-t border-stone-300 pt-8 grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-stone-300 items-start">
              {/* Esquerda: Scatter Plot com Símbolos de Pessoas */}
              <div className="lg:col-span-6 lg:pr-8">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                      DISPERSÃO DE CAUSAS X PESSOAS ENVOLVIDAS
                    </span>
                    <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                      Ocorrências (X) vs. Total de Pessoas (Y)
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1 text-purple-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-800 inline-block"></span> Volume
                    </span>
                    <span className="flex items-center gap-1 text-red-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span> +3.000 mortos
                    </span>
                  </div>
                </div>

                <div className="h-[380px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis
                        type="number"
                        dataKey="acidentes"
                        name="Acidentes"
                        tick={{ fill: '#57534e', fontSize: 11 }}
                        label={{ value: 'Total de Acidentes', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#57534e' }}
                      />
                      <YAxis
                        type="number"
                        dataKey="pessoas"
                        name="Total de Pessoas"
                        tick={{ fill: '#57534e', fontSize: 11 }}
                      />
                      <ZAxis type="number" dataKey="mortos" range={[100, 600]} name="Mortos" />
                      <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        content={({ active, payload }) => {
                          if (!active || !payload || !payload.length) return null;
                          const d = payload[0].payload;
                          return (
                            <div className="bg-stone-950 border border-stone-700 p-3 rounded shadow-lg text-xs text-stone-100">
                              <p className="font-bold text-white mb-1">{d.causa}</p>
                              <p className="text-stone-300">Pessoas envolvidas: <strong className="text-purple-300">{d.pessoas.toLocaleString('pt-BR')}</strong></p>
                              <p className="text-stone-300">Acidentes: <strong>{d.acidentes.toLocaleString('pt-BR')}</strong></p>
                              <p className="text-stone-300">Média por acidente: <strong>{d.media_pessoas} pessoas</strong></p>
                              <p className="text-red-400">Vítimas fatais: <strong>{d.mortos.toLocaleString('pt-BR')}</strong></p>
                            </div>
                          );
                        }}
                      />
                      <Scatter
                        name="Causas de Acidentes"
                        data={CAUSA_PESSOAS_DATA}
                        shape={<CustomPersonClusterShape />}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Direita: Matriz Pictográfica de Símbolos de Pessoas */}
              <div className="lg:col-span-6 lg:pl-8 mt-8 lg:mt-0">
                <div className="flex items-center justify-between mb-3 border-b border-stone-300 pb-2">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                      ESCALA HUMANA POR CAUSA
                    </span>
                    <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                      1 símbolo humano = 5.000 pessoas envolvidas
                    </h3>
                  </div>
                </div>
                <div className="space-y-3 max-h-[370px] overflow-y-auto pr-1">
                  {CAUSA_PESSOAS_DATA.slice(0, 10).map((item) => {
                    const iconCount = Math.max(1, Math.round(item.pessoas / 5000));
                    const isCritical = item.mortos >= 3000;
                    return (
                      <div key={item.causa} className="pb-2.5 border-b border-stone-200">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-stone-900">{item.causa}</span>
                          <span className="text-stone-700">
                            <strong>{item.pessoas.toLocaleString('pt-BR')}</strong> pessoas ({item.mortos.toLocaleString('pt-BR')} mortos)
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1">
                          {Array.from({ length: iconCount }).map((_, idx) => (
                            <span
                              key={idx}
                              title={`${item.causa}: ~${((idx + 1) * 5000).toLocaleString('pt-BR')} pessoas`}
                              className={`inline-flex items-center justify-center w-5 h-5 rounded ${
                                isCritical ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-800'
                              }`}
                            >
                              <Users className="w-3.5 h-3.5" />
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            SÉRIE HISTÓRICA E TURNOS: OCORRÊNCIAS, FERIDOS E MORTES
            (Cores 100% coerentes: #6b21a8 para Ocorrências, #eab308 para Feridos, #dc2626 para Mortos, #2563eb para Mortos/100 feridos)
           ===================================================================== */}
        {selectedAnalysis === 'ocorrencias_mortes' && (
          <div className="space-y-12">
            {/* Bloco 1: Série Histórica 2021-2026 e Dias da Semana integrados na página (colunas 6/12 | 6/12 simétricas com o topo) */}
            <div className="border-t border-stone-300 pt-8 grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-stone-300">
              <div className="lg:col-span-6 lg:pr-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                  EVOLUÇÃO ANUAL • 2021 A 2026*
                </span>
                <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                  Trajetória de Ocorrências, Feridos e Mortes por Ano
                </h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-1.5 mb-4">
                  Crescimento de 13,3% nas ocorrências entre 2021 e 2024, mantendo mais de 6 mil mortos anuais em 2024 e 2025 (*2026 parcial).
                </p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={ANOS_SERIE} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis dataKey="ano" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                      <YAxis yAxisId="left" tick={{ fill: '#57534e', fontSize: 11 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fill: '#dc2626', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(val, name) => [val.toLocaleString('pt-BR'), name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar yAxisId="left" dataKey="acidentes" name="Ocorrências" fill="#6b21a8" radius={[3, 3, 0, 0]} />
                      <Bar yAxisId="left" dataKey="feridos" name="Pessoas Feridas" fill="#eab308" radius={[3, 3, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="mortos" name="Vítimas Fatais" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-6 lg:pl-8 mt-8 lg:mt-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                  CICLO SEMANAL • SEGUNDA A DOMINGO
                </span>
                <h3 className="text-xl font-bold text-stone-950 mt-0.5">
                  Ocorrências e Mortes por Dia da Semana
                </h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-1.5 mb-4">
                  Sexta, sábado e domingo concentram 48,3% das mortes (17.256 óbitos). O domingo lidera com 6.582 vidas perdidas e 10,27% de letalidade.
                </p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={DIAS_SEMANA_GERAL} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                      <XAxis dataKey="dia" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 600 }} />
                      <YAxis yAxisId="left" tick={{ fill: '#57534e', fontSize: 11 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fill: '#dc2626', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        formatter={(val, name) => [val.toLocaleString('pt-BR'), name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar yAxisId="left" dataKey="acidentes" name="Ocorrências" fill="#6b21a8" radius={[3, 3, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="mortos" name="Mortes" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Bloco 2: Ocorrências, Feridos e Mortes por Turno e Luminosidade */}
            <div className="border-t border-stone-300 pt-8">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                  SEVERIDADE POR TURNO • RAZÃO DE MORTES POR FERIDO
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-950 mt-0.5">
                  Ocorrências, Feridos e Mortes segundo a Fase do Dia
                </h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-1.5">
                  Enquanto o Pleno Dia concentra 214.387 acidentes e 252.853 feridos, a Plena Noite (15.728 mortos) e o Amanhecer (11,55 mortos a cada 100 feridos) apresentam o dobro de letalidade por ocorrência.
                </p>
              </div>

              {/* Faixa Escura de Contraste para os 4 Turnos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {FASE_DIA_DATA.map((item) => (
                  <div key={item.fase} className="bg-[#111113] text-stone-100 rounded-xl border border-stone-800 p-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                      <h4 className="text-base font-bold text-white">{item.fase}</h4>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        item.risco === 'Extremo' || item.risco === 'Crítico'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-stone-800 text-stone-300'
                      }`}>
                        Risco {item.risco}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Ocorrências:</span>
                        <strong className="text-white">{item.acidentes.toLocaleString('pt-BR')}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Feridos:</span>
                        <strong className="text-white">{item.feridos.toLocaleString('pt-BR')}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Mortes:</span>
                        <strong className="text-red-400">{item.mortos.toLocaleString('pt-BR')}</strong>
                      </div>
                      <div className="pt-2 border-t border-stone-800 flex justify-between">
                        <span className="text-stone-400">Mortos / 100 feridos:</span>
                        <strong className="text-blue-400">{item.mortos_por_100_feridos}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-stone-300">
                <div className="lg:col-span-6 lg:pr-8">
                  <h4 className="text-base font-bold text-stone-950 mb-1">
                    Volume Absoluto: Ocorrências, Feridos e Mortes por Turno
                  </h4>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-3">
                    Comparação direta entre o volume diurno e os registros noturnos.
                  </p>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={FASE_DIA_DATA} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                        <XAxis dataKey="fase" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#57534e', fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                          formatter={(val, name) => [val.toLocaleString('pt-BR'), name]}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="acidentes" name="Ocorrências" fill="#6b21a8" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="feridos" name="Feridos" fill="#eab308" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="mortos" name="Mortos" fill="#dc2626" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-6 lg:pl-8 mt-8 lg:mt-0">
                  <h4 className="text-base font-bold text-stone-950 mb-1">
                    Severidade: Taxa de Mortalidade (%) e Mortos por 100 Feridos
                  </h4>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-3">
                    O Amanhecer e a Plena Noite dobram o risco de óbito em relação ao Pleno Dia.
                  </p>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={FASE_DIA_DATA} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                        <XAxis dataKey="fase" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#57534e', fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d6d3d1', fontSize: '12px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="taxa_mortalidade" name="Mortos a cada 100 acidentes (%)" fill="#dc2626" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="mortos_por_100_feridos" name="Mortos a cada 100 feridos" fill="#2563eb" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          BARRA SUTIL DE CONTATOS DE EMERGÊNCIA NAS RODOVIAS (RODAPÉ EDITORIAL EM PRETO)
         ===================================================================== */}
      <footer className="border-t border-stone-800 bg-[#09090b] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <span className="uppercase tracking-wider text-stone-400 font-semibold">
            Emergência nas Rodovias:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="tel:191" className="hover:text-white transition">
              <strong className="text-red-500 font-bold mr-1.5">191</strong>
              <span>Polícia Rodoviária Federal (PRF)</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <a href="tel:192" className="hover:text-white transition">
              <strong className="text-red-500 font-bold mr-1.5">192</strong>
              <span>SAMU</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <a href="tel:193" className="hover:text-white transition">
              <strong className="text-red-500 font-bold mr-1.5">193</strong>
              <span>Corpo de Bombeiros</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <a href="tel:166" className="hover:text-white transition">
              <strong className="text-white font-bold mr-1.5">166</strong>
              <span>ANTT</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
