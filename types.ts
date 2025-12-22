
export interface ServiceItem {
  un: number;
  desc: string;
  emp: string;
  val: number;
}

export interface InternetPlan {
  id: string;
  name: string;
  total: number;
  promoPrice?: number;
  promoText?: string;
  services: ServiceItem[];
}

export interface TVPlan {
  id: string;
  name: string;
  label: string; // Display name like "Essential (R$ 15,00)"
  price: number;
}

export interface TVAddon {
  id: string;
  name: string;
  price: number;
}

export interface PlayhubApp {
  id: string;
  name: string;
  tier: string;
  category: string;
  details: string;
  price: number;
  comboPrice: number;
}

export interface ClientData {
  // Personal
  contrato: string;
  nome: string;
  rg: string;
  cpf: string;
  tel1: string;
  email: string;
  
  // Address
  endereco: string;
  bairro: string;
  cidade: string;
  
  // Geo (mainly for OS)
  referencia?: string;
  localizacao?: string;

  // Service
  planoInternet: string; // Key from PLAN_DETAILS
  planoTV: string; // Key from TV_PLANS
  adicionais: string[]; // Array of keys from TV_ADDONS (legacy/removed from UI but kept for type safety)
  apps: string[]; // Array of Playhub App IDs
  
  // Financial / Install
  valorInstalacao: string;
  formaPagamento: string;
  dataInstalacao: string; // YYYY-MM-DD

  // Meta
  isBatch?: boolean;
}

export interface PJData {
  // Origem
  origemContato: string;
  
  // Empresa
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  
  // Endereço
  endereco: string;
  cep: string;
  referencia: string;
  localizacao: string;
  
  // Técnico
  caixaPorta: string;
  
  // Sócio / Representante
  socioTitular: string;
  dataNascimento: string;
  rg: string;
  cpf: string;
  tel: string;
  email: string;
  
  // Financeiro / Contrato
  vencimento: string;
  planoEscolha: string;
  valorMensal: string; // Texto livre pois PJ pode ter valor negociado
  valorInstalacao: string;
  formaPagamento: string;
  fidelidade: string;
  multaRescisoria: string;
  
  // Meta
  dataGeracao: string; // Data atual para o documento
}

export interface OSData {
  contrato: string;
  login: string;
  oco: string;
  periodo: string;
  nome: string;
  referencia: string;
  localizacao: string;
  formaPagamento: string;
}

export interface AddressChangeData {
  nome: string;
  cpf: string;
  login: string;
  ocorrencia: string;
  codigo: string;
  enderecoAntigo: string;
  enderecoNovo: string;
  dataSolicitacao: string;
}