// Função para adicionar nome na lista
let nomes = [];

// Função para adicionar nome na lista com verificação de duplicidade
function adicionarNome() {
    const nomeInput = document.getElementById('nomeInput');
    const nome = nomeInput.value.trim();

    if (nome) {
        // Verificar se o nome já existe na lista
        if (nomes.includes(nome)) {
            alert('Este nome já foi adicionado!');
        } else {
            nomes.push(nome); // Adiciona o nome se não for duplicado
            nomeInput.value = ''; // Limpar o campo de input
            atualizarLista(); // Atualizar a lista na tela
        }
    } else {
        alert('Por favor, insira um nome.');
    }
}

// Atualiza a lista na tela
function atualizarLista() {
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // Limpar lista atual

    nomes.forEach((nome, index) => {
        const li = document.createElement('li');
        li.textContent = nome;
        lista.appendChild(li);
    });
}
// Limpa a lista de nomes
function recomecar() {
    nomes = []; 
    localStorage.removeItem('nomes'); // Remove a lista do localStorage
    atualizarLista(); // Atualiza a lista na tela
}

// Finaliza a entrada de nomes
function finalizarInput() {
    localStorage.setItem('nomes', JSON.stringify(nomes)); // Armazenar os nomes no localStorage
    alert('Listagem finalizada!');
    window.location.href = 'resultados.html'; // Redirecionar para a página de resultados
}

// Sorteia um nome da lista
function sortear() {
    const nomesSalvos = JSON.parse(localStorage.getItem('nomes')) || [];
    
    if (nomesSalvos.length > 0) {
        const sorteadoIndex = Math.floor(Math.random() * nomesSalvos.length);
        const nomeSorteado = nomesSalvos[sorteadoIndex];
        
        alert(`Nome sorteado: ${nomeSorteado}`);
        
        // Excluir o nome sorteado da lista
        nomesSalvos.splice(sorteadoIndex, 1);
        localStorage.setItem('nomes', JSON.stringify(nomesSalvos)); // Atualizar lista no localStorage
    } else {
        alert('Nenhum nome disponível para sortear.');
    }
}
