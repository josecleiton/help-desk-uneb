import React from 'react';

const AtendimentoEncaminhar = () => (
  // eslint-disable-next-line jsx-a11y/label-has-for
  <label htmlFor="encaminhamento-setor" style={{ background: 'none' }}>
    Setor:
    <select name="encaminhamento-setor" id="encaminhamento-setor" className="admin-chamado">
      <option value="TI">TI</option>
      <option value="TI">TI</option>
      <option value="TI">TI</option>
      <option value="TI">TI</option>
    </select>
  </label>
);

export default AtendimentoEncaminhar;
