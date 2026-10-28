// Arquivo de Imprensa e Contexto Jornalístico (2021 a 2026)
// Dados factuais levantados a partir de balanços da PRF, CNT, Ipea, Agência Brasil, G1 e CNN Brasil

export const CADERNOS_JORNAL = [
  {
    id: 'estados',
    numero: 'CADERNO INICIAL',
    editoria: 'GEOGRAFIA DO TRÁFEGO • 27 UNIDADES DA FEDERAÇÃO',
    tituloFiltro: 'Estados e Rodovias (27 UFs)',
    resumoFiltro: 'Mapa do Brasil, ranking estadual, malha crítica (BR-101, BR-116, BR-381) e sazonalidade por UF.',
    googleNewsQuery: 'acidentes rodovias federais PRF BR-116 BR-101 BR-381 estados',
    manchete: 'Minas Gerais lidera volume de colisões e mortes; estados do Norte e Nordeste têm as pistas mais letais',
    linhaFina: 'Três estados concentram 35% de todas as batidas nas BRs do país, mas a proporção de óbitos por acidente na Bahia, em Alagoas e no Amazonas chega a ser três vezes maior do que em Santa Catarina e São Paulo.',
    autorLinha: 'Redação de Dados • Levantamento Nacional PRF (2021 a 2026)',
    tempoLeitura: 'Leitura de 4 min',
    olhoReportagem: 'Enquanto Santa Catarina registra 4,84 mortes a cada 100 acidentes nas BRs, na Bahia esse índice sobe para 14,78 óbitos a cada 100 ocorrências.',
    notaOlho: 'Comparativo de severidade estadual na série 2021-2026 da Polícia Rodoviária Federal.',
    noticiasReais: [
      {
        data: '21 dez. 2024',
        veiculo: 'Agência Brasil / G1 Minas',
        rodovia: 'BR-116 (Teófilo Otoni - MG)',
        titulo: 'Tragédia na BR-116 em MG é o maior acidente em rodovias federais desde 2007, aponta PRF',
        resumo: 'O desprendimento de um bloco de granito de uma carreta com excesso de peso atingiu um ônibus interestadual e um carro de passeio no km 285 da BR-116. A colisão deixou 39 mortos e consolidou a rodovia e o estado de Minas Gerais no topo da letalidade histórica.',
        url: 'https://news.google.com/search?q=acidente+BR-116+Teofilo+Otoni+PRF&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Nov. 2023 / Balanço 2024',
        veiculo: 'G1 SC / Painel CNT',
        rodovia: 'BR-101 (São José e Palhoça - SC)',
        titulo: 'Trecho de 10 km da BR-101 na Grande Florianópolis lidera ranking nacional em número de acidentes',
        resumo: 'Levantamento com base nos registros da PRF mostra que o segmento entre os km 200 e 210 da BR-101, em Santa Catarina, registra mais de 500 batidas por ano devido à mistura entre carretas do corredor do Mercosul e deslocamento urbano diário.',
        url: 'https://news.google.com/search?q=trecho+BR-101+Grande+Florianopolis+mais+acidentes+PRF+CNT&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Fev. 2025',
        veiculo: 'Agência Brasil / CNN Brasil',
        rodovia: 'BR-381, BR-116 e BR-277 (MG, PR e BA)',
        titulo: 'Minas Gerais, Paraná e Bahia lideram ranking de mortes em rodovias federais no balanço anual da PRF',
        resumo: 'O fechamento anual da corporação revelou que Minas Gerais permaneceu na liderança absoluta em ocorrências e óbitos, seguido por Paraná e Bahia, estado que concentra o maior volume de mortes do Nordeste por colisões em pista simples.',
        url: 'https://news.google.com/search?q=Minas+Gerais+Parana+Bahia+mortes+rodovias+federais+PRF&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Set. 2024',
        veiculo: 'Portal CNT / Correio',
        rodovia: 'BR-135 (MA), BR-316 (AL) e BR-116 (BA)',
        titulo: 'Estados do Norte e Nordeste registram maior taxa de mortalidade por sinistro em pistas simples',
        resumo: 'Estudos sobre a malha federal destacam que a ausência de duplicação, o conflito com motocicletas em travessias rurais e a distância até hospitais de trauma multiplicam a letalidade por acidente no Norte e no Nordeste.',
        url: 'https://news.google.com/search?q=letalidade+rodovias+federais+Nordeste+CNT+PRF&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      }
    ]
  },
  {
    id: 'clima',
    numero: 'CADERNO 01',
    editoria: 'METEOROLOGIA E SEVERIDADE • CONDIÇÕES DE PISTA',
    tituloFiltro: '1. Clima e Vítimas',
    resumoFiltro: 'Gráficos de pizza com ilesos, feridos leves, feridos graves e mortos em cada condição meteorológica.',
    googleNewsQuery: 'acidentes rodovias federais chuva neblina pista seca PRF',
    manchete: 'Tempo bom concentra 68% dos acidentes nas BRs; neblina faz proporção de mortos subir 56%',
    linhaFina: 'Com pista seca e visibilidade plena, motoristas desenvolvem velocidades maiores e acumulam 22.564 óbitos sob céu claro ou sol; já sob nevoeiro, a perda de referência visual eleva a fatia de vítimas fatais ao maior patamar da série.',
    autorLinha: 'Redação de Dados • Análise de Condições Meteorológicas (2021 a 2026)',
    tempoLeitura: 'Leitura de 4 min',
    olhoReportagem: 'Sob neblina, 5,91% das vítimas classificadas morrem no acidente. Sob chuva, a redução forçada da velocidade baixa essa proporção para 3,38%.',
    notaOlho: 'Cálculo sobre o total de vítimas classificadas (ilesos, feridos leves, graves e mortos) por condição climática.',
    noticiasReais: [
      {
        data: '02 set. 2023',
        veiculo: 'G1 Paraná / Laudo PRF',
        rodovia: 'BR-277 (Balsa Nova / São Luiz do Purunã - PR)',
        titulo: 'Engavetamento com 6 mortos na BR-277 envolveu 128 veículos sob forte neblina na Serra de Purunã',
        resumo: 'Um denso nevoeiro no km 136 da BR-277 provocou uma fila de colisões de 600 metros. As vítimas fatais estavam em carros prensados entre caminhões; o laudo apontou velocidade incompatível com a visibilidade reduzida.',
        url: 'https://news.google.com/search?q=engavetamento+BR-277+neblina+128+veiculos+PRF&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Maio 2024',
        veiculo: 'Portal do Trânsito / Gov.br PRF',
        rodovia: 'Malha Federal Nacional',
        titulo: 'Mais de 60% dos acidentes com mortes nas BRs ocorrem sob céu claro e pista seca, apontam dados da PRF',
        resumo: 'Engenheiros de tráfego e peritos da PRF explicam que o tempo aberto reduz a percepção de risco do motorista, estimulando velocidades superiores ao limite e ultrapassagens em trechos de faixa contínua.',
        url: 'https://news.google.com/search?q=acidentes+rodovias+federais+ceu+claro+pista+seca+PRF&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: '28 nov. 2022',
        veiculo: 'Agência Brasil / G1 PR',
        rodovia: 'BR-376 (Guaratuba - PR) e BR-277',
        titulo: 'Chuvas torrenciais provocam deslizamento sobre carros e carretas na BR-376 e bloqueiam corredor Sul',
        resumo: 'O volume extremo de chuva na Serra do Mar levou ao rompimento de talude no km 669 da BR-376, atingindo veículos na pista, deixando 2 mortos e interrompendo a ligação entre Paraná e Santa Catarina.',
        url: 'https://news.google.com/search?q=deslizamento+BR-376+Guaratuba+chuva+carretas&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Jan. 2025',
        veiculo: 'Comunicação PRF / G1',
        rodovia: 'BR-101, BR-116 e BR-040',
        titulo: 'PRF emite alerta operacional para aquaplanagem e colisões traseiras durante chuvas de verão',
        resumo: 'A corporação destaca que o acúmulo de água somado a pneus com sulcos desgastados multiplica saídas de leito carroçável e batidas traseiras, exigindo o dobro da distância de seguimento.',
        url: 'https://news.google.com/search?q=PRF+alerta+aquaplanagem+chuva+rodovias+federais&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      }
    ]
  },
  {
    id: 'causas',
    numero: 'CADERNO 02',
    editoria: 'MECÂNICA DO SINISTRO • CAUSAS, VEÍCULOS E PESSOAS',
    tituloFiltro: '2. Causas, Veículos e Pessoas',
    resumoFiltro: 'Relação entre tipo de acidente e total de veículos e dispersão de causas com símbolos de pessoas.',
    googleNewsQuery: 'causas acidentes rodovias federais colisao frontal celular contramao PRF',
    manchete: 'Colisão traseira lidera em veículos atingidos, mas batida frontal mata 8 vezes mais por ocorrência',
    linhaFina: 'Falhas de atenção e demora na reação do motorista envolvem mais de 261 mil pessoas nas rodovias federais, enquanto a invasão da contramão provoca 37,5 mortes a cada 100 acidentes.',
    autorLinha: 'Redação de Dados • Perícia de Causas e Tipologias (2021 a 2026)',
    tempoLeitura: 'Leitura de 5 min',
    olhoReportagem: 'Sozinha, a colisão frontal responde por 10.248 mortes nas rodovias federais: são 39,12 óbitos a cada 100 acidentes dessa modalidade.',
    notaOlho: 'Cruzamento entre tipo de acidente, total de veículos e ocupantes atingidos (2021 a 2026).',
    noticiasReais: [
      {
        data: 'Jan. 2025',
        veiculo: 'G1 Minas / Ministério Público MG',
        rodovia: 'BR-116 (Teófilo Otoni - MG)',
        titulo: 'Inquérito sobre acidente com 39 mortos na BR-116 aponta 77% de sobrepeso e excesso de velocidade',
        resumo: 'A perícia técnica concluiu que o bitrem transportava mais de 100 toneladas acima de 90 km/h em trecho de 60 km/h, ilustrando como infrações operacionais em veículos pesados amplificam o número de vítimas por acidente.',
        url: 'https://news.google.com/search?q=inquerito+acidente+BR-116+excesso+de+peso+Teofilo+Otoni&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Ago. 2025',
        veiculo: 'G1 Mato Grosso / CNN Brasil',
        rodovia: 'BR-163 (Lucas do Rio Verde - MT)',
        titulo: 'Colisão frontal entre ônibus e carreta na BR-163 deixa 11 mortos e mais de 40 feridos em Mato Grosso',
        resumo: 'O choque entre um ônibus de dois andares e uma carreta carregada com caroço de algodão no corredor de grãos da BR-163 evidenciou o alto número de pessoas vitimadas quando sinistros envolvem transporte coletivo em pista simples.',
        url: 'https://news.google.com/search?q=colisao+onibus+carreta+BR-163+Mato+Grosso+mortos&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Set. 2024',
        veiculo: 'Agência Brasil / Portal CNT',
        rodovia: 'Malha Federal Nacional',
        titulo: 'Reação tardia e uso de celular ao volante lideram causas de colisões nas rodovias federais',
        resumo: 'Balanço da Semana Nacional de Trânsito mostra que a reação tardia ou ineficiente do condutor consolidou-se no topo das causas apuradas pela PRF, impulsionando mais de 75 mil colisões traseiras no período.',
        url: 'https://news.google.com/search?q=reacao+tardia+falta+de+atencao+causas+acidentes+PRF+CNT&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Jul. 2024',
        veiculo: 'Gov.br PRF / O Carreteiro',
        rodovia: 'BR-116, BR-101, BR-153 e BR-163',
        titulo: 'PRF amplia fiscalização da Lei do Descanso para conter colisões por sono e ausência de reação',
        resumo: 'Operações focadas em transporte de carga e passageiros apontam que a fadiga acumulada provoca episódios de ausência total de frenagem antes do impacto, elevando a severidade nas madrugadas.',
        url: 'https://news.google.com/search?q=PRF+fiscalizacao+Lei+do+Descanso+sono+ao+volante&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      }
    ]
  },
  {
    id: 'ocorrencias_mortes',
    numero: 'CADERNO 03',
    editoria: 'SÉRIE HISTÓRICA E CRONOLOGIA • OCORRÊNCIAS, FERIDOS E MORTES',
    tituloFiltro: '3. Ocorrências, Feridos e Mortes',
    resumoFiltro: 'Evolução de ocorrências, feridos e mortes (2021 a 2026), dias da semana e letalidade por turno.',
    googleNewsQuery: 'balanco PRF mortes feridos rodovias federais 2024 2025 2026',
    manchete: 'Mortes nas BRs batem recorde pós-pandemia; amanhecer e fins de semana concentram o pico de letalidade',
    linhaFina: 'O volume anual de ocorrências subiu 13,3% entre 2021 e 2024, mantendo mais de 6 mil óbitos por ano; quase metade das mortes ocorre entre sexta e domingo, e as batidas no início da manhã matam o dobro do que à luz do dia.',
    autorLinha: 'Redação de Dados • Balanço Histórico de Vítimas (2021 a 2026)',
    tempoLeitura: 'Leitura de 5 min',
    olhoReportagem: 'No amanhecer, 1 a cada 9 pessoas feridas morre em decorrência da batida (11,55 mortos a cada 100 feridos). Em pleno dia, essa relação cai para 1 morte a cada 20 feridos.',
    notaOlho: 'Indicador de severidade calculado sobre 391.382 ocorrências, 447.565 feridos e 32.792 mortos.',
    noticiasReais: [
      {
        data: 'Fev. 2025',
        veiculo: 'Agência Brasil / CNN Brasil',
        rodovia: 'Malha Federal Nacional',
        titulo: 'Rodovias federais registram mais de 6,1 mil mortes em 2024; radares flagram 6,5 milhões acima da velocidade',
        resumo: 'O anuário estatístico da PRF confirmou o pico de sinistros e óbitos desde a retomada pós-pandemia, com mais de 84 mil feridos no ano e forte pressão sobre a rede pública de emergência.',
        url: 'https://news.google.com/search?q=rodovias+federais+6160+mortes+2024+PRF+velocidade&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Out. 2025',
        veiculo: 'Poder360 / Panorama CNT',
        rodovia: 'Malha Federal Nacional',
        titulo: 'Custo dos acidentes em rodovias federais atinge R$ 16,8 bilhões por ano e supera verba de manutenção',
        resumo: 'Estudo econômico da CNT com metodologia do Ipea calcula que as despesas médicas, previdenciárias e a perda de produção geradas pelos acidentes com mortos e feridos graves nas BRs somaram R$ 149 bilhões em nove anos.',
        url: 'https://news.google.com/search?q=custo+acidentes+rodovias+federais+CNT+bilhoes&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: 'Fev. 2026',
        veiculo: 'Agência Brasil / Gov.br PRF',
        rodovia: 'Malha Federal Nacional',
        titulo: 'Balanço de 2025 contabiliza 6.044 mortes e mais de 83 mil feridos nas rodovias federais brasileiras',
        resumo: 'Dados consolidados pela PRF mostram que o Brasil permaneceu acima do patamar de 6 mil vidas perdidas por ano nas estradas federais, com concentração de óbitos nas noites de sábado e domingo.',
        url: 'https://news.google.com/search?q=balanco+PRF+2025+mortes+feridos+rodovias+federais&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      },
      {
        data: '25 fev. 2026',
        veiculo: 'Agência Brasil / G1',
        rodovia: 'Malha Federal Nacional',
        titulo: 'Operação Rodovida 2025/2026 encerra ciclo de verão e Carnaval com 13,2 mil acidentes e 1.172 mortes',
        resumo: 'Durante os 67 dias de fiscalização reforçada entre dezembro de 2025 e fevereiro de 2026, a PRF registrou alta circulação de veículos de passeio e 1,2 milhão de autuações por excesso de velocidade.',
        url: 'https://news.google.com/search?q=Operacao+Rodovida+2025+2026+PRF+acidentes+mortes&hl=pt-BR&gl=BR&ceid=BR:pt-419'
      }
    ]
  }
];
