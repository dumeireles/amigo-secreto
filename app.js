// Função para adicionar nome na lista
let nomes = JSON.parse(localStorage.getItem('nomes')) || [];

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
            localStorage.setItem('nomes', JSON.stringify(nomes)); // Atualiza o localStorage
            atualizarLista(); // Atualiza a lista na tela
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
    nomes = []; // Limpa a lista interna de nomes
    atualizarLista(); // Atualiza a lista na tela
    window.location.href = 'index.html'; // Redireciona para a página index
}

// Atualiza a lista na tela
function atualizarLista() {
    const lista = document.getElementById('lista');
    const listaNomes = document.getElementById('listaNomes');
    
    lista.innerHTML = ''; // Limpar lista atual

    if (nomes.length > 0) {
        // Exibe a caixa de lista de nomes
        listaNomes.style.display = 'block';

        // Preenche a lista com os nomes
        nomes.forEach((nome) => {
            const nomeElemento = document.createElement('div');
            nomeElemento.textContent = nome;
            lista.appendChild(nomeElemento);
        });
    } else {
        // Se não houver nomes, a caixa de lista de nomes fica invisível
        listaNomes.style.display = 'none';
    }
}

// Função para apagar o último nome da lista
function apagarUltimoNome() {
    if (nomes.length > 0) {
        nomes.pop(); // Remove o último nome
        localStorage.setItem('nomes', JSON.stringify(nomes)); // Atualiza o localStorage
        atualizarLista(); // Atualiza a lista na tela
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
        // Sorteia o nome da lista
        const nomeSorteado = nomesSalvos.pop(); // Remove o último nome da lista

        // Exibe o nome sorteado no alert
        alert(`Nome sorteado: ${nomeSorteado}`);

        // Atualiza a lista no localStorage após remoção do nome sorteado
        localStorage.setItem('nomes', JSON.stringify(nomesSalvos));

        // Atualiza a lista na tela
        atualizarLista();

        // Caso a lista de nomes esteja vazia após o sorteio, redireciona para farewell.html
        if (nomesSalvos.length === 0) {
            // Aguarda o usuário fechar o alert para redirecionar para farewell.html
            setTimeout(() => {
                window.location.href = 'farewell.html'; // Redireciona para farewell.html
            }, 500); // Aguarda 500ms antes de redirecionar
        }
    } else {
        // Se a lista estiver vazia, exibe uma mensagem de alerta
        alert('Nenhum nome disponível para sortear.');
    }
}


// Atualiza a lista ao carregar a página
window.onload = atualizarLista;
