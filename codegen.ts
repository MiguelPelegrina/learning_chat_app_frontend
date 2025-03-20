
import type { CodegenConfig } from '@graphql-codegen/cli';
import { environment } from './src/environments/environment.development';

// TODO Move this and grapql folder to app/core?
const config: CodegenConfig = {
  overwrite: true,
  schema: environment.httpUri,
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/generated/graphql.ts": {
      plugins: ['typescript', 'typescript-operations', "typescript-apollo-angular"]
    }
  }
};

export default config;
