enum SignErrors {
    MobileAuth = 1,
    EmailAuth,
    'شماره موبایل یاایمیل یا رمز عبور اشتباه است',
    'کد وارد شده منقضی شده است',
    'کد وارد شده اشتباه است',
    'کاربری یافت نشد',
    Success,
    'کاربری با این شماره موبایل یا ایمیل وجود دارد',
    'فرمت رمز عبور اشتباه است',
    TokenFailed,
    'حساب کاربری غیرفعال میباشد'
}

export{
    SignErrors
}