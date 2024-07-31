'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
import { AiOutlineCopy } from "react-icons/ai";

const HoraExtenso: React.FC = () => {
    const [horaCompleta, setHoraCompleta] = useState<string>("");
    const [horaExtenso, setHoraExtenso] = useState<string>("");

    const handleCopyClick = () => {
        console.log("Texto a ser copiado:", horaExtenso);
        navigator.clipboard.writeText(horaExtenso);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHoraCompleta(event.target.value);
    };

    const handleFormSubmit = (event: FormEvent) => {
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
        const minutoPorExtenso = minutoInt !== 0 ? ` e ${tempoPorExtenso(minutoInt, "minuto")}` : '';

        setHoraExtenso(
            `${capitalizeFirstLetter(horaPorExtenso)}${minutoPorExtenso}`
        );
    };

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const tempoPorExtenso = (n: number, tipo: "hora" | "minuto"): string => {
        const parte = [
            'zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
            'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
        ];

        const dezena = [
            '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
        ];

        const centena = [
            '', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos',
            'oitocentos', 'novecentos'
        ];

        let extenso = '';

        if (n < 20) {
            extenso = parte[n];
        } else if (n < 100) {
            const dez = Math.floor(n / 10);
            const unid = n % 10;
            extenso = dezena[dez];
            if (unid !== 0) {
                extenso += ` e ${parte[unid]}`;
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
            if (n === 1) {
                extenso = "uma hora";
            } else {
                extenso += ' horas';
            }
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
                    <p className="text-center border rounded-xl flex flex-1 p-2 pl-5 pr-5 items-center justify-between border-gray-300 text-gray-800">
                        {horaExtenso}
                        <button
                            className="ml-2 focus:outline-none border border-green-600 rounded-md p-1"
                            onClick={handleCopyClick}
                            title="Clique para copiar..."
                        >
                            <AiOutlineCopy className="text-green-700 hover:text-green-600 transition-colors" size={20} />
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default HoraExtenso;
