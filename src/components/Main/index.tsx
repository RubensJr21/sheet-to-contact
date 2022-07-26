import React from "react";

const Main = () => {
    return (
    <>
      <div className="bg-dark w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="mt-3 mb-3 d-flex flex-column align-items-center">
          <label htmlFor="fileCSV" className="form-label text-bg-dark">Selecione o arquivo com os contatos:</label>
          <input className="form-control w-auto" type="file" accept=".csv" id="fileCSV"/>
        </div>
        <p className="h1 text-bg-dark">OU</p>
        <textarea className="form-control w-75 h-100 mt-2 mb-4 shadow" style={{resize: "none"}} placeholder="Cole o csv aqui.." id="insertionCSV" />
        {/* 
          Verificar o csv com base no tamanho das linha
          Passo:
            1. Dar split na quebra linha
            2. Para cada linha gerada dar split no separador usado
            3. Comparar se todos as listas tem o mesmo tamanho
            4. Se estiver tudo certo passar para tela de Table
        */}
      </div>
    </>
    )
}

export default Main;