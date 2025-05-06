'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

const horas = [
  '', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
  'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
];

const minutos = [
  '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
  'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
];

const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta'];

function numeroPorExtenso(n: number, isMinuto: boolean): string {
  if (n === 1) return isMinuto ? 'um' : 'uma';
  if (n === 2) return isMinuto ? 'dois' : 'duas';

  if (n < 20) return isMinuto ? minutos[n] : horas[n];

  const dez = Math.floor(n / 10);
  const unid = n % 10;
  let resultado = dezenas[dez];

  if (unid > 0) {
    resultado += ` e ${isMinuto ? minutos[unid] : horas[unid]}`;
  }

  return resultado;
}

function construirHoraPorExtenso(hora: number, minuto: number): string {
	if (hora === 0 && minuto === 0) return 'Zero hora';
	if (hora === 0 && minuto === 1) return 'Um minuto';
	if (hora === 0) return `${numeroPorExtenso(minuto, true)} minutos`;
	if (minuto === 0) return `${numeroPorExtenso(hora, false)} ${hora === 1 ? 'hora' : 'horas'}`;
  
	return `${numeroPorExtenso(hora, false)} ${hora === 1 ? 'hora' : 'horas'} e ${numeroPorExtenso(minuto, true)} ${minuto === 1 ? 'minuto' : 'minutos'}`;
  }

function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const HoraExtenso: React.FC = () => {
  const [horaCompleta, setHoraCompleta] = useState('');
  const [horaExtenso, setHoraExtenso] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHoraCompleta(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!/^\d{2}:\d{2}$/.test(horaCompleta)) {
      alert('Formato inválido. Use HH:MM.');
      return;
    }

    const [horaStr, minutoStr] = horaCompleta.split(':');
    const hora = parseInt(horaStr, 10);
    const minuto = parseInt(minutoStr, 10);

    if (isNaN(hora) || isNaN(minuto) || hora < 0 || hora > 23 || minuto < 0 || minuto > 59) {
      alert('Digite uma hora válida entre 00:00 e 23:59.');
      return;
    }

    const texto = capitalizeFirstLetter(construirHoraPorExtenso(hora, minuto));
    setHoraExtenso(texto);
  };

  const handleCopyClick = () => {
    if (!horaExtenso) return;
    navigator.clipboard.writeText(horaExtenso).then(() => {
      console.log('Texto copiado:', horaExtenso);
    }).catch(err => console.error('Erro ao copiar:', err));
  };

  return (
    <div className='container mx-auto max-w-md h-screen py-20'>
      <form onSubmit={handleFormSubmit}>
        <div className='mb-4'>
          <label htmlFor='horaInput' className='block text-gray-700 text-sm font-semibold mb-2'>
            Digite a hora (HH:MM):
          </label>
          <input
            type='text'
            id='horaInput'
            placeholder='Insira a hora desejada...'
            required
            value={horaCompleta}
            onChange={handleInputChange}
            className='bg-gray-100 border border-blue-300 text-gray-900 text-center text-sm rounded-lg focus:ring-blue-500 focus:border-gray-400 block w-full p-2.5'
          />
        </div>
        <div className='flex justify-center'>
          <button type='submit' className='bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all'>
            Gerar Tempo por Extenso
          </button>
        </div>
      </form>

      {horaExtenso && (
        <div className='mt-8'>
          <p className='text-center font-bold'>Resultado por extenso:</p>
          <p className='text-center border rounded-xl flex flex-1 p-2 pl-5 pr-5 items-center justify-between border-gray-300 text-gray-800'>
            {horaExtenso}
            <button
              className='ml-2 focus:outline-none border border-green-600 rounded-md p-1'
              onClick={handleCopyClick}
              title='Clique para copiar...'
            >
              <span className='text-green-700 hover:text-green-600 transition-colors'>
                <AiOutlineCopy size={20} />
              </span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default HoraExtenso;