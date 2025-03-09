export const publishMessage = (type: 'login' | 'logout', data?: any) => {
  window.postMessage({ type, data }, '*');
};
