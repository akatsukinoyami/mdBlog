import yaml from "yaml";
import { toast } from "svelte-sonner";

export async function load({ fetch }) {
  const entity = await fetch(`/posts.yaml`)
    .then((res) => res.text())
    .then((text) => yaml.parse(text))
    .catch((error) => toast.error("Error", { description: error.toString() }));

  return { entity, path: "" };
}
