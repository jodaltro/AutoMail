import Queue from '../lib/Queue';
const readXlsxFile = require('read-excel-file/node');
var redis = require('redis');
var client = redis.createClient();

client.on('connect', function () {
  console.log('connected');
});
export default {
  async store(req, res) {
    const curso = req.body
    let promesse;
    await readXlsxFile(`./excels/${curso.arquivo}`).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      promesse = rows.map(async (aluno) => {
        client.get(aluno[0] + curso.nome, async (err, data) => {
          if (err) {
            res.status(500).send(err);
          }
          if (data != null) {
            console.log('Email ja enviado para: ' + aluno[0]);
          }
          else {
            await Queue.add('AutoMail', { aluno, curso });
            client.set(aluno[0] + curso.nome, true);
          }
        });
      })
    })
    // Adicionar job RegistrationMail na fila
    await Promise.all(promesse)

    return res.json({ feito: "feito" });
  }
};
