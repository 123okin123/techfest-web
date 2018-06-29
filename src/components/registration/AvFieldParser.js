
export class AvFieldParser {

    static parse(field: {name: string, value: string}): {} {
        const array = field.name.split('.');
        let value = field.value;
        if (field.value === 'true') {
            value = true;
        } else if (field.value === 'false') {
            value = false;
        }
        let parsedField = {[array[array.length - 1]]: value};
        array.reverse().forEach((e, i)=>{
            if (i > 0) {
                parsedField = {[e]: parsedField}
            }
        });

        return parsedField
    }
}