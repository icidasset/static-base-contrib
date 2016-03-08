import matter from 'gray-matter';


export default function(files, deps, lang = 'yaml') {
  return files.map((f) => {
    const m = matter(f.content, { lang });

    return {
      ...f,

      metadata: { ...f.metadata, ...m.data },
      content: m.content,
    };
  });
}
