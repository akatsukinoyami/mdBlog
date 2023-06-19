async function request(url: string, params={}, method="GET"): Promise<any> {
  url += '?' + (new URLSearchParams(params)).toString();
  
  const response = await fetch(url, { method })
  if(!response.ok) {
    const text = await response.text();
    throw new Error(text);
   };
  return response.json();
}

export function get(
  url: string, 
  params: Record<string, any>
): Promise<any> {
  return request(url, params, "GET");
}

export function post( 
  url: string, 
  params: Record<string, any> 
): Promise<any> {
  return request(url, params, "POST");
}
