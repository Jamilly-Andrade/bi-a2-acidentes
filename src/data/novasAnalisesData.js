// Dados oficiais para as 3 novas análises solicitadas (Tipo x Veículos, Causa x Pessoas, Clima x Vítimas)
export const TIPO_ACIDENTE_VEICULOS_DATA = [
  {
    "tipo_acidente": "Colisão traseira",
    "acidentes": 75496,
    "veiculos": 184672,
    "pessoas": 231632,
    "feridos": 85358,
    "mortos": 3563,
    "media_veiculos": 2.45,
    "taxa_mortalidade": 4.72
  },
  {
    "tipo_acidente": "Colisão transversal",
    "acidentes": 49413,
    "veiculos": 110149,
    "pessoas": 140710,
    "feridos": 63294,
    "mortos": 2590,
    "media_veiculos": 2.23,
    "taxa_mortalidade": 5.24
  },
  {
    "tipo_acidente": "Colisão lateral mesmo sentido",
    "acidentes": 40037,
    "veiculos": 96155,
    "pessoas": 114352,
    "feridos": 43972,
    "mortos": 1190,
    "media_veiculos": 2.4,
    "taxa_mortalidade": 2.97
  },
  {
    "tipo_acidente": "Saída de leito carroçável",
    "acidentes": 59348,
    "veiculos": 74565,
    "pessoas": 116526,
    "feridos": 67774,
    "mortos": 3892,
    "media_veiculos": 1.26,
    "taxa_mortalidade": 6.56
  },
  {
    "tipo_acidente": "Colisão frontal",
    "acidentes": 26196,
    "veiculos": 67388,
    "pessoas": 95303,
    "feridos": 42231,
    "mortos": 10248,
    "media_veiculos": 2.57,
    "taxa_mortalidade": 39.12
  },
  {
    "tipo_acidente": "Tombamento",
    "acidentes": 33764,
    "veiculos": 51850,
    "pessoas": 60081,
    "feridos": 38194,
    "mortos": 1589,
    "media_veiculos": 1.54,
    "taxa_mortalidade": 4.71
  },
  {
    "tipo_acidente": "Colisão com objeto",
    "acidentes": 28071,
    "veiculos": 38165,
    "pessoas": 53530,
    "feridos": 26998,
    "mortos": 1651,
    "media_veiculos": 1.36,
    "taxa_mortalidade": 5.88
  },
  {
    "tipo_acidente": "Atropelamento de Pedestre",
    "acidentes": 17286,
    "veiculos": 37149,
    "pessoas": 43490,
    "feridos": 16162,
    "mortos": 5106,
    "media_veiculos": 2.15,
    "taxa_mortalidade": 29.54
  },
  {
    "tipo_acidente": "Colisão lateral sentido oposto",
    "acidentes": 11051,
    "veiculos": 33166,
    "pessoas": 40502,
    "feridos": 13885,
    "mortos": 1206,
    "media_veiculos": 3.0,
    "taxa_mortalidade": 10.91
  },
  {
    "tipo_acidente": "Engavetamento",
    "acidentes": 6672,
    "veiculos": 27364,
    "pessoas": 34952,
    "feridos": 8433,
    "mortos": 220,
    "media_veiculos": 4.1,
    "taxa_mortalidade": 3.3
  },
  {
    "tipo_acidente": "Queda de ocupante de veículo",
    "acidentes": 17583,
    "veiculos": 20731,
    "pessoas": 26092,
    "feridos": 20472,
    "mortos": 549,
    "media_veiculos": 1.18,
    "taxa_mortalidade": 3.12
  },
  {
    "tipo_acidente": "Incêndio",
    "acidentes": 8625,
    "veiculos": 13176,
    "pessoas": 15907,
    "feridos": 387,
    "mortos": 6,
    "media_veiculos": 1.53,
    "taxa_mortalidade": 0.07
  }
];

