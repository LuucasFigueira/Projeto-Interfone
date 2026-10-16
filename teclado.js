const readline = require('readline');

// 🎤 Cria o "ouvido" que escuta o que você digita no terminal
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// ❓ Faz uma pergunta e espera você responder
function perguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

async function interfone() {
  while (true) { // 🔁 repete para sempre, como um interfone de verdade
    console.log('\n=== INTERFONE ===');
    console.log('1 - Entrega   2 - Visita');

    const opcao = await perguntar('Escolha: ');
    if (opcao !== '1' && opcao !== '2') {
      console.log('Opção inválida!');
      continue; // volta para o começo
    }
    const tipo = opcao === '1' ? 'entrega' : 'visita';

    const bloco = await perguntar('Bloco: ');
    const apto = await perguntar('Apto: ');

    try {
      // 📨 Manda o bilhete para o porteiro (servidor)
      const resposta = await fetch('http://localhost:3000/interfone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-token': 'troque-por-um-segredo'
        },
        body: JSON.stringify({ tipo, bloco, apto })
      });

      const dados = await resposta.json();
      if (dados.ok) {
        console.log('✅ Morador avisado! Aguarde.');
      } else {
        console.log('❌ Erro: ' + dados.erro);
      }
    } catch (e) {
      // 🔌 Cai aqui se o servidor estiver desligado
      console.log('⚠️ Sistema offline. Tente novamente.');
    }
  }
}

interfone();