import admin from 'firebase-admin';
import {initFirestore} from '@auth/firebase-adapter';

const serviceAccount = {
    "type": "service_account",
    "project_id": "chatsassai",
    "private_key_id": "75ade56aafad1366679e7984ad27a71d1fe0d505",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLgsf8uXmT1UGH\njhAF0wOo2AWb3/H6uLfoTvsyrcuo/5RKN5gJM0kt1vd4pCvoXpO3SpXvdTkg7GPo\nBOkHguZtV/Al51q4IdRCeZPdnSx+VxNp65G716kUGuch4jH5jd168lztkh5jXlXj\nMKixm8c/KR/WXELWOzHUkvktVWNCxD67TaP6jtnekQK5sZCOpLeuUTa6Z4HgWgIz\nlqRkSi/3zxc7s+8OjOSdqcz5z/g/iA18IjQ7kiM5lB7h1PAzv47XVTziKAvYbB5L\nYY2Ya6Z4Ym05OufSHRvtNj0f0+9P8pZhmUokxJNabojZCkJjTJ4GXkhyT/0IjD0X\nYMxr+tn9AgMBAAECggEAFCRfp1dH/FYPzfhuy8h5gMkfli+xChfdRYcRsXFyNAYi\nbMy2AK4M5Ldip2JcjIILJa15FEeCZgR7MCZ1VoZJqoPFwlMyv97yfF59QMPOhrcf\nsG04bzxlxudTc4rq2DLpRTT0wcAU7xfRoqmF0Y7CJ5ZSaGqNo8yMFzrZCviHCj6A\njwavAWx8q/pr0hQWu+n5Sag1eQX2i5vHFyH59D1LimWtH2WHQ3GHK/pUeETK0hiX\n/+pfEpH05VmIYDAaiPnGkuzuHNSDTuvOVCU0Z5VYwkXmrPdt7/VNuN65cIIVocva\nomabgAnUA44JPvK0Ept3k6UV3zHgMxqiMcBNz/9MqQKBgQDDGCDsWlJndcAB5hpP\nZA1xnv3EacBJMcIp/dkoJ1Sy2xRCWAPr7AyH1dlFDt3srC98MFy1YzJS00NqjPI1\n3tbCTYE9ARo2MM0YauLVwMN1dRFy58pkUbSs4x4Q6Q7al1YLW5If9KQkyhARDlBt\nLnas+mqahsHGZbIBhi0Qjg9MMwKBgQC3EHIWQ3L9B5ppFdNLxaeHU/PbCnx8OW8G\nnNjj6MhB+h6uAjBKwG438bXJs2StZeiOCRixFsptcvc2QpVGc0+7CqBLlk9AUr6k\n6TgyRlIzFFfutwDbnHVESXJQRdNczOrGs4dpNcW9eYhh54OxrIrGs5/fzZWyeFpH\nWl+88OIRDwKBgANrn+Ak8T7pHJWr8BgmO+obDH3uELX3zlyoG6+NiPmdx6wmGOOA\n/vM+t5FzYkas+iQmQOnZNF+pXow2rmRtZLyBWVu1cj0y+9WKwjFXMNYVWFn4YF8D\n47QIQ1WukFkawCJw144B3wLaHBAAfT58yw3bUhUlea49yDIopQ+ePfxrAoGBAI5p\n1NdNEZ+W0qD9waso0POOdB7rQXzCkYTrcC+dYG0zT7q/KSJ+IUCUYX/Qd3oN1aTp\nnrPlrwUGcxtbIRX1jwlLcvharryzomxYosc5vajPIrkq1RgD15aQLMYWDCAdqmd6\nMtW+Z17HtTm1CdanDC8Yfj91iAeXaWQpAmHSY4wxAoGAPd9PN82ksUTLcDjrLrRt\n2YQ2A1eeHamw1YolV6saZ38x15PXTspXupNwapFFcsv6OE7m4kPoradsHD8Fl6nD\nzAY7yHu0IsUTOH0BRAXwNNhvEAAd2tMi+Bm1J6TI5hFQdiVa8wXj84DRrK9YG0v5\ngZzjpZblLBGLq9EXsnWHwSo=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-8y8rx@chatsassai.iam.gserviceaccount.com",
    "client_id": "111194961782948228889",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8y8rx%40chatsassai.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };
  
  const serviceAccount1 = {
    client_email: 'YOUR_CLIENT_EMAIL',
    private_key: 'YOUR_PRIVATE_KEY',
    project_id: 'YOUR_PROJECT_ID'
  };
