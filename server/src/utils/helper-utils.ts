export const pickProps = (obj: any, properties: Array<string> = []): any => {
    return Object.assign({}, ...properties.map((property) => ({[<string> property]: obj[property]})));
};
