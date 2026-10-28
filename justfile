build:
    node build.js

test:
    node --test build.test.js

deploy: build
    npx wrangler pages deploy dist --project-name monaco-f1-walk
