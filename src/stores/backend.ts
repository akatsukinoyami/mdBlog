import env from "../../env.json";
import { Writable, writable } from "svelte/store";
import { get } from "../functions/requests";

interface backend {
  avaliable: boolean,
  link: string,
  token: string,
  username: string,
  check: () => Promise<void>,
  mutate: () => void,
  path: (path: string) => string,
  setCredentials: (username: string, token: string) => void,
  signOut: () => void,
}

export const backend: Writable<backend> = writable({
  avaliable: false,
  link: env?.backend,
  token: localStorage.token || "",
  username: localStorage.username || "",

  mutate(){backend.set(this)},
  path(path) {return `${this.link}${path}`},

  async check(): Promise<void> {
    try {
      if (!this.link) return;
      const response = await get(this.link);
  
      if (!response.ok) return;
      const answer = await response.text();
      
      if (answer !== "alive") return;
      this.avaliable = true;
      this.mutate();
    } catch {
      
    }
  },

  setCredentials(username: string, token: string): void {
    this.username = username;
    this.token = token;
    this.mutate();
  },

  signOut(): void {
    this.setCredentials("", "")
  }
})
