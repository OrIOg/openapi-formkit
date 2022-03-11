import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: false,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  testRegex: "(/tests/.*|(\\.|/)(test))\\.(js|ts)$",
  moduleFileExtensions: ["ts", "js", "json"]
};
export default config;