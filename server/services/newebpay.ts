const APIENDPOINT_DEV = "https://ccore.newebpay.com/"
const APIENDPOINT_PROD = "https://core.newebpay.com/"
import { createHmac, createCipheriv, createDecipheriv, createHash } from 'crypto'
const Version = "2.0"
// 字串組合
function genDataChain(order : Record<string, any>) : string{
  const config = useRuntimeConfig()
  const { NEWEBPAY_MERCHANT_ID } = config
  return `MerchantID=${NEWEBPAY_MERCHANT_ID}&RespondType=JSON&TimeStamp=${
    order.TimeStamp
  }&Version=${Version}&MerchantOrderNo=${order.MerchantOrderNo}&Amt=${
    order.Amt
  }&ItemDesc=${encodeURIComponent(order.ItemDesc)}&Email=${encodeURIComponent(
    order.Email,
  )}`
}

// 對應文件 P16：使用 aes 加密
// $edata1=bin2hex(openssl_encrypt($data1, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv))
function create_mpg_aes_encrypt(TradeInfo : Record<string, any>) : string {
  const config = useRuntimeConfig()
  const { NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV } = config
  const encrypt = createCipheriv('aes256', NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV)
  const enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex')
  return enc + encrypt.final('hex')
}

// 對應文件 P17：使用 sha256 加密
// $hashs="HashKey=".$key."&".$edata1."&HashIV=".$iv
function create_mpg_sha_encrypt(aesEncrypt : string) : string{
  const config = useRuntimeConfig()
  const { NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV } = config
  const sha = createHash('sha256')
  const plainText = `HashKey=${NEWEBPAY_HASH_KEY}&${aesEncrypt}&HashIV=${NEWEBPAY_HASH_IV}`

  return sha.update(plainText).digest('hex').toUpperCase()
}


// 將 aes 解密
function create_mpg_aes_decrypt(TradeInfo : any) : Record<string, any> {
  const config = useRuntimeConfig()
  const { NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV } = config
  const decrypt = createDecipheriv('aes256', NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV)
  decrypt.setAutoPadding(false)
  const text = decrypt.update(TradeInfo, 'hex', 'utf8')
  const plainText = text + decrypt.final('utf8')
  const result = plainText.replace(/[\x00-\x20]+/g, '')
  return JSON.parse(result)
}

export async function createPayment (order: Record<string, unknown>, isProd: boolean) {
    const config = useRuntimeConfig()
    const { NEWEBPAY_MERCHANT_ID } = config
    const orderData = {
        'MerchantID': NEWEBPAY_MERCHANT_ID,
        'RespondType': 'JSON',
        'TimeStamp': Math.floor(Date.now() / 1000),
        'Version': '1.5',
        'LangType': 'zh-tw',
        'MerchantOrderNo': order.id,
        'Amt': order.total,
        'ItemDesc': order.description,
        'ReturnURL': 'https://timesdev.demoto.me',
        'NotifyURL': 'https://timesdev.demoto.me/hello',
        'ClientBackURL': 'https://timesdev.demoto.me/hello',
        'Email' : order.email,
        'EmailModify' : 0,
        'LoginType' : 0,
        'CREDIT' : 1,
        'LINEPAY' : 1,
        'VACC' : 1,
        // 'CVS' : 1,
        // 'BARCODE' : 1,
    }

    
    // 用來產出字串
  // const paramString = genDataChain(order)
  // console.log('paramString:', paramString)

  // 加密第一段字串，此段主要是提供交易內容給予藍新金流
  const aesEncrypt = create_mpg_aes_encrypt(orderData)
  console.log('aesEncrypt :', aesEncrypt)

  // 使用 HASH 再次 SHA 加密字串，作為驗證使用
  const shaEncrypt = create_mpg_sha_encrypt(aesEncrypt)
  console.log('shaEncrypt :', shaEncrypt)

  return {
    order,
    aesEncrypt,
    shaEncrypt,
  }
}


// export async function spgatewayNotify (order: Record<string, unknown>, isProd: boolean) {
//     console.log('req.body notify data', req.body);
//     const response = req.body;

//     const thisShaEncrypt = create_mpg_sha_encrypt(response.TradeInfo);
//     // 使用 HASH 再次 SHA 加密字串，確保比對一致（確保不正確的請求觸發交易成功）
//     if (!thisShaEncrypt === response.TradeSha) {
//       console.log('付款失敗：TradeSha 不一致');
//       return res.end();
//     }

//     // 解密交易內容
//     const data = create_mpg_aes_decrypt(response.TradeInfo);
//     console.log('data:', data);

//     // 取得交易內容，並查詢本地端資料庫是否有相符的訂單
//     if (!orders[data?.Result?.MerchantOrderNo]) {
//       console.log('找不到訂單');
//       return res.end();
//     }

//     // 交易完成，將成功資訊儲存於資料庫
//     console.log('付款完成，訂單：', orders[data?.Result?.MerchantOrderNo]);

//     return res.end();
// }