export const CAUSA_PESSOAS_DATA = [
  {
    "causa": "Reação tardia ou ineficiente do condutor",
    "causa_curta": "Reação tardia ou ineficiente do ...",
    "acidentes": 54325,
    "pessoas": 138036,
    "ilesos": 55337,
    "feridos": 62384,
    "mortos": 3264,
    "media_pessoas": 2.54,
    "simbolos_pessoas": 28
  },
  {
    "causa": "Ausência de reação do condutor",
    "causa_curta": "Ausência de reação do condutor",
    "acidentes": 52434,
    "pessoas": 123636,
    "ilesos": 47209,
    "feridos": 56758,
    "mortos": 3805,
    "media_pessoas": 2.36,
    "simbolos_pessoas": 25
  },
  {
    "causa": "Acessar a via sem observar a presença dos outros veículos",
    "causa_curta": "Acessar a via sem observar a pre...",
    "acidentes": 35938,
    "pessoas": 100956,
    "ilesos": 45089,
    "feridos": 44316,
    "mortos": 2171,
    "media_pessoas": 2.81,
    "simbolos_pessoas": 20
  },
  {
    "causa": "Condutor deixou de manter distância do veículo da frente",
    "causa_curta": "Condutor deixou de manter distân...",
    "acidentes": 25602,
    "pessoas": 78470,
    "ilesos": 42148,
    "feridos": 28273,
    "mortos": 542,
    "media_pessoas": 3.06,
    "simbolos_pessoas": 16
  },
  {
    "causa": "Velocidade Incompatível",
    "causa_curta": "Velocidade Incompatível",
    "acidentes": 26984,
    "pessoas": 64883,
    "ilesos": 18462,
    "feridos": 33087,
    "mortos": 2840,
    "media_pessoas": 2.4,
    "simbolos_pessoas": 13
  },
  {
    "causa": "Manobra de mudança de faixa",
    "causa_curta": "Manobra de mudança de faixa",
    "acidentes": 22167,
    "pessoas": 62678,
    "ilesos": 26823,
    "feridos": 26691,
    "mortos": 1331,
    "media_pessoas": 2.83,
    "simbolos_pessoas": 13
  },
  {
    "causa": "Ingestão de álcool pelo condutor",
    "causa_curta": "Ingestão de álcool pelo condutor",
    "acidentes": 22497,
    "pessoas": 52088,
    "ilesos": 25758,
    "feridos": 19134,
    "mortos": 1158,
    "media_pessoas": 2.32,
    "simbolos_pessoas": 10
  },
  {
    "causa": "Transitar na contramão",
    "causa_curta": "Transitar na contramão",
    "acidentes": 12823,
    "pessoas": 45476,
    "ilesos": 16833,
    "feridos": 17948,
    "mortos": 4812,
    "media_pessoas": 3.55,
    "simbolos_pessoas": 9
  },
  {
    "causa": "Demais falhas mecânicas ou elétricas",
    "causa_curta": "Demais falhas mecânicas ou elétr...",
    "acidentes": 17314,
    "pessoas": 37011,
    "ilesos": 18175,
    "feridos": 12713,
    "mortos": 345,
    "media_pessoas": 2.14,
    "simbolos_pessoas": 7
  },
  {
    "causa": "Ultrapassagem Indevida",
    "causa_curta": "Ultrapassagem Indevida",
    "acidentes": 9578,
    "pessoas": 33887,
    "ilesos": 12400,
    "feridos": 14608,
    "mortos": 2155,
    "media_pessoas": 3.54,
    "simbolos_pessoas": 7
  }
];

