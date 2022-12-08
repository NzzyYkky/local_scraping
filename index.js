//　必要なのはpuppeteerとfs
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
	});
	const page = (await browser.pages())[0];
	// テキストを抽出するURLを指定。　ローカルホストの場合は立ち上げておくこととhttp://から始めること
	await page.goto('http://localhost:3000/');
	//　$$evalメソッドで第1引数にタグやクラス名、第2引数に関数を指定。
	const paragraph = await page.$$eval('p', (elements) => {
		// テキストをpタグずつテキストへ挿入していく。
		return elements.map((e) => e.innerText);
	});

	// 配列だから要素を取得してくる
	await paragraph.forEach((el) => {
		// それをテキストファイルに追記　+ '\n'にしないと改行が入らない
		fs.appendFile('./test.txt', el + '\n', (err) => {
			if (err) throw err;
		});
	});

	await page.goto('http://localhost:3000/');
	//　$$evalメソッドで第1引数にタグやクラス名、第2引数に関数を指定。
	const paragraph02 = await page.$$eval('p', (elements) => {
		// テキストをpタグずつテキストへ挿入していく。
		return elements.map((e) => e.innerText);
	});

	// 配列だから要素を取得してくる
	await paragraph02.forEach((el) => {
		// それをテキストファイルに追記　+ '\n'にしないと改行が入らない
		fs.appendFile('./test.txt', el + '\n', (err) => {
			if (err) throw err;
		});
	});

	await browser.close();
})();
