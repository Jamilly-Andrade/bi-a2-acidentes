// Dados consolidados oficiais de Análise Temporal e Geográfica extraídos da PRF
export const DIAS_SEMANA_BRASIL = [
  {
    "dia": "Segunda",
    "acidentes": 54006,
    "mortos": 4195,
    "feridos": 62123,
    "letalidade": 7.77
  },
  {
    "dia": "Terça",
    "acidentes": 48343,
    "mortos": 3583,
    "feridos": 54869,
    "letalidade": 7.41
  },
  {
    "dia": "Quarta",
    "acidentes": 49621,
    "mortos": 3752,
    "feridos": 55794,
    "letalidade": 7.56
  },
  {
    "dia": "Quinta",
    "acidentes": 50977,
    "mortos": 3896,
    "feridos": 57232,
    "letalidade": 7.64
  },
  {
    "dia": "Sexta",
    "acidentes": 60556,
    "mortos": 4813,
    "feridos": 68588,
    "letalidade": 7.95
  },
  {
    "dia": "Sábado",
    "acidentes": 63786,
    "mortos": 5971,
    "feridos": 73287,
    "letalidade": 9.36
  },
  {
    "dia": "Domingo",
    "acidentes": 64093,
    "mortos": 6582,
    "feridos": 75672,
    "letalidade": 10.27
  }
];

export const SERIE_TEMPORAL_DATA = [
  {
    "ano": "2021",
    "acidentes": 64567,
    "mortos": 5397,
    "feridos": 71873,
    "letalidade": 8.36
  },
  {
    "ano": "2022",
    "acidentes": 64606,
    "mortos": 5441,
    "feridos": 73065,
    "letalidade": 8.42
  },
  {
    "ano": "2023",
    "acidentes": 67766,
    "mortos": 5627,
    "feridos": 78463,
    "letalidade": 8.3
  },
  {
    "ano": "2024",
    "acidentes": 73202,
    "mortos": 6163,
    "feridos": 84595,
    "letalidade": 8.42
  },
  {
    "ano": "2025",
    "acidentes": 72529,
    "mortos": 6043,
    "feridos": 83550,
    "letalidade": 8.33
  },
  {
    "ano": "2026*",
    "acidentes": 48712,
    "mortos": 4121,
    "feridos": 56019,
    "letalidade": 8.46,
    "parcial": true
  }
];

