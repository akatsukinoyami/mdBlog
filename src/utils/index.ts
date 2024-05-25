export function generateBreadcrumbs(url: string): { href: string, text: string }[] {
  const parts = url.split('/').filter(part => part);

  let href = '';
  return parts.map(part => {
    href += `/${part}`;
    const text = humanReadable(part).replace("Blog", "Home");

    return { href, text };
  });
}

export function humanReadable(text: string): string {
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}