// const fetchData = async <T>(
//   url: string,
//   options: RequestInit = {},
// ): Promise<T> => {
//   const response = await fetch(url, options);
//   const json = await response.json();
//   if (!response.ok) {
//     const errorJson = json as unknown as any;
//     console.log('errorJson', errorJson);
//     if (errorJson.message) {
//       throw new Error(errorJson.message);
//     }
//     throw new Error(`Error ${response.status} occured`);
//   }
//   return json;
// };

const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(url, options);
  const contentType = response.headers.get('Content-Type') || '';

  // let json: T | null = null;

  const isJson = contentType.includes('application/json');

  const body = isJson ? await response.json() : await response.text();

  // const json = await response.json();
  if (!response.ok) {
    console.log('Response not OK');
    console.log('Response status:', response.status);
    console.log('Response body:', body);

    console.log(typeof body);

    if (typeof body === 'object' && 'message' in body) {
      throw new Error((body as any).message);
    } else if (typeof body === 'object' && 'errors' in body) {
      const errors = (body as any).errors;
      if (Array.isArray(errors)) {
        const messages = errors
          .map((err: any) => err?.message ?? JSON.stringify(err))
          .join(', ');
        throw new Error(messages);
      } else {
        throw new Error(JSON.stringify(errors));
      }
    } else if (typeof body === 'object' && 'error' in body) {
      const errors = (body as any).error;
    }
    throw new Error(
      `Error ${response.status}: ${typeof body === 'string' ? body : 'Unknown error'}`,
    );
  }
  return body as T;
};

export {fetchData};
