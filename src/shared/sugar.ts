export const isMobile = () =>
    !!(
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    );
export const isIOS = () =>
    !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i));

export const regex = {
    email: new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi),
    number: new RegExp(/.*[0-9]+.*/),
    upperCase: new RegExp(/.*[A-Z]+.*/),
    lowerCase: new RegExp(/.*[a-z]+.*/),
    specials: new RegExp(/.*[^가-힣a-zA-Z0-9].*/),
};

export const isValidPassword = (password: string) => {
    let count = 0;
    if (regex.number.test(password)) count++;
    if (regex.upperCase.test(password)) count++;
    if (regex.lowerCase.test(password)) count++;
    if (regex.specials.test(password)) count++;
    return count >= 3;
};

export const scrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;