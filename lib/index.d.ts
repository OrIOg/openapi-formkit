import { Options } from './types';
import Converter from './converters/converter';
export { Converter };
export declare function Convert(src: string, options?: Partial<Options>): Promise<Record<string, Record<import("./types").method, import("./types").Route>>>;
