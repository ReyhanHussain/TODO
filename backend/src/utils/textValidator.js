

function validator(texts) {
    try {
        const valid = texts.some((single) => single.trim().toLowerCase().length == 0 || single == undefined || single == null);
        if (valid) {
            return false;
        }
        return true;
    } catch (error) {
        console.log('validator function error: ', error);
        return false;
    }
}

export default validator;