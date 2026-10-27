import React, { useState, useEffect, useMemo } from 'react';
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
  Legend,
  ReferenceLine
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
  Info,
  Calendar,
  Clock,
  MapPin,
  Car,
  Phone,
  HelpCircle,
  Compass,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import {
  DIAS_SEMANA_BRASIL,
  SERIE_TEMPORAL_DATA,
  ESTADOS_DIAS_DATA,
  ESTADOS_RANKING_LIST
} from './data/temporalData';
import {
  CAUSAS_VEICULOS_DATA,
  FAIXAS_VEICULOS_DATA
} from './data/causasVeiculosData';

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

// Perguntas interativas de percepção de risco na Home
const QUIZ_QUESTIONS = [
  {
    id: 1,
    pergunta: 'Em qual período do dia um acidente tem mais que o dobro de chance de ser fatal?',
    opcoes: [
      { texto: 'Pleno Dia (horário de pico)', correta: false },
      { texto: 'Amanhecer (4h30 às 6h30)', correta: true }
    ],
    explicacao: 'Correto: No Amanhecer, embora ocorram menos batidas (19.001), a taxa de mortalidade atinge 12,84% (11,55 mortes a cada 100 feridos), mais que o dobro do Pleno Dia (5,12 mortes a cada 100 feridos).'
  },
  {
    id: 2,
    pergunta: 'Qual conduta provoca a maior média de veículos envolvidos (2,57) e a maior letalidade (41,97%)?',
    opcoes: [
      { texto: 'Transitar na contramão', correta: true },
      { texto: 'Pista escorregadia / chuva', correta: false }
    ],
    explicacao: 'Exato: Transitar na contramão gera colisões frontais que envolvem em média 2,57 veículos por ocorrência e matam quase 42 pessoas a cada 100 acidentes.'
  },
  {
    id: 3,
    pergunta: 'Qual dia da semana concentra o maior número absoluto de mortes nas rodovias federais?',
    opcoes: [
      { texto: 'Sexta-feira (saída para o fim de semana)', correta: false },
      { texto: 'Domingo (retorno de viagens)', correta: true }
    ],
    explicacao: 'Confirmado pela PRF: O Domingo lidera tanto em acidentes (64.093) quanto em vítimas fatais (6.582 mortes), quase o dobro de uma terça-feira (3.583 mortes).'
  }
];

// Cenários reais cruzados da base para o Simulador de Risco
const CENARIOS_RISCO = {
  'Amanhecer': { mult: 1.53, desc: 'Janela crítica de microsono biológico e baixa visibilidade em neblina.' },
  'Plena Noite': { mult: 1.37, desc: 'Velocidades elevadas em pistas vazias, ofuscamento e menor tempo de resposta.' },
  'Anoitecer': { mult: 0.93, desc: 'Transição luminosa que reduz a percepção de profundidade e distância.' },
  'Pleno dia': { mult: 0.72, desc: 'Tráfego denso com alto volume de feridos, mas velocidades médias contidas.' }
};

const CENARIOS_DIA = {
  'Domingo': { mult: 1.23, desc: 'Pico nacional de letalidade no retorno de viagens e fadiga acumulada.' },
  'Sábado': { mult: 1.12, desc: 'Forte presença de deslocamentos de lazer e motoristas pouco habituados à BR.' },
  'Sexta': { mult: 0.95, desc: 'Conflito entre escoamento logístico pesado e saída para o fim de semana.' },
  'Dia Útil (Seg a Qui)': { mult: 0.88, desc: 'Predomínio de transporte profissional de cargas e deslocamentos pendulares.' }
};

const CENARIOS_CAUSA = {
  'Transitar na contramão': { baseLetalidade: 34.5, mediaVeic: 2.57, regra: 'Em pista simples, jamais inicie ultrapassagem na dúvida e reduza imediatamente ao ver veículos instáveis no sentido oposto.' },
  'Ultrapassagem Indevida': { baseLetalidade: 25.8, mediaVeic: 2.26, regra: 'Mais de 90% das mortes em ultrapassagens ocorrem em pistas simples. Só ultrapasse com visão limpa e sobra de potência.' },
  'Velocidade Incompatível': { baseLetalidade: 11.7, mediaVeic: 1.56, regra: 'Reduzir 15 km/h em trechos sinuosos ou sob chuva corta pela metade a energia cinética dissipada em caso de perda de controle.' },
  'Condutor Dormindo': { baseLetalidade: 10.6, mediaVeic: 1.76, regra: 'Ao primeiro sinal de pálpebra pesada ou bocejo repetido, pare em posto seguro. Café ou janela aberta não impedem o microsono.' },
  'Ingestão de Álcool': { baseLetalidade: 7.4, mediaVeic: 1.79, regra: 'O álcool elimina o reflexo de frenagem prévia, transformando desvios simples em saídas de pista e choques frontais.' },
  'Falta de Distância Segura': { baseLetalidade: 2.3, mediaVeic: 2.47, regra: 'Aplique a Regra dos 3 Segundos em relação ao veículo da frente (e 5 segundos se estiver chovendo ou atrás de carretas).' }
};

const ORDEM_PAGINAS = [
  { id: 'home', titulo: 'Panorama Geral' },
  { id: 'temporal', titulo: 'Análise Temporal' },
  { id: 'fase_dia', titulo: 'Fase do Dia' },
  { id: 'causas', titulo: 'Causas & Veículos' },
  { id: 'estados', titulo: 'Estados' }
];

