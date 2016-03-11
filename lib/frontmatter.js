import matter from 'gray-matter';


export default function(files, deps, options = {}, requires = {}) {
  Object.assign(matter.parsers.requires, requires);

  return files.map((f) => {
    const m = matter(f.content, options);

    return {
      ...f,

      metadata: { ...f.metadata, ...m.data },
      content: m.content,
    };
  });
}
