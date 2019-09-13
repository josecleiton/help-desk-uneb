import api from '../services/api';

// let Estados = ['Em Aberto', 'Em Atendimento', 'Pendente', 'Transferido', 'Concluido'];
class Config {
  constructor() {
    this.estados = null;
  }

  async getEstados() {
    await api.get('/api/situacao/read.php').then((res) => {
      this.estados = res.data;
    });
    return this.estados;
  }
}
// let Estados = null;

// Estados = [...res.data];
// console.log(res.data)
// console.log(Estados);

export default new Config();
