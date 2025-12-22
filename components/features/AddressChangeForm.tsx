import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AddressChangeData } from '../../types';
import { parseAddressChangeText } from '../../utils/parser';
import { MapPin, Printer, ClipboardPaste, ArrowRightLeft } from 'lucide-react';

interface Props {
  onGenerate: (data: AddressChangeData) => void;
}

export const AddressChangeForm: React.FC<Props> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<AddressChangeData>({
    nome: '',
    cpf: '',
    login: '',
    ocorrencia: '',
    codigo: '',
    enderecoAntigo: '',
    enderecoNovo: '',
    dataSolicitacao: new Date().toISOString().split('T')[0]
  });

  const [inputText, setInputText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleParse = () => {
    if (!inputText.trim()) {
        alert("Cole o texto do atendimento.");
        return;
    }
    const parsed = parseAddressChangeText(inputText);
    setFormData(prev => ({
        ...prev,
        enderecoAntigo: parsed.enderecoAntigo || prev.enderecoAntigo,
        enderecoNovo: parsed.enderecoNovo || prev.enderecoNovo
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const CardHeader = ({ title, icon: Icon }: { title: string, icon?: React.ElementType }) => (
    <div className="bg-[#9D4EDD] p-4 rounded-t-lg flex items-center gap-2">
       {Icon && <Icon className="w-5 h-5 text-[#FF9000]" />}
       <h3 className="text-lg font-bold text-white">
          {title}
       </h3>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
        <div className="space-y-4">
            <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
                <CardHeader title="1. Texto do Atendimento" icon={ClipboardPaste} />
                <div className="p-5 space-y-3">
                    <p className="text-xs text-gray-600 mb-2">Cole o bloco de texto contendo "Endereço antigo" e "Endereço novo".</p>
                    <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md font-mono text-xs text-gray-900 h-48 focus:outline-none focus:ring-2 focus:ring-[#5A189A]"
                        placeholder="Endereço antigo: ...&#10;Endereço novo: ..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                    />
                    <Button onClick={handleParse} variant="secondary" className="w-full">
                        Extrair Endereços
                    </Button>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
                <h4 className="font-bold text-black mb-2 flex items-center gap-2"><MapPin className="w-4 h-4"/> Instruções</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Cole o texto do CRM e clique em extrair.</li>
                    <li>Preencha manualmente Nome, CPF, Login, Ocorrência e Código.</li>
                    <li>Verifique se os endereços foram preenchidos corretamente.</li>
                </ul>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
                <CardHeader title="2. Dados da Solicitação" icon={ArrowRightLeft} />
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input id="nome" label="Nome Completo" value={formData.nome} onChange={handleChange} required className="md:col-span-2" />
                    <Input id="cpf" label="CPF" value={formData.cpf} onChange={handleChange} />
                    <Input id="login" label="Login" value={formData.login} onChange={handleChange} />
                    <Input id="ocorrencia" label="Ocorrência" value={formData.ocorrencia} onChange={handleChange} />
                    <Input id="codigo" label="Código Cliente" value={formData.codigo} onChange={handleChange} />
                    
                    <div className="md:col-span-2 border-t border-gray-300 my-2 pt-2"></div>
                    
                    <Input id="enderecoAntigo" label="Endereço Antigo" value={formData.enderecoAntigo} onChange={handleChange} required className="md:col-span-2" />
                    <Input id="enderecoNovo" label="Endereço Novo" value={formData.enderecoNovo} onChange={handleChange} required className="md:col-span-2" />
                    
                    <Input id="dataSolicitacao" label="Data do Documento" type="date" value={formData.dataSolicitacao} onChange={handleChange} />
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit">
                    <Printer className="w-4 h-4 text-[#FF9000]" />
                    Gerar Mudança
                </Button>
            </div>
        </form>
    </div>
  );
};