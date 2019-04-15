# Lista de afazeres

## Front-end puro

- Enviar email para o usuário que abriu o chamado informando o número do chamado aberto (ver layout no final deste documento). Sempre que mudar a situação é enviado email para o usuário que abriu o chamado.

- Atendimento do chamado – usado somente pelo técnico/adm que deve estar logado. Seleciona um chamado na lista de chamados e inicia o atendimento. O chamado fica associado ao técnico. Neste momento a situação do chamado muda para “em atendimento” e fica registrada a data/hora e o técnico. Apresentar os chamados abertos/encaminhados (vermelho), em andamento(amarelo).

## Back-end + Front-end

- A lista de chamados deve conter ma opção de ordenação. Ascendente/descendente em relação a data e hora de criação do chamado. Inicialmente é mostrado descendente, mas o usuário pode mudar a ordem se desejar.

- O adm da área tem direito a ver todos os chamados da área pela situação.

- Alteração da situação do chamado. Sempre que a situação for alterada deve ser registrada a data/hora e uma descrição (opcional). Deve seguir o diagrama de estados.

- Encaminhar chamado para outro técnico/área. Qualquer técnico/adm pode encaminhar o chamado para outro técnico/área.

- Concluir chamado. Realizado pelo técnico/adm. Ele seleciona um chamado que esteja atendendo e informa a solução diagnosticada pelo técnico. O sistema grava a data/hora automático. Envia email para o usuário dizendo que o chamado foi concluído.

- O usuário que abriu o chamado pode cancelá-lo caso ele ainda esteja “aberto”.

- Enviar email para o usuário sempre que o chamado mudar de situação.

- Usuários podem buscar Chamados: A busca dos chamados tem o objetivo visualizar os dados de um chamado. A busca se dará pelo nome do usuário, pelo número do chamado, pelo setor.

- Técnico pode associar o chamado a um tombo de patrimônio. Acrescentar esse campo no chamado e o técnico é responsável pelo cadastro.

- Relatórios de chamados do usuário. O usuário pode listar os chamados cadastrados por ele (pelo cpf). O administrador e/ou técnico tem acesso a lista de todos os chamados. Serão listados os chamados por cpf/área/técnico/período/problema/quant dias aberto

- Módulo de Instalação de Programas em laboratórios ou setor: Para todos usuários (docentes, discentes, técnicos, públicos externos e internos). Esse Módulo indica o software, data de uso, link para download e plug-ins relacionados, o laboratório e o usuário solicitante (nome, email, celular, para confirmação da instalação); Para esse requisito usaremos o próprio sistema de chamados. Quando o problema for “Instalação de Software” será obrigatório colocar o link para a instalação.
