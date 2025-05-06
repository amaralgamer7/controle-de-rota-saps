document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Login realizado com sucesso!');
      localStorage.setItem('token', dados.token);
      // Redirecionar para página protegida, por exemplo: painel.html
      window.location.href = '/sistema-rotas.html';
    } else {
      alert('Erro ao logar: ' + (dados.message || dados.erro || 'Erro desconhecido'));

    }
  } catch (error) {
    console.error('Erro ao logar:', error);
    alert('Erro ao logar. Verifique o console.');
  }
});
