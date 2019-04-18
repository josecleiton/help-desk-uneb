import React from 'react';
import Input from '../../Input';
import './style.css';

const AbrirChamadoForm = () => {
  const inputStyle = {
    flex: '1',
    padding: '10px',
    margin: '20px',
    fontSize: '18px',
    border: '1px solid #333333',
  };
  return (
    <div className="main-form-chamado">
      <form>
        <h2>(setor selecionado)</h2>
        <div>
          <h3>Nome</h3>
          <Input type="text" placeholder="Nome Completo" style={inputStyle} />
          <h3>Email</h3>
          <Input type="email" placeholder="Email válido" style={inputStyle} />
        </div>
        <div>
          <h3>Telefone</h3>
          <Input type="tel" placeholder="telefone válido" style={inputStyle} />
          <h3>Defeito</h3>
          <select>
            <option value="001">outro</option>
          </select>
          <h3>Imagem do defeito</h3>
          <Input type="file" placeholder="imagem" style={inputStyle} />
        </div>
        <div>
          <h3>descrição </h3>
          <textarea cols="30" rows="10" />
        </div>
        <div id="main-form-submit">
          <button type="submit" name="retornar">
            MUDAR SETOR
          </button>
          <button type="submit">ABRIR CHAMADO</button>
        </div>
      </form>
    </div>
  );
};

export default AbrirChamadoForm;
