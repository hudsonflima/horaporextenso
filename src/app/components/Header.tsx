import React from "react";

const Header: React.FC = () => {
    return (
        <nav className="bg-green-700 shadow-lg shadow-green-800 m-4 rounded-xl">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                <span className="self-center text-3xl text-white font-extralight whitespace-nowrap">
                    Hora por Extenso
                </span>
            </div>
        </nav>
    );
}

export default Header;