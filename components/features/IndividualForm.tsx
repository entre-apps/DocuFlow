
import React, { useState, useMemo } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ClientData, PlayhubApp } from '../../types';
import { PLAN_DETAILS, TV_PLANS, PLAYHUB_APPS } from '../../constants';
import { Printer, FileText, Check, PlayCircle, Search, MapPin } from 'lucide-react';

interface Props {
  onGenerate: (data: ClientData) => void;
}

export const IndividualForm: React.FC<Props> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<ClientData>({
    contrato: '',
    nome: '',
    rg: '',
    cpf: '',
    tel1: '',
    email: '',
    endereco: '',
    bairro: '',
    cidade: '',
    planoInternet: 'nenhum',
    planoTV: 'Nenhum',
    adicionais: [],
    apps: [],
    valorInstalacao: '',
    formaPagamento: '',
    dataInstalacao: '',
    isBatch: false
  });

  const [appSearch, setAppSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const toggleApp = (appId: string) => {
    setFormData(prev => {
      const apps = prev.apps.includes(appId) 
        ? prev.apps.filter(id => id !== appId)
        : [...prev.apps, appId];
      return { ...prev, apps };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.planoInternet === 'nenhum') {
      alert("Selecione um plano de internet");
      return;
    }
    onGenerate(formData);
  };

  const appsByCategory = useMemo(() => {
    const groups: Record<string, PlayhubApp[]> = {};
    PLAYHUB_APPS
      .filter(app => app.name.toLowerCase().includes(appSearch.toLowerCase()))
      .forEach(app => {
        if (!groups[app.category]) groups[app.category] = [];
        groups[app.category].push(app);
      });
    return groups;
  }, [appSearch]);

  const isComboEligible = formData.planoInternet.includes("800") || formData.planoInternet.includes("920");

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
          <CardHeader title="Dados do Cliente" icon={FileText} />
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="contrato" label="Nº Contrato" value={formData.contrato} onChange={handleChange} required placeholder="Ex: 45530000" />
            <Input id="nome" label="Nome Completo" value={formData.nome} onChange={handleChange} required className="md:col-span-2" />
            <Input id="rg" label="RG" value={formData.rg} onChange={handleChange} />
            <Input id="cpf" label="CPF" value={formData.cpf} onChange={handleChange} required />
            <Input id="tel1" label="Telefone" value={formData.tel1} onChange={handleChange} />
            <Input id="email" label="E-mail" type="email" value={formData.email} onChange={handleChange} className="md:col-span-2" />
          </div>
        </div>

        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="Endereço" icon={MapPin} />
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="endereco" label="Rua e Número" value={formData.endereco} onChange={handleChange} className="md:col-span-2" />
            <Input id="bairro" label="Bairro" value={formData.bairro} onChange={handleChange} />
            <Select 
              id="cidade" 
              label="Cidade" 
              value={formData.cidade} 
              onChange={handleChange}
              options={[
                { value: "", label: "Selecione..." },
                { value: "Rio das Ostras", label: "Rio das Ostras" },
                { value: "Casimiro de Abreu", label: "Casimiro de Abreu" },
                { value: "Cabo Frio", label: "Cabo Frio" }
              ]}
            />
          </div>
        </div>

        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="Planos e Serviços" />
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select 
              id="planoInternet" 
              label="Plano de Internet" 
              value={formData.planoInternet} 
              onChange={handleChange}
              options={[
                { value: "nenhum", label: "Selecione..." },
                ...Object.values(PLAN_DETAILS).map(p => ({ value: p.id, label: `${p.name} (R$ ${p.total.toFixed(2)})` }))
              ]}
            />
            <Select 
              id="planoTV" 
              label="Plano de TV" 
              value={formData.planoTV} 
              onChange={handleChange}
              options={Object.values(TV_PLANS).map(p => ({ value: p.id, label: p.label }))}
            />
          </div>
        </div>

        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="Apps Playhub" icon={PlayCircle} />
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
               <p className="text-sm text-gray-600">
                  Selecione os aplicativos incluídos no pacote. 
                  {isComboEligible && <span className="text-black font-bold ml-1"> (Preço Combo aplicado)</span>}
               </p>
               <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar app..." 
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5A189A]"
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                  />
               </div>
            </div>

            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(appsByCategory).map(([category, apps]) => (
                <div key={category}>
                  <h4 className="text-sm font-bold text-black uppercase border-b border-[#9D4EDD] mb-3 pb-1">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {apps.map(app => {
                      const isSelected = formData.apps.includes(app.id);
                      const priceToDisplay = isComboEligible ? app.comboPrice : app.price;
                      return (
                        <div 
                          key={app.id}
                          onClick={() => toggleApp(app.id)}
                          className={`cursor-pointer border rounded-lg p-3 transition-all flex items-start gap-3 ${
                            isSelected ? 'bg-[#5A189A] border-[#5A189A] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-[#9D4EDD]'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${isSelected ? 'bg-white' : 'bg-white'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#5A189A]" />}
                          </div>
                          <div>
                            <div className="font-bold text-sm leading-tight">{app.name}</div>
                            <div className="text-xs mt-1 font-medium">R$ {priceToDisplay.toFixed(2).replace('.',',')}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="Financeiro" />
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select 
              id="valorInstalacao" 
              label="Valor Instalação" 
              value={formData.valorInstalacao} 
              onChange={handleChange}
              options={[
                { value: "", label: "Selecione..." },
                { value: "Gratuita", label: "Gratuita" },
                { value: "R$140,00", label: "R$140,00" },
                { value: "R$500,00", label: "R$500,00" }
              ]}
            />
            <Select 
              id="formaPagamento" 
              label="Forma de Pagamento" 
              value={formData.formaPagamento} 
              onChange={handleChange}
              options={[
                { value: "", label: "Selecione..." },
                { value: "PIX", label: "PIX" },
                { value: "Cartão de Débito", label: "Cartão de Débito" },
                { value: "Cartão de Crédito", label: "Cartão de Crédito" }
              ]}
            />
            <Input id="dataInstalacao" label="Data da Instalação" type="date" value={formData.dataInstalacao} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">
            <Printer className="w-4 h-4 text-[#FF9000]" />
            Gerar Documentos
          </Button>
        </div>
      </form>
    </div>
  );
};
