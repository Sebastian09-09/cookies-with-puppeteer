const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs').promises;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveCookies() {
    browser = await puppeteer.launch({
        headless:false,
    });

    page = await browser.newPage()
    await page.goto('https://bigo.tv')

    try{
        const savedCookies = await fs.readFile("./cookies.json");
        const scookies = JSON.parse(savedCookies);
        await page.setCookie(...scookies);

        await page.reload();

        await sleep(10000); 
    }catch{
        await sleep(30000);
        const cookies = await page.cookies();
        fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
    }

    await browser.close();
}

saveCookies();