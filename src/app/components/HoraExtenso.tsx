'use client'
import React, { ChangeEvent, FormEvent, Component } from "react";
import { AiOutlineCopy } from "react-icons/ai";

interface State {
    horaCompleta: string;
    horaExtenso: string;
}

class HoraExtenso extends Component<{}, State> {
    private objHora: string[] = [
        '', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
        'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
    ];

    private objMinuto: string[] = [
        '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
        'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
    ];

    private dezena: string[] = [
        '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
    ];

    private centena: string[] = [
        '', 'cento', 'duzentas', 'trezentas', 'quatrocentas', 'quinhentas', 'seiscentas', 'setecentas',
        'oitocentas', 'novecentas'
    ];

    constructor(props: {}) {
        super(props);
        this.state = {
            horaCompleta: '',
            horaExtenso: ''
        };
    }

    handleCopyClick = () => {
        console.log("Texto a ser copiado:", this.state.horaExtenso);
        navigator.clipboard.writeText(this.state.horaExtenso);
    };

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ horaCompleta: event.target.value });
    };

    handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        const [hora, minuto] = this.state.horaCompleta.split(":");
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

        const horaPorExtenso = this.construirHoraPorExtenso(horaInt);
        const minutoPorExtenso = this.construirMinutoPorExtenso(minutoInt);

        this.setState({
            horaExtenso: this.capitalizeFirstLetter(
                `${horaPorExtenso}${minutoPorExtenso ? ` e ${minutoPorExtenso}` : ''}`
            )
        });
    };
    private construirMinutoPorExtenso = (minuto: number): string => {
        if (minuto === 0) return "";
        if (minuto === 1) return "um minuto";

        return `${this.numeroPorExtenso(minuto, true)} minutos`;
    };

    /*private construirHoraPorExtenso = (hora: number): string => {
        if (hora === 0) return "Zero horas";

        const horaExtenso = this.numeroPorExtenso(hora, false);

        if (horaExtenso.endsWith("um")) {
            return `${horaExtenso.replace("um", "uma")} hora`;
        } else if (horaExtenso.endsWith("dois")) {
            return `${horaExtenso.replace("dois", "duas")} horas`;
        } else {
            return `${horaExtenso} horas`;
        }
    };*/

    private construirHoraPorExtenso = (hora: number): string => {
        if (hora === 0) return "Zero horas";
    
        let horaExtenso = this.numeroPorExtenso(hora, false);
    
        if (hora === 1) {
            return "Uma hora";
        } else if (hora === 2) {
            return "Duas horas";
        } else {
            return `${horaExtenso} horas`;
        }
    };

    private numeroPorExtenso = (n: number, isMinuto: boolean): string => {
        let extenso = '';

        if (n < 20) {
            extenso = isMinuto ? this.objMinuto[n] : this.objHora[n];
        } else if (n < 100) {
            const dez = Math.floor(n / 10);
            const unid = n % 10;
            extenso = this.dezena[dez];
            if (unid !== 0) {
                extenso += ` e ${isMinuto ? this.objMinuto[unid] : this.objHora[unid]}`;
            }
        } else if (n < 1000) {
            const cent = Math.floor(n / 100);
            const resto = n % 100;

            if (n === 100) {
                extenso = "cem";
            } else {
                extenso = this.centena[cent];
                if (resto > 0) {
                    if (resto < 20) {
                        extenso += ` e ${isMinuto ? this.objMinuto[resto] : this.objHora[resto]}`;
                    } else {
                        const dez = Math.floor(resto / 10);
                        const unid = resto % 10;
                        extenso += ` e ${this.dezena[dez]}`;
                        if (unid !== 0) {
                            extenso += ` e ${isMinuto ? this.objMinuto[unid] : this.objHora[unid]}`;
                        }
                    }
                }
            }
        }

        return extenso.trim();
    };

    private capitalizeFirstLetter = (text: string): string => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    render() {
        return (
            <div className="container mx-auto max-w-md h-screen py-20">
                <form onSubmit={this.handleFormSubmit}>
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
                            value={this.state.horaCompleta}
                            onChange={this.handleInputChange}
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
                {this.state.horaExtenso && (
                    <div className="mt-8">
                        <p className="text-center font-bold">Resultado por extenso:</p>
                        <p className="text-center border rounded-xl flex flex-1 p-2 pl-5 pr-5 items-center justify-between border-gray-300 text-gray-800">
                            {this.state.horaExtenso}
                            <button
                                className="ml-2 focus:outline-none border border-green-600 rounded-md p-1"
                                onClick={this.handleCopyClick}
                                title="Clique para copiar..."
                            >
                                <span className="text-green-700 hover:text-green-600 transition-colors">
                                    <AiOutlineCopy size={20} />
                                </span>
                            </button>
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

export default HoraExtenso;
