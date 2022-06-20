import { Options } from './types/index.d';
import Converter from './converters/converter';
export { Converter };
export declare function Convert(src: string, options?: Options): Promise<Record<string, Record<import("./types/index.d").method, import("./types/index.d").Route>>>;
