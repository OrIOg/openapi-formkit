import { reader } from "@oats-ts/openapi-reader"
import { isReferenceObject } from "@oats-ts/model-common"
import { convertNumber } from "./converters"


export async function Convert(path: string) {
    const apiReader = await reader({path})();
    if (!apiReader.isOk) throw apiReader.issues

    let parameters = [];
    
    for(let k in apiReader.data!.document.paths) {
        const path = apiReader.data!.document.paths[k];
        if(path.get?.parameters) {
            for(let param of path.get?.parameters!) {
                if(isReferenceObject(param) || isReferenceObject(param.schema)) continue;

                switch (param.schema?.type) {
                    case 'number':
                    case 'integer':
                        parameters.push(convertNumber(param, param.schema));
                        break;
                    default:
                        console.warn(`'${param.schema?.type}' is not yet implemented`);
                        break;
                
                }
            }
        }
            
    }
    return parameters;
}