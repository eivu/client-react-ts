function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

function convertKeysToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(convertKeysToCamelCase);
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((acc: { [key: string]: any }, key: string) => {
            const camelCaseKey = toCamelCase(key);
            acc[camelCaseKey] = convertKeysToCamelCase(obj[key]);
            return acc;
        }, {});
    }
    return obj;
}

export default convertKeysToCamelCase;