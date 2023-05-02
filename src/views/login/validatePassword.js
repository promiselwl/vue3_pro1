export const validatePassword = (rule, value, cb) => {
    // value 是校验的 password的值  
    let regpass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if (regpass.test(value)) {
        // 校验成功
        cb()
    } else {
        cb(new Error('密码格式不正确'))
    }
}