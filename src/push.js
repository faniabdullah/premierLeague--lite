let webPush = require('web-push');
const vapidKeys ={"publicKey":"BEs8u6-gBkmwHMl4M0UaqUTmPDAFqly7q-EMbx20lAF7lb_3CP56IlrwHlQ1d-KFVHcJe_ibuxuOR39q_yDaQi8",
"privateKey":"BqFLPCCd2LjGQSMs7TavGBheySt-P1Em3SvHz2WJAMs"}
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dBxJEdlXum0:APA91bFdZWmzcV-jABtz5UhvkCAA9eXyunrNGn267b3WJCBp45UIEhx1h5B7C-FBqxE7fBUVtremkHFJCyMIdJwtY2PjiV9oGwS5S0RI7OUDz2CgX9HJQD8PpLJJCu_0iuNI3mrYtujm",
    "keys": {
        "p256dh": "BD/saWnte3p+HIefS1rw8kUop3gJVaBG5I8y6YyDGLbwmJksCyOciJSuNCcVe4Q875L/t2MhbnSiz1LmtNwhaiM=",
        "auth": "ksy/DxmFpH2lalDc4LoW/g==" 
    }
};
let payload = 'Hello , Submission Anda Sedang di Review-';
let options = {
    gcmAPIKey: '1026050796962',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);