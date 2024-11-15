/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

interface Window {
  ENV: {
    ATP_SERVICE: string
    ATP_IDENTIFIER: string
    ATP_DID: string
  }
}
