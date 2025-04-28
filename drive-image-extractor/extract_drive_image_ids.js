// extract_drive_image_ids.js
// Google Drive フォルダから画像ファイルIDを抽出してURL化するスクリプト

const fs = require('fs');
const { google } = require('googleapis');

const CREDENTIALS_PATH = 'credentials.json';
const TOKEN_PATH = 'token.json';
const TARGET_FOLDER_ID = '1ufw648kkOyCrPZpHOrcUJah_TFhAMDUU'; // ← あなたのフォルダIDに置き換え済

async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } else {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.readonly'],
    });
    console.log('\n🔐 認証URLにアクセスしてコードをコピーしてください:\n\n' + authUrl + '\n');
    const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
    readline.question('📥 認証コードを貼って Enter: ', async (code) => {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      readline.close();
      console.log('✅ 認証完了。再度スクリプトを実行してください。');
    });
    return null;
  }
}

async function listImages(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const files = [];
  let pageToken = null;

  do {
    const res = await drive.files.list({
      q: `'${TARGET_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'nextPageToken, files(id, name)',
      pageSize: 1000,
      pageToken: pageToken || undefined,
    });
    files.push(...res.data.files);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  const imageUrls = files.map(file => ({
    name: file.name,
    url: `https://drive.google.com/uc?id=${file.id}`
  }));

  fs.writeFileSync('images.json', JSON.stringify(imageUrls, null, 2));
  console.log(`✅ 完了：${imageUrls.length} 枚の画像URLを images.json に保存しました`);
}

(async () => {
  const auth = await authorize();
  if (auth) await listImages(auth);
})();