export const ESTADOS_DIAS_DATA = {
  "MG": {
    "sigla": "MG",
    "uf": "MG",
    "rank": 1,
    "nome": "Minas Gerais",
    "regiao": "Sudeste",
    "rodovia_critica": "BR-381 / BR-040",
    "perfil_critico": "Relevo montanhoso sinuoso e intenso fluxo de carga mista em pista simples",
    "total": 50819,
    "acidentes": 50819,
    "mortos": 4214,
    "feridos": 63741,
    "veiculos": 99946,
    "taxa_mortalidade": 8.29,
    "taxa_feridos": 125.43,
    "media_veiculos": 1.97,
    "pico_dia": "Domingo",
    "pico_qtd": 8750,
    "pico_pct": 17.2,
    "fds_pct": 48.7,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 7107,
        "mortos": 558,
        "feridos": 8913
      },
      {
        "dia": "Terça",
        "acidentes": 6153,
        "mortos": 466,
        "feridos": 7635
      },
      {
        "dia": "Quarta",
        "acidentes": 6315,
        "mortos": 514,
        "feridos": 7753
      },
      {
        "dia": "Quinta",
        "acidentes": 6510,
        "mortos": 485,
        "feridos": 7884
      },
      {
        "dia": "Sexta",
        "acidentes": 7741,
        "mortos": 573,
        "feridos": 9554
      },
      {
        "dia": "Sábado",
        "acidentes": 8243,
        "mortos": 793,
        "feridos": 10384
      },
      {
        "dia": "Domingo",
        "acidentes": 8750,
        "mortos": 825,
        "feridos": 11618
      }
    ]
  },
  "SC": {
    "sigla": "SC",
    "uf": "SC",
    "rank": 2,
    "nome": "Santa Catarina",
    "regiao": "Sul",
    "rodovia_critica": "BR-101 / BR-470",
    "perfil_critico": "Eixo litorâneo turístico saturado e escoamento industrial no Vale do Itajaí",
    "total": 45452,
    "acidentes": 45452,
    "mortos": 2200,
    "feridos": 51161,
    "veiculos": 89705,
    "taxa_mortalidade": 4.84,
    "taxa_feridos": 112.56,
    "media_veiculos": 1.97,
    "pico_dia": "Sábado",
    "pico_qtd": 7743,
    "pico_pct": 17.0,
    "fds_pct": 48.7,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 6079,
        "mortos": 289,
        "feridos": 6779
      },
      {
        "dia": "Terça",
        "acidentes": 5589,
        "mortos": 222,
        "feridos": 6186
      },
      {
        "dia": "Quarta",
        "acidentes": 5722,
        "mortos": 286,
        "feridos": 6344
      },
      {
        "dia": "Quinta",
        "acidentes": 5907,
        "mortos": 255,
        "feridos": 6573
      },
      {
        "dia": "Sexta",
        "acidentes": 7310,
        "mortos": 334,
        "feridos": 8171
      },
      {
        "dia": "Sábado",
        "acidentes": 7743,
        "mortos": 435,
        "feridos": 8815
      },
      {
        "dia": "Domingo",
        "acidentes": 7102,
        "mortos": 379,
        "feridos": 8293
      }
    ]
  },
  "PR": {
    "sigla": "PR",
    "uf": "PR",
    "rank": 3,
    "nome": "Paraná",
    "regiao": "Sul",
    "rodovia_critica": "BR-277 / BR-376",
    "perfil_critico": "Corredor pesado de safra agrícola rumo ao Porto de Paranaguá e serras",
    "total": 42329,
    "acidentes": 42329,
    "mortos": 3302,
    "feridos": 46386,
    "veiculos": 86391,
    "taxa_mortalidade": 7.8,
    "taxa_feridos": 109.58,
    "media_veiculos": 2.04,
    "pico_dia": "Domingo",
    "pico_qtd": 6961,
    "pico_pct": 16.4,
    "fds_pct": 48.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 5572,
        "mortos": 451,
        "feridos": 6171
      },
      {
        "dia": "Terça",
        "acidentes": 5192,
        "mortos": 362,
        "feridos": 5723
      },
      {
        "dia": "Quarta",
        "acidentes": 5422,
        "mortos": 395,
        "feridos": 5927
      },
      {
        "dia": "Quinta",
        "acidentes": 5599,
        "mortos": 407,
        "feridos": 6097
      },
      {
        "dia": "Sexta",
        "acidentes": 6635,
        "mortos": 514,
        "feridos": 7059
      },
      {
        "dia": "Sábado",
        "acidentes": 6948,
        "mortos": 560,
        "feridos": 7520
      },
      {
        "dia": "Domingo",
        "acidentes": 6961,
        "mortos": 613,
        "feridos": 7889
      }
    ]
  },
  "RJ": {
    "sigla": "RJ",
    "uf": "RJ",
    "rank": 4,
    "nome": "Rio de Janeiro",
    "regiao": "Sudeste",
    "rodovia_critica": "BR-101 / BR-116",
    "perfil_critico": "Alta densidade pendular metropolitana na Via Dutra e Niterói-Manilha",
    "total": 32039,
    "acidentes": 32039,
    "mortos": 1780,
    "feridos": 37094,
    "veiculos": 58930,
    "taxa_mortalidade": 5.56,
    "taxa_feridos": 115.78,
    "media_veiculos": 1.84,
    "pico_dia": "Domingo",
    "pico_qtd": 5062,
    "pico_pct": 15.8,
    "fds_pct": 46.8,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 4622,
        "mortos": 240,
        "feridos": 5367
      },
      {
        "dia": "Terça",
        "acidentes": 4028,
        "mortos": 201,
        "feridos": 4508
      },
      {
        "dia": "Quarta",
        "acidentes": 4237,
        "mortos": 213,
        "feridos": 4748
      },
      {
        "dia": "Quinta",
        "acidentes": 4163,
        "mortos": 228,
        "feridos": 4639
      },
      {
        "dia": "Sexta",
        "acidentes": 4905,
        "mortos": 257,
        "feridos": 5641
      },
      {
        "dia": "Sábado",
        "acidentes": 5022,
        "mortos": 315,
        "feridos": 5975
      },
      {
        "dia": "Domingo",
        "acidentes": 5062,
        "mortos": 326,
        "feridos": 6216
      }
    ]
  },
  "RS": {
    "sigla": "RS",
    "uf": "RS",
    "rank": 5,
    "nome": "Rio Grande do Sul",
    "regiao": "Sul",
    "rodovia_critica": "BR-116 / BR-386",
    "perfil_critico": "Malha extensa com forte neblina sazonal e tráfego pesado de grãos",
    "total": 27555,
    "acidentes": 27555,
    "mortos": 1837,
    "feridos": 30361,
    "veiculos": 52938,
    "taxa_mortalidade": 6.67,
    "taxa_feridos": 110.18,
    "media_veiculos": 1.92,
    "pico_dia": "Sábado",
    "pico_qtd": 4524,
    "pico_pct": 16.4,
    "fds_pct": 48.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3812,
        "mortos": 270,
        "feridos": 4190
      },
      {
        "dia": "Terça",
        "acidentes": 3340,
        "mortos": 217,
        "feridos": 3643
      },
      {
        "dia": "Quarta",
        "acidentes": 3326,
        "mortos": 190,
        "feridos": 3589
      },
      {
        "dia": "Quinta",
        "acidentes": 3693,
        "mortos": 209,
        "feridos": 4078
      },
      {
        "dia": "Sexta",
        "acidentes": 4395,
        "mortos": 287,
        "feridos": 4889
      },
      {
        "dia": "Sábado",
        "acidentes": 4524,
        "mortos": 309,
        "feridos": 4928
      },
      {
        "dia": "Domingo",
        "acidentes": 4465,
        "mortos": 355,
        "feridos": 5044
      }
    ]
  },
  "SP": {
    "sigla": "SP",
    "uf": "SP",
    "rank": 6,
    "nome": "São Paulo",
    "regiao": "Sudeste",
    "rodovia_critica": "BR-116 / BR-153",
    "perfil_critico": "Tráfego intenso de caminhões pesados na Régis Bittencourt e Transbrasiliana",
    "total": 25991,
    "acidentes": 25991,
    "mortos": 1263,
    "feridos": 27786,
    "veiculos": 50860,
    "taxa_mortalidade": 4.86,
    "taxa_feridos": 106.91,
    "media_veiculos": 1.96,
    "pico_dia": "Domingo",
    "pico_qtd": 4123,
    "pico_pct": 15.9,
    "fds_pct": 47.2,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3566,
        "mortos": 178,
        "feridos": 3818
      },
      {
        "dia": "Terça",
        "acidentes": 3309,
        "mortos": 159,
        "feridos": 3489
      },
      {
        "dia": "Quarta",
        "acidentes": 3375,
        "mortos": 167,
        "feridos": 3553
      },
      {
        "dia": "Quinta",
        "acidentes": 3470,
        "mortos": 154,
        "feridos": 3766
      },
      {
        "dia": "Sexta",
        "acidentes": 4047,
        "mortos": 156,
        "feridos": 4206
      },
      {
        "dia": "Sábado",
        "acidentes": 4101,
        "mortos": 225,
        "feridos": 4421
      },
      {
        "dia": "Domingo",
        "acidentes": 4123,
        "mortos": 224,
        "feridos": 4533
      }
    ]
  },
  "BA": {
    "sigla": "BA",
    "uf": "BA",
    "rank": 7,
    "nome": "Bahia",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-116 / BR-101",
    "perfil_critico": "Maior extensão rodoviária do Nordeste ligando Sudeste ao Norte e Nordeste",
    "total": 21620,
    "acidentes": 21620,
    "mortos": 3195,
    "feridos": 26813,
    "veiculos": 45169,
    "taxa_mortalidade": 14.78,
    "taxa_feridos": 124.02,
    "media_veiculos": 2.09,
    "pico_dia": "Domingo",
    "pico_qtd": 3620,
    "pico_pct": 16.7,
    "fds_pct": 48.0,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3070,
        "mortos": 407,
        "feridos": 3754
      },
      {
        "dia": "Terça",
        "acidentes": 2656,
        "mortos": 348,
        "feridos": 3313
      },
      {
        "dia": "Quarta",
        "acidentes": 2742,
        "mortos": 366,
        "feridos": 3479
      },
      {
        "dia": "Quinta",
        "acidentes": 2772,
        "mortos": 348,
        "feridos": 3367
      },
      {
        "dia": "Sexta",
        "acidentes": 3296,
        "mortos": 494,
        "feridos": 4051
      },
      {
        "dia": "Sábado",
        "acidentes": 3464,
        "mortos": 534,
        "feridos": 4275
      },
      {
        "dia": "Domingo",
        "acidentes": 3620,
        "mortos": 698,
        "feridos": 4574
      }
    ]
  },
  "GO": {
    "sigla": "GO",
    "uf": "GO",
    "rank": 8,
    "nome": "Goiás",
    "regiao": "Centro-Oeste",
    "rodovia_critica": "BR-153 / BR-060",
    "perfil_critico": "Entroncamento logístico nacional com longas retas e ultrapassagens críticas",
    "total": 18248,
    "acidentes": 18248,
    "mortos": 1701,
    "feridos": 20439,
    "veiculos": 35498,
    "taxa_mortalidade": 9.32,
    "taxa_feridos": 112.01,
    "media_veiculos": 1.95,
    "pico_dia": "Domingo",
    "pico_qtd": 3285,
    "pico_pct": 18.0,
    "fds_pct": 49.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 2454,
        "mortos": 171,
        "feridos": 2856
      },
      {
        "dia": "Terça",
        "acidentes": 2175,
        "mortos": 207,
        "feridos": 2440
      },
      {
        "dia": "Quarta",
        "acidentes": 2239,
        "mortos": 209,
        "feridos": 2499
      },
      {
        "dia": "Quinta",
        "acidentes": 2332,
        "mortos": 223,
        "feridos": 2616
      },
      {
        "dia": "Sexta",
        "acidentes": 2688,
        "mortos": 255,
        "feridos": 3042
      },
      {
        "dia": "Sábado",
        "acidentes": 3075,
        "mortos": 311,
        "feridos": 3291
      },
      {
        "dia": "Domingo",
        "acidentes": 3285,
        "mortos": 325,
        "feridos": 3695
      }
    ]
  },
  "PE": {
    "sigla": "PE",
    "uf": "PE",
    "rank": 9,
    "nome": "Pernambuco",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-232",
    "perfil_critico": "Eixo de integração metropolitana do Recife ao Agreste e Sertão",
    "total": 16701,
    "acidentes": 16701,
    "mortos": 1800,
    "feridos": 18607,
    "veiculos": 32374,
    "taxa_mortalidade": 10.78,
    "taxa_feridos": 111.41,
    "media_veiculos": 1.94,
    "pico_dia": "Domingo",
    "pico_qtd": 2638,
    "pico_pct": 15.8,
    "fds_pct": 46.2,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 2439,
        "mortos": 242,
        "feridos": 2779
      },
      {
        "dia": "Terça",
        "acidentes": 2150,
        "mortos": 177,
        "feridos": 2408
      },
      {
        "dia": "Quarta",
        "acidentes": 2159,
        "mortos": 196,
        "feridos": 2263
      },
      {
        "dia": "Quinta",
        "acidentes": 2231,
        "mortos": 216,
        "feridos": 2394
      },
      {
        "dia": "Sexta",
        "acidentes": 2525,
        "mortos": 271,
        "feridos": 2845
      },
      {
        "dia": "Sábado",
        "acidentes": 2559,
        "mortos": 329,
        "feridos": 2863
      },
      {
        "dia": "Domingo",
        "acidentes": 2638,
        "mortos": 369,
        "feridos": 3055
      }
    ]
  },
  "ES": {
    "sigla": "ES",
    "uf": "ES",
    "rank": 10,
    "nome": "Espírito Santo",
    "regiao": "Sudeste",
    "rodovia_critica": "BR-101 / BR-262",
    "perfil_critico": "Pista simples sinuosa com tráfego de rochas ornamentais e cargas pesadas",
    "total": 13670,
    "acidentes": 13670,
    "mortos": 914,
    "feridos": 16890,
    "veiculos": 27291,
    "taxa_mortalidade": 6.69,
    "taxa_feridos": 123.56,
    "media_veiculos": 2.0,
    "pico_dia": "Sexta",
    "pico_qtd": 2252,
    "pico_pct": 16.5,
    "fds_pct": 47.8,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1891,
        "mortos": 102,
        "feridos": 2355
      },
      {
        "dia": "Terça",
        "acidentes": 1713,
        "mortos": 108,
        "feridos": 2117
      },
      {
        "dia": "Quarta",
        "acidentes": 1737,
        "mortos": 109,
        "feridos": 2086
      },
      {
        "dia": "Quinta",
        "acidentes": 1800,
        "mortos": 114,
        "feridos": 2124
      },
      {
        "dia": "Sexta",
        "acidentes": 2252,
        "mortos": 147,
        "feridos": 2725
      },
      {
        "dia": "Sábado",
        "acidentes": 2185,
        "mortos": 170,
        "feridos": 2747
      },
      {
        "dia": "Domingo",
        "acidentes": 2092,
        "mortos": 164,
        "feridos": 2736
      }
    ]
  },
  "MT": {
    "sigla": "MT",
    "uf": "MT",
    "rank": 11,
    "nome": "Mato Grosso",
    "regiao": "Centro-Oeste",
    "rodovia_critica": "BR-163 / BR-364",
    "perfil_critico": "Corredor de exportação do agronegócio com altíssima presença de bitrens",
    "total": 13550,
    "acidentes": 13550,
    "mortos": 1400,
    "feridos": 14751,
    "veiculos": 32738,
    "taxa_mortalidade": 10.33,
    "taxa_feridos": 108.86,
    "media_veiculos": 2.42,
    "pico_dia": "Sábado",
    "pico_qtd": 2223,
    "pico_pct": 16.4,
    "fds_pct": 47.1,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1907,
        "mortos": 158,
        "feridos": 2057
      },
      {
        "dia": "Terça",
        "acidentes": 1668,
        "mortos": 170,
        "feridos": 1800
      },
      {
        "dia": "Quarta",
        "acidentes": 1766,
        "mortos": 153,
        "feridos": 1895
      },
      {
        "dia": "Quinta",
        "acidentes": 1833,
        "mortos": 185,
        "feridos": 1969
      },
      {
        "dia": "Sexta",
        "acidentes": 1970,
        "mortos": 220,
        "feridos": 2205
      },
      {
        "dia": "Sábado",
        "acidentes": 2223,
        "mortos": 232,
        "feridos": 2506
      },
      {
        "dia": "Domingo",
        "acidentes": 2183,
        "mortos": 282,
        "feridos": 2319
      }
    ]
  },
  "MS": {
    "sigla": "MS",
    "uf": "MS",
    "rank": 12,
    "nome": "Mato Grosso do Sul",
    "regiao": "Centro-Oeste",
    "rodovia_critica": "BR-163 / BR-262",
    "perfil_critico": "Rotas longas de escoamento agroindustrial e transporte de celulose",
    "total": 9589,
    "acidentes": 9589,
    "mortos": 927,
    "feridos": 10424,
    "veiculos": 19522,
    "taxa_mortalidade": 9.67,
    "taxa_feridos": 108.71,
    "media_veiculos": 2.04,
    "pico_dia": "Domingo",
    "pico_qtd": 1682,
    "pico_pct": 17.5,
    "fds_pct": 49.1,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1255,
        "mortos": 110,
        "feridos": 1393
      },
      {
        "dia": "Terça",
        "acidentes": 1160,
        "mortos": 117,
        "feridos": 1213
      },
      {
        "dia": "Quarta",
        "acidentes": 1219,
        "mortos": 100,
        "feridos": 1328
      },
      {
        "dia": "Quinta",
        "acidentes": 1248,
        "mortos": 131,
        "feridos": 1271
      },
      {
        "dia": "Sexta",
        "acidentes": 1396,
        "mortos": 139,
        "feridos": 1514
      },
      {
        "dia": "Sábado",
        "acidentes": 1629,
        "mortos": 144,
        "feridos": 1780
      },
      {
        "dia": "Domingo",
        "acidentes": 1682,
        "mortos": 186,
        "feridos": 1925
      }
    ]
  },
  "PB": {
    "sigla": "PB",
    "uf": "PB",
    "rank": 13,
    "nome": "Paraíba",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-230",
    "perfil_critico": "Fluxo intenso na Transamazônica ligando João Pessoa a Campina Grande",
    "total": 9575,
    "acidentes": 9575,
    "mortos": 751,
    "feridos": 10898,
    "veiculos": 17166,
    "taxa_mortalidade": 7.84,
    "taxa_feridos": 113.82,
    "media_veiculos": 1.79,
    "pico_dia": "Domingo",
    "pico_qtd": 1543,
    "pico_pct": 16.1,
    "fds_pct": 47.3,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1346,
        "mortos": 95,
        "feridos": 1542
      },
      {
        "dia": "Terça",
        "acidentes": 1215,
        "mortos": 82,
        "feridos": 1434
      },
      {
        "dia": "Quarta",
        "acidentes": 1250,
        "mortos": 86,
        "feridos": 1375
      },
      {
        "dia": "Quinta",
        "acidentes": 1234,
        "mortos": 75,
        "feridos": 1438
      },
      {
        "dia": "Sexta",
        "acidentes": 1523,
        "mortos": 104,
        "feridos": 1664
      },
      {
        "dia": "Sábado",
        "acidentes": 1464,
        "mortos": 140,
        "feridos": 1642
      },
      {
        "dia": "Domingo",
        "acidentes": 1543,
        "mortos": 169,
        "feridos": 1803
      }
    ]
  },
  "RO": {
    "sigla": "RO",
    "uf": "RO",
    "rank": 14,
    "nome": "Rondônia",
    "regiao": "Norte",
    "rodovia_critica": "BR-364",
    "perfil_critico": "Única artéria federal pavimentada de escoamento de grãos rumo ao Madeira",
    "total": 8409,
    "acidentes": 8409,
    "mortos": 572,
    "feridos": 9454,
    "veiculos": 18113,
    "taxa_mortalidade": 6.8,
    "taxa_feridos": 112.43,
    "media_veiculos": 2.15,
    "pico_dia": "Sexta",
    "pico_qtd": 1371,
    "pico_pct": 16.3,
    "fds_pct": 46.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1172,
        "mortos": 71,
        "feridos": 1319
      },
      {
        "dia": "Terça",
        "acidentes": 1102,
        "mortos": 66,
        "feridos": 1196
      },
      {
        "dia": "Quarta",
        "acidentes": 1105,
        "mortos": 53,
        "feridos": 1215
      },
      {
        "dia": "Quinta",
        "acidentes": 1089,
        "mortos": 66,
        "feridos": 1211
      },
      {
        "dia": "Sexta",
        "acidentes": 1371,
        "mortos": 95,
        "feridos": 1492
      },
      {
        "dia": "Sábado",
        "acidentes": 1303,
        "mortos": 118,
        "feridos": 1530
      },
      {
        "dia": "Domingo",
        "acidentes": 1267,
        "mortos": 103,
        "feridos": 1491
      }
    ]
  },
  "RN": {
    "sigla": "RN",
    "uf": "RN",
    "rank": 15,
    "nome": "Rio Grande do Norte",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-304",
    "perfil_critico": "Tráfego turístico litorâneo combinado ao transporte salineiro e frutícola",
    "total": 8233,
    "acidentes": 8233,
    "mortos": 593,
    "feridos": 9507,
    "veiculos": 15449,
    "taxa_mortalidade": 7.2,
    "taxa_feridos": 115.47,
    "media_veiculos": 1.88,
    "pico_dia": "Sábado",
    "pico_qtd": 1271,
    "pico_pct": 15.4,
    "fds_pct": 45.3,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1234,
        "mortos": 75,
        "feridos": 1483
      },
      {
        "dia": "Terça",
        "acidentes": 1072,
        "mortos": 41,
        "feridos": 1224
      },
      {
        "dia": "Quarta",
        "acidentes": 1126,
        "mortos": 73,
        "feridos": 1248
      },
      {
        "dia": "Quinta",
        "acidentes": 1069,
        "mortos": 69,
        "feridos": 1255
      },
      {
        "dia": "Sexta",
        "acidentes": 1268,
        "mortos": 84,
        "feridos": 1430
      },
      {
        "dia": "Sábado",
        "acidentes": 1271,
        "mortos": 93,
        "feridos": 1518
      },
      {
        "dia": "Domingo",
        "acidentes": 1193,
        "mortos": 158,
        "feridos": 1349
      }
    ]
  },
  "CE": {
    "sigla": "CE",
    "uf": "CE",
    "rank": 16,
    "nome": "Ceará",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-116 / BR-222",
    "perfil_critico": "Concentração no anel metropolitano de Fortaleza e acesso ao interior",
    "total": 7838,
    "acidentes": 7838,
    "mortos": 941,
    "feridos": 8871,
    "veiculos": 15794,
    "taxa_mortalidade": 12.01,
    "taxa_feridos": 113.18,
    "media_veiculos": 2.02,
    "pico_dia": "Sexta",
    "pico_qtd": 1262,
    "pico_pct": 16.1,
    "fds_pct": 47.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1101,
        "mortos": 128,
        "feridos": 1254
      },
      {
        "dia": "Terça",
        "acidentes": 991,
        "mortos": 74,
        "feridos": 1101
      },
      {
        "dia": "Quarta",
        "acidentes": 1000,
        "mortos": 94,
        "feridos": 1149
      },
      {
        "dia": "Quinta",
        "acidentes": 1012,
        "mortos": 112,
        "feridos": 1136
      },
      {
        "dia": "Sexta",
        "acidentes": 1262,
        "mortos": 151,
        "feridos": 1466
      },
      {
        "dia": "Sábado",
        "acidentes": 1252,
        "mortos": 187,
        "feridos": 1375
      },
      {
        "dia": "Domingo",
        "acidentes": 1220,
        "mortos": 195,
        "feridos": 1390
      }
    ]
  },
  "PI": {
    "sigla": "PI",
    "uf": "PI",
    "rank": 17,
    "nome": "Piauí",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-316 / BR-343",
    "perfil_critico": "Deslocamentos intermunicipais com forte presença de motocicletas nas BRs",
    "total": 7513,
    "acidentes": 7513,
    "mortos": 868,
    "feridos": 8326,
    "veiculos": 14449,
    "taxa_mortalidade": 11.55,
    "taxa_feridos": 110.82,
    "media_veiculos": 1.92,
    "pico_dia": "Sábado",
    "pico_qtd": 1351,
    "pico_pct": 18.0,
    "fds_pct": 50.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 957,
        "mortos": 109,
        "feridos": 1129
      },
      {
        "dia": "Terça",
        "acidentes": 914,
        "mortos": 83,
        "feridos": 1055
      },
      {
        "dia": "Quarta",
        "acidentes": 892,
        "mortos": 83,
        "feridos": 971
      },
      {
        "dia": "Quinta",
        "acidentes": 926,
        "mortos": 101,
        "feridos": 1067
      },
      {
        "dia": "Sexta",
        "acidentes": 1132,
        "mortos": 117,
        "feridos": 1213
      },
      {
        "dia": "Sábado",
        "acidentes": 1351,
        "mortos": 183,
        "feridos": 1457
      },
      {
        "dia": "Domingo",
        "acidentes": 1341,
        "mortos": 192,
        "feridos": 1434
      }
    ]
  },
  "MA": {
    "sigla": "MA",
    "uf": "MA",
    "rank": 18,
    "nome": "Maranhão",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-135 / BR-010",
    "perfil_critico": "Acesso portuário a São Luís (Itaqui) e corredor de grãos do Matopiba",
    "total": 6677,
    "acidentes": 6677,
    "mortos": 1414,
    "feridos": 7159,
    "veiculos": 14596,
    "taxa_mortalidade": 21.18,
    "taxa_feridos": 107.22,
    "media_veiculos": 2.19,
    "pico_dia": "Sábado",
    "pico_qtd": 1195,
    "pico_pct": 17.9,
    "fds_pct": 50.3,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 891,
        "mortos": 169,
        "feridos": 967
      },
      {
        "dia": "Terça",
        "acidentes": 764,
        "mortos": 146,
        "feridos": 827
      },
      {
        "dia": "Quarta",
        "acidentes": 797,
        "mortos": 134,
        "feridos": 816
      },
      {
        "dia": "Quinta",
        "acidentes": 864,
        "mortos": 172,
        "feridos": 890
      },
      {
        "dia": "Sexta",
        "acidentes": 980,
        "mortos": 190,
        "feridos": 1084
      },
      {
        "dia": "Sábado",
        "acidentes": 1195,
        "mortos": 281,
        "feridos": 1266
      },
      {
        "dia": "Domingo",
        "acidentes": 1186,
        "mortos": 322,
        "feridos": 1309
      }
    ]
  },
  "DF": {
    "sigla": "DF",
    "uf": "DF",
    "rank": 19,
    "nome": "Distrito Federal",
    "regiao": "Centro-Oeste",
    "rodovia_critica": "BR-020 / BR-040",
    "perfil_critico": "Fluxo pendular diário massivo do Entorno em pistas de alta velocidade",
    "total": 5663,
    "acidentes": 5663,
    "mortos": 245,
    "feridos": 6031,
    "veiculos": 10644,
    "taxa_mortalidade": 4.33,
    "taxa_feridos": 106.5,
    "media_veiculos": 1.88,
    "pico_dia": "Sexta",
    "pico_qtd": 889,
    "pico_pct": 15.7,
    "fds_pct": 45.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 831,
        "mortos": 23,
        "feridos": 875
      },
      {
        "dia": "Terça",
        "acidentes": 687,
        "mortos": 28,
        "feridos": 754
      },
      {
        "dia": "Quarta",
        "acidentes": 753,
        "mortos": 29,
        "feridos": 799
      },
      {
        "dia": "Quinta",
        "acidentes": 794,
        "mortos": 19,
        "feridos": 809
      },
      {
        "dia": "Sexta",
        "acidentes": 889,
        "mortos": 37,
        "feridos": 958
      },
      {
        "dia": "Sábado",
        "acidentes": 852,
        "mortos": 60,
        "feridos": 938
      },
      {
        "dia": "Domingo",
        "acidentes": 857,
        "mortos": 49,
        "feridos": 898
      }
    ]
  },
  "PA": {
    "sigla": "PA",
    "uf": "PA",
    "rank": 20,
    "nome": "Pará",
    "regiao": "Norte",
    "rodovia_critica": "BR-316 / BR-010",
    "perfil_critico": "Saída metropolitana de Belém e escoamento mineral e agropecuário",
    "total": 5435,
    "acidentes": 5435,
    "mortos": 1129,
    "feridos": 5951,
    "veiculos": 12920,
    "taxa_mortalidade": 20.77,
    "taxa_feridos": 109.49,
    "media_veiculos": 2.38,
    "pico_dia": "Domingo",
    "pico_qtd": 1005,
    "pico_pct": 18.5,
    "fds_pct": 50.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 716,
        "mortos": 137,
        "feridos": 786
      },
      {
        "dia": "Terça",
        "acidentes": 679,
        "mortos": 127,
        "feridos": 733
      },
      {
        "dia": "Quarta",
        "acidentes": 647,
        "mortos": 109,
        "feridos": 721
      },
      {
        "dia": "Quinta",
        "acidentes": 626,
        "mortos": 139,
        "feridos": 600
      },
      {
        "dia": "Sexta",
        "acidentes": 838,
        "mortos": 149,
        "feridos": 900
      },
      {
        "dia": "Sábado",
        "acidentes": 924,
        "mortos": 202,
        "feridos": 1065
      },
      {
        "dia": "Domingo",
        "acidentes": 1005,
        "mortos": 266,
        "feridos": 1146
      }
    ]
  },
  "TO": {
    "sigla": "TO",
    "uf": "TO",
    "rank": 21,
    "nome": "Tocantins",
    "regiao": "Norte",
    "rodovia_critica": "BR-153",
    "perfil_critico": "Eixo Belém-Brasília com tráfego ininterrupto de carretas de longa distância",
    "total": 3628,
    "acidentes": 3628,
    "mortos": 540,
    "feridos": 4182,
    "veiculos": 8031,
    "taxa_mortalidade": 14.88,
    "taxa_feridos": 115.27,
    "media_veiculos": 2.21,
    "pico_dia": "Sábado",
    "pico_qtd": 666,
    "pico_pct": 18.4,
    "fds_pct": 50.1,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 452,
        "mortos": 61,
        "feridos": 526
      },
      {
        "dia": "Terça",
        "acidentes": 457,
        "mortos": 55,
        "feridos": 499
      },
      {
        "dia": "Quarta",
        "acidentes": 470,
        "mortos": 60,
        "feridos": 537
      },
      {
        "dia": "Quinta",
        "acidentes": 433,
        "mortos": 64,
        "feridos": 464
      },
      {
        "dia": "Sexta",
        "acidentes": 534,
        "mortos": 77,
        "feridos": 653
      },
      {
        "dia": "Sábado",
        "acidentes": 666,
        "mortos": 111,
        "feridos": 865
      },
      {
        "dia": "Domingo",
        "acidentes": 616,
        "mortos": 112,
        "feridos": 638
      }
    ]
  },
  "AL": {
    "sigla": "AL",
    "uf": "AL",
    "rank": 22,
    "nome": "Alagoas",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-104",
    "perfil_critico": "Trechos de serra e canaviais com travessia frequente de áreas urbanas",
    "total": 3556,
    "acidentes": 3556,
    "mortos": 461,
    "feridos": 4006,
    "veiculos": 6572,
    "taxa_mortalidade": 12.96,
    "taxa_feridos": 112.65,
    "media_veiculos": 1.85,
    "pico_dia": "Domingo",
    "pico_qtd": 619,
    "pico_pct": 17.4,
    "fds_pct": 48.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 509,
        "mortos": 59,
        "feridos": 595
      },
      {
        "dia": "Terça",
        "acidentes": 410,
        "mortos": 44,
        "feridos": 419
      },
      {
        "dia": "Quarta",
        "acidentes": 456,
        "mortos": 57,
        "feridos": 483
      },
      {
        "dia": "Quinta",
        "acidentes": 458,
        "mortos": 40,
        "feridos": 507
      },
      {
        "dia": "Sexta",
        "acidentes": 519,
        "mortos": 52,
        "feridos": 610
      },
      {
        "dia": "Sábado",
        "acidentes": 585,
        "mortos": 107,
        "feridos": 691
      },
      {
        "dia": "Domingo",
        "acidentes": 619,
        "mortos": 102,
        "feridos": 701
      }
    ]
  },
  "SE": {
    "sigla": "SE",
    "uf": "SE",
    "rank": 23,
    "nome": "Sergipe",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-235",
    "perfil_critico": "Conexão litorânea Nordeste-Sudeste e acesso ao agreste sergipano",
    "total": 3145,
    "acidentes": 3145,
    "mortos": 272,
    "feridos": 3473,
    "veiculos": 5862,
    "taxa_mortalidade": 8.65,
    "taxa_feridos": 110.43,
    "media_veiculos": 1.86,
    "pico_dia": "Sábado",
    "pico_qtd": 522,
    "pico_pct": 16.6,
    "fds_pct": 47.8,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 443,
        "mortos": 35,
        "feridos": 514
      },
      {
        "dia": "Terça",
        "acidentes": 433,
        "mortos": 38,
        "feridos": 510
      },
      {
        "dia": "Quarta",
        "acidentes": 368,
        "mortos": 30,
        "feridos": 384
      },
      {
        "dia": "Quinta",
        "acidentes": 398,
        "mortos": 32,
        "feridos": 408
      },
      {
        "dia": "Sexta",
        "acidentes": 466,
        "mortos": 41,
        "feridos": 495
      },
      {
        "dia": "Sábado",
        "acidentes": 522,
        "mortos": 47,
        "feridos": 583
      },
      {
        "dia": "Domingo",
        "acidentes": 515,
        "mortos": 49,
        "feridos": 579
      }
    ]
  },
  "AC": {
    "sigla": "AC",
    "uf": "AC",
    "rank": 24,
    "nome": "Acre",
    "regiao": "Norte",
    "rodovia_critica": "BR-364",
    "perfil_critico": "Conexão de Rio Branco ao interior e divisa com Rondônia",
    "total": 1483,
    "acidentes": 1483,
    "mortos": 128,
    "feridos": 1851,
    "veiculos": 2672,
    "taxa_mortalidade": 8.63,
    "taxa_feridos": 124.81,
    "media_veiculos": 1.8,
    "pico_dia": "Sábado",
    "pico_qtd": 238,
    "pico_pct": 16.0,
    "fds_pct": 44.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 234,
        "mortos": 18,
        "feridos": 276
      },
      {
        "dia": "Terça",
        "acidentes": 190,
        "mortos": 8,
        "feridos": 241
      },
      {
        "dia": "Quarta",
        "acidentes": 211,
        "mortos": 10,
        "feridos": 275
      },
      {
        "dia": "Quinta",
        "acidentes": 188,
        "mortos": 18,
        "feridos": 239
      },
      {
        "dia": "Sexta",
        "acidentes": 210,
        "mortos": 20,
        "feridos": 242
      },
      {
        "dia": "Sábado",
        "acidentes": 238,
        "mortos": 21,
        "feridos": 300
      },
      {
        "dia": "Domingo",
        "acidentes": 212,
        "mortos": 33,
        "feridos": 278
      }
    ]
  },
  "RR": {
    "sigla": "RR",
    "uf": "RR",
    "rank": 25,
    "nome": "Roraima",
    "regiao": "Norte",
    "rodovia_critica": "BR-174",
    "perfil_critico": "Eixo internacional de integração de Boa Vista com Amazonas e fronteira",
    "total": 994,
    "acidentes": 994,
    "mortos": 147,
    "feridos": 1261,
    "veiculos": 1846,
    "taxa_mortalidade": 14.79,
    "taxa_feridos": 126.86,
    "media_veiculos": 1.86,
    "pico_dia": "Domingo",
    "pico_qtd": 213,
    "pico_pct": 21.4,
    "fds_pct": 55.0,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 126,
        "mortos": 13,
        "feridos": 158
      },
      {
        "dia": "Terça",
        "acidentes": 95,
        "mortos": 11,
        "feridos": 146
      },
      {
        "dia": "Quarta",
        "acidentes": 109,
        "mortos": 14,
        "feridos": 132
      },
      {
        "dia": "Quinta",
        "acidentes": 117,
        "mortos": 16,
        "feridos": 133
      },
      {
        "dia": "Sexta",
        "acidentes": 166,
        "mortos": 24,
        "feridos": 187
      },
      {
        "dia": "Sábado",
        "acidentes": 168,
        "mortos": 30,
        "feridos": 186
      },
      {
        "dia": "Domingo",
        "acidentes": 213,
        "mortos": 39,
        "feridos": 319
      }
    ]
  },
  "AP": {
    "sigla": "AP",
    "uf": "AP",
    "rank": 26,
    "nome": "Amapá",
    "regiao": "Norte",
    "rodovia_critica": "BR-156 / BR-210",
    "perfil_critico": "Integração de Macapá aos municípios do norte e sul do estado",
    "total": 930,
    "acidentes": 930,
    "mortos": 81,
    "feridos": 1207,
    "veiculos": 1663,
    "taxa_mortalidade": 8.71,
    "taxa_feridos": 129.78,
    "media_veiculos": 1.79,
    "pico_dia": "Domingo",
    "pico_qtd": 188,
    "pico_pct": 20.2,
    "fds_pct": 51.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 127,
        "mortos": 10,
        "feridos": 182
      },
      {
        "dia": "Terça",
        "acidentes": 109,
        "mortos": 12,
        "feridos": 119
      },
      {
        "dia": "Quarta",
        "acidentes": 101,
        "mortos": 7,
        "feridos": 115
      },
      {
        "dia": "Quinta",
        "acidentes": 113,
        "mortos": 7,
        "feridos": 163
      },
      {
        "dia": "Sexta",
        "acidentes": 125,
        "mortos": 9,
        "feridos": 168
      },
      {
        "dia": "Sábado",
        "acidentes": 167,
        "mortos": 18,
        "feridos": 212
      },
      {
        "dia": "Domingo",
        "acidentes": 188,
        "mortos": 18,
        "feridos": 248
      }
    ]
  },
  "AM": {
    "sigla": "AM",
    "uf": "AM",
    "rank": 27,
    "nome": "Amazonas",
    "regiao": "Norte",
    "rodovia_critica": "BR-174 / BR-319",
    "perfil_critico": "Saída rodoviária norte de Manaus e polo industrial",
    "total": 740,
    "acidentes": 740,
    "mortos": 117,
    "feridos": 935,
    "veiculos": 1489,
    "taxa_mortalidade": 15.81,
    "taxa_feridos": 126.35,
    "media_veiculos": 2.01,
    "pico_dia": "Domingo",
    "pico_qtd": 155,
    "pico_pct": 20.9,
    "fds_pct": 51.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 93,
        "mortos": 16,
        "feridos": 85
      },
      {
        "dia": "Terça",
        "acidentes": 92,
        "mortos": 14,
        "feridos": 136
      },
      {
        "dia": "Quarta",
        "acidentes": 77,
        "mortos": 15,
        "feridos": 110
      },
      {
        "dia": "Quinta",
        "acidentes": 98,
        "mortos": 11,
        "feridos": 134
      },
      {
        "dia": "Sexta",
        "acidentes": 113,
        "mortos": 16,
        "feridos": 124
      },
      {
        "dia": "Sábado",
        "acidentes": 112,
        "mortos": 16,
        "feridos": 154
      },
      {
        "dia": "Domingo",
        "acidentes": 155,
        "mortos": 29,
        "feridos": 192
      }
    ]
  }
};

