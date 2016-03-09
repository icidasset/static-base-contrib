export default function(files, deps, metadata) {
  return files.map((f) => {
    return {
      ...f,

      metadata: { ...f.metadata, ...metadata },
    };
  });
}