// Tooltip rico e didático para leitura imediata por qualquer usuário
function CustomChartTooltip({ active, payload, label, unitSuffix = '', contextNote = '' }) {
  if (!active || !payload || !payload.length) return null;
  const rowData = payload[0]?.payload || {};

  return (
    <div className="bg-[#09090d]/95 border border-neutral-700 p-4 rounded-xl shadow-2xl backdrop-blur-md max-w-xs space-y-2 text-left">
      <div className="border-b border-neutral-800 pb-1.5 flex items-center justify-between gap-3">
        <span className="font-bold text-white text-sm">{label}</span>
        {rowData.parcial && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
            Ano parcial
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        {payload.map((entry, idx) => {
          const val = entry.value;
          const formatted =
            typeof val === 'number'
              ? Number.isInteger(val)
                ? val.toLocaleString('pt-BR')
                : val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
              : val;
          return (
            <div key={idx} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: entry.color || entry.fill }} />
                {entry.name}:
              </span>
              <span className="font-bold text-white font-mono">
                {formatted}{unitSuffix}
              </span>
            </div>
          );
        })}
      </div>
      {rowData.destaque && (
        <p className="text-[11px] text-neutral-300 pt-1.5 border-t border-neutral-800/80 leading-snug">
          {rowData.destaque}
        </p>
      )}
      {contextNote && !rowData.destaque && (
        <p className="text-[11px] text-neutral-400 pt-1.5 border-t border-neutral-800/80 leading-snug">
          {contextNote}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedUf, setSelectedUf] = useState('MG');
  const [ufSearch, setUfSearch] = useState('');
  const [regiaoFiltro, setRegiaoFiltro] = useState('Todas');
  const [metricaTopEstados, setMetricaTopEstados] = useState('acidentes');
  const [causasSortBy, setCausasSortBy] = useState('media_veiculos');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Estados do Quiz e Simulador na Home
  const [quizAnswers, setQuizAnswers] = useState({});
  const [simFase, setSimFase] = useState('Amanhecer');
  const [simDia, setSimDia] = useState('Domingo');
  const [simCausa, setSimCausa] = useState('Transitar na contramão');

  // Rolar suavemente para o topo ao trocar de aba
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Barra de progresso de leitura no topo
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const current = (window.scrollY / totalScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, current)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Ordenação dinâmica para a aba de Causas & Veículos
  const sortedCausasData = useMemo(() => {
    const copy = [...CAUSAS_VEICULOS_DATA];
    if (causasSortBy === 'media_veiculos') {
      return copy.sort((a, b) => b.media_veiculos - a.media_veiculos);
    }
    if (causasSortBy === 'taxa_mortalidade') {
      return copy.sort((a, b) => b.taxa_mortalidade - a.taxa_mortalidade);
    }
    return copy.sort((a, b) => b.veiculos - a.veiculos);
  }, [causasSortBy]);

  // Filtro de UFs para a aba Estados
  const filteredUfs = useMemo(() => {
    return ESTADOS_RANKING_LIST.filter((item) => {
      const matchRegiao = regiaoFiltro === 'Todas' || item.regiao === regiaoFiltro;
      const termo = ufSearch.trim().toLowerCase();
      const matchBusca =
        !termo ||
        item.sigla.toLowerCase().includes(termo) ||
        item.nome.toLowerCase().includes(termo) ||
        item.rodovia_critica.toLowerCase().includes(termo);
      return matchRegiao && matchBusca;
    });
  }, [ufSearch, regiaoFiltro]);

  // Top 10 Estados conforme métrica selecionada
  const top10EstadosChart = useMemo(() => {
    const copy = [...ESTADOS_RANKING_LIST];
    copy.sort((a, b) => b[metricaTopEstados] - a[metricaTopEstados]);
    return copy.slice(0, 10);
  }, [metricaTopEstados]);

  // Cálculo do Simulador de Cenário de Risco
  const resultadoSimulador = useMemo(() => {
    const f = CENARIOS_RISCO[simFase] || CENARIOS_RISCO['Pleno dia'];
    const d = CENARIOS_DIA[simDia] || CENARIOS_DIA['Domingo'];
    const c = CENARIOS_CAUSA[simCausa] || CENARIOS_CAUSA['Transitar na contramão'];
    const letalidadeEstimada = Math.min(49.6, Number((c.baseLetalidade * f.mult * d.mult * 0.82).toFixed(1)));
    let nivel = 'Moderado';
    let corBadge = 'bg-amber-950/80 text-amber-300 border-amber-700';
    if (letalidadeEstimada >= 22) {
      nivel = 'Extremo (Crítico)';
      corBadge = 'bg-red-950/90 text-red-200 border-red-600';
    } else if (letalidadeEstimada >= 10) {
      nivel = 'Alto (Severo)';
      corBadge = 'bg-purple-950/90 text-purple-200 border-purple-600';
    }
    return {
      letalidadeEstimada,
      mediaVeic: c.mediaVeic,
      regra: c.regra,
      descFase: f.desc,
      descDia: d.desc,
      nivel,
      corBadge
    };
  }, [simFase, simDia, simCausa]);

  const ufAtual = ESTADOS_DIAS_DATA[selectedUf] || ESTADOS_DIAS_DATA['MG'];
  const currentTabIndex = ORDEM_PAGINAS.findIndex((p) => p.id === (currentPage === 'historico' ? 'temporal' : currentPage));
  const prevTab = currentTabIndex > 0 ? ORDEM_PAGINAS[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < ORDEM_PAGINAS.length - 1 ? ORDEM_PAGINAS[currentTabIndex + 1] : null;

  return (
    <div className="bg-[#050507] text-neutral-100 min-h-screen selection:bg-red-800 selection:text-white font-sans antialiased">
      {/* Navegação Superior */}
      <nav className="border-b border-neutral-900 bg-[#070709]/95 sticky top-0 z-50 backdrop-blur-md">
        {/* Barra de Progresso de Leitura */}
        <div className="w-full h-[2px] bg-neutral-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#800080] via-[#dc2626] to-[#f59e0b] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

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

          <div className="flex items-center gap-1 sm:gap-2 text-xs font-medium overflow-x-auto py-1">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-1.5 rounded-md transition whitespace-nowrap flex items-center gap-1.5 ${
                currentPage === 'home'
                  ? 'bg-neutral-900 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Panorama Geral
            </button>
            <button
              onClick={() => setCurrentPage('temporal')}
              className={`px-3 py-1.5 rounded-md transition whitespace-nowrap flex items-center gap-1.5 ${
                currentPage === 'temporal'
                  ? 'bg-purple-950/80 text-purple-200 border border-purple-800 shadow-[0_0_15px_rgba(128,0,128,0.25)]'
                  : 'text-neutral-400 hover:text-purple-400'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Análise Temporal
            </button>
            <button
              onClick={() => setCurrentPage('fase_dia')}
              className={`px-3 py-1.5 rounded-md transition whitespace-nowrap flex items-center gap-1.5 ${
                currentPage === 'fase_dia'
                  ? 'bg-red-950/80 text-red-200 border border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              <Sunrise className="w-3.5 h-3.5" />
              Fase do Dia
            </button>
            <button
              onClick={() => setCurrentPage('causas')}
              className={`px-3 py-1.5 rounded-md transition whitespace-nowrap flex items-center gap-1.5 ${
                currentPage === 'causas'
                  ? 'bg-purple-950/80 text-purple-200 border border-purple-800 shadow-[0_0_15px_rgba(128,0,128,0.25)]'
                  : 'text-neutral-400 hover:text-purple-400'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              Causas & Veículos
            </button>
            <button
              onClick={() => setCurrentPage('estados')}
              className={`px-3 py-1.5 rounded-md transition whitespace-nowrap flex items-center gap-1.5 ${
                currentPage === 'estados'
                  ? 'bg-red-950/80 text-red-200 border border-red-800'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Estados (27 UFs)
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* PÁGINA: PANORAMA GERAL (HOME)                            */}
      {/* ========================================================= */}
      {currentPage === 'home' && (
        <div className="space-y-16 pb-20 animate-page-enter">
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
              391.382 ocorrências registradas pela Polícia Rodoviária Federal. Mais de 32 mil mortes e 447 mil feridos. 
              Uma investigação sobre o perigo invisível que se esconde na transição da luz, no calendário e nas condutas ao volante.
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
                  Sinistros catalogados (746.587 veículos)
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#800080]"></div>
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
              <span className="text-xs text-neutral-500 hidden sm:block">Clique em qualquer cartão para abrir os painéis completos</span>
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

              {/* Card Causas e Veículos */}
              <div
                onClick={() => setCurrentPage('causas')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-purple-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-purple-400 uppercase">Dinâmica de Colisão</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60">
                      Causa & Veículos
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition">
                    A Anatomia da Falha: Causas e Veículos Envolvidos
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed text-justify">
                    A relação entre a atitude do motorista e o número de veículos atingidos: da saída de pista isolada (sono e álcool) aos engavetamentos múltiplos e invasões fatais de contramão.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-purple-400 group-hover:text-purple-300">
                  <span>Ver causas e veículos envolvidos</span>
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
                    <span className="text-xs font-mono text-neutral-400 uppercase">Território Nacional</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60">
                      Raio-X das 27 UFs
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition">
                    Linhas de Asfalto: Os Trechos Mais Perigosos do País
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed text-justify">
                    Minas Gerais, Santa Catarina e Paraná lideram o volume nacional de acidentes. Explore as 27 Unidades da Federação, suas rodovias críticas e o dia da semana mais perigoso em cada estado.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Explorar Raio-X interativo dos 27 Estados</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Card Análise Temporal */}
              <div
                onClick={() => setCurrentPage('temporal')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-purple-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-purple-400 uppercase">Calendário & Série</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60">
                      2021 a 2026
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition">
                    Ciclos de Risco: A Linha do Tempo e os Dias da Semana
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed text-justify">
                    A evolução anual das ocorrências e a dinâmica dos 7 dias da semana: entenda por que quase metade de todas as mortes nas rodovias federais acontece entre sexta-feira e domingo.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-purple-400 group-hover:text-purple-300">
                  <span>Abrir análise temporal e dias da semana</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          </section>

          {/* Desafio Interativo de Percepção de Risco (Conectado à pergunta do título principal) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#09090c] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" /> Teste Rápido de Percepção
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Intuição vs. Estatística Oficial: Você conhece o perigo real da estrada?
                  </h2>
                </div>
                <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
                  Clique em uma opção em cada pergunta
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {QUIZ_QUESTIONS.map((q) => {
                  const escolhida = quizAnswers[q.id];
                  return (
                    <div key={q.id} className="bg-black/60 border border-neutral-800 p-5 rounded-xl flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <span className="text-xs font-mono text-purple-400 uppercase">Desafio 0{q.id}</span>
                        <h3 className="text-base font-bold text-white leading-snug">{q.pergunta}</h3>
                        <div className="space-y-2 pt-1">
                          {q.opcoes.map((op, idx) => {
                            const selecionada = escolhida === idx;
                            let btnStyle = 'bg-neutral-900/80 border-neutral-700 text-neutral-200 hover:border-purple-500';
                            if (escolhida !== undefined) {
                              if (op.correta) {
                                btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                              } else if (selecionada && !op.correta) {
                                btnStyle = 'bg-red-950/60 border-red-600 text-red-200';
                              }
                            }
                            return (
                              <button
                                key={idx}
                                onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                                className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{op.texto}</span>
                                {escolhida !== undefined && op.correta && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {escolhida !== undefined && (
                        <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-neutral-200 leading-relaxed text-justify">
                          {q.explicacao}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Simulador Interativo de Cenário de Risco */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#0c0814] via-[#09090c] to-[#120608] border border-purple-900/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(128,0,128,0.12)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
                <div>
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">
                    Ferramenta Interativa de Cruzamento de Dados
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Simulador de Severidade e Prevenção na Rodovia
                  </h2>
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${resultadoSimulador.corBadge}`}>
                  Nível de Risco: {resultadoSimulador.nivel}
                </span>
              </div>

              <p className="text-base text-neutral-300 leading-relaxed text-justify">
                Selecione uma combinação de horário, período da semana e fator de risco para visualizar como os indicadores se comportam na base histórica da Polícia Rodoviária Federal e qual a recomendação prática de direção defensiva para o cenário escolhido.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/60 border border-neutral-800 p-4 rounded-xl space-y-2">
                  <label className="text-xs font-mono uppercase text-neutral-400 block">1. Fase do Dia</label>
                  <select
                    value={simFase}
                    onChange={(e) => setSimFase(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    {Object.keys(CENARIOS_RISCO).map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                  <p className="text-xs text-neutral-400 leading-snug pt-1">{resultadoSimulador.descFase}</p>
                </div>

                <div className="bg-black/60 border border-neutral-800 p-4 rounded-xl space-y-2">
                  <label className="text-xs font-mono uppercase text-neutral-400 block">2. Período da Semana</label>
                  <select
                    value={simDia}
                    onChange={(e) => setSimDia(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    {Object.keys(CENARIOS_DIA).map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                  <p className="text-xs text-neutral-400 leading-snug pt-1">{resultadoSimulador.descDia}</p>
                </div>

                <div className="bg-black/60 border border-neutral-800 p-4 rounded-xl space-y-2">
                  <label className="text-xs font-mono uppercase text-neutral-400 block">3. Conduta ou Fator Crítico</label>
                  <select
                    value={simCausa}
                    onChange={(e) => setSimCausa(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    {Object.keys(CENARIOS_CAUSA).map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                  <p className="text-xs text-neutral-400 leading-snug pt-1">
                    Envolve em média <strong className="text-white">{resultadoSimulador.mediaVeic.toLocaleString('pt-BR')} veículos</strong> por sinistro.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                <div className="bg-black/80 border border-red-950/80 p-5 rounded-xl flex flex-col justify-center">
                  <span className="text-xs uppercase font-mono text-red-400">Letalidade Estimada no Cenário</span>
                  <div className="text-3xl sm:text-4xl font-black text-red-500 mt-1">
                    {resultadoSimulador.letalidadeEstimada.toLocaleString('pt-BR')}%
                  </div>
                  <span className="text-xs text-neutral-400 mt-1">
                    Mortes a cada 100 ocorrências registradas sob essas condições (Média nacional: 8,38%)
                  </span>
                </div>

                <div className="lg:col-span-2 bg-black/80 border border-neutral-800 p-5 rounded-xl flex items-start gap-3.5">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
                      Protocolo de Prevenção Recomendado
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed text-justify">
                      {resultadoSimulador.regra}
                    </p>
                  </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-page-enter">
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

          {/* Resumo Executivo em 30 Segundos */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#08080b] border border-neutral-800/90 p-5 rounded-xl">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-purple-400 font-bold">1. O Fato Principal</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                54,8% de todos os acidentes acontecem em Pleno Dia (214.387), gerando 118 feridos para cada 100 batidas devido à lotação dos veículos e ao trânsito intenso.
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-800 md:pl-4">
              <span className="text-[11px] font-mono uppercase text-red-400 font-bold">2. O Paradoxo da Madrugada</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                No Amanhecer ocorrem apenas 4,8% das batidas (19.001), mas a chance de morte por ferido (11,55%) é mais que o dobro da registrada sob a luz do sol (5,12%).
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-800 md:pl-4">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">3. Regra de Sobrevivência</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                Entre 4h e 6h30 da manhã o corpo humano atinge o vale térmico circadiano. Evite iniciar viagens nesse horário ou faça parada obrigatória ao primeiro sinal de fadiga.
              </p>
            </div>
          </section>

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
                  <YAxis stroke="#a3a3a3" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip content={<CustomChartTooltip />} />
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
                  <Tooltip content={<CustomChartTooltip unitSuffix="%" />} />
                  <Legend />
                  <ReferenceLine
                    y={8.38}
                    stroke="#ef4444"
                    strokeDasharray="4 4"
                    label={{ value: 'Média Nacional de Mortalidade (8,38%)', position: 'insideTopRight', fill: '#fca5a5', fontSize: 11 }}
                  />
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
                  <Tooltip content={<CustomChartTooltip />} />
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
      {/* PÁGINA ESPECÍFICA: CAUSAS E VEÍCULOS ENVOLVIDOS          */}
      {/* ========================================================= */}
      {currentPage === 'causas' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-page-enter">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          <header className="space-y-4">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">
              Dinâmica de Colisão e Fatores de Risco
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Causa do Acidente e Quantidade de Veículos Envolvidos
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 max-w-4xl font-normal leading-relaxed text-justify">
              O cruzamento entre a causa do acidente e o número de veículos envolvidos revela a dinâmica física do perigo nas rodovias federais: enquanto o sono e a ingestão de álcool levam a colisões e saídas de pista com menor média de veículos (1,7 a 1,8), a falta de distância de segurança e a invasão de contramão geram engavetamentos e colisões múltiplas violentas, atingindo até 2,57 veículos por sinistro e multiplicando a letalidade.
            </p>
          </header>

          {/* Resumo Executivo em 30 Segundos */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#08080b] border border-neutral-800/90 p-5 rounded-xl">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-purple-400 font-bold">1. O Fato Principal</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                746.587 veículos estiveram envolvidos nas 391.382 ocorrências (média nacional de 1,91 veículos por acidente). Transitar na contramão eleva essa média para 2,57 veículos.
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-800 md:pl-4">
              <span className="text-[11px] font-mono uppercase text-red-400 font-bold">2. Escalada de Letalidade</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                Quando o acidente passa de 1 veículo (3,97% letal) para 4 ou mais veículos (19,34% letal), a probabilidade de morte cresce quase 5 vezes devido ao efeito dominó na pista.
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-800 md:pl-4">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">3. Regra dos 3 Segundos</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                Manter 3 segundos de distância para o veículo à frente evita os 63.159 veículos atingidos por falta de distância de segurança e reduz drasticamente colisões traseiras.
              </p>
            </div>
          </section>

          {/* Cards de Métricas de Destaque */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block">
                Total de Veículos Envolvidos
              </span>
              <div className="text-3xl font-black text-white mt-2">
                746.587
              </div>
              <span className="text-xs text-neutral-400 mt-2 block">
                Catalogados em 391.382 acidentes
              </span>
            </div>

            <div className="bg-[#0b0b0e] border border-purple-900/60 p-6 rounded-xl shadow-[0_0_20px_rgba(128,0,128,0.1)]">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block">
                Maior Média de Veículos
              </span>
              <div className="text-3xl font-black text-purple-400 mt-2">
                2,57
              </div>
              <span className="text-xs text-neutral-300 mt-2 block">
                Transitar na contramão (32.980 veíc.)
              </span>
            </div>

            <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block">
                Líder em Engavetamentos
              </span>
              <div className="text-3xl font-black text-amber-400 mt-2">
                63.159
              </div>
              <span className="text-xs text-neutral-400 mt-2 block">
                Veículos por falta de distância segura
              </span>
            </div>

            <div className="bg-[#120505] border border-red-950 p-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.1)]">
              <span className="text-xs font-semibold uppercase tracking-widest text-red-400 block">
                Letalidade em 4+ Veículos
              </span>
              <div className="text-3xl font-black text-red-500 mt-2">
                19,34%
              </div>
              <span className="text-xs text-red-400/90 mt-2 block">
                5x maior que acidentes de 1 veículo
              </span>
            </div>
          </section>

          {/* Barra Interativa de Ordenação das Causas */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#09090c] border border-neutral-800 p-4 rounded-xl">
            <span className="text-xs font-mono uppercase text-neutral-400">
              Ordenar causas nos gráficos abaixo por:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCausasSortBy('media_veiculos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  causasSortBy === 'media_veiculos'
                    ? 'bg-purple-900/80 text-white border border-purple-500'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                Maior Média de Veículos
              </button>
              <button
                onClick={() => setCausasSortBy('taxa_mortalidade')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  causasSortBy === 'taxa_mortalidade'
                    ? 'bg-red-900/80 text-white border border-red-500'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                Maior Taxa de Letalidade (%)
              </button>
              <button
                onClick={() => setCausasSortBy('veiculos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  causasSortBy === 'veiculos'
                    ? 'bg-amber-900/80 text-white border border-amber-500'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                Maior Volume de Veículos
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DASHBOARD 01: MÉDIA DE VEÍCULOS POR CAUSA DO ACIDENTE     */}
          {/* ========================================================= */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">Dashboard 01</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Média de Veículos Envolvidos por Causa do Acidente
              </h3>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedCausasData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis type="number" domain={[1.2, 2.8]} stroke="#a3a3a3" fontSize={11} unit=" veíc" />
                  <YAxis dataKey="causa" type="category" stroke="#a3a3a3" fontSize={11} width={230} />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        unitSuffix=" veíc/acidente"
                        contextNote="Média nacional: 1,91 veículos por acidente."
                      />
                    }
                  />
                  <ReferenceLine
                    x={1.91}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    label={{ value: 'Média Nacional (1,91)', position: 'top', fill: '#fcd34d', fontSize: 11 }}
                  />
                  <Bar dataKey="media_veiculos" name="Média de Veículos por Acidente" fill="#800080" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-neutral-950/80 p-5 rounded-xl border border-neutral-800 text-sm sm:text-base text-neutral-200 text-justify leading-relaxed">
              <strong>Contraste Causal:</strong> O comportamento de <strong>Transitar na contramão (2,57)</strong> e a <strong>Falta de distância de segurança (2,47)</strong> geram os maiores impactos coletivos, envolvendo rotineiramente 2 a 3 veículos por ocorrência. Em contraste, causas associadas à perda de consciência ou reflexos lentos, como <strong>Demais falhas mecânicas (1,60)</strong>, <strong>Condutor dormindo (1,76)</strong> e <strong>Ingestão de álcool (1,79)</strong>, apresentam menor média de veículos, pois grande parte dessas colisões se restringe a saídas de pista, capotamentos solitários e choques contra árvores ou muretas.
            </div>
          </section>

          {/* ========================================================= */}
          {/* DASHBOARD 02: LETALIDADE POR FAIXA DE VEÍCULOS ENVOLVIDOS */}
          {/* ========================================================= */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">Dashboard 02</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Escalada da Severidade: Acidentes e Mortes por Faixa de Veículos
              </h3>
            </div>

            <div className="h-80 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FAIXAS_VEICULOS_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="faixa" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend />
                  <Bar dataKey="acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Grid dos 4 Cards de Faixas no Formato Pop-up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FAIXAS_VEICULOS_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-black/60 p-5 rounded-xl border border-neutral-800 hover:border-purple-500 hover:bg-[#120a16] transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-950/40 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-purple-400 uppercase font-bold">{item.faixa}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60 font-semibold">
                        {item.taxa_mortalidade}% letal
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white mt-1">
                      {item.acidentes.toLocaleString('pt-BR')}
                    </div>
                    <span className="text-xs text-neutral-400 block mt-0.5">
                      {item.mortos.toLocaleString('pt-BR')} mortes registradas
                    </span>
                    <p className="text-xs text-neutral-300 mt-3 leading-relaxed text-justify">
                      {item.perfil}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* DASHBOARD 03: COMPARATIVO VEÍCULOS x ACIDENTES x MORTES   */}
          {/* ========================================================= */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">Dashboard 03</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Volume Total: Veículos Atingidos vs. Acidentes vs. Fatalidades
              </h3>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedCausasData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis type="number" stroke="#a3a3a3" fontSize={11} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <YAxis dataKey="causa" type="category" stroke="#a3a3a3" fontSize={11} width={230} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend />
                  <Bar dataKey="veiculos" name="Total de Veículos" fill="#800080" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="acidentes" name="Total de Acidentes" fill="#525252" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA ESPECÍFICA: ESTADOS (RAIO-X DAS 27 UFs)            */}
      {/* ========================================================= */}
      {currentPage === 'estados' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-page-enter">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Distribuição Geográfica Oficial • Todas as 27 Unidades da Federação
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Linhas de Asfalto: Raio-X Estadual e Concentração Regional
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 max-w-4xl font-normal leading-relaxed text-justify">
              Minas Gerais (50.819 acidentes e 4.166 mortes), Santa Catarina (45.452 acidentes) e Paraná (42.329 acidentes) lideram o volume nacional de sinistros nas rodovias federais. Selecione qualquer estado abaixo para inspecionar sua letalidade, rodovia federal mais crítica e distribuição exata ao longo dos 7 dias da semana.
            </p>
          </header>

          {/* Resumo Executivo em 30 Segundos */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#08080b] border border-neutral-800/90 p-5 rounded-xl">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-purple-400 font-bold">1. Os 3 Líderes em Volume</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                Minas Gerais (1º), Santa Catarina (2º) e Paraná (3º) somam sozinhos 138.600 ocorrências, concentrando 35,4% de todos os acidentes em rodovias federais do Brasil.
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-800 md:pl-4">
              <span className="text-[11px] font-mono uppercase text-red-400 font-bold">2. Contraste de Severidade</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                Enquanto Santa Catarina tem alta densidade urbana na BR-101 com letalidade menor (4,84%), estados com longas retas de pista simples no Norte e Nordeste superam 13% de letalidade.
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-800 md:pl-4">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">3. Atenção ao Relevo e Clima</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                Em trechos de serra (BR-381 em MG, BR-277 no PR e BR-116 em SP/RS), use freio-motor em descidas longas e redobre a distância de frenagem sob neblina.
              </p>
            </div>
          </section>

          {/* Filtro e Seletor Interativo das 27 UFs */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-red-400 uppercase tracking-widest block">
                  Explorador Estadual Interativo
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Selecione uma Unidade da Federação ({filteredUfs.length} exibidas)
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={ufSearch}
                    onChange={(e) => setUfSearch(e.target.value)}
                    placeholder="Buscar UF, estado ou BR..."
                    className="bg-neutral-900 border border-neutral-700 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <select
                  value={regiaoFiltro}
                  onChange={(e) => setRegiaoFiltro(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Todas">Todas as Regiões</option>
                  <option value="Sudeste">Sudeste</option>
                  <option value="Sul">Sul</option>
                  <option value="Nordeste">Nordeste</option>
                  <option value="Centro-Oeste">Centro-Oeste</option>
                  <option value="Norte">Norte</option>
                </select>
              </div>
            </div>

            {/* Grade de Botões das 27 UFs */}
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {filteredUfs.map((item) => {
                const ativo = selectedUf === item.sigla;
                return (
                  <button
                    key={item.sigla}
                    onClick={() => setSelectedUf(item.sigla)}
                    className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
                      ativo
                        ? 'bg-purple-950/90 border-purple-500 text-white shadow-[0_0_15px_rgba(128,0,128,0.35)] scale-[1.03]'
                        : 'bg-black/60 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-black text-sm">{item.sigla}</span>
                      <span className="text-[10px] font-mono text-neutral-400">#{item.rank}</span>
                    </div>
                    <span className="text-[11px] text-neutral-400 truncate mt-1">
                      {(item.acidentes / 1000).toFixed(1)}k acid.
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Painel de Diagnóstico Completo da UF Selecionada */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
              <div className="bg-black/70 border border-neutral-800 p-6 rounded-xl flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      {ufAtual.regiao} • #{ufAtual.rank}º no Ranking Nacional
                    </span>
                    <span className="text-xs font-mono text-red-400 font-bold">
                      {ufAtual.taxa_mortalidade}% letalidade
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-white">
                    {ufAtual.nome} ({ufAtual.sigla})
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                    {ufAtual.perfil_critico}.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-800">
                    <span className="text-[11px] text-neutral-400 block">Total de Acidentes</span>
                    <span className="text-xl font-black text-white">{ufAtual.acidentes.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-800">
                    <span className="text-[11px] text-amber-400 block">Total de Feridos</span>
                    <span className="text-xl font-black text-amber-400">{ufAtual.feridos.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="bg-neutral-950 p-3.5 rounded-lg border border-red-950/80">
                    <span className="text-[11px] text-red-400 block">Vítimas Fatais</span>
                    <span className="text-xl font-black text-red-500">{ufAtual.mortos.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="bg-neutral-950 p-3.5 rounded-lg border border-purple-950/80">
                    <span className="text-[11px] text-purple-300 block">Dia Mais Crítico</span>
                    <span className="text-lg font-black text-purple-300">{ufAtual.pico_dia}</span>
                    <span className="text-[10px] text-neutral-400 block">{ufAtual.pico_qtd.toLocaleString('pt-BR')} ocorrências</span>
                  </div>
                </div>

                <div className="bg-neutral-950/90 p-3.5 rounded-lg border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
                  <span>Eixo Rodoviário de Maior Atenção:</span>
                  <strong className="text-white font-mono">{ufAtual.rodovia_critica}</strong>
                </div>
              </div>

              {/* Gráfico dos 7 Dias da Semana da UF Selecionada */}
              <div className="lg:col-span-2 bg-black/50 border border-neutral-800 p-6 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-purple-400 uppercase">Dashboard Estadual 01</span>
                    <h4 className="text-lg font-bold text-white">
                      Distribuição por Dia da Semana em {ufAtual.nome} ({ufAtual.sigla})
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2.5 py-1 rounded">
                    Fim de semana (Sex-Dom): {ufAtual.fds_pct}% dos acidentes
                  </span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ufAtual.distribuicao} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                      <XAxis dataKey="dia" stroke="#a3a3a3" fontSize={12} />
                      <YAxis stroke="#a3a3a3" fontSize={12} />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Legend />
                      <Bar dataKey="acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="feridos" name="Total de Feridos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboard 02: Comparativo Nacional Top 10 Estados */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-red-400 uppercase tracking-widest block">Dashboard Estadual 02</span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Ranking Nacional: Os 10 Estados Mais Críticos
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMetricaTopEstados('acidentes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    metricaTopEstados === 'acidentes'
                      ? 'bg-purple-900/80 text-white border border-purple-500'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                  }`}
                >
                  Por Volume de Acidentes
                </button>
                <button
                  onClick={() => setMetricaTopEstados('mortos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    metricaTopEstados === 'mortos'
                      ? 'bg-red-900/80 text-white border border-red-500'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                  }`}
                >
                  Por Vítimas Fatais
                </button>
              </div>
            </div>

            <div className="h-80 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={top10EstadosChart} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="sigla" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend />
                  <Bar dataKey="acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="feridos" name="Total de Feridos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA ESPECÍFICA: ANÁLISE TEMPORAL E DIAS DA SEMANA     */}
      {/* ========================================================= */}
      {(currentPage === 'temporal' || currentPage === 'historico') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-page-enter">
          {/* Voltar */}
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          {/* Cabeçalho */}
          <header className="space-y-4">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">
              Análise Temporal e Calendário
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Ciclos de Risco: A Linha do Tempo e os Dias da Semana
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 max-w-4xl font-normal leading-relaxed text-justify">
              A distribuição das ocorrências ao longo do calendário revela padrões críticos: enquanto terças e quartas concentram os menores volumes de colisões, os fins de semana concentram picos desproporcionais de sinistros e fatalidades, impulsionados pelo fluxo turístico, deslocamentos intermunicipais e consumo de bebidas alcoólicas.
            </p>
          </header>

          {/* Resumo Executivo em 30 Segundos */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#08080b] border border-neutral-800/90 p-5 rounded-xl">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-purple-400 font-bold">1. O Fato Principal</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                O Domingo é o dia mais letal do calendário brasileiro: concentra 64.093 acidentes e 6.582 mortes (10,27 mortes a cada 100 acidentes), quase o dobro da terça-feira.
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-800 md:pl-4">
              <span className="text-[11px] font-mono uppercase text-red-400 font-bold">2. Efeito Fim de Semana</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                Quase metade de todas as mortes nas rodovias federais (48,3%) ocorre concentrada nos 3 dias entre sexta-feira, sábado e domingo.
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-800 md:pl-4">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">3. Planejamento de Viagem</span>
              <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                Evite retornar de viagem no domingo entre 16h e 21h, quando o cansaço acumulado se soma ao anoitecer e ao gargalo de entrada nas regiões metropolitanas.
              </p>
            </div>
          </section>

          {/* Cards de Métricas do Calendário */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block">
                Total Registrado (2021-2026)
              </span>
              <div className="text-3xl font-black text-white mt-2">
                391.382
              </div>
              <span className="text-xs text-neutral-400 mt-2 block">
                Ocorrências catalogadas pela PRF
              </span>
            </div>

            <div className="bg-[#0b0b0e] border border-purple-900/60 p-6 rounded-xl shadow-[0_0_20px_rgba(128,0,128,0.1)]">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block">
                Pico Semanal no Brasil
              </span>
              <div className="text-3xl font-black text-purple-400 mt-2">
                Domingo
              </div>
              <span className="text-xs text-neutral-300 mt-2 block">
                64.093 acidentes (16,4% do total)
              </span>
            </div>

            <div className="bg-[#120505] border border-red-950 p-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.1)]">
              <span className="text-xs font-semibold uppercase tracking-widest text-red-400 block">
                Fatalidades aos Domingos
              </span>
              <div className="text-3xl font-black text-red-500 mt-2">
                6.582
              </div>
              <span className="text-xs text-red-400/90 mt-2 block">
                Quase o dobro das terças-feiras (3.583)
              </span>
            </div>

            <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block">
                Concentração no Fim de Semana
              </span>
              <div className="text-3xl font-black text-amber-400 mt-2">
                48,3%
              </div>
              <span className="text-xs text-neutral-400 mt-2 block">
                De todas as mortes (Sex, Sáb e Dom)
              </span>
            </div>
          </section>

          {/* ========================================================= */}
          {/* DASHBOARD 01: SÉRIE TEMPORAL ANUAL (2021 A 2026)          */}
          {/* ========================================================= */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">Dashboard 01</span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Série Temporal das Ocorrências e Vítimas (2021 a 2026*)
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-amber-950/50 border border-amber-800/60 px-3 py-1 rounded-lg">
                *2026 contempla dados parciais do ano em curso
              </span>
            </div>

            <div className="h-80 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SERIE_TEMPORAL_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="ano" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip
                    content={
                      <CustomChartTooltip contextNote="Nota: O ano de 2026* reflete o recorte parcial extraído antes do encerramento do exercício anual." />
                    }
                  />
                  <Legend />
                  <Line type="monotone" dataKey="acidentes" name="Ocorrências" stroke="#800080" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="feridos" name="Feridos" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="mortos" name="Vítimas Fatais" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-neutral-950/80 p-5 rounded-xl border border-neutral-800 text-sm sm:text-base text-neutral-200 text-justify leading-relaxed">
              <strong>Tendência Histórica:</strong> As ocorrências apresentaram estabilidade entre 2021 (64.567) e 2022 (64.606), subindo para 67.766 em 2023 e atingindo o pico de 73.202 acidentes em 2024. Em 2026*, os 48.712 acidentes referem-se ao período parcial contabilizado até a extração da base, mantendo a mesma taxa severa de letalidade (8,46%).
            </div>
          </section>

          {/* ========================================================= */}
          {/* DASHBOARD 02: DISTRIBUIÇÃO POR DIA DA SEMANA NO BRASIL     */}
          {/* ========================================================= */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 sm:p-8 rounded-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">Dashboard 02</span>
              <h3 className="text-xl font-bold text-white mt-1">
                A Dinâmica dos 7 Dias da Semana no Brasil
              </h3>
            </div>

            <div className="h-80 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DIAS_SEMANA_BRASIL} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="dia" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend />
                  <ReferenceLine
                    y={55911}
                    stroke="#a855f7"
                    strokeDasharray="4 4"
                    label={{ value: 'Média Diária (55.911 acidentes)', position: 'insideTopLeft', fill: '#d8b4fe', fontSize: 11 }}
                  />
                  <Bar dataKey="acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-300">
              <div className="bg-black/60 p-5 rounded-xl border border-neutral-800 text-justify leading-relaxed">
                <span className="font-bold text-white block mb-1">Dias Úteis (Segunda a Quinta):</span>
                Média de 50.700 acidentes e 3.850 mortes por dia. O tráfego comercial e de rotina mantém taxas menores de fatalidade por colisão.
              </div>
              <div className="bg-purple-950/20 p-5 rounded-xl border border-purple-900/60 text-justify leading-relaxed shadow-[0_0_15px_rgba(128,0,128,0.1)]">
                <span className="font-bold text-purple-300 block mb-1">Fim de Semana (Sexta a Domingo):</span>
                Média de 62.800 acidentes e 5.780 mortes por dia. O domingo lidera com 6.582 vítimas fatais, comprovando o impacto de excesso de velocidade e álcool no retorno de viagens.
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Navegação Sequencial entre Capítulos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-neutral-900">
          {prevTab ? (
            <button
              onClick={() => setCurrentPage(prevTab.id)}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#09090c] border border-neutral-800 hover:border-purple-600/80 text-left transition group"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-400 group-hover:text-purple-400 transform group-hover:-translate-x-1 transition" />
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block">Investigação Anterior</span>
                <span className="text-sm font-bold text-white group-hover:text-purple-300">{prevTab.titulo}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextTab && (
            <button
              onClick={() => setCurrentPage(nextTab.id)}
              className="flex items-center justify-end gap-3 px-5 py-3.5 rounded-xl bg-[#09090c] border border-neutral-800 hover:border-red-600/80 text-right transition group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block">Próxima Investigação</span>
                <span className="text-sm font-bold text-white group-hover:text-red-300">{nextTab.titulo}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-red-400 transform group-hover:translate-x-1 transition" />
            </button>
          )}
        </div>
      </section>

      {/* Central de Contatos de Emergência Rodoviária, Protocolo de Ação e Transparência */}
      <section className="border-t border-neutral-900 bg-[#07070a] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
                Utilidade Pública e Atendimento 24h
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Contatos de Emergência nas Rodovias Federais e Serviços ao Cidadão
              </h2>
            </div>
            <a
              href="https://www.gov.br/prf/pt-br/servicos/acidentes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-950/60 hover:bg-purple-900/70 border border-purple-800/70 px-4 py-2 rounded-lg transition"
            >
              <span>Portal Oficial de Acidentes (DAT / PRF gov.br)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="tel:191"
              className="bg-[#0b0b0f] hover:bg-[#14080a] border border-neutral-800 hover:border-red-600/80 p-5 rounded-xl transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-red-400 font-bold">Polícia Rodoviária Federal</span>
                <Phone className="w-4 h-4 text-red-500 group-hover:scale-110 transition" />
              </div>
              <div className="text-3xl font-black text-white my-2">191</div>
              <p className="text-xs text-neutral-400 leading-relaxed text-justify">
                Atendimento gratuito 24h em qualquer rodovia federal (BR) para emergências, sinistros e denúncias de direção perigosa.
              </p>
            </a>

            <a
              href="tel:192"
              className="bg-[#0b0b0f] hover:bg-[#140c06] border border-neutral-800 hover:border-amber-500/80 p-5 rounded-xl transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">Socorro Médico • SAMU</span>
                <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
              </div>
              <div className="text-3xl font-black text-white my-2">192</div>
              <p className="text-xs text-neutral-400 leading-relaxed text-justify">
                Acionamento imediato de ambulâncias de suporte básico e avançado (UTI móvel) em acidentes com vítimas feridas.
              </p>
            </a>

            <a
              href="tel:193"
              className="bg-[#0b0b0f] hover:bg-[#14080a] border border-neutral-800 hover:border-red-500/80 p-5 rounded-xl transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-red-400 font-bold">Corpo de Bombeiros</span>
                <Phone className="w-4 h-4 text-red-400 group-hover:scale-110 transition" />
              </div>
              <div className="text-3xl font-black text-white my-2">193</div>
              <p className="text-xs text-neutral-400 leading-relaxed text-justify">
                Resgate veicular especializado para vítimas presas em ferragens, incêndios em veículos ou derramamento de cargas perigosas.
              </p>
            </a>

            <a
              href="tel:166"
              className="bg-[#0b0b0f] hover:bg-[#110917] border border-neutral-800 hover:border-purple-500/80 p-5 rounded-xl transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">Ouvidoria ANTT (Concessões)</span>
                <Phone className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
              </div>
              <div className="text-3xl font-black text-white my-2">166</div>
              <p className="text-xs text-neutral-400 leading-relaxed text-justify">
                Informações sobre rodovias federais concedidas, apoio mecânico/guincho de concessionárias e condições da via.
              </p>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-300">
            <div className="bg-black/60 border border-neutral-800 p-5 rounded-xl space-y-2 text-justify leading-relaxed">
              <span className="font-bold text-white uppercase font-mono text-xs block">
                Como agir em caso de acidente na rodovia (Prevenção de Colisão Secundária):
              </span>
              <p>
                <strong>1. Proteja a cena imediatamente:</strong> Ligue o pisca-alerta e posicione o triângulo a pelo menos 80 passos longos (cerca de 80 a 100 metros) antes do local, aumentando para 150 metros sob chuva, neblina ou à noite. <strong>2. Jamais permaneça na faixa de rolamento:</strong> Retire todos os ocupantes para fora da pista, atrás da defensa metálica (guard-rail). <strong>3. Acione o 191 (PRF) e o 192/193:</strong> Informe a BR, o sentido da via e o quilômetro aproximado indicado nas placas laterais.
              </p>
            </div>

            <div className="bg-black/60 border border-neutral-800 p-5 rounded-xl space-y-2 text-justify leading-relaxed">
              <span className="font-bold text-white uppercase font-mono text-xs block">
                Nota de Transparência e Metodologia dos Dados:
              </span>
              <p>
                Este observatório consolida <strong>391.382 sinistros</strong>, <strong>746.587 veículos envolvidos</strong>, <strong>447.565 pessoas feridas</strong> e <strong>32.792 vítimas fatais</strong> registrados nos boletins de acidentes da Polícia Rodoviária Federal (período de 2021 a 2026*). A taxa de mortalidade expressa o número de óbitos a cada 100 acidentes, enquanto a razão de mortos por ferido mede a severidade clínica das lesões em cada turno e fator causal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé Editorial sem Marcações Acadêmicas */}
      <footer className="border-t border-neutral-900 bg-[#040406] py-10 text-center text-xs text-neutral-500 space-y-2">
        <p className="tracking-widest uppercase text-neutral-400 font-bold">
          Observatório de Segurança em Rodovias Federais
        </p>
        <p>
          Dados Oficiais: Polícia Rodoviária Federal (PRF) • Portal de Dados Abertos (2021 a 2026)
        </p>
      </footer>
    </div>
  );
}