export const ESTADOS_RANKING_LIST = [
  {
    "sigla": "MG",
    "uf": "MG",
    "rank": 1,
    "nome": "Minas Gerais",
    "regiao": "Sudeste",
    "rodovia_critica": "BR-381 / BR-040",
    "perfil_critico": "Relevo montanhoso sinuoso e intenso fluxo de carga mista em pista simples",
    "total": 50819,
    "acidentes": 50819,
    "mortos": 4214,
    "feridos": 63741,
    "veiculos": 99946,
    "taxa_mortalidade": 8.29,
    "taxa_feridos": 125.43,
    "media_veiculos": 1.97,
    "pico_dia": "Domingo",
    "pico_qtd": 8750,
    "pico_pct": 17.2,
    "fds_pct": 48.7,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 7107,
        "mortos": 558,
        "feridos": 8913
      },
      {
        "dia": "Terça",
        "acidentes": 6153,
        "mortos": 466,
        "feridos": 7635
      },
      {
        "dia": "Quarta",
        "acidentes": 6315,
        "mortos": 514,
        "feridos": 7753
      },
      {
        "dia": "Quinta",
        "acidentes": 6510,
        "mortos": 485,
        "feridos": 7884
      },
      {
        "dia": "Sexta",
        "acidentes": 7741,
        "mortos": 573,
        "feridos": 9554
      },
      {
        "dia": "Sábado",
        "acidentes": 8243,
        "mortos": 793,
        "feridos": 10384
      },
      {
        "dia": "Domingo",
        "acidentes": 8750,
        "mortos": 825,
        "feridos": 11618
      }
    ]
  },
  {
    "sigla": "SC",
    "uf": "SC",
    "rank": 2,
    "nome": "Santa Catarina",
    "regiao": "Sul",
    "rodovia_critica": "BR-101 / BR-470",
    "perfil_critico": "Eixo litorâneo turístico saturado e escoamento industrial no Vale do Itajaí",
    "total": 45452,
    "acidentes": 45452,
    "mortos": 2200,
    "feridos": 51161,
    "veiculos": 89705,
    "taxa_mortalidade": 4.84,
    "taxa_feridos": 112.56,
    "media_veiculos": 1.97,
    "pico_dia": "Sábado",
    "pico_qtd": 7743,
    "pico_pct": 17.0,
    "fds_pct": 48.7,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 6079,
        "mortos": 289,
        "feridos": 6779
      },
      {
        "dia": "Terça",
        "acidentes": 5589,
        "mortos": 222,
        "feridos": 6186
      },
      {
        "dia": "Quarta",
        "acidentes": 5722,
        "mortos": 286,
        "feridos": 6344
      },
      {
        "dia": "Quinta",
        "acidentes": 5907,
        "mortos": 255,
        "feridos": 6573
      },
      {
        "dia": "Sexta",
        "acidentes": 7310,
        "mortos": 334,
        "feridos": 8171
      },
      {
        "dia": "Sábado",
        "acidentes": 7743,
        "mortos": 435,
        "feridos": 8815
      },
      {
        "dia": "Domingo",
        "acidentes": 7102,
        "mortos": 379,
        "feridos": 8293
      }
    ]
  },
  {
    "sigla": "PR",
    "uf": "PR",
    "rank": 3,
    "nome": "Paraná",
    "regiao": "Sul",
    "rodovia_critica": "BR-277 / BR-376",
    "perfil_critico": "Corredor pesado de safra agrícola rumo ao Porto de Paranaguá e serras",
    "total": 42329,
    "acidentes": 42329,
    "mortos": 3302,
    "feridos": 46386,
    "veiculos": 86391,
    "taxa_mortalidade": 7.8,
    "taxa_feridos": 109.58,
    "media_veiculos": 2.04,
    "pico_dia": "Domingo",
    "pico_qtd": 6961,
    "pico_pct": 16.4,
    "fds_pct": 48.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 5572,
        "mortos": 451,
        "feridos": 6171
      },
      {
        "dia": "Terça",
        "acidentes": 5192,
        "mortos": 362,
        "feridos": 5723
      },
      {
        "dia": "Quarta",
        "acidentes": 5422,
        "mortos": 395,
        "feridos": 5927
      },
      {
        "dia": "Quinta",
        "acidentes": 5599,
        "mortos": 407,
        "feridos": 6097
      },
      {
        "dia": "Sexta",
        "acidentes": 6635,
        "mortos": 514,
        "feridos": 7059
      },
      {
        "dia": "Sábado",
        "acidentes": 6948,
        "mortos": 560,
        "feridos": 7520
      },
      {
        "dia": "Domingo",
        "acidentes": 6961,
        "mortos": 613,
        "feridos": 7889
      }
    ]
  },
  {
    "sigla": "RJ",
    "uf": "RJ",
    "rank": 4,
    "nome": "Rio de Janeiro",
    "regiao": "Sudeste",
    "rodovia_critica": "BR-101 / BR-116",
    "perfil_critico": "Alta densidade pendular metropolitana na Via Dutra e Niterói-Manilha",
    "total": 32039,
    "acidentes": 32039,
    "mortos": 1780,
    "feridos": 37094,
    "veiculos": 58930,
    "taxa_mortalidade": 5.56,
    "taxa_feridos": 115.78,
    "media_veiculos": 1.84,
    "pico_dia": "Domingo",
    "pico_qtd": 5062,
    "pico_pct": 15.8,
    "fds_pct": 46.8,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 4622,
        "mortos": 240,
        "feridos": 5367
      },
      {
        "dia": "Terça",
        "acidentes": 4028,
        "mortos": 201,
        "feridos": 4508
      },
      {
        "dia": "Quarta",
        "acidentes": 4237,
        "mortos": 213,
        "feridos": 4748
      },
      {
        "dia": "Quinta",
        "acidentes": 4163,
        "mortos": 228,
        "feridos": 4639
      },
      {
        "dia": "Sexta",
        "acidentes": 4905,
        "mortos": 257,
        "feridos": 5641
      },
      {
        "dia": "Sábado",
        "acidentes": 5022,
        "mortos": 315,
        "feridos": 5975
      },
      {
        "dia": "Domingo",
        "acidentes": 5062,
        "mortos": 326,
        "feridos": 6216
      }
    ]
  },
  {
    "sigla": "RS",
    "uf": "RS",
    "rank": 5,
    "nome": "Rio Grande do Sul",
    "regiao": "Sul",
    "rodovia_critica": "BR-116 / BR-386",
    "perfil_critico": "Malha extensa com forte neblina sazonal e tráfego pesado de grãos",
    "total": 27555,
    "acidentes": 27555,
    "mortos": 1837,
    "feridos": 30361,
    "veiculos": 52938,
    "taxa_mortalidade": 6.67,
    "taxa_feridos": 110.18,
    "media_veiculos": 1.92,
    "pico_dia": "Sábado",
    "pico_qtd": 4524,
    "pico_pct": 16.4,
    "fds_pct": 48.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3812,
        "mortos": 270,
        "feridos": 4190
      },
      {
        "dia": "Terça",
        "acidentes": 3340,
        "mortos": 217,
        "feridos": 3643
      },
      {
        "dia": "Quarta",
        "acidentes": 3326,
        "mortos": 190,
        "feridos": 3589
      },
      {
        "dia": "Quinta",
        "acidentes": 3693,
        "mortos": 209,
        "feridos": 4078
      },
      {
        "dia": "Sexta",
        "acidentes": 4395,
        "mortos": 287,
        "feridos": 4889
      },
      {
        "dia": "Sábado",
        "acidentes": 4524,
        "mortos": 309,
        "feridos": 4928
      },
      {
        "dia": "Domingo",
        "acidentes": 4465,
        "mortos": 355,
        "feridos": 5044
      }
    ]
  },
  {
    "sigla": "SP",
    "uf": "SP",
    "rank": 6,
    "nome": "São Paulo",
    "regiao": "Sudeste",
    "rodovia_critica": "BR-116 / BR-153",
    "perfil_critico": "Tráfego intenso de caminhões pesados na Régis Bittencourt e Transbrasiliana",
    "total": 25991,
    "acidentes": 25991,
    "mortos": 1263,
    "feridos": 27786,
    "veiculos": 50860,
    "taxa_mortalidade": 4.86,
    "taxa_feridos": 106.91,
    "media_veiculos": 1.96,
    "pico_dia": "Domingo",
    "pico_qtd": 4123,
    "pico_pct": 15.9,
    "fds_pct": 47.2,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3566,
        "mortos": 178,
        "feridos": 3818
      },
      {
        "dia": "Terça",
        "acidentes": 3309,
        "mortos": 159,
        "feridos": 3489
      },
      {
        "dia": "Quarta",
        "acidentes": 3375,
        "mortos": 167,
        "feridos": 3553
      },
      {
        "dia": "Quinta",
        "acidentes": 3470,
        "mortos": 154,
        "feridos": 3766
      },
      {
        "dia": "Sexta",
        "acidentes": 4047,
        "mortos": 156,
        "feridos": 4206
      },
      {
        "dia": "Sábado",
        "acidentes": 4101,
        "mortos": 225,
        "feridos": 4421
      },
      {
        "dia": "Domingo",
        "acidentes": 4123,
        "mortos": 224,
        "feridos": 4533
      }
    ]
  },
  {
    "sigla": "BA",
    "uf": "BA",
    "rank": 7,
    "nome": "Bahia",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-116 / BR-101",
    "perfil_critico": "Maior extensão rodoviária do Nordeste ligando Sudeste ao Norte e Nordeste",
    "total": 21620,
    "acidentes": 21620,
    "mortos": 3195,
    "feridos": 26813,
    "veiculos": 45169,
    "taxa_mortalidade": 14.78,
    "taxa_feridos": 124.02,
    "media_veiculos": 2.09,
    "pico_dia": "Domingo",
    "pico_qtd": 3620,
    "pico_pct": 16.7,
    "fds_pct": 48.0,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3070,
        "mortos": 407,
        "feridos": 3754
      },
      {
        "dia": "Terça",
        "acidentes": 2656,
        "mortos": 348,
        "feridos": 3313
      },
      {
        "dia": "Quarta",
        "acidentes": 2742,
        "mortos": 366,
        "feridos": 3479
      },
      {
        "dia": "Quinta",
        "acidentes": 2772,
        "mortos": 348,
        "feridos": 3367
      },
      {
        "dia": "Sexta",
        "acidentes": 3296,
        "mortos": 494,
        "feridos": 4051
      },
      {
        "dia": "Sábado",
        "acidentes": 3464,
        "mortos": 534,
        "feridos": 4275
      },
      {
        "dia": "Domingo",
        "acidentes": 3620,
        "mortos": 698,
        "feridos": 4574
      }
    ]
  },
  {
    "sigla": "GO",
    "uf": "GO",
    "rank": 8,
    "nome": "Goiás",
    "regiao": "Centro-Oeste",
    "rodovia_critica": "BR-153 / BR-060",
    "perfil_critico": "Entroncamento logístico nacional com longas retas e ultrapassagens críticas",
    "total": 18248,
    "acidentes": 18248,
    "mortos": 1701,
    "feridos": 20439,
    "veiculos": 35498,
    "taxa_mortalidade": 9.32,
    "taxa_feridos": 112.01,
    "media_veiculos": 1.95,
    "pico_dia": "Domingo",
    "pico_qtd": 3285,
    "pico_pct": 18.0,
    "fds_pct": 49.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 2454,
        "mortos": 171,
        "feridos": 2856
      },
      {
        "dia": "Terça",
        "acidentes": 2175,
        "mortos": 207,
        "feridos": 2440
      },
      {
        "dia": "Quarta",
        "acidentes": 2239,
        "mortos": 209,
        "feridos": 2499
      },
      {
        "dia": "Quinta",
        "acidentes": 2332,
        "mortos": 223,
        "feridos": 2616
      },
      {
        "dia": "Sexta",
        "acidentes": 2688,
        "mortos": 255,
        "feridos": 3042
      },
      {
        "dia": "Sábado",
        "acidentes": 3075,
        "mortos": 311,
        "feridos": 3291
      },
      {
        "dia": "Domingo",
        "acidentes": 3285,
        "mortos": 325,
        "feridos": 3695
      }
    ]
  },
  {
    "sigla": "PE",
    "uf": "PE",
    "rank": 9,
    "nome": "Pernambuco",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-232",
    "perfil_critico": "Eixo de integração metropolitana do Recife ao Agreste e Sertão",
    "total": 16701,
    "acidentes": 16701,
    "mortos": 1800,
    "feridos": 18607,
    "veiculos": 32374,
    "taxa_mortalidade": 10.78,
    "taxa_feridos": 111.41,
    "media_veiculos": 1.94,
    "pico_dia": "Domingo",
    "pico_qtd": 2638,
    "pico_pct": 15.8,
    "fds_pct": 46.2,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 2439,
        "mortos": 242,
        "feridos": 2779
      },
      {
        "dia": "Terça",
        "acidentes": 2150,
        "mortos": 177,
        "feridos": 2408
      },
      {
        "dia": "Quarta",
        "acidentes": 2159,
        "mortos": 196,
        "feridos": 2263
      },
      {
        "dia": "Quinta",
        "acidentes": 2231,
        "mortos": 216,
        "feridos": 2394
      },
      {
        "dia": "Sexta",
        "acidentes": 2525,
        "mortos": 271,
        "feridos": 2845
      },
      {
        "dia": "Sábado",
        "acidentes": 2559,
        "mortos": 329,
        "feridos": 2863
      },
      {
        "dia": "Domingo",
        "acidentes": 2638,
        "mortos": 369,
        "feridos": 3055
      }
    ]
  },
  {
    "sigla": "ES",
    "uf": "ES",
    "rank": 10,
    "nome": "Espírito Santo",
    "regiao": "Sudeste",
    "rodovia_critica": "BR-101 / BR-262",
    "perfil_critico": "Pista simples sinuosa com tráfego de rochas ornamentais e cargas pesadas",
    "total": 13670,
    "acidentes": 13670,
    "mortos": 914,
    "feridos": 16890,
    "veiculos": 27291,
    "taxa_mortalidade": 6.69,
    "taxa_feridos": 123.56,
    "media_veiculos": 2.0,
    "pico_dia": "Sexta",
    "pico_qtd": 2252,
    "pico_pct": 16.5,
    "fds_pct": 47.8,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1891,
        "mortos": 102,
        "feridos": 2355
      },
      {
        "dia": "Terça",
        "acidentes": 1713,
        "mortos": 108,
        "feridos": 2117
      },
      {
        "dia": "Quarta",
        "acidentes": 1737,
        "mortos": 109,
        "feridos": 2086
      },
      {
        "dia": "Quinta",
        "acidentes": 1800,
        "mortos": 114,
        "feridos": 2124
      },
      {
        "dia": "Sexta",
        "acidentes": 2252,
        "mortos": 147,
        "feridos": 2725
      },
      {
        "dia": "Sábado",
        "acidentes": 2185,
        "mortos": 170,
        "feridos": 2747
      },
      {
        "dia": "Domingo",
        "acidentes": 2092,
        "mortos": 164,
        "feridos": 2736
      }
    ]
  },
  {
    "sigla": "MT",
    "uf": "MT",
    "rank": 11,
    "nome": "Mato Grosso",
    "regiao": "Centro-Oeste",
    "rodovia_critica": "BR-163 / BR-364",
    "perfil_critico": "Corredor de exportação do agronegócio com altíssima presença de bitrens",
    "total": 13550,
    "acidentes": 13550,
    "mortos": 1400,
    "feridos": 14751,
    "veiculos": 32738,
    "taxa_mortalidade": 10.33,
    "taxa_feridos": 108.86,
    "media_veiculos": 2.42,
    "pico_dia": "Sábado",
    "pico_qtd": 2223,
    "pico_pct": 16.4,
    "fds_pct": 47.1,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1907,
        "mortos": 158,
        "feridos": 2057
      },
      {
        "dia": "Terça",
        "acidentes": 1668,
        "mortos": 170,
        "feridos": 1800
      },
      {
        "dia": "Quarta",
        "acidentes": 1766,
        "mortos": 153,
        "feridos": 1895
      },
      {
        "dia": "Quinta",
        "acidentes": 1833,
        "mortos": 185,
        "feridos": 1969
      },
      {
        "dia": "Sexta",
        "acidentes": 1970,
        "mortos": 220,
        "feridos": 2205
      },
      {
        "dia": "Sábado",
        "acidentes": 2223,
        "mortos": 232,
        "feridos": 2506
      },
      {
        "dia": "Domingo",
        "acidentes": 2183,
        "mortos": 282,
        "feridos": 2319
      }
    ]
  },
  {
    "sigla": "MS",
    "uf": "MS",
    "rank": 12,
    "nome": "Mato Grosso do Sul",
    "regiao": "Centro-Oeste",
    "rodovia_critica": "BR-163 / BR-262",
    "perfil_critico": "Rotas longas de escoamento agroindustrial e transporte de celulose",
    "total": 9589,
    "acidentes": 9589,
    "mortos": 927,
    "feridos": 10424,
    "veiculos": 19522,
    "taxa_mortalidade": 9.67,
    "taxa_feridos": 108.71,
    "media_veiculos": 2.04,
    "pico_dia": "Domingo",
    "pico_qtd": 1682,
    "pico_pct": 17.5,
    "fds_pct": 49.1,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1255,
        "mortos": 110,
        "feridos": 1393
      },
      {
        "dia": "Terça",
        "acidentes": 1160,
        "mortos": 117,
        "feridos": 1213
      },
      {
        "dia": "Quarta",
        "acidentes": 1219,
        "mortos": 100,
        "feridos": 1328
      },
      {
        "dia": "Quinta",
        "acidentes": 1248,
        "mortos": 131,
        "feridos": 1271
      },
      {
        "dia": "Sexta",
        "acidentes": 1396,
        "mortos": 139,
        "feridos": 1514
      },
      {
        "dia": "Sábado",
        "acidentes": 1629,
        "mortos": 144,
        "feridos": 1780
      },
      {
        "dia": "Domingo",
        "acidentes": 1682,
        "mortos": 186,
        "feridos": 1925
      }
    ]
  },
  {
    "sigla": "PB",
    "uf": "PB",
    "rank": 13,
    "nome": "Paraíba",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-230",
    "perfil_critico": "Fluxo intenso na Transamazônica ligando João Pessoa a Campina Grande",
    "total": 9575,
    "acidentes": 9575,
    "mortos": 751,
    "feridos": 10898,
    "veiculos": 17166,
    "taxa_mortalidade": 7.84,
    "taxa_feridos": 113.82,
    "media_veiculos": 1.79,
    "pico_dia": "Domingo",
    "pico_qtd": 1543,
    "pico_pct": 16.1,
    "fds_pct": 47.3,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1346,
        "mortos": 95,
        "feridos": 1542
      },
      {
        "dia": "Terça",
        "acidentes": 1215,
        "mortos": 82,
        "feridos": 1434
      },
      {
        "dia": "Quarta",
        "acidentes": 1250,
        "mortos": 86,
        "feridos": 1375
      },
      {
        "dia": "Quinta",
        "acidentes": 1234,
        "mortos": 75,
        "feridos": 1438
      },
      {
        "dia": "Sexta",
        "acidentes": 1523,
        "mortos": 104,
        "feridos": 1664
      },
      {
        "dia": "Sábado",
        "acidentes": 1464,
        "mortos": 140,
        "feridos": 1642
      },
      {
        "dia": "Domingo",
        "acidentes": 1543,
        "mortos": 169,
        "feridos": 1803
      }
    ]
  },
  {
    "sigla": "RO",
    "uf": "RO",
    "rank": 14,
    "nome": "Rondônia",
    "regiao": "Norte",
    "rodovia_critica": "BR-364",
    "perfil_critico": "Única artéria federal pavimentada de escoamento de grãos rumo ao Madeira",
    "total": 8409,
    "acidentes": 8409,
    "mortos": 572,
    "feridos": 9454,
    "veiculos": 18113,
    "taxa_mortalidade": 6.8,
    "taxa_feridos": 112.43,
    "media_veiculos": 2.15,
    "pico_dia": "Sexta",
    "pico_qtd": 1371,
    "pico_pct": 16.3,
    "fds_pct": 46.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1172,
        "mortos": 71,
        "feridos": 1319
      },
      {
        "dia": "Terça",
        "acidentes": 1102,
        "mortos": 66,
        "feridos": 1196
      },
      {
        "dia": "Quarta",
        "acidentes": 1105,
        "mortos": 53,
        "feridos": 1215
      },
      {
        "dia": "Quinta",
        "acidentes": 1089,
        "mortos": 66,
        "feridos": 1211
      },
      {
        "dia": "Sexta",
        "acidentes": 1371,
        "mortos": 95,
        "feridos": 1492
      },
      {
        "dia": "Sábado",
        "acidentes": 1303,
        "mortos": 118,
        "feridos": 1530
      },
      {
        "dia": "Domingo",
        "acidentes": 1267,
        "mortos": 103,
        "feridos": 1491
      }
    ]
  },
  {
    "sigla": "RN",
    "uf": "RN",
    "rank": 15,
    "nome": "Rio Grande do Norte",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-304",
    "perfil_critico": "Tráfego turístico litorâneo combinado ao transporte salineiro e frutícola",
    "total": 8233,
    "acidentes": 8233,
    "mortos": 593,
    "feridos": 9507,
    "veiculos": 15449,
    "taxa_mortalidade": 7.2,
    "taxa_feridos": 115.47,
    "media_veiculos": 1.88,
    "pico_dia": "Sábado",
    "pico_qtd": 1271,
    "pico_pct": 15.4,
    "fds_pct": 45.3,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1234,
        "mortos": 75,
        "feridos": 1483
      },
      {
        "dia": "Terça",
        "acidentes": 1072,
        "mortos": 41,
        "feridos": 1224
      },
      {
        "dia": "Quarta",
        "acidentes": 1126,
        "mortos": 73,
        "feridos": 1248
      },
      {
        "dia": "Quinta",
        "acidentes": 1069,
        "mortos": 69,
        "feridos": 1255
      },
      {
        "dia": "Sexta",
        "acidentes": 1268,
        "mortos": 84,
        "feridos": 1430
      },
      {
        "dia": "Sábado",
        "acidentes": 1271,
        "mortos": 93,
        "feridos": 1518
      },
      {
        "dia": "Domingo",
        "acidentes": 1193,
        "mortos": 158,
        "feridos": 1349
      }
    ]
  },
  {
    "sigla": "CE",
    "uf": "CE",
    "rank": 16,
    "nome": "Ceará",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-116 / BR-222",
    "perfil_critico": "Concentração no anel metropolitano de Fortaleza e acesso ao interior",
    "total": 7838,
    "acidentes": 7838,
    "mortos": 941,
    "feridos": 8871,
    "veiculos": 15794,
    "taxa_mortalidade": 12.01,
    "taxa_feridos": 113.18,
    "media_veiculos": 2.02,
    "pico_dia": "Sexta",
    "pico_qtd": 1262,
    "pico_pct": 16.1,
    "fds_pct": 47.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1101,
        "mortos": 128,
        "feridos": 1254
      },
      {
        "dia": "Terça",
        "acidentes": 991,
        "mortos": 74,
        "feridos": 1101
      },
      {
        "dia": "Quarta",
        "acidentes": 1000,
        "mortos": 94,
        "feridos": 1149
      },
      {
        "dia": "Quinta",
        "acidentes": 1012,
        "mortos": 112,
        "feridos": 1136
      },
      {
        "dia": "Sexta",
        "acidentes": 1262,
        "mortos": 151,
        "feridos": 1466
      },
      {
        "dia": "Sábado",
        "acidentes": 1252,
        "mortos": 187,
        "feridos": 1375
      },
      {
        "dia": "Domingo",
        "acidentes": 1220,
        "mortos": 195,
        "feridos": 1390
      }
    ]
  },
  {
    "sigla": "PI",
    "uf": "PI",
    "rank": 17,
    "nome": "Piauí",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-316 / BR-343",
    "perfil_critico": "Deslocamentos intermunicipais com forte presença de motocicletas nas BRs",
    "total": 7513,
    "acidentes": 7513,
    "mortos": 868,
    "feridos": 8326,
    "veiculos": 14449,
    "taxa_mortalidade": 11.55,
    "taxa_feridos": 110.82,
    "media_veiculos": 1.92,
    "pico_dia": "Sábado",
    "pico_qtd": 1351,
    "pico_pct": 18.0,
    "fds_pct": 50.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 957,
        "mortos": 109,
        "feridos": 1129
      },
      {
        "dia": "Terça",
        "acidentes": 914,
        "mortos": 83,
        "feridos": 1055
      },
      {
        "dia": "Quarta",
        "acidentes": 892,
        "mortos": 83,
        "feridos": 971
      },
      {
        "dia": "Quinta",
        "acidentes": 926,
        "mortos": 101,
        "feridos": 1067
      },
      {
        "dia": "Sexta",
        "acidentes": 1132,
        "mortos": 117,
        "feridos": 1213
      },
      {
        "dia": "Sábado",
        "acidentes": 1351,
        "mortos": 183,
        "feridos": 1457
      },
      {
        "dia": "Domingo",
        "acidentes": 1341,
        "mortos": 192,
        "feridos": 1434
      }
    ]
  },
  {
    "sigla": "MA",
    "uf": "MA",
    "rank": 18,
    "nome": "Maranhão",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-135 / BR-010",
    "perfil_critico": "Acesso portuário a São Luís (Itaqui) e corredor de grãos do Matopiba",
    "total": 6677,
    "acidentes": 6677,
    "mortos": 1414,
    "feridos": 7159,
    "veiculos": 14596,
    "taxa_mortalidade": 21.18,
    "taxa_feridos": 107.22,
    "media_veiculos": 2.19,
    "pico_dia": "Sábado",
    "pico_qtd": 1195,
    "pico_pct": 17.9,
    "fds_pct": 50.3,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 891,
        "mortos": 169,
        "feridos": 967
      },
      {
        "dia": "Terça",
        "acidentes": 764,
        "mortos": 146,
        "feridos": 827
      },
      {
        "dia": "Quarta",
        "acidentes": 797,
        "mortos": 134,
        "feridos": 816
      },
      {
        "dia": "Quinta",
        "acidentes": 864,
        "mortos": 172,
        "feridos": 890
      },
      {
        "dia": "Sexta",
        "acidentes": 980,
        "mortos": 190,
        "feridos": 1084
      },
      {
        "dia": "Sábado",
        "acidentes": 1195,
        "mortos": 281,
        "feridos": 1266
      },
      {
        "dia": "Domingo",
        "acidentes": 1186,
        "mortos": 322,
        "feridos": 1309
      }
    ]
  },
  {
    "sigla": "DF",
    "uf": "DF",
    "rank": 19,
    "nome": "Distrito Federal",
    "regiao": "Centro-Oeste",
    "rodovia_critica": "BR-020 / BR-040",
    "perfil_critico": "Fluxo pendular diário massivo do Entorno em pistas de alta velocidade",
    "total": 5663,
    "acidentes": 5663,
    "mortos": 245,
    "feridos": 6031,
    "veiculos": 10644,
    "taxa_mortalidade": 4.33,
    "taxa_feridos": 106.5,
    "media_veiculos": 1.88,
    "pico_dia": "Sexta",
    "pico_qtd": 889,
    "pico_pct": 15.7,
    "fds_pct": 45.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 831,
        "mortos": 23,
        "feridos": 875
      },
      {
        "dia": "Terça",
        "acidentes": 687,
        "mortos": 28,
        "feridos": 754
      },
      {
        "dia": "Quarta",
        "acidentes": 753,
        "mortos": 29,
        "feridos": 799
      },
      {
        "dia": "Quinta",
        "acidentes": 794,
        "mortos": 19,
        "feridos": 809
      },
      {
        "dia": "Sexta",
        "acidentes": 889,
        "mortos": 37,
        "feridos": 958
      },
      {
        "dia": "Sábado",
        "acidentes": 852,
        "mortos": 60,
        "feridos": 938
      },
      {
        "dia": "Domingo",
        "acidentes": 857,
        "mortos": 49,
        "feridos": 898
      }
    ]
  },
  {
    "sigla": "PA",
    "uf": "PA",
    "rank": 20,
    "nome": "Pará",
    "regiao": "Norte",
    "rodovia_critica": "BR-316 / BR-010",
    "perfil_critico": "Saída metropolitana de Belém e escoamento mineral e agropecuário",
    "total": 5435,
    "acidentes": 5435,
    "mortos": 1129,
    "feridos": 5951,
    "veiculos": 12920,
    "taxa_mortalidade": 20.77,
    "taxa_feridos": 109.49,
    "media_veiculos": 2.38,
    "pico_dia": "Domingo",
    "pico_qtd": 1005,
    "pico_pct": 18.5,
    "fds_pct": 50.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 716,
        "mortos": 137,
        "feridos": 786
      },
      {
        "dia": "Terça",
        "acidentes": 679,
        "mortos": 127,
        "feridos": 733
      },
      {
        "dia": "Quarta",
        "acidentes": 647,
        "mortos": 109,
        "feridos": 721
      },
      {
        "dia": "Quinta",
        "acidentes": 626,
        "mortos": 139,
        "feridos": 600
      },
      {
        "dia": "Sexta",
        "acidentes": 838,
        "mortos": 149,
        "feridos": 900
      },
      {
        "dia": "Sábado",
        "acidentes": 924,
        "mortos": 202,
        "feridos": 1065
      },
      {
        "dia": "Domingo",
        "acidentes": 1005,
        "mortos": 266,
        "feridos": 1146
      }
    ]
  },
  {
    "sigla": "TO",
    "uf": "TO",
    "rank": 21,
    "nome": "Tocantins",
    "regiao": "Norte",
    "rodovia_critica": "BR-153",
    "perfil_critico": "Eixo Belém-Brasília com tráfego ininterrupto de carretas de longa distância",
    "total": 3628,
    "acidentes": 3628,
    "mortos": 540,
    "feridos": 4182,
    "veiculos": 8031,
    "taxa_mortalidade": 14.88,
    "taxa_feridos": 115.27,
    "media_veiculos": 2.21,
    "pico_dia": "Sábado",
    "pico_qtd": 666,
    "pico_pct": 18.4,
    "fds_pct": 50.1,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 452,
        "mortos": 61,
        "feridos": 526
      },
      {
        "dia": "Terça",
        "acidentes": 457,
        "mortos": 55,
        "feridos": 499
      },
      {
        "dia": "Quarta",
        "acidentes": 470,
        "mortos": 60,
        "feridos": 537
      },
      {
        "dia": "Quinta",
        "acidentes": 433,
        "mortos": 64,
        "feridos": 464
      },
      {
        "dia": "Sexta",
        "acidentes": 534,
        "mortos": 77,
        "feridos": 653
      },
      {
        "dia": "Sábado",
        "acidentes": 666,
        "mortos": 111,
        "feridos": 865
      },
      {
        "dia": "Domingo",
        "acidentes": 616,
        "mortos": 112,
        "feridos": 638
      }
    ]
  },
  {
    "sigla": "AL",
    "uf": "AL",
    "rank": 22,
    "nome": "Alagoas",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-104",
    "perfil_critico": "Trechos de serra e canaviais com travessia frequente de áreas urbanas",
    "total": 3556,
    "acidentes": 3556,
    "mortos": 461,
    "feridos": 4006,
    "veiculos": 6572,
    "taxa_mortalidade": 12.96,
    "taxa_feridos": 112.65,
    "media_veiculos": 1.85,
    "pico_dia": "Domingo",
    "pico_qtd": 619,
    "pico_pct": 17.4,
    "fds_pct": 48.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 509,
        "mortos": 59,
        "feridos": 595
      },
      {
        "dia": "Terça",
        "acidentes": 410,
        "mortos": 44,
        "feridos": 419
      },
      {
        "dia": "Quarta",
        "acidentes": 456,
        "mortos": 57,
        "feridos": 483
      },
      {
        "dia": "Quinta",
        "acidentes": 458,
        "mortos": 40,
        "feridos": 507
      },
      {
        "dia": "Sexta",
        "acidentes": 519,
        "mortos": 52,
        "feridos": 610
      },
      {
        "dia": "Sábado",
        "acidentes": 585,
        "mortos": 107,
        "feridos": 691
      },
      {
        "dia": "Domingo",
        "acidentes": 619,
        "mortos": 102,
        "feridos": 701
      }
    ]
  },
  {
    "sigla": "SE",
    "uf": "SE",
    "rank": 23,
    "nome": "Sergipe",
    "regiao": "Nordeste",
    "rodovia_critica": "BR-101 / BR-235",
    "perfil_critico": "Conexão litorânea Nordeste-Sudeste e acesso ao agreste sergipano",
    "total": 3145,
    "acidentes": 3145,
    "mortos": 272,
    "feridos": 3473,
    "veiculos": 5862,
    "taxa_mortalidade": 8.65,
    "taxa_feridos": 110.43,
    "media_veiculos": 1.86,
    "pico_dia": "Sábado",
    "pico_qtd": 522,
    "pico_pct": 16.6,
    "fds_pct": 47.8,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 443,
        "mortos": 35,
        "feridos": 514
      },
      {
        "dia": "Terça",
        "acidentes": 433,
        "mortos": 38,
        "feridos": 510
      },
      {
        "dia": "Quarta",
        "acidentes": 368,
        "mortos": 30,
        "feridos": 384
      },
      {
        "dia": "Quinta",
        "acidentes": 398,
        "mortos": 32,
        "feridos": 408
      },
      {
        "dia": "Sexta",
        "acidentes": 466,
        "mortos": 41,
        "feridos": 495
      },
      {
        "dia": "Sábado",
        "acidentes": 522,
        "mortos": 47,
        "feridos": 583
      },
      {
        "dia": "Domingo",
        "acidentes": 515,
        "mortos": 49,
        "feridos": 579
      }
    ]
  },
  {
    "sigla": "AC",
    "uf": "AC",
    "rank": 24,
    "nome": "Acre",
    "regiao": "Norte",
    "rodovia_critica": "BR-364",
    "perfil_critico": "Conexão de Rio Branco ao interior e divisa com Rondônia",
    "total": 1483,
    "acidentes": 1483,
    "mortos": 128,
    "feridos": 1851,
    "veiculos": 2672,
    "taxa_mortalidade": 8.63,
    "taxa_feridos": 124.81,
    "media_veiculos": 1.8,
    "pico_dia": "Sábado",
    "pico_qtd": 238,
    "pico_pct": 16.0,
    "fds_pct": 44.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 234,
        "mortos": 18,
        "feridos": 276
      },
      {
        "dia": "Terça",
        "acidentes": 190,
        "mortos": 8,
        "feridos": 241
      },
      {
        "dia": "Quarta",
        "acidentes": 211,
        "mortos": 10,
        "feridos": 275
      },
      {
        "dia": "Quinta",
        "acidentes": 188,
        "mortos": 18,
        "feridos": 239
      },
      {
        "dia": "Sexta",
        "acidentes": 210,
        "mortos": 20,
        "feridos": 242
      },
      {
        "dia": "Sábado",
        "acidentes": 238,
        "mortos": 21,
        "feridos": 300
      },
      {
        "dia": "Domingo",
        "acidentes": 212,
        "mortos": 33,
        "feridos": 278
      }
    ]
  },
  {
    "sigla": "RR",
    "uf": "RR",
    "rank": 25,
    "nome": "Roraima",
    "regiao": "Norte",
    "rodovia_critica": "BR-174",
    "perfil_critico": "Eixo internacional de integração de Boa Vista com Amazonas e fronteira",
    "total": 994,
    "acidentes": 994,
    "mortos": 147,
    "feridos": 1261,
    "veiculos": 1846,
    "taxa_mortalidade": 14.79,
    "taxa_feridos": 126.86,
    "media_veiculos": 1.86,
    "pico_dia": "Domingo",
    "pico_qtd": 213,
    "pico_pct": 21.4,
    "fds_pct": 55.0,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 126,
        "mortos": 13,
        "feridos": 158
      },
      {
        "dia": "Terça",
        "acidentes": 95,
        "mortos": 11,
        "feridos": 146
      },
      {
        "dia": "Quarta",
        "acidentes": 109,
        "mortos": 14,
        "feridos": 132
      },
      {
        "dia": "Quinta",
        "acidentes": 117,
        "mortos": 16,
        "feridos": 133
      },
      {
        "dia": "Sexta",
        "acidentes": 166,
        "mortos": 24,
        "feridos": 187
      },
      {
        "dia": "Sábado",
        "acidentes": 168,
        "mortos": 30,
        "feridos": 186
      },
      {
        "dia": "Domingo",
        "acidentes": 213,
        "mortos": 39,
        "feridos": 319
      }
    ]
  },
  {
    "sigla": "AP",
    "uf": "AP",
    "rank": 26,
    "nome": "Amapá",
    "regiao": "Norte",
    "rodovia_critica": "BR-156 / BR-210",
    "perfil_critico": "Integração de Macapá aos municípios do norte e sul do estado",
    "total": 930,
    "acidentes": 930,
    "mortos": 81,
    "feridos": 1207,
    "veiculos": 1663,
    "taxa_mortalidade": 8.71,
    "taxa_feridos": 129.78,
    "media_veiculos": 1.79,
    "pico_dia": "Domingo",
    "pico_qtd": 188,
    "pico_pct": 20.2,
    "fds_pct": 51.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 127,
        "mortos": 10,
        "feridos": 182
      },
      {
        "dia": "Terça",
        "acidentes": 109,
        "mortos": 12,
        "feridos": 119
      },
      {
        "dia": "Quarta",
        "acidentes": 101,
        "mortos": 7,
        "feridos": 115
      },
      {
        "dia": "Quinta",
        "acidentes": 113,
        "mortos": 7,
        "feridos": 163
      },
      {
        "dia": "Sexta",
        "acidentes": 125,
        "mortos": 9,
        "feridos": 168
      },
      {
        "dia": "Sábado",
        "acidentes": 167,
        "mortos": 18,
        "feridos": 212
      },
      {
        "dia": "Domingo",
        "acidentes": 188,
        "mortos": 18,
        "feridos": 248
      }
    ]
  },
  {
    "sigla": "AM",
    "uf": "AM",
    "rank": 27,
    "nome": "Amazonas",
    "regiao": "Norte",
    "rodovia_critica": "BR-174 / BR-319",
    "perfil_critico": "Saída rodoviária norte de Manaus e polo industrial",
    "total": 740,
    "acidentes": 740,
    "mortos": 117,
    "feridos": 935,
    "veiculos": 1489,
    "taxa_mortalidade": 15.81,
    "taxa_feridos": 126.35,
    "media_veiculos": 2.01,
    "pico_dia": "Domingo",
    "pico_qtd": 155,
    "pico_pct": 20.9,
    "fds_pct": 51.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 93,
        "mortos": 16,
        "feridos": 85
      },
      {
        "dia": "Terça",
        "acidentes": 92,
        "mortos": 14,
        "feridos": 136
      },
      {
        "dia": "Quarta",
        "acidentes": 77,
        "mortos": 15,
        "feridos": 110
      },
      {
        "dia": "Quinta",
        "acidentes": 98,
        "mortos": 11,
        "feridos": 134
      },
      {
        "dia": "Sexta",
        "acidentes": 113,
        "mortos": 16,
        "feridos": 124
      },
      {
        "dia": "Sábado",
        "acidentes": 112,
        "mortos": 16,
        "feridos": 154
      },
      {
        "dia": "Domingo",
        "acidentes": 155,
        "mortos": 29,
        "feridos": 192
      }
    ]
  }
];
