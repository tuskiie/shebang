enum Mode {
  env = "/usr/bin/env",
  noEnv = "(/usr)/bin",
}

interface Shebang {
  id: string;
  prefix: string;
  name: string;
  subtitle: string;
}

export { Mode };
export type { Shebang };
