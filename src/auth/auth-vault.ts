export type TokenPair = { accessToken: string; refreshToken: string };
type AuthEvent = { type: "signed-out" | "tokens-updated" };

export interface AuthVault {
  read(): Promise<TokenPair | null>;
  write(tokens: TokenPair): Promise<void>;
  clear(): Promise<void>;
  subscribe(listener: (event: AuthEvent) => void): () => void;
}

const DB_NAME = "wellstaq-auth";
const STORE_NAME = "vault";
const TOKEN_KEY = "tokens";

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function transact<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>) {
  const database = await openDatabase();
  return new Promise<T>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const request = action(transaction.objectStore(STORE_NAME));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
  });
}

export class BrowserAuthVault implements AuthVault {
  private readonly channel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel("wellstaq-auth");

  read() {
    return transact<TokenPair | undefined>("readonly", (store) => store.get(TOKEN_KEY)).then((value) => value ?? null);
  }

  async write(tokens: TokenPair) {
    await transact("readwrite", (store) => store.put(tokens, TOKEN_KEY));
    this.channel?.postMessage({ type: "tokens-updated" } satisfies AuthEvent);
  }

  async clear() {
    await transact("readwrite", (store) => store.delete(TOKEN_KEY));
    this.channel?.postMessage({ type: "signed-out" } satisfies AuthEvent);
  }

  subscribe(listener: (event: AuthEvent) => void) {
    const handler = (event: MessageEvent<AuthEvent>) => listener(event.data);
    this.channel?.addEventListener("message", handler);
    return () => this.channel?.removeEventListener("message", handler);
  }
}

export const authVault = new BrowserAuthVault();