let app;
if(!admin.apps.length){
    app= admin.initializeApp(
        {
            credential:admin.credential.cert({
                client_email: "firebase-adminsdk-8y8rx@chatsassai.iam.gserviceaccount.com",
    private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLgsf8uXmT1UGH\njhAF0wOo2AWb3/H6uLfoTvsyrcuo/5RKN5gJM0kt1vd4pCvoXpO3SpXvdTkg7GPo\nBOkHguZtV/Al51q4IdRCeZPdnSx+VxNp65G716kUGuch4jH5jd168lztkh5jXlXj\nMKixm8c/KR/WXELWOzHUkvktVWNCxD67TaP6jtnekQK5sZCOpLeuUTa6Z4HgWgIz\nlqRkSi/3zxc7s+8OjOSdqcz5z/g/iA18IjQ7kiM5lB7h1PAzv47XVTziKAvYbB5L\nYY2Ya6Z4Ym05OufSHRvtNj0f0+9P8pZhmUokxJNabojZCkJjTJ4GXkhyT/0IjD0X\nYMxr+tn9AgMBAAECggEAFCRfp1dH/FYPzfhuy8h5gMkfli+xChfdRYcRsXFyNAYi\nbMy2AK4M5Ldip2JcjIILJa15FEeCZgR7MCZ1VoZJqoPFwlMyv97yfF59QMPOhrcf\nsG04bzxlxudTc4rq2DLpRTT0wcAU7xfRoqmF0Y7CJ5ZSaGqNo8yMFzrZCviHCj6A\njwavAWx8q/pr0hQWu+n5Sag1eQX2i5vHFyH59D1LimWtH2WHQ3GHK/pUeETK0hiX\n/+pfEpH05VmIYDAaiPnGkuzuHNSDTuvOVCU0Z5VYwkXmrPdt7/VNuN65cIIVocva\nomabgAnUA44JPvK0Ept3k6UV3zHgMxqiMcBNz/9MqQKBgQDDGCDsWlJndcAB5hpP\nZA1xnv3EacBJMcIp/dkoJ1Sy2xRCWAPr7AyH1dlFDt3srC98MFy1YzJS00NqjPI1\n3tbCTYE9ARo2MM0YauLVwMN1dRFy58pkUbSs4x4Q6Q7al1YLW5If9KQkyhARDlBt\nLnas+mqahsHGZbIBhi0Qjg9MMwKBgQC3EHIWQ3L9B5ppFdNLxaeHU/PbCnx8OW8G\nnNjj6MhB+h6uAjBKwG438bXJs2StZeiOCRixFsptcvc2QpVGc0+7CqBLlk9AUr6k\n6TgyRlIzFFfutwDbnHVESXJQRdNczOrGs4dpNcW9eYhh54OxrIrGs5/fzZWyeFpH\nWl+88OIRDwKBgANrn+Ak8T7pHJWr8BgmO+obDH3uELX3zlyoG6+NiPmdx6wmGOOA\n/vM+t5FzYkas+iQmQOnZNF+pXow2rmRtZLyBWVu1cj0y+9WKwjFXMNYVWFn4YF8D\n47QIQ1WukFkawCJw144B3wLaHBAAfT58yw3bUhUlea49yDIopQ+ePfxrAoGBAI5p\n1NdNEZ+W0qD9waso0POOdB7rQXzCkYTrcC+dYG0zT7q/KSJ+IUCUYX/Qd3oN1aTp\nnrPlrwUGcxtbIRX1jwlLcvharryzomxYosc5vajPIrkq1RgD15aQLMYWDCAdqmd6\nMtW+Z17HtTm1CdanDC8Yfj91iAeXaWQpAmHSY4wxAoGAPd9PN82ksUTLcDjrLrRt\n2YQ2A1eeHamw1YolV6saZ38x15PXTspXupNwapFFcsv6OE7m4kPoradsHD8Fl6nD\nzAY7yHu0IsUTOH0BRAXwNNhvEAAd2tMi+Bm1J6TI5hFQdiVa8wXj84DRrK9YG0v5\ngZzjpZblLBGLq9EXsnWHwSo=\n-----END PRIVATE KEY-----\n",
    project_id:"chatsassai" ,
            // projectId:process.env.FIREBASE_PROJECT_ID,
            // clientEmail:process.env.FIREBASE_CLEINT_EMAIL,
            // privateKey:process.env.FIREBASE_PRIVATE_KEY,
        }
        ),
    }
    );
}

