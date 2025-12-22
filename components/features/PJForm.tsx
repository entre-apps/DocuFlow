
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { PJData } from '../../types';
import { Printer, Building2, MapPin, CreditCard } from 'lucide-react';

interface Props {
  onGenerate: (data: PJData) => void;
}

export const PJForm: React.FC<Props> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<PJData>({
    origemContato: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    endereco: '',
    cep: '',
    referencia: '',
    localizacao: '',
    caixaPorta: '',
    socioTitular: '',
    dataNascimento: '',
    rg: '',
    cpf: '',
    tel: '',
    email: '',
    vencimento: '',
    planoEscolha: '',
    valorMensal: '',
    valorInstalacao: '',
    formaPagamento: '',
    fidelidade: '',
    multaRescisoria: '',
    dataGeracao: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.razaoSocial || !formData.cnpj) {
      alert("Razão Social e CNPJ são obrigatórios.");
      return;
    }
    onGenerate(formData);
  };

  const CardHeader = ({ title, icon: Icon }: { title: string, icon?: React.ElementType }) => (
    <div className="bg-[#9D4EDD] p-4 rounded-t-lg flex items-center gap-2">
       {Icon && <Icon className="w-5 h-5 text-[#FF9000]" />}
       <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="Dados da Empresa" icon={Building2} />
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="razaoSocial" label="Razão Social" value={formData.razaoSocial} onChange={handleChange} required className="md:col-span-2" />
            <Input id="cnpj" label="CNPJ" value={formData.cnpj} onChange={handleChange} required />
            <Input id="inscricaoEstadual" label="Inscrição Estadual" value={formData.inscricaoEstadual} onChange={handleChange} />
            <Input id="tel" label="Telefone / Celular" value={formData.tel} onChange={handleChange} />
          </div>
        </div>

        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="Endereço" icon={MapPin} />
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="endereco" label="Endereço Completo" value={formData.endereco} onChange={handleChange} className="md:col-span-2" />
            <Input id="cep" label="CEP" value={formData.cep} onChange={handleChange} />
          </div>
        </div>

        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="Financeiro e Contrato" icon={CreditCard} />
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="planoEscolha" label="Plano Escolhido" value={formData.planoEscolha} onChange={handleChange} className="md:col-span-2" />
            <Input id="valorMensal" label="Valor Mensal (R$)" value={formData.valorMensal} onChange={handleChange} required />
            <Input id="valorInstalacao" label="Valor Instalação" value={formData.valorInstalacao} onChange={handleChange} />
            <Input id="formaPagamento" label="Forma de Pagamento" value={formData.formaPagamento} onChange={handleChange} />
            <Input id="fidelidade" label="Fidelidade" value={formData.fidelidade} onChange={handleChange} />
            <Input id="dataGeracao" label="Data do Documento" type="date" value={formData.dataGeracao} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">
            <Printer className="w-4 h-4 text-[#FF9000]" />
            Gerar Documentos PJ
          </Button>
        </div>
      </form>
    </div>
  );
};
