import consolidate from 'consolidate';
import pathUtils from 'path';


export default function(engine, deps, files) {
  const renderer = consolidate[engine];

  return files.map((f) => {
    let data;
    let rendered;

    // apply template
    data = templateData(f);
    rendered = renderer.render(f.content, data);

    // apply layout
    if (f.metadata.layout) {
      const layoutPath = pathUtils.join(f.wd, f.metadata.layout);
      const layout = fs.readFileSync(layoutPath);

      data = { ...data, content: rendered };
      rendered = renderer.render(layout, data);
    }

    return {
      ...f,
      content: rendered,
    };
  });
}


function templateData(f) {
  return {
    ...f,
    metadata: undefined,
    ...f.metadata,
  };
}
