const arrayPixelsFogo = [];
let larguraFogo = 50;
let alturaFogo = 50;
const paletaCoresFogo = [
  { r: 7, g: 7, b: 7 },
  { r: 31, g: 7, b: 7 },
  { r: 47, g: 15, b: 7 },
  { r: 71, g: 15, b: 7 },
  { r: 87, g: 23, b: 7 },
  { r: 103, g: 31, b: 7 },
  { r: 119, g: 31, b: 7 },
  { r: 143, g: 39, b: 7 },
  { r: 159, g: 47, b: 7 },
  { r: 175, g: 63, b: 7 },
  { r: 191, g: 71, b: 7 },
  { r: 199, g: 71, b: 7 },
  { r: 223, g: 79, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 135, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 },
];
let debug = false;

function start() {
  criarEstruturaDadosFogo();
  criarBaseFogo();
  renderizarFogo();

  setInterval(calcularPropagacaoFogo, 50);
}

function alternarModoDebug() {
  if (debug === false) {
    larguraFogo = 16;
    alturaFogo = 16;
    debug = true;
  } else {
    larguraFogo = 50;
    alturaFogo = 50;
    debug = false;
  }

  criarEstruturaDadosFogo();
  criarBaseFogo();
  renderizarFogo();
}


function criarEstruturaDadosFogo() {
  const numeroDePixels = larguraFogo * alturaFogo;

  for (let i = 0; i < numeroDePixels; i++) {
    arrayPixelsFogo[i] = 0;
  }
}

function criarBaseFogo() {
  for (let coluna = 0; coluna <= larguraFogo; coluna++) {
    const transbordoIndexPixel = larguraFogo * alturaFogo;
    const indexPixel = transbordoIndexPixel - larguraFogo + coluna;

    arrayPixelsFogo[indexPixel] = 36;
  }
}

function calcularPropagacaoFogo() {
  for (let coluna = 0; coluna < larguraFogo; coluna++) {
    for (let linha = 0; linha < alturaFogo; linha++) {
      const indexPixel = coluna + larguraFogo * linha;
      atualizarIntensidadeFogoPorPixel(indexPixel);
    }
  }
  renderizarFogo();
}

function atualizarIntensidadeFogoPorPixel(indexPixelAtual) {
  const indexPixelAbaixo = indexPixelAtual + larguraFogo;
  if (indexPixelAbaixo >= larguraFogo * alturaFogo) {
    return;
  }

  const decaimento = Math.floor(Math.random() * 3);
  const intensidadeFogoPixelAbaixo = arrayPixelsFogo[indexPixelAbaixo];
  const novaIntensidadeFogo =
    intensidadeFogoPixelAbaixo - decaimento >= 0 ? intensidadeFogoPixelAbaixo - decaimento : 0;

  arrayPixelsFogo[indexPixelAtual - decaimento] = novaIntensidadeFogo;
}

function renderizarFogo() {
  let tela = "<table cellpadding=0 cellspacing=0>";

  for (let linha = 0; linha < alturaFogo; linha++) {
    tela += "<tr>";

    for (let coluna = 0; coluna < larguraFogo; coluna++) {
      const indexPixel = coluna + larguraFogo * linha;
      const intensidadeFogo = arrayPixelsFogo[indexPixel];

      const cor = paletaCoresFogo[intensidadeFogo];
      const stringCor = `${cor.r},${cor.g},${cor.b}`;

      if (debug === true) {
        tela += "<td>";
        tela += `<div class="pixel-index">${indexPixel}</div>`;
        tela += `<div style="color: rgb(${stringCor})">${intensidadeFogo}</div>`;
        tela += "</td>";
      } else {
        tela += `<td class="pixel" style="background-color: rgb(${stringCor})">`;
        tela += "</td>";
      }
    }

    tela += "</tr>";
  }

  tela += "</table>";

  document.querySelector("#telaFogo").innerHTML = tela;
}


start();