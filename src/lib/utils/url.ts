export function url(path: string[], searchParams?: Record<string, any>) {
  let url = `/${path.filter(Boolean).join("/")}`;
  if (searchParams) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => params.append(k, v));
    url += `?${params}`;
  }
  return encodeURI(url);
};

export function bgUrl(path: string[], searchParams?: Record<string, any>) {
  return `url("${url(path, searchParams)}")`;
}