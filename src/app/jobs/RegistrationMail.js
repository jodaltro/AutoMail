import Mail from '../lib/Mail';

export default {
  key: 'AutoMail',
  async handle({ data }) {
    const { aluno } = data;
    const { curso } = data;
    await Mail.sendMail({
      from: ' <email@gmail.com>',
      to: `${aluno[2]} <${aluno[12]}>`,
      subject: 'Cursos FIC',
      html: `Olá  ${aluno[2]} ${aluno[3]}, é com alegria que comunicamos que você está matriculado no curso de ${curso.nome}.
      Eu me chamo Diego e sou o Professor Mediador dos cursos de Formação Inicial Continuada – FIC e vamos estar juntos nesta nova etapa de formação!
      <br>
      <br>
      Neste primeiro momento é importante você fazer o primeiro acesso a nossa plataforma Mundi, <a href='https://mundi.ifsul.edu.br/ava/login/index.php'>clique aqui para acessar a plataforma.</a>
      <br>
      Todas as dúvidas e esclarecimentos podem ser feitas através do grupo do WhatsApp do seu curso, para participar do grupo, <a href='${curso.whats}'> clique aqui.</a>!
      <br> 
      <br> 
      Grupo do WhatsApp: ${curso.whats}
      <br> 
      `
    });
  },
};