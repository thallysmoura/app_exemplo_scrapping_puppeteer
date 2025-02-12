const puppeteer = require('puppeteer');


async function obterInfo(){
    // Inicia o navegador
    const browser = await puppeteer.launch({ headless: false }); 
    const page = await browser.newPage();

    // Navega até a URL
    await page.goto('https://sati-front.apps.ham.org.br');

    // Digita no campo de pesquisa
    await page.type('//*[@id="username"]', 'THALLYS.MOURA', { delay: 100 });
    await page.type('//*[@id="db"]', 'hospital@123', { delay: 100 });
    await page.click('//*[@id="btn-login"]');


    /*
    // Aguarda a aparição do primeiro resultado e clica
    await page.waitForSelector('.devsite-result-item-link');
    await page.click('.devsite-result-item-link');

    // Aguarda o título específico aparecer
    await page.waitForSelector('text/Customize and automate');
    const fullTitle = await page.evaluate(() => {
        const element = document.querySelector('text/Customize and automate');
        return element ? element.textContent : null;
    });

    // Exibe o título
    console.log('The title of this blog post is "%s".', fullTitle);

    */
    // Fecha o navegador
    await browser.close();
}


 obterInfo()
