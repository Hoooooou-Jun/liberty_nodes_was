export const decodeUTF8Array = (data) => {
  return new TextDecoder('utf-8').decode(new Uint8Array(data));
};
