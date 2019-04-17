import React from 'react';
import Input from '../../Input';
import './style.css';

const AbrirChamadoForm = () => (
  <div className="main-form-chamado">
    <form>
      <h2>(setor selecionado)</h2>
      <div>
        <h3>Nome</h3>
        <Input type="text" placeholder="Nome Completo" />
        <h3>Email</h3>
        <Input type="email" placeholder="Email válido" />
      </div>
      <div>
        <h3>Telefone</h3>
        <Input type="tel" placeholder="telefone válido" />
        <h3>Defeito</h3>
        <select>
          <option value="001">outro</option>
        </select>
        <h3>Imagem do defeito</h3>
        <Input type="file" placeholder="imagem" />
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

export default AbrirChamadoForm;
