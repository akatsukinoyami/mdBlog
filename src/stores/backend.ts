import env from "../../env.json";
import { Writable, writable } from "svelte/store";

type signInQueryParams = {
  email: string, 
  password: string
}
type signUpQueryParams = {
  username: string,
  email: string, 
  password: string
}
interface backend {
  avaliable: boolean,
  link: string,
  token: string,
  username: string,
  check: () => Promise<void>,
  mutate: () => void,
  path: (path: string) => string,
  setCredentials: (username: string, token: string) => void,
  signToServer: (link: string, data: signInQueryParams | signUpQueryParams) => Promise<void>,
  signIn: (email: string, password: string) => Promise<void>,
  signUp: (username: string, email: string, password: string) => Promise<void>,
  signOut: () => void,
}

export const backend: Writable<backend> = writable({
  avaliable: false,
  link: env?.backend,
  token: localStorage.token || "",
  username: localStorage.username || "",

  async check(): Promise<void> {
    if (!this.link) return;
    const response = await fetch(this.link);

    if (!response.ok) return;
    const answer = await response.text();
    
    if (answer !== "alive") return;
    this.avaliable = true;
    this.mutate();
  },

  mutate(){
    backend.set(this)
  },

  path(path: string): string {
    return this.link + path;
  },

  setCredentials(username: string, token: string): void {
    this.username = username;
    this.token = token;
    this.mutate();
  },

  async signToServer(
    link: string, 
    data: signInQueryParams | signUpQueryParams
  ): Promise<void> {
    const response = await fetch(this.path(link), {
      method: "POST",
      body: JSON.stringify(data)
    });

    if (!response.ok) return;
    const answer = await response.json();

    this.setCredentials(answer.username, answer.token)
  },

  async signIn(email: string, password: string): Promise<void> {
    await this.signToServer('/auth/sign_in', { email, password });
  },

  async signUp(username: string, email: string, password: string): Promise<void> {
    await this.signToServer('/auth/sign_up', { username, email, password });
  },

  signOut(): void {
    this.setCredentials("", "")
  }
})
