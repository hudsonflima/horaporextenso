'use client'
import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentYear(new Date().getFullYear());
        }, 60000); // Atualiza o ano a cada minuto (pode ajustar conforme necessário)

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="bg-white m-4 dark:bg-green-800 py-2 shadow-xl shadow-green-800 rounded-xl">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-green-500 sm:text-center dark:text-green-400">
                    © {currentYear} <a href="https://blog-hudson.vercel.app/" className="hover:underline">Desenvolvido por Hudson Lima</a>. Todos os direitos reservados.
                </span>
                <ul className="flex flex-wrap items-center text-sm font-medium text-green-500 dark:text-green-400 sm:mt-0">
                    <li>
                        <a href="https://hudsonflima.vercel.app/" className="hover:underline">Blog</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;