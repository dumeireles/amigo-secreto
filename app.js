// Lista de nomes armazenada no localStorage
let nomes = JSON.parse(localStorage.getItem('nomes')) || [];

// 🎯 *** FUNCIONALIDADES DA INDEX.HTML ***
const nomeInput = document.getElementById('nomeInput');

if (nomeInput) {
    function adicionarNome() {
        const nome = nomeInput.value.trim().toUpperCase();

        if (nome) {
            if (nomes.includes(nome)) {
                alert('Este nome já foi adicionado!');
            } else {
                nomes.push(nome);
                nomeInput.value = ''; // Limpar input
                localStorage.setItem('nomes', JSON.stringify(nomes)); // Salvar no localStorage
                atualizarLista(); // Atualizar exibição
            }
        } else {
            alert('Por favor, insira um nome.');
        }
    }

    // Permitir adicionar nome pressionando Enter
    nomeInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            adicionarNome();
        }
    });

    function atualizarLista() {
        const lista = document.getElementById('lista');
        const listaNomes = document.getElementById('listaNomes');

        if (lista) {
            lista.innerHTML = '';

            if (nomes.length > 0) {
                listaNomes.style.display = 'block';
                nomes.forEach(nome => {
                    const nomeElemento = document.createElement('div');
                    nomeElemento.textContent = nome;
                    lista.appendChild(nomeElemento);
                });
            } else {
                listaNomes.style.display = 'none';
            }
        }
    }

    function zerarLista() {
        localStorage.removeItem('nomes');
        nomes = [];
        atualizarLista();
        window.location.href = 'index.html';
    }

    function apagarUltimoNome() {
        if (nomes.length > 0) {
            nomes.pop();
            localStorage.setItem('nomes', JSON.stringify(nomes));
            atualizarLista();
        } else {
            alert('Não há nomes para apagar!');
        }
    }

    function recomecar() {
        nomes = [];
        localStorage.removeItem('nomes');
        atualizarLista();
    }

    function finalizarInput() {
        localStorage.setItem('nomes', JSON.stringify(nomes));
        alert('Listagem finalizada!');
        window.location.href = 'resultados.html';
    }

    window.onload = atualizarLista;
}

// 🎯 *** FUNCIONALIDADES DA RESULTADOS.HTML ***
const botaoSortear = document.getElementById('botaoSortear');

if (botaoSortear) {
    botaoSortear.addEventListener('click', () => {
        if (botaoSortear.textContent === "Sortear") {
            if (nomes.length > 0) {
                alert(`Nome sorteado: ${nomes[0]}`);
                botaoSortear.textContent = "Próximo";
            }
        } else if (botaoSortear.textContent === "Próximo") {
            nomes.shift();
            localStorage.setItem('nomes', JSON.stringify(nomes));

            if (nomes.length > 0) {
                alert(`Nome sorteado: ${nomes[0]}`);
            } else {
                alert("Sorteio finalizado!");
                botaoSortear.textContent = "Recomeçar";
            }
        } else if (botaoSortear.textContent === "Recomeçar") {
            localStorage.removeItem('nomes');
            window.location.href = 'index.html';
        }
    });

    // Garante que ao carregar a página, o botão inicie como "Sortear"
    botaoSortear.textContent = "Sortear";
}
