import React, { useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

const HoraExtenso = () => {
  const [horaCompleta, setHoraCompleta] = useState("");
  const [horaExtenso, setHoraExtenso] = useState("");

  const handleCopyClick = () => {
    console.log("Texto a ser copiado:", horaExtenso);
    navigator.clipboard.writeText(horaExtenso);
    //alert("Texto copiado para a área de transferência!");
  };

  const handleInputChange = (event) => {
    setHoraCompleta(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const [hora, minuto] = horaCompleta.split(":");
    const horaInt = parseInt(hora, 10);
    const minutoInt = parseInt(minuto, 10);

    if (
      isNaN(horaInt) ||
      horaInt < 0 ||
      isNaN(minutoInt) ||
      minutoInt < 0 ||
      minutoInt > 59
    ) {
      alert("Digite uma hora válida no formato HH:MM.");
      return;
    }

    const horaPorExtenso = tempoPorExtenso(horaInt, "hora");

    // Adiciona a parte dos minutos apenas se os minutos não forem zero
    const minutoPorExtenso = minutoInt !== 0 ? ` e ${tempoPorExtenso(minutoInt, "minuto")}` : '';

    setHoraExtenso(
      `${capitalizeFirstLetter(horaPorExtenso)}${minutoPorExtenso}`
    );
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const tempoPorExtenso = (n, tipo) => {
    const parte = [
        'zero', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
        'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
    ];

    const dezena = [
        '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
    ];

    const centena = [
        '', 'cento', 'duzentas', 'trezentas', 'quatrocentas', 'quinhentas', 'seiscentas', 'setecentas',
        'oitocentas', 'novecentas'
    ];

    let extenso = '';

    if (n < 20) {
        extenso = parte[n];
    } else if (n < 100) {
        const dez = Math.floor(n / 10);
        const unid = n % 10;
        extenso = dezena[dez];
        if (unid !== 0) {
            extenso += unid !== 1 ? ` e ${parte[unid]}` : ` e ${parte[unid]}`;
        }
    } else {
        const cent = Math.floor(n / 100);
        const dez = Math.floor((n % 100) / 10);
        const unid = n % 10;
        extenso = centena[cent];
        if (dez < 2) {
            extenso += ` e ${parte[n % 100]}`;
        } else {
            extenso += ` e ${dezena[dez]}`;
            if (unid !== 0) {
                extenso += ` e ${parte[unid]}`;
            }
        }
    }

    if (tipo === 'hora') {
        extenso += n === 1 ? ' hora' : ' horas';
    }

    if (tipo === 'minuto' && n !== 0) {
        extenso += n === 1 ? ' minuto' : ' minutos';
    }

    return extenso.trim();
};


  return (
    <div className="container mx-auto max-w-md min-h-[91vh] py-20">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="horaInput"
            className="block text-gray-700 items-center text-sm font-semibold mb-2"
          >
            Digite a hora (HH:MM):
          </label>
          <input
            type="text"
            id="horaInput"
            className="whitespace-nowrap bg-gray-100 border border-blue-300 text-gray-900 items-center text-center text-sm rounded-lg focus:ring-blue-500 focus:border-gray-400 block w-full p-2.5"
            placeholder="Insira a hora desejada..."
            required
            value={horaCompleta}
            onChange={handleInputChange}
          />

        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-800 transition-all hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Gerar Tempo por Extenso
          </button>
        </div>
      </form>
      {horaExtenso && (
        <div className="mt-8">
          <p className="text-center font-bold">Resultado por extenso:</p>
          <p className="text-center">
            {horaExtenso}
            <button
              className="ml-2 focus:outline-none"
              onClick={handleCopyClick}
              title="Clique para copiar..."
            >
              <div className="text-green-700 hover:text-green-600 transition-all hover:scale-150">
                <AiOutlineCopy size={20} />
              </div>
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default HoraExtenso;
