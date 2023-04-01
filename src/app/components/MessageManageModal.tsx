import React from "react";

export default function MessageManageModal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-gray-800 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-300 focus:bg-gray-300"
        onClick={() => setShowModal(true)}
      >
        Observações da Cena
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-900">
                    CAP 02 - Cena 01
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="text-lg   font-medium text-gray-800">
                    LOCAÇÃO: RIACHO ALINE - RIO WATER PLANET
                    <br />
                    END: ESTRADA DO SACARRÃO, ALTURA DO NÚMERO 2192
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    <br />
                    LIBERAR DANIEL ATÉ 16h00 PARA ESTÚDIO M
                    <br />
                    SAÍDA: 07h30 DESLOCAMENTO: 07h30 às 08h00 MONTAGEM: 08h00 às
                    <br />
                    09h00 INÍCIO GRAVAÇÃO: 09h00 ALMOÇO: 13h00 às 14h00 FIM
                    <br />
                    GRAVAÇÃO: 16h00 DESMONTAGEM: 16h00 às 17h00 DESLOCAMENTO:
                    <br />
                    17h00 às 17h30 FIM EG: 17h30
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
