import React, { Fragment } from 'react';

const FormTi = () => (
  <Fragment>
    <div>
      <small>
        <i className="fas fa-cogs" />
        Software:
      </small>
      <input type="text" />
    </div>
    <div>
      <small>
        <i className="fas fa-calendar-day" />
        data de Utilização:
      </small>
      <input type="date" />
      <small>
        <i className="fas fa-network-wired" />
        Sala:
      </small>
      <select>
        <option value="">Informe o laboratório</option>
        <option value="1">LAMI I</option>
        <option value="2">LAMI II</option>
      </select>
    </div>
    <div>
      <small>
        <i className="fas fa-globe-europe" />
        Link para download:
      </small>
      <input type="text" />
    </div>
    <div>
      <small>
        <i className="fas fa-plus-square" />
        plug-ins relacionados:
      </small>
      <input type="text" />
    </div>
  </Fragment>
);
export default FormTi;
