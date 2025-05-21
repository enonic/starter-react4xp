import type { Config } from '@jest/types';


const DIR_SRC = 'src/main/resources';
const DIR_SRC_JEST = 'src/jest';
const DIR_SRC_JEST_CLIENT = `${DIR_SRC_JEST}/client`;
const DIR_SRC_JEST_SERVER = `${DIR_SRC_JEST}/server`;
const AND_BELOW = '**';
const SOURCE_FILES = `*.{ts,tsx}`;
const TEST_EXT = `{spec,test}.{ts,tsx}`;
const TEST_FILES = `*.${TEST_EXT}`;


const commonConfig: Config.InitialProjectOptions = {
  collectCoverageFrom: [
    `${DIR_SRC}/${AND_BELOW}/${SOURCE_FILES}`,
  ],

  // Insert Jest's globals (expect, test, describe, beforeEach etc.) into the
  // global environment. If you set this to false, you should import from @jest/globals, e.g.
  // injectGlobals: true, // Doesn't seem to work?
};

const clientSideConfig: Config.InitialProjectOptions = {
  ...commonConfig,
  displayName: {
    color: 'white',
    name: 'CLIENT',
  },

  // A map from regular expressions to module names or to arrays of module
  // names that allow to stub out resources, like images or styles with a
  // single module.
  // Use <rootDir> string token to refer to rootDir value if you want to use
  // file paths.
  // Additionally, you can substitute captured regex groups using numbered
  // backreferences.
  moduleNameMapper: {
    '/assets/(.*)': `<rootDir>/${DIR_SRC}/assets/$1`,
  },

  // Run clientside tests with DOM globals such as document and window
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files. By default it looks for
  // .js, .jsx, .ts and .tsx files inside of __tests__ folders, as well as any
  // files with a suffix of .test or .spec (e.g. Component.test.js or
  // Component.spec.js). It will also find files called test.js or spec.js.
  // (default: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[jt]s?(x)"
  // ])
  testMatch: [
    `<rootDir>/${DIR_SRC_JEST_CLIENT}/${AND_BELOW}/${TEST_FILES}`,
  ],
  transform: {
    "^.+\\.(ts|js)x?$": [
      'ts-jest',
      {
        tsconfig: `${DIR_SRC_JEST_CLIENT}/tsconfig.json`
      }
    ]
  }
};

const serverSideConfig: Config.InitialProjectOptions = {
  ...commonConfig,
  displayName: {
    color: 'blue',
    name: 'SERVER',
  },

  // A set of global variables that need to be available in all test
  // environments.
  // If you specify a global reference value (like an object or array) here,
  // and some code mutates that value in the midst of running a test, that
  // mutation will not be persisted across test runs for other test files.
  // In addition, the globals object must be json-serializable, so it can't be
  // used to specify global functions. For that, you should use setupFiles.
  globals: {
    app: {
      name: 'com.example.myproject',
      config: {},
      version: '1.0.0'
    },
  },

  // A map from regular expressions to module names or to arrays of module
  // names that allow to stub out resources, like images or styles with a
  // single module.
  // Use <rootDir> string token to refer to rootDir value if you want to use
  // file paths.
  // Additionally, you can substitute captured regex groups using numbered
  // backreferences.
  moduleNameMapper: {
    '/lib/myproject/(.*)': `<rootDir>/${DIR_SRC}/lib/myproject/$1`,
  },

  // A list of paths to modules that run some code to configure or set up the
  // testing environment. Each setupFile will be run once per test file. Since
  // every test runs in its own environment, these scripts will be executed in
  // the testing environment before executing setupFilesAfterEnv and before
  // the test code itself.
  setupFiles: [
    `<rootDir>/${DIR_SRC_JEST_SERVER}/setupFile.ts`
  ],

  // Run serverside tests without DOM globals such as document and window
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files. By default it looks for
  // .js, .jsx, .ts and .tsx files inside of __tests__ folders, as well as any
  // files with a suffix of .test or .spec (e.g. Component.test.js or
  // Component.spec.js). It will also find files called test.js or spec.js.
  // (default: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[jt]s?(x)"
  // ])
  testMatch: [
    `<rootDir>/${DIR_SRC_JEST_SERVER}/${AND_BELOW}/${TEST_FILES}`,
  ],

  transform: {
    "^.+\\.(ts|js)x?$": [
      'ts-jest',
      {
          tsconfig: `${DIR_SRC_JEST_SERVER}/tsconfig.json`
      }
    ]
  },
};

const customJestConfig: Config.InitialOptions = {
  coverageProvider: 'v8', // To get correct line numbers under jsdom
  passWithNoTests: true,
  projects: [clientSideConfig, serverSideConfig],
};

export default customJestConfig;
