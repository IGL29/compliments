const isNodeGuard = (element: object): element is Node => {
  if (element && element instanceof Node) {
    return true;
  }
  return false;
};

export { isNodeGuard };