export const CLIMA_VITIMAS_DATA = [
  {
    "condicao": "Céu Claro",
    "acidentes": 244639,
    "total_pessoas": 632917,
    "ilesos": 258060,
    "feridos_leves": 206807,
    "feridos_graves": 69968,
    "mortos": 21089,
    "pct_ilesos": 46.42,
    "pct_feridos_leves": 37.2,
    "pct_feridos_graves": 12.59,
    "pct_mortos": 3.79,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 258060,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 206807,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 69968,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 21089,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Nublado",
    "acidentes": 61819,
    "total_pessoas": 157513,
    "ilesos": 62837,
    "feridos_leves": 53374,
    "feridos_graves": 16578,
    "mortos": 5079,
    "pct_ilesos": 45.58,
    "pct_feridos_leves": 38.71,
    "pct_feridos_graves": 12.02,
    "pct_mortos": 3.68,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 62837,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 53374,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 16578,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 5079,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Chuva",
    "acidentes": 39151,
    "total_pessoas": 101175,
    "ilesos": 39242,
    "feridos_leves": 38366,
    "feridos_graves": 10021,
    "mortos": 3067,
    "pct_ilesos": 43.27,
    "pct_feridos_leves": 42.3,
    "pct_feridos_graves": 11.05,
    "pct_mortos": 3.38,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 39242,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 38366,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 10021,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 3067,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Sol",
    "acidentes": 22599,
    "total_pessoas": 59628,
    "ilesos": 24377,
    "feridos_leves": 20642,
    "feridos_graves": 6130,
    "mortos": 1475,
    "pct_ilesos": 46.32,
    "pct_feridos_leves": 39.23,
    "pct_feridos_graves": 11.65,
    "pct_mortos": 2.8,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 24377,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 20642,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 6130,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 1475,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Garoa/Chuvisco",
    "acidentes": 13917,
    "total_pessoas": 35789,
    "ilesos": 15046,
    "feridos_leves": 12517,
    "feridos_graves": 3067,
    "mortos": 980,
    "pct_ilesos": 47.6,
    "pct_feridos_leves": 39.6,
    "pct_feridos_graves": 9.7,
    "pct_mortos": 3.1,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 15046,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 12517,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 3067,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 980,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Ignorado",
    "acidentes": 5143,
    "total_pessoas": 11752,
    "ilesos": 3818,
    "feridos_leves": 3647,
    "feridos_graves": 1618,
    "mortos": 564,
    "pct_ilesos": 39.58,
    "pct_feridos_leves": 37.8,
    "pct_feridos_graves": 16.77,
    "pct_mortos": 5.85,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 3818,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 3647,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 1618,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 564,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Nevoeiro/Neblina",
    "acidentes": 3431,
    "total_pessoas": 9507,
    "ilesos": 3645,
    "feridos_leves": 3082,
    "feridos_graves": 1004,
    "mortos": 486,
    "pct_ilesos": 44.36,
    "pct_feridos_leves": 37.51,
    "pct_feridos_graves": 12.22,
    "pct_mortos": 5.91,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 3645,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 3082,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 1004,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 486,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Vento",
    "acidentes": 661,
    "total_pessoas": 1697,
    "ilesos": 683,
    "feridos_leves": 512,
    "feridos_graves": 210,
    "mortos": 52,
    "pct_ilesos": 46.88,
    "pct_feridos_leves": 35.14,
    "pct_feridos_graves": 14.41,
    "pct_mortos": 3.57,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 683,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 512,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 210,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 52,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Granizo",
    "acidentes": 13,
    "total_pessoas": 43,
    "ilesos": 23,
    "feridos_leves": 13,
    "feridos_graves": 2,
    "mortos": 0,
    "pct_ilesos": 60.53,
    "pct_feridos_leves": 34.21,
    "pct_feridos_graves": 5.26,
    "pct_mortos": 0.0,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 23,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 13,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 2,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 0,
        "color": "#dc2626"
      }
    ]
  },
  {
    "condicao": "Neve",
    "acidentes": 9,
    "total_pessoas": 16,
    "ilesos": 6,
    "feridos_leves": 6,
    "feridos_graves": 1,
    "mortos": 0,
    "pct_ilesos": 46.15,
    "pct_feridos_leves": 46.15,
    "pct_feridos_graves": 7.69,
    "pct_mortos": 0.0,
    "fatias": [
      {
        "name": "Ilesos",
        "value": 6,
        "color": "#475569"
      },
      {
        "name": "Feridos Leves",
        "value": 6,
        "color": "#eab308"
      },
      {
        "name": "Feridos Graves",
        "value": 1,
        "color": "#2563eb"
      },
      {
        "name": "Mortos",
        "value": 0,
        "color": "#dc2626"
      }
    ]
  }
];
