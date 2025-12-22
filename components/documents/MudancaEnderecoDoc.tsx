import React from 'react';
import { AddressChangeData } from '../../types';
import { formatDate } from '../../utils/parser';

interface Props {
  data: AddressChangeData;
}

export const MudancaEnderecoDoc: React.FC<Props> = ({ data }) => {
  const displayDate = formatDate(data.dataSolicitacao);

  return (
    <div className="document-page relative flex flex-col">
      {/* Header Quality System Style */}
      <table className="w-full border-collapse border border-black mb-6">
        <thead>
           <tr>
             <th className="border border-black p-2 w-1/4">
               <img 
                 src="https://placehold.co/150x60/ffffff/333333?text=LOGO" 
                 alt="Logo" 
                 className="h-10 mx-auto object-contain"
               />
             </th>
             <th className="border border-black p-2 w-2/4 text-center">
               <div className="text-sm font-bold uppercase underline mb-1">Sistema de Gestão de Qualidade</div>
               <div className="text-sm font-bold">Formulário Portal Entre</div>
               <div className="text-lg font-bold uppercase mt-1 text-black underline decoration-black">Solicitação Mudança de Endereço</div>
             </th>
             <th className="border border-black p-1 w-1/4 text-[10px] text-center font-normal">
                <div className="border-b border-black pb-1 mb-1 font-bold">Sigla/Cód</div>
                <div className="mb-1">FQ-PE-SGQ-07</div>
                <div className="border-t border-b border-black py-1 my-1 font-bold">Revisão</div>
                <div className="mb-1">01</div>
                <div className="border-t border-black pt-1 font-bold">Data</div>
                <div>05/02/2024</div>
             </th>
           </tr>
        </thead>
      </table>

      {/* Client Data Section */}
      <div className="border border-black mb-6">
         <div className="text-center font-bold border-b border-black bg-gray-100 py-1 text-sm">Dados do Cliente</div>
         <div className="text-xs p-1">
            <div className="flex border-b border-gray-300 py-1">
               <span className="font-bold w-24">Nome:</span>
               <span className="uppercase">{data.nome}</span>
            </div>
            <div className="flex border-b border-gray-300 py-1">
               <span className="font-bold w-24">CPF:</span>
               <span>{data.cpf}</span>
            </div>
            <div className="flex border-b border-gray-300 py-1">
               <span className="font-bold w-24">Login:</span>
               <span>{data.login}</span>
            </div>
            <div className="flex border-b border-gray-300 py-1">
               <span className="font-bold w-24">Ocorrência:</span>
               <span>{data.ocorrencia}</span>
            </div>
            <div className="flex py-1">
               <span className="font-bold w-24">Código:</span>
               <span>{data.codigo}</span>
            </div>
         </div>
      </div>

      {/* Old Address */}
      <div className="border-t border-black mb-6">
         <div className="text-center font-bold py-1 text-sm">Endereço Atual</div>
         <div className="text-center text-sm px-4 text-black font-medium uppercase min-h-[40px] flex items-center justify-center">
            {data.enderecoAntigo}
         </div>
         <div className="border-b border-black w-full"></div>
      </div>

      {/* New Address */}
      <div className="border-t border-black mb-8">
         <div className="text-center font-bold py-1 text-sm">Endereço Novo</div>
         <div className="text-center text-sm px-4 text-black font-medium uppercase min-h-[40px] flex items-center justify-center">
            {data.enderecoNovo}
         </div>
         <div className="border-b border-black w-full"></div>
      </div>

      {/* Table grid filler simulation (lines) */}
      <div className="flex-grow">
          <table className="w-full border-collapse border border-transparent">
             <tbody>
                {[1,2].map(i => (
                    <tr key={i}>
                        <td className="border-b border-gray-300 h-8 border-l border-r border-gray-300"></td>
                        <td className="border-b border-gray-300 h-8 border-r border-gray-300"></td>
                    </tr>
                ))}
             </tbody>
          </table>
      </div>

      {/* Declaration Box */}
      <div className="border-2 border-black p-4 text-center text-xs font-bold mb-8 mx-4">
         <p className="mb-4">
            Solicito junto a I-NEXT LOCAÇÕES E SERVIÇOS EM TECNOLOGIA DA INFORMAÇÃO LTDA e BIGDOT TELECOMUNICAÇÕES LTDA, a transferência de endereço da minha conexão de acesso à Internet, observando as informações acima.
         </p>
         <p>
            A Habilitação/Instalação está sujeita à viabilidade técnica da Rede Local e/ou infraestrutura no endereço solicitado.
         </p>
      </div>

      {/* Signatures */}
      <div className="mt-4 mb-12 text-center text-sm">
         Rio das Ostras, {displayDate}
      </div>

      <div className="flex justify-center mb-8">
         <div className="w-2/3 text-center">
            <div className="border-t border-black mb-1"></div>
            <div className="font-bold uppercase text-xs">{data.nome}</div>
         </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-[10px] leading-tight">
         <div className="font-bold">BIGDOT TELECOMUNICAÇÕES LTDA – EPP</div>
         <div>Rua Manjubinha, LT 35/40, QD II – Peixe Dourado II</div>
         <div>Barra de São João – Casimiro de Abreu -RJ</div>
         <div>CEP: 28880-000</div>
      </div>
    </div>
  );
};