const adminDb = initFirestore({
    credential:admin.credential.cert({
        projectId: "chatsassai" ,
        clientEmail: "firebase-adminsdk-8y8rx@chatsassai.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLgsf8uXmT1UGH\njhAF0wOo2AWb3/H6uLfoTvsyrcuo/5RKN5gJM0kt1vd4pCvoXpO3SpXvdTkg7GPo\nBOkHguZtV/Al51q4IdRCeZPdnSx+VxNp65G716kUGuch4jH5jd168lztkh5jXlXj\nMKixm8c/KR/WXELWOzHUkvktVWNCxD67TaP6jtnekQK5sZCOpLeuUTa6Z4HgWgIz\nlqRkSi/3zxc7s+8OjOSdqcz5z/g/iA18IjQ7kiM5lB7h1PAzv47XVTziKAvYbB5L\nYY2Ya6Z4Ym05OufSHRvtNj0f0+9P8pZhmUokxJNabojZCkJjTJ4GXkhyT/0IjD0X\nYMxr+tn9AgMBAAECggEAFCRfp1dH/FYPzfhuy8h5gMkfli+xChfdRYcRsXFyNAYi\nbMy2AK4M5Ldip2JcjIILJa15FEeCZgR7MCZ1VoZJqoPFwlMyv97yfF59QMPOhrcf\nsG04bzxlxudTc4rq2DLpRTT0wcAU7xfRoqmF0Y7CJ5ZSaGqNo8yMFzrZCviHCj6A\njwavAWx8q/pr0hQWu+n5Sag1eQX2i5vHFyH59D1LimWtH2WHQ3GHK/pUeETK0hiX\n/+pfEpH05VmIYDAaiPnGkuzuHNSDTuvOVCU0Z5VYwkXmrPdt7/VNuN65cIIVocva\nomabgAnUA44JPvK0Ept3k6UV3zHgMxqiMcBNz/9MqQKBgQDDGCDsWlJndcAB5hpP\nZA1xnv3EacBJMcIp/dkoJ1Sy2xRCWAPr7AyH1dlFDt3srC98MFy1YzJS00NqjPI1\n3tbCTYE9ARo2MM0YauLVwMN1dRFy58pkUbSs4x4Q6Q7al1YLW5If9KQkyhARDlBt\nLnas+mqahsHGZbIBhi0Qjg9MMwKBgQC3EHIWQ3L9B5ppFdNLxaeHU/PbCnx8OW8G\nnNjj6MhB+h6uAjBKwG438bXJs2StZeiOCRixFsptcvc2QpVGc0+7CqBLlk9AUr6k\n6TgyRlIzFFfutwDbnHVESXJQRdNczOrGs4dpNcW9eYhh54OxrIrGs5/fzZWyeFpH\nWl+88OIRDwKBgANrn+Ak8T7pHJWr8BgmO+obDH3uELX3zlyoG6+NiPmdx6wmGOOA\n/vM+t5FzYkas+iQmQOnZNF+pXow2rmRtZLyBWVu1cj0y+9WKwjFXMNYVWFn4YF8D\n47QIQ1WukFkawCJw144B3wLaHBAAfT58yw3bUhUlea49yDIopQ+ePfxrAoGBAI5p\n1NdNEZ+W0qD9waso0POOdB7rQXzCkYTrcC+dYG0zT7q/KSJ+IUCUYX/Qd3oN1aTp\nnrPlrwUGcxtbIRX1jwlLcvharryzomxYosc5vajPIrkq1RgD15aQLMYWDCAdqmd6\nMtW+Z17HtTm1CdanDC8Yfj91iAeXaWQpAmHSY4wxAoGAPd9PN82ksUTLcDjrLrRt\n2YQ2A1eeHamw1YolV6saZ38x15PXTspXupNwapFFcsv6OE7m4kPoradsHD8Fl6nD\nzAY7yHu0IsUTOH0BRAXwNNhvEAAd2tMi+Bm1J6TI5hFQdiVa8wXj84DRrK9YG0v5\ngZzjpZblLBGLq9EXsnWHwSo=\n-----END PRIVATE KEY-----\n",
      })

})

const adminAuth = admin.auth(app);
export{adminAuth,adminDb,};