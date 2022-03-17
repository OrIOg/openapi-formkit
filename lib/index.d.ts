import { method, Options, Route } from './types/index.d';
import Converter from './converters/converter';
export { Converter };
export declare function Convert(api: string, options?: Options): Promise<Record<string, Record<method, Route>>>;
