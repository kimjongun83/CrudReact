export const parseObjectToFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return formData;
};
export const objectToQueryString = (obj, prefix) => {
    return Object.keys(obj).map(objKey => {
        if (obj.hasOwnProperty(objKey)) {
            const key = prefix ? `${prefix}[${objKey}]` : objKey;
            const value = obj[objKey];

            return typeof value === "object" ?
                this.objectToQueryString(value, key) :
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return null;
    }).join("&");
}
export const handleErrors = (response) => {
    if ([200, 201].includes(response.status)) {
      return response
    }
    
    throw response
}
export const isValidEmail = (email) => {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(email).toLowerCase());
    };