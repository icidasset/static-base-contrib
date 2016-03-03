import matter from 'gray-matter';


export default function(lang = 'yaml', deps, files) {
  return files.map((f) => {
    const m = matter(f.content, { lang });

    return {
      ...f,
      metadata: { ...f.metadata, ...m.data },
      content: m.content,
    };
  });
}
