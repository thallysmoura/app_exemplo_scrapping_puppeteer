const puppeteer = require('puppeteer');


async function iniciarNavegador() {
    return await puppeteer.launch({ headless: false });
}

async function preencherCampo(page, seletor, valor, delay = 100) {
    await page.waitForSelector(seletor);
    await page.type(seletor, valor, { delay });
}

async function clicarElemento(page, seletor) {
    await page.waitForSelector(seletor);
    await page.click(seletor);
}

async function obterDadosTabela(page, seletor) {
    await page.waitForSelector(seletor);
    return await page.evaluate(seletor => {
        return Array.from(document.querySelectorAll(`${seletor} tr`)).map(linha => 
            Array.from(linha.querySelectorAll('td')).map(td => td.innerText.trim())
        );
    }, seletor);
}

async function obterInfo() {
    const browser = await iniciarNavegador();
    const page = await browser.newPage();

    await page.goto('https://sati-front.apps.ham.org.br');

    await preencherCampo(page, '#username', 'THALLYS.MOURA');
    await preencherCampo(page, '#password', 'senha');
    await clicarElemento(page, '#btn-login');

    await page.waitForTimeout(1000);

    await clicarElemento(page, '.modal-list-show');

    await preencherCampo(page, '#prescricao-codigo', '123');
    await clicarElemento(page, '.btn-search');

    await page.waitForTimeout(1000);

    const dados = await obterDadosTabela(page, '#customers tbody');
    console.log('Dados extraídos:', dados);


    await browser.close();
}

obterInfo();
