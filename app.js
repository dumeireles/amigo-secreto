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
document.getElementById('nomeInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarNome();  // Chama a função adicionarNome quando Enter é pressionado
    }
});

// Função para zerar a lista e redirecionar para a página index
function zerarLista() {
    localStorage.removeItem('nomes'); // Limpa a lista salva no localStorage
    window.location.href = 'index.html'; // Redireciona para a página index
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
// Função para apagar o último nome da lista
function apagarUltimoNome() {
    // Recuperar a lista de nomes do localStorage
    let nomesSalvos = JSON.parse(localStorage.getItem('nomes')) || [];

    if (nomesSalvos.length > 0) {
        // Remove o último nome da lista
        nomesSalvos.pop();

        // Atualiza o localStorage com a lista modificada
        localStorage.setItem('nomes', JSON.stringify(nomesSalvos));

        // Atualiza a lista na tela
        atualizarLista();
    } else {
        alert('Não há nomes para apagar!');
    }
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
// Função para sortear um nome da lista e removê-lo
function sortear() {
    // Obter a lista de nomes do localStorage
    let nomesSalvos = JSON.parse(localStorage.getItem('nomes')) || [];

    if (nomesSalvos.length > 0) {
        // Sorteia um nome aleatório da lista
        const sorteadoIndex = Math.floor(Math.random() * nomesSalvos.length);
        const nomeSorteado = nomesSalvos[sorteadoIndex];
        
        // Exibe o nome sorteado no alert
        alert(`Nome sorteado: ${nomeSorteado}`);
        
        // Remove o nome sorteado da lista
        nomesSalvos.splice(sorteadoIndex, 1);
        
        // Atualiza a lista no localStorage
        localStorage.setItem('nomes', JSON.stringify(nomesSalvos));
    } else {
        // Se a lista estiver vazia, exibe uma mensagem de alerta
        alert('Nenhum nome disponível para sortear.');
    }
}

