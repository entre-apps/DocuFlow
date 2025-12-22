
import React from 'react';
import { PJData } from '../../types';
import { formatDate } from '../../utils/parser';
import { PrintHeader } from './PrintHeader';

interface Props {
  data: PJData;
}

export const TermoLocacaoPJ: React.FC<Props> = ({ data }) => {
  const displayDate = formatDate(data.dataGeracao);
  
  const Field = ({ label, value, className = "" }: { label: string, value: string, className?: string }) => (
    <div className={`flex justify-between border-b border-gray-300 py-0.5 ${className}`}>
      <span className="font-bold min-w-[80px] text-[10px] uppercase">{label}</span>
      <span className="flex-grow text-left pl-2 break-all text-[10px]">{value}</span>
    </div>
  );

  return (
    <div className="document-page relative">
      <PrintHeader contrato="NOVO" title="TERMO DE LOCAÇÃO DE EQUIPAMENTOS (PJ)" />

      <div className="font-bold text-sm mt-2 mb-1 bg-gray-100 p-1 text-black">LOCADOR</div>
      <p className="text-[10px] text-justify mb-1 leading-tight">
        <strong>I-NEXT LOCAÇÕES E SERVIÇOS EM TECNOLOGIA DA INFORMAÇÃO LTDA</strong>, CNPJ 03.169.740/0001-44, neste ato representada pelo seu responsável legal, a seguir denominada simplesmente <strong>LOCADOR</strong>.
      </p>

      <div className="font-bold text-sm mt-1 mb-1 bg-gray-100 p-1 text-black">LOCATÁRIA (PESSOA JURÍDICA)</div>
      <Field label="RAZÃO SOCIAL:" value={data.razaoSocial} />
      <Field label="CNPJ:" value={data.cnpj} />
      <Field label="ENDEREÇO:" value={data.endereco} />

      <div className="font-bold text-sm mt-2 mb-1 bg-gray-100 p-1 text-black">EQUIPAMENTOS LOCADOS</div>
      <p className="text-[9px] text-justify mb-1">
        O presente contrato tem como objeto a locação dos equipamentos descritos abaixo, necessários para a prestação do serviço de telecomunicações contratado:
      </p>

      <table className="w-full border-collapse text-[9px] mb-1">
        <thead>
          <tr className="bg-gray-100 text-black font-bold">
            <th className="border border-gray-400 p-0.5 text-left w-1/4">MODELO</th>
            <th className="border border-gray-400 p-0.5 text-left w-1/4">MAC</th>
            <th className="border border-gray-400 p-0.5 text-left w-1/4">SERIAL</th>
            <th className="border border-gray-400 p-0.5 text-right w-1/4">VALOR REPOSIÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {[
            { val: "R$ 300,00" },
            { val: "R$ 450,00" },
            { val: "R$ 300,00" }
          ].map((item, idx) => (
            <tr key={idx} className="text-black">
              <td className="border border-gray-400 p-1 font-bold h-6"></td>
              <td className="border border-gray-400 p-1"></td>
              <td className="border border-gray-400 p-1"></td>
              <td className="border border-gray-400 p-1 text-right">{item.val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="font-bold text-xs mt-4 mb-0.5 text-black">CLÁUSULA PRIMEIRA – DA RESPONSABILIDADE</div>
      <p className="text-[9px] text-justify mb-0.5 leading-tight">
        A LOCATÁRIA declara ter recebido os equipamentos em perfeito estado de funcionamento e se responsabiliza pela sua guarda e conservação, obrigando-se a devolvê-los ao término do contrato nas mesmas condições em que os recebeu, ressalvado o desgaste natural pelo uso.
      </p>

      <div className="font-bold text-xs mt-2 mb-0.5 text-black">CLÁUSULA SEGUNDA – DA DEVOLUÇÃO</div>
      <p className="text-[9px] text-justify mb-0.5 leading-tight">
        Em caso de rescisão do contrato de prestação de serviços, a LOCATÁRIA deverá devolver os equipamentos no prazo máximo de 5 (cinco) dias úteis. A não devolução implicará na cobrança dos valores de reposição descritos acima, acrescidos de multa e juros legais, autorizando-se desde já a emissão de boleto bancário para cobrança.
      </p>

      <div className="font-bold text-xs mt-2 mb-0.5 text-black">CLÁUSULA TERCEIRA – DO VALOR DO ALUGUEL</div>
      <p className="text-[9px] text-justify mb-0.5 leading-tight">
        O valor da locação dos equipamentos está incluído no valor mensal do plano de serviços contratado ("Comodato"), salvo disposição em contrário.
      </p>
      
      <div className="mt-12 flex justify-between gap-8 px-8">
         <div className="flex flex-col items-center justify-center w-1/2">
            <div className="border-t border-black w-full mb-1"></div>
            <div className="text-[10px] font-bold text-center">LOCADOR</div>
            <div className="text-[9px]">I-NEXT LOCAÇÕES</div>
         </div>
         <div className="flex flex-col items-center justify-center w-1/2">
            <div className="border-t border-black w-full mb-1"></div>
            <div className="text-[10px] font-bold text-center">{data.razaoSocial}</div>
            <div className="text-[9px]">LOCATÁRIA</div>
         </div>
      </div>

      <div className="text-center mt-4 text-[10px] text-gray-500">
         Rio das Ostras, {displayDate}
      </div>
    </div>
  );
};
