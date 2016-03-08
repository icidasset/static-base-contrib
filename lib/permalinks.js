import permalinks from 'permalinks';


export default function(files, deps) {
  return files.map((f) => {
    if (f.basename !== 'index') {
      return {
        ...f,

        path: permalinks(':dirname/:basename/index:extname', f),
        basename: 'index',
        dirname: permalinks(':dirname/:basename', f)
      };
    }

    return f;
  });
}
