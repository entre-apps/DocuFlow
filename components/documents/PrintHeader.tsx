import React from 'react';

interface PrintHeaderProps {
  contrato: string;
  title: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ contrato, title }) => {
  return (
    <>
      <div className="text-center mb-2">
        <img 
          src="https://placehold.co/240x80/ffffff/333333?text=LOGO+EMPRESA" 
          alt="Logo" 
          className="h-16 mx-auto object-contain"
        />
      </div>
      <div className="text-center font-bold text-sm mb-2">
        CONTRATO: {contrato}
      </div>
      <div className="text-center font-bold text-base mb-4 uppercase">
        {title}
      </div>
    </>
  );
};
