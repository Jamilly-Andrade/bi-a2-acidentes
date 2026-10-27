import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  Skull,
  AlertTriangle,
  Users,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Activity,
  CheckCircle2,
  TrendingUp,
  Info
} from 'lucide-react';

// Fotos conceituais da galeria horizontal
const HERO_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    title: 'O Asfalto Molhado',
    caption: 'Falta de aderência e velocidade incompatível'
  },
  {
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    title: 'A Neblina da Madrugada',
    caption: 'Amanhecer com visibilidade crítica'
  },
  {
    url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
    title: 'A Velocidade Noturna',
    caption: 'O silêncio mortal das rodovias vazias'
  },
  {
    url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    title: 'Faróis na Escuridão',
    caption: 'Ofuscamento visual e pista simples'
  },
  {
    url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=800&q=80',
    title: 'O Crepúsculo Cego',
    caption: 'Anoitecer: a transição mais perigosa'
  },
  {
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    title: 'A Extensão Federal',
    caption: 'Milhares de quilômetros sob vigília da PRF'
  },
  {
    url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    title: 'Lanternas Vermelhas',
    caption: 'O rastro das frenagens de emergência'
  },
  {
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    title: 'A Reta Interminável',
    caption: 'Monotonia que induz ao sono ao volante'
  }
];

// Dados consolidados oficiais extraídos diretamente do Supabase
const FASE_DIA_DATA = [
  {
    fase_dia: 'Amanhecer',
    total_acidentes: 19001,
    total_mortos: 2440,
    total_feridos: 21123,
    taxa_mortalidade_pct: 12.84,
    taxa_feridos_pct: 111.17,
    razao_mortos_por_ferido: 0.1155,
    mortes_a_cada_100_feridos: 11.55,
    destaque: 'Pico absoluto de letalidade da pesquisa (12,84%). A cada 100 feridos, ocorrem 11,55 mortes.',
    icone: Sunrise
  },
  {
    fase_dia: 'Plena Noite',
    total_acidentes: 136482,
    total_mortos: 15728,
    total_feridos: 148478,
    taxa_mortalidade_pct: 11.52,
    taxa_feridos_pct: 108.79,
    razao_mortos_por_ferido: 0.1059,
    mortes_a_cada_100_feridos: 10.59,
    destaque: 'Segundo período mais letal (11,52%). A cada 100 feridos, ocorrem 10,59 mortes sob escuridão.',
    icone: Moon
  },
  {
    fase_dia: 'Anoitecer',
    total_acidentes: 21512,
    total_mortos: 1670,
    total_feridos: 25111,
    taxa_mortalidade_pct: 7.76,
    taxa_feridos_pct: 116.73,
    razao_mortos_por_ferido: 0.0665,
    mortes_a_cada_100_feridos: 6.65,
    destaque: 'Transição visual rápida: 116,73 feridos a cada 100 sinistros e 6,65 mortes a cada 100 feridos.',
    icone: Sunset
  },
  {
    fase_dia: 'Pleno dia',
    total_acidentes: 214387,
    total_mortos: 12954,
    total_feridos: 252853,
    taxa_mortalidade_pct: 6.04,
    taxa_feridos_pct: 117.94,
    razao_mortos_por_ferido: 0.0512,
    mortes_a_cada_100_feridos: 5.12,
    destaque: 'Maior volume de ocorrências e feridos (117,94 a cada 100 acidentes), mas com menor letalidade (5,12 mortes a cada 100 feridos).',
    icone: Sun
  }
];

// Dados dos outros módulos
const CAUSAS_DATA = [
  { causa: 'Falta de atenção / Reação tardia', total: 190700, mortos: 11200 },
  { causa: 'Velocidade incompatível', total: 58900, mortos: 6800 },
  { causa: 'Ingestão de álcool pelo condutor', total: 41200, mortos: 4300 },
  { causa: 'Desobediência à sinalização', total: 36500, mortos: 3100 },
  { causa: 'Defeito mecânico no veículo', total: 24100, mortos: 1450 },
  { causa: 'Condutor dormindo ao volante', total: 19800, mortos: 1850 }
];

const ESTADOS_DATA = [
  { uf: 'MG', acidentes: 52300, mortos: 4150 },
  { uf: 'PR', acidentes: 46100, mortos: 3200 },
  { uf: 'SC', acidentes: 44200, mortos: 2580 },
  { uf: 'RS', acidentes: 32100, mortos: 2100 },
  { uf: 'SP', acidentes: 28900, mortos: 1950 },
  { uf: 'RJ', acidentes: 26400, mortos: 1820 }
];

