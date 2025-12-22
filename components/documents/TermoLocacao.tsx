import React from 'react';
import { ClientData } from '../../types';
import { formatDate } from '../../utils/parser';
import { PrintHeader } from './PrintHeader';

interface Props {
  data: ClientData;
}

export const TermoLocacao: React.FC<Props> = ({ data }) => {
  const Field = ({ label, value, className = "" }: { label: string, value: string, className?: string }) => (
    <div className={`flex justify-between border-b border-gray-300 py-0.5 ${className}`}>
      <span className="font-bold min-w-[80px]">{label}</span>
      <span className="flex-grow text-left pl-2 break-all">{value}</span>
    </div>
  );

  return (
    <div className="document-page relative">
      <PrintHeader contrato={data.contrato} title="TERMO DE LOCAÇÃO DE EQUIPAMENTOS" />

      <div className="font-bold text-sm mt-2 mb-1 bg-gray-100 p-1 text-black">LOCADOR</div>
      <p className="text-[10px] text-justify mb-1 leading-tight">
        <strong>I-NEXT LOCAÇÕES E SERVIÇOS EM TECNOLOGIA DA INFORMAÇÃO LTDA</strong>, empresa com sede à Rua Manjubinha, 40 , 2º ANDAR, PARTE A, Peixe Dourado II, Casimiro de Abreu – RJ – CEP: 28880-000, inscrita no CNPJ sob o nº 03.169.740/0001-44, neste ato representada pelo seu responsável legal, a seguir denominada simplesmente <strong>LOCADOR</strong>.
      </p>

      <div className="font-bold text-sm mt-1 mb-1 bg-gray-100 p-1 text-black">LOCATÁRIO</div>
      <Field label="NOME:" value={data.nome} />
      <Field label="CPF:" value={data.cpf} />
      <Field label="RESIDENTE À:" value={data.endereco} />
      {!data.isBatch && (
        <>
           <Field label="BAIRRO:" value={data.bairro} />
           <Field label="CIDADE:" value={data.cidade} />
        </>
      )}
      <p className="text-[10px] mt-1 mb-1">
        À seguir denominado(a) simplesmente de <strong>LOCATÁRIO</strong>, resolvem celebrar o presente Contrato de Aluguel:
      </p>

      <div className="font-bold text-sm mt-2 mb-1 bg-gray-100 p-1 text-black">DEFINIÇÕES</div>
      <div className="text-[9px] text-justify mb-1 leading-tight space-y-1">
        <p><strong>KIT</strong> – Conjunto de equipamentos e acessórios que compõe o sistema de recepção ótica de serviços de telecomunicações contratados pelo LOCATÁRIO ao OPERADOR;</p>
        <p><strong>OPERADOR</strong> – Empresa contratada pelo Locatário para a prestação dos serviços de telecomunicações, para o qual foi necessária a locação do KIT de recepção óptica, no caso a BIGDOT TELECOMUNICAÇÕES LTDA</p>
        <p><strong>INSTALAÇÃO</strong> – Refere-se à instalação, a ser realizada pelo OPERADOR, dos componentes do KIT no endereço designado pelo LOCATÁRIO para receber os serviços de telecomunicações do OPERADOR.</p>
      </div>

      <div className="font-bold text-xs mt-2 mb-0.5 text-black">CLÁUSULA PRIMEIRA – DO OBJETO</div>
      <p className="text-[9px] text-justify mb-1">
        1.1- O presente contrato tem como objeto o aluguel pelo LOCADOR ao LOCATÁRIO, do seguinte KIT de equipamentos e acessórios:
      </p>

      <table className="w-full border-collapse text-[9px] mb-1">
        <thead>
          <tr className="bg-gray-100 text-black font-bold">
            <th className="border border-gray-400 p-0.5 text-left w-1/4">MODELO</th>
            <th className="border border-gray-400 p-0.5 text-left w-1/4">MAC</th>
            <th className="border border-gray-400 p-0.5 text-left w-1/4">SERIAL</th>
            <th className="border border-gray-400 p-0.5 text-right w-1/4">VALOR</th>
          </tr>
        </thead>
        <tbody>
          {[
            { val: "R$ 150,00" },
            { val: "R$ 300,00" },
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

      <div className="font-bold text-xs mt-1 mb-0.5 text-black">CLÁUSULA SEGUNDA – DAS OBRIGAÇÕES DO LOCADOR</div>
      <p className="text-[9px] text-justify mb-0.5 leading-tight">
        2.1- O LOCADOR obriga-se pela substituição de qualquer componente do KIT descrito no item 1.1, sem custo, no caso de defeito ou mau funcionamento, não causado pelo mau uso ou má conservação pelo LOCATÁRIO.
      </p>
      <p className="text-[9px] text-justify mb-0.5 leading-tight">
        2.2 - No caso do defeito ou mau funcionamento ter sido causado pelo mau uso ou má conservação pelo LOCATÁRIO, o LOCADOR compromete-se a substituir o item defeituoso contra a cobrança ao LOCATÁRIO do valor de reposição do item.
      </p>

      <div className="font-bold text-xs mt-1 mb-0.5 text-black">CLÁUSULA TERCEIRA – DAS OBRIGAÇÕES DO LOCATÁRIO</div>
      <div className="text-[9px] text-justify mb-0.5 leading-tight space-y-0.5">
        <p>3.1- O LOCATÁRIO deverá conservar os equipamentos no local apropriado onde foi instalado pelo OPERADOR.</p>
        <p>3.2- O LOCATÁRIO compromete-se a viabilizar o acesso do LOCADOR, ou de pessoas por ele designadas, aos equipamentos e acessórios instalados, em data e horário previamente acordados para a manutenção, substituição ou retirada dos mesmos.</p>
        <p>3.3- O aluguel do KIT é de natureza individual, não sendo permitido ao LOCATÁRIO a cessão total ou parcial dos mesmos, a qualquer título que seja, sem o prévio e formal consentimento do LOCADOR.</p>
        <p>3.4- O LOCATÁRIO compromete-se a devolver os componentes do KIT, constantes do item 1.1 acima, ao término deste contrato. Caso não realize a devolução total ou parcial do KIT em até 5 dias do término deste contrato, o LOCATÁRIO concorda desde já em pagar o custo de reposição dos itens não devolvidos, pelos preços estabelecidos no item 1.1 deste contrato.</p>
        <p>3.4.1- No caso de ser solicitado pelo LOCATÁRIO que seja cobrado valor de mercado do momento, o LOCADOR apresentará, junto com a cobrança, cópia de propostas recentes de fornecedores idôneos e capacitados, de forma a comprovar o valor de mercado.</p>
        <p>3.4.2- A cobrança do custo de reposição dos itens não devolvidos será feita pelo LOCADOR através do envio de boleto bancário ao LOCATÁRIO, com vencimento em até 5 dias após sua emissão.</p>
        <p>3.4.3- A não devolução de componentes do KIT e o não pagamento da cobrança, na forma estabelecida nos itens 3.4, 3.4.1 e 3.4.2 acima, poderá ensejar a negativação do nome do LOCATÁRIO em órgãos de proteção ao crédito bem como a cobrança judicial dos valores não pagos com acréscimo de 20% para cobrir custos advocatícios de cobrança.</p>
      </div>

      <div className="font-bold text-xs mt-1 mb-0.5 text-black">CLÁUSULA QUARTA – DOS PREÇOS E CONDIÇÕES DE PAGAMENTO</div>
      <div className="text-[9px] text-justify mb-0.5 leading-tight space-y-0.5">
        <p>4.1- O aluguel será pago por mês vencido, e será cobrado diretamente pelo LOCADOR, podendo também ser pelo OPERADOR juntamente com a sua cobrança pelos serviços de telecomunicação prestados ao LOCATÁRIO.</p>
        <p>4.2- O valor do aluguel dos equipamentos poderá ser reajustado anualmente, com base na variação do IGP-M divulgado pela FGV.</p>
        <p>4.3- A falta de pagamento do aluguel pelo LOCATÁRIO por mais de 15 dias após o seu vencimento, poderá, a critério do LOCADOR, ensejar o encerramento deste contrato de locação.</p>
        <p>4.4- O não pagamento dos aluguéis até a data do vencimento ensejará a aplicação de multa moratória de 2% (dois por cento) e juros de 1% (um por cento) ao mês sobre o valor do débito.</p>
      </div>

      <div className="font-bold text-xs mt-1 mb-0.5 text-black">CLÁUSULA QUINTA – DO PRAZO DE VIGÊNCIA E DA RESCISÃO</div>
      <div className="text-[9px] text-justify mb-0.5 leading-tight space-y-0.5">
        <p>5.1- O prazo de vigência deste Contrato é por tempo indeterminado, podendo ser denunciado pelo LOCATÁRIO, a qualquer tempo, sem ônus para as partes, através de simples comunicação formal ao OPERADOR ou diretamente ao LOCADOR.</p>
        <p>5.2- A rescisão só será acatada e efetivada após a entrega pelo LOCATÁRIO ao Locador dos itens componentes do KIT ou pelo ressarcimento do custo de reposição de itens não devolvidos, na forma estabelecida no item 3.4 e subitens, da Cláusula Terceira.</p>
      </div>

      <div className="font-bold text-xs mt-1 mb-0.5 text-black">CLÁUSULA SEXTA- DO FORO</div>
      <p className="text-[9px] text-justify mb-1 leading-tight">
        6.1 - As Partes elegem o foro da Comarca do Município de Rio das Ostras, como o único competente para dirimir eventuais questões resultantes da interpretação ou execução do presente Contrato, com renúncia a qualquer outro, por mais privilegiado que seja.
      </p>
      
      <p className="text-[9px] text-center mt-1 font-bold">
        Estando as partes acordadas nos termos das cláusulas acima, assinam o presente contrato em 2 vias de igual forma e teor.
      </p>

      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="border-t border-black w-64 mb-1"></div>
        <div className="text-xs font-bold">{data.nome}</div>
        <div className="text-[10px]">LOCATÁRIO</div>
      </div>

      <div className="text-center mt-2 text-[10px] text-gray-500">
         Data da Instalação: {formatDate(data.dataInstalacao)}
      </div>
    </div>
  );
};