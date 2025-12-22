
import React from 'react';
import { PJData } from '../../types';
import { formatDate } from '../../utils/parser';
import { PrintHeader } from './PrintHeader';

interface Props {
  data: PJData;
}

export const TermoAdesaoPJ: React.FC<Props> = ({ data }) => {
  const Field = ({ label, value, className = "" }: { label: string, value: string, className?: string }) => (
    <div className={`flex justify-between border-b border-gray-300 py-0.5 ${className}`}>
      <span className="font-bold min-w-[100px] uppercase text-[10px]">{label}</span>
      <span className="flex-grow text-left pl-2 break-all text-[10px]">{value}</span>
    </div>
  );

  // Format date from input YYYY-MM-DD or reuse simple string if manually typed
  const displayDate = formatDate(data.dataGeracao);

  return (
    <div className="document-page relative">
      <PrintHeader contrato="NOVO" title="CONTRATO DE PRESTAÇÃO DE SERVIÇOS PJ" />

      <div className="font-bold text-sm mt-2 mb-1 bg-gray-100 p-1 text-black">CONTRATANTE (PESSOA JURÍDICA)</div>
      
      <Field label="RAZÃO SOCIAL:" value={data.razaoSocial} />
      <div className="flex gap-4">
        <Field label="CNPJ:" value={data.cnpj} className="w-1/2" />
        <Field label="INSC. ESTADUAL:" value={data.inscricaoEstadual} className="w-1/2" />
      </div>
      <Field label="ENDEREÇO:" value={data.endereco} />
      <div className="flex gap-4">
        <Field label="CEP:" value={data.cep} className="w-1/2" />
        <Field label="TEL/CEL:" value={data.tel} className="w-1/2" />
      </div>

      <div className="font-bold text-sm mt-4 mb-1 bg-gray-100 p-1 text-black">DADOS DA CONTRATAÇÃO</div>

      <table className="w-full border-collapse text-xs mt-2 mb-4">
        <tbody>
           <tr className="bg-gray-50">
             <td className="border border-gray-300 p-2 font-bold w-1/3">PLANO ESCOLHIDO</td>
             <td className="border border-gray-300 p-2">{data.planoEscolha}</td>
           </tr>
           <tr>
             <td className="border border-gray-300 p-2 font-bold">VALOR MENSAL</td>
             <td className="border border-gray-300 p-2 font-bold text-lg">R$ {data.valorMensal}</td>
           </tr>
           <tr className="bg-gray-50">
             <td className="border border-gray-300 p-2 font-bold">VALOR INSTALAÇÃO</td>
             <td className="border border-gray-300 p-2">{data.valorInstalacao}</td>
           </tr>
           <tr>
             <td className="border border-gray-300 p-2 font-bold">FORMA DE PAGAMENTO</td>
             <td className="border border-gray-300 p-2">{data.formaPagamento}</td>
           </tr>
           <tr className="bg-gray-50">
             <td className="border border-gray-300 p-2 font-bold">FIDELIDADE</td>
             <td className="border border-gray-300 p-2">{data.fidelidade}</td>
           </tr>
        </tbody>
      </table>

      <div className="mt-6 text-[10px] text-justify">
        <p className="font-bold mb-2">DISPOSIÇÕES GERAIS:</p>
        <p className="mb-2">
          Pelo presente instrumento, a CONTRATADA compromete-se a fornecer os serviços de telecomunicações descritos acima, e a CONTRATANTE compromete-se a efetuar os pagamentos nas datas aprazadas.
        </p>
        <p className="mb-2">
          A CONTRATANTE declara estar ciente de que a fidelidade contratual estipulada acima implica na obrigatoriedade de permanência mínima no plano contratado pelo período indicado, sob pena de cobrança da multa rescisória proporcional ao tempo restante do contrato.
        </p>
        <p className="mb-2">
          O não pagamento das mensalidades até a data do vencimento sujeitará a CONTRATANTE ao pagamento de multa de 2% (dois por cento), juros moratórios de 1% (um por cento) ao mês e correção monetária.
        </p>
        <p className="mb-2">
           Declaro que as informações prestadas acima são verdadeiras e assumo a responsabilidade pela veracidade das mesmas.
        </p>
      </div>

      <div className="mt-16 flex justify-between gap-8 px-8">
         <div className="flex flex-col items-center justify-center w-1/2">
            <div className="border-t border-black w-full mb-1"></div>
            <div className="text-[10px] font-bold text-center">BIGDOT TELECOMUNICAÇÕES LTDA</div>
            <div className="text-[9px]">CONTRATADA</div>
         </div>
         <div className="flex flex-col items-center justify-center w-1/2">
            <div className="border-t border-black w-full mb-1"></div>
            <div className="text-[10px] font-bold text-center">{data.razaoSocial}</div>
            <div className="text-[9px]">CONTRATANTE</div>
         </div>
      </div>

      <div className="text-center mt-8 text-[10px] text-gray-500">
         Local e Data: Rio das Ostras, {displayDate}
      </div>
    </div>
  );
};