const HISTORICO_DATA = [
  { ano: '2021', acidentes: 64500, mortos: 5390 },
  { ano: '2022', acidentes: 64450, mortos: 5440 },
  { ano: '2023', acidentes: 67800, mortos: 5620 },
  { ano: '2024', acidentes: 68200, mortos: 5690 },
  { ano: '2025', acidentes: 69100, mortos: 5740 },
  { ano: '2026*', acidentes: 56829, mortos: 4268 }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="bg-[#050507] text-neutral-100 min-h-screen selection:bg-red-800 selection:text-white font-sans antialiased">
      {/* Navegação Superior */}
      <nav className="border-b border-neutral-900 bg-[#070709]/95 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_12px_#dc2626] animate-pulse"></div>
            <div>
              <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-bold block">
                Observatório Rodoviário • PRF
              </span>
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-red-500 transition">
                Acidentes em Rodovias Federais
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1 sm:gap-3 text-xs font-medium">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-1.5 rounded-md transition ${
                currentPage === 'home'
                  ? 'bg-neutral-900 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Panorama Geral
            </button>
            <button
              onClick={() => setCurrentPage('fase_dia')}
              className={`px-3 py-1.5 rounded-md transition ${
                currentPage === 'fase_dia'
                  ? 'bg-red-950/80 text-red-200 border border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              Fase do Dia
            </button>
            <button
              onClick={() => setCurrentPage('causas')}
              className={`px-3 py-1.5 rounded-md transition ${
                currentPage === 'causas'
                  ? 'bg-red-950/80 text-red-200 border border-red-800'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              Causas
            </button>
            <button
              onClick={() => setCurrentPage('estados')}
              className={`px-3 py-1.5 rounded-md transition ${
                currentPage === 'estados'
                  ? 'bg-red-950/80 text-red-200 border border-red-800'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              Estados
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* PÁGINA: PANORAMA GERAL (HOME)                            */}
      {/* ========================================================= */}
      {currentPage === 'home' && (
        <div className="space-y-16 pb-20">
          {/* Hero Editorial */}
          <section className="relative pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-900/60 bg-red-950/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Activity className="w-3.5 h-3.5" />
              Estatísticas Oficiais • 2021 a 2026
            </div>

            {/* Único título com a fonte serifada, conforme solicitado */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-5xl mx-auto">
              O quanto você sabe sobre os acidentes em rodovias brasileiras?
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto font-normal leading-relaxed text-justify">
              390.879 ocorrências registradas pela Polícia Rodoviária Federal. Mais de 32 mil mortes e 447 mil feridos. 
              Uma investigação sobre o perigo invisível que se esconde na transição da luz e nos momentos de aparente calma.
            </p>

            {/* Faixa Horizontal de Fotos Interativas */}
            <div className="mt-12 overflow-x-auto pb-4 pt-2 scrollbar-none">
              <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[750px] px-4">
                {HERO_PHOTOS.map((photo, idx) => (
                  <div
                    key={idx}
                    className="group relative h-72 sm:h-80 w-20 sm:w-24 hover:w-64 sm:hover:w-80 transition-all duration-500 ease-out rounded-lg overflow-hidden border border-neutral-800 hover:border-red-600 shadow-lg cursor-pointer flex-shrink-0"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-left transform translate-y-3 group-hover:translate-y-0 transition duration-300">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-red-500 block mb-1">
                        Cenário 0{idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {photo.title}
                      </h3>
                      <p className="text-[11px] text-neutral-300 mt-1 opacity-0 group-hover:opacity-100 transition duration-300 leading-snug">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2 font-mono">Passe o mouse sobre as imagens para visualizar cada contexto</p>
          </section>

          {/* Cards de Indicadores de Impacto */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl relative overflow-hidden">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block">
                  Total de Ocorrências
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2">
                  391.382
                </div>
                <span className="text-xs text-neutral-400 mt-2 block">
                  Sinistros agrupados catalogados
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neutral-700"></div>
              </div>

              <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl relative overflow-hidden">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block">
                  Total de Feridos
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-2">
                  447.565
                </div>
                <span className="text-xs text-neutral-400 mt-2 block">
                  Média de 114 feridos por 100 acidentes
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-600"></div>
              </div>

              <div className="bg-[#0f0505] border border-red-950 p-6 rounded-xl relative overflow-hidden shadow-[0_0_25px_rgba(220,38,38,0.1)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
                    Vítimas Fatais
                  </span>
                  <Skull className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-red-500 mt-2">
                  32.792
                </div>
                <span className="text-xs text-red-400/90 mt-2 block font-medium">
                  Taxa média de letalidade: 8,38%
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_8px_#dc2626]"></div>
              </div>

              <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Mortes no Amanhecer
                  </span>
                  <Sunrise className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-rose-400 mt-2">
                  12,84%
                </div>
                <span className="text-xs text-neutral-400 mt-2 block">
                  Maior taxa de letalidade registrada
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-rose-700"></div>
              </div>
            </div>
          </section>

          {/* Cards Temáticos (Subjetivos e Narrativos) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="border-b border-neutral-800 pb-4 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono text-red-500 uppercase tracking-widest">Temas em Destaque</span>
                <h2 className="text-2xl font-bold text-white mt-1">Investigações Detalhadas</h2>
              </div>
              <span className="text-xs text-neutral-500 hidden sm:block">Clique para abrir os dados aprofundados</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Fase do Dia */}
              <div
                onClick={() => setCurrentPage('fase_dia')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-red-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-red-500 uppercase">Estudo de Luminosidade</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60">
                      Alta Letalidade
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition">
                    A Ilusão da Luz: Onde a Escuridão Multiplica as Mortes
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed text-justify">
                    Mais de 214 mil colisões acontecem sob sol aberto, gerando o maior número de feridos. Contudo, ao amanhecer e na plena noite, a probabilidade de falecer dobra.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Ver painel completo de Fase do Dia</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Card Causas */}
              <div
                onClick={() => setCurrentPage('causas')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-red-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Fatores de Risco</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      Fator Humano
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition">
                    A Anatomia da Falha: O Comportamento do Condutor
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed text-justify">
                    Reação tardia, distração com dispositivos móveis, álcool e sono: a análise de como a atitude humana supera qualquer falha na pista.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Ver painel completo de Causas</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Card Estados */}
              <div
                onClick={() => setCurrentPage('estados')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-red-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Território</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      Geografia
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition">
                    Linhas de Asfalto: Os Trechos Mais Perigosos do País
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed text-justify">
                    Minas Gerais, Paraná e Santa Catarina lideram os registros. Uma análise sobre o relevo, malha e densidade de carretas pesadas.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Ver distribuição geográfica</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Card Histórico */}
              <div
                onClick={() => setCurrentPage('historico')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-red-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Série Temporal</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      2021 a 2026
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition">
                    A Marcha dos Anos: Estabilidade e Perdas Constantes
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed text-justify">
                    Acompanhamento histórico anual: as rodovias federais sustentam uma perda regular de mais de 5.400 vidas a cada ano.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Ver série histórica completa</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA ESPECÍFICA: FASE DO DIA (OS 3 DASHBOARDS SOLICITADOS) */}
      {/* ========================================================= */}
      {currentPage === 'fase_dia' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Voltar */}
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          {/* Cabeçalho da Análise */}
          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Estudo de Luminosidade e Severidade
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              A Ilusão da Luz: O Contraste entre Volume e Letalidade
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 max-w-4xl font-normal leading-relaxed text-justify">
              O cruzamento dos dados revela dois fatos opostos: o <span className="text-amber-400 font-bold">Pleno dia</span> lidera o volume absoluto de ocorrências e a quantidade de feridos, impulsionado pelo fluxo massivo de veículos. 
              Em contrapartida, o <span className="text-red-500 font-bold">Amanhecer</span> registra o menor número de acidentes, mas detém a mais devastadora taxa de mortalidade e a maior proporção de mortes por ferido das rodovias brasileiras.
            </p>
          </header>

          {/* Os Dois Cards Principais dos Insights a e b com animação hover */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0b0b0e] border-l-4 border-l-amber-500 border border-neutral-800 p-6 sm:p-7 rounded-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-950/30 cursor-pointer">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sun className="w-4 h-4" /> O Volume Diurno
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Pleno Dia: 214.387 acidentes e 252.853 feridos
              </h3>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed text-justify">
                A taxa de feridos atinge <strong className="text-amber-400">117,94%</strong>, indicando que em média um único acidente causa mais de uma vítima ferida (aproximadamente <span className="text-white font-semibold">118 feridos a cada 100 acidentes</span>). 
                Porém, a letalidade é a menor de todas: 6,04%.
              </p>
            </div>

            <div className="bg-[#120505] border-l-4 border-l-red-600 border border-red-950 p-6 sm:p-7 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-950/40 cursor-pointer">
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider mb-2">
                <Sunrise className="w-4 h-4" /> A Gravidade do Amanhecer
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Amanhecer: 19.001 acidentes e pico de 12,84% de mortalidade
              </h3>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed text-justify">
                Mesmo sendo o período com menor número de colisões, o amanhecer apresenta a maior proporção de mortes: <strong className="text-red-400">11,55 mortes a cada 100 feridos</strong>. 
                A ausência de reação decorrente do microsono torna os impactos desproporcionalmente fatais.
              </p>
            </div>
          </section>

          {/* ========================================================= */}
          {/* DASHBOARD 1: VALORES ABSOLUTOS (ACIDENTES x FERIDOS x MORTOS) */}
          {/* ========================================================= */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">Dashboard 01</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Comparativo de Valores Absolutos por Fase do Dia
              </h3>
            </div>

            <div className="h-80 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FASE_DIA_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="fase_dia" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                    formatter={(val) => val.toLocaleString('pt-BR')}
                  />
                  <Legend />
                  <Bar dataKey="total_acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total_feridos" name="Total de Feridos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total_mortos" name="Total de Mortos" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-neutral-950/80 p-5 rounded-xl border border-neutral-800 text-sm sm:text-base text-neutral-200 flex items-start gap-3 text-justify leading-relaxed">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Destaque no Pleno Dia:</strong> Repare que a barra amarela de feridos (252.853) supera a barra de acidentes (214.387), confirmando a taxa de 117,94% de feridos por acidente provocada por colisões múltiplas e engavetamentos em horários de pico.
              </span>
            </div>
          </section>

          {/* ========================================================= */}
          {/* DASHBOARD 2: TAXAS (%) E RÉGUA DIDÁTICA (MORTES A CADA 100 FERIDOS) */}
          {/* ========================================================= */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">Dashboard 02</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Taxas Proporcionais: Mortalidade vs. Feridos (%)
              </h3>
            </div>

            <div className="h-80 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FASE_DIA_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="fase_dia" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                    formatter={(val) => `${val}%`}
                  />
                  <Legend />
                  <Bar dataKey="taxa_mortalidade_pct" name="Taxa de Mortalidade (%)" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="taxa_feridos_pct" name="Taxa de Feridos (%)" fill="#eab308" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Seção dos 4 Blocos com Efeito de Pop-up */}
            <div className="bg-[#09090c] border border-neutral-800 p-6 rounded-xl space-y-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-300">
                Mortes registradas a cada 100 pessoas feridas
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="group relative bg-black/60 p-4 rounded-xl border border-neutral-800 hover:border-purple-500 hover:bg-[#120a16] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-purple-950/40 cursor-pointer">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-900/90 text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/50 pointer-events-none whitespace-nowrap">
                    Pico letal
                  </div>
                  <span className="text-xs text-neutral-400 block font-medium">Amanhecer</span>
                  <span className="text-2xl font-black text-white block mt-1">11,55</span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">mortes p/ 100 feridos</span>
                </div>
                <div className="group relative bg-black/60 p-4 rounded-xl border border-neutral-800 hover:border-purple-500 hover:bg-[#120a16] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-purple-950/40 cursor-pointer">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-900/90 text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/50 pointer-events-none whitespace-nowrap">
                    Alta severidade
                  </div>
                  <span className="text-xs text-neutral-400 block font-medium">Plena Noite</span>
                  <span className="text-2xl font-black text-white block mt-1">10,59</span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">mortes p/ 100 feridos</span>
                </div>
                <div className="group relative bg-black/60 p-4 rounded-xl border border-neutral-800 hover:border-purple-500 hover:bg-[#120a16] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-purple-950/40 cursor-pointer">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-900/90 text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/50 pointer-events-none whitespace-nowrap">
                    Transição
                  </div>
                  <span className="text-xs text-neutral-400 block font-medium">Anoitecer</span>
                  <span className="text-2xl font-bold text-white block mt-1">6,65</span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">mortes p/ 100 feridos</span>
                </div>
                <div className="group relative bg-black/60 p-4 rounded-xl border border-neutral-800 hover:border-purple-500 hover:bg-[#120a16] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-purple-950/40 cursor-pointer">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-900/90 text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/50 pointer-events-none whitespace-nowrap">
                    Menor letalidade
                  </div>
                  <span className="text-xs text-neutral-400 block font-medium">Pleno Dia</span>
                  <span className="text-2xl font-bold text-white block mt-1">5,12</span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">mortes p/ 100 feridos</span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* DASHBOARD 3: RAZÃO DIRETA MORTOS POR FERIDO              */}
          {/* ========================================================= */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">Dashboard 03</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Razão Direta: Mortos por Ferido (razao_mortos_por_ferido)
              </h3>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FASE_DIA_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="fase_dia" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} domain={[0, 0.14]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                    formatter={(val) => Number(val).toFixed(4)}
                  />
                  <Bar dataKey="razao_mortos_por_ferido" name="Razão Mortos / Ferido" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Frase Única em Formato Pop-up Comparativo */}
            <div className="group relative bg-[#0d0714] border border-purple-900/60 hover:border-purple-500 p-6 rounded-xl shadow-[0_0_25px_rgba(128,0,128,0.15)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-purple-900/30 cursor-pointer">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 text-[11px] font-mono uppercase tracking-wider mb-3">
                <Info className="w-3.5 h-3.5 text-purple-400" />
                Comparativo de Proporção Fatal
              </div>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed text-justify font-normal">
                No <strong className="text-white">Amanhecer</strong>, aproximadamente <strong>1 a cada 11 pessoas que sofriam lesão morria</strong>, enquanto em <strong className="text-white">Pleno Dia</strong> essa proporção diminui para apenas <strong>1 morte a cada 20 pessoas lesionadas</strong>.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA ESPECÍFICA: CAUSAS                                */}
      {/* ========================================================= */}
      {currentPage === 'causas' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Fatores de Risco
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              A Anatomia da Falha: O Fator Humano como Causa Suprema
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 max-w-4xl font-normal leading-relaxed text-justify">
              Mais de 70% das fatalidades decorrem de decisões e comportamentos do condutor: reação tardia, excesso de velocidade, sonolência e álcool.
            </p>
          </header>

          <section className="bg-[#09090c] border border-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-6">
              Ranking das 6 Principais Causas
            </h3>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CAUSAS_DATA} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis type="number" stroke="#a3a3a3" fontSize={11} />
                  <YAxis dataKey="causa" type="category" stroke="#a3a3a3" fontSize={11} width={220} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                  />
                  <Legend />
                  <Bar dataKey="total" name="Total Ocorrências" fill="#800080" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA ESPECÍFICA: ESTADOS                               */}
      {/* ========================================================= */}
      {currentPage === 'estados' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Distribuição Geográfica
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Linhas de Asfalto: Concentração Regional dos Sinistros
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 max-w-4xl font-normal leading-relaxed text-justify">
              Minas Gerais lidera isoladamente as estatísticas de acidentes e mortes, impulsionada pela maior malha rodoviária federal do país e relevo sinuoso com pistas simples em eixos como a BR-381 e BR-040.
            </p>
          </header>

          <section className="bg-[#09090c] border border-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-6">
              Top 6 Estados com Maior Severidade
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ESTADOS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="uf" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                  />
                  <Bar dataKey="acidentes" name="Acidentes Totais" fill="#800080" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA ESPECÍFICA: HISTÓRICO                             */}
      {/* ========================================================= */}
      {currentPage === 'historico' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Série Temporal
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              A Marcha dos Anos: Estabilidade e Perdas Constantes
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 max-w-4xl font-normal leading-relaxed text-justify">
              O comportamento das ocorrências ao longo dos últimos 5 anos comprova uma perda persistente acima de 5.400 vidas por ano nas rodovias federais.
            </p>
          </header>

          <section className="bg-[#09090c] border border-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-6">
              Tendência Anual (2021 a 2026)
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={HISTORICO_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="ano" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="acidentes" name="Ocorrências" stroke="#800080" strokeWidth={2} />
                  <Line type="monotone" dataKey="mortos" name="Vítimas Fatais" stroke="#dc2626" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* Rodapé Editorial sem Marcações Acadêmicas */}
      <footer className="border-t border-neutral-900 bg-[#040406] py-10 text-center text-xs text-neutral-500 space-y-2">
        <p className="tracking-widest uppercase text-neutral-400 font-bold">
          Observatório de Segurança em Rodovias Federais
        </p>
        <p>
          Dados Oficiais: Polícia Rodoviária Federal (PRF) & Base dos Dados
        </p>
      </footer>
    </div>
  );
}
