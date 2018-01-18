bufqueue
--------

A simple and efficient buffer queue lib grown out of my sickness of repeating it in different projects.

This lib is usuful if you want to do some custom 'stateful' parsing over a nodejs stream of buffer that can could come in chunks of any length.

Example:

    let bufq = new BufQueue();
    // suppose an image stream with magic prefix and count,widht,height in the beginning.
    let magic, count, width, height;
    stream.on("data", (buffer) => {
      bufq.add(data);
      if (_.isNil(magic) && bufq.byteLength>=4) {
        magic = bufq.consume(4);
      }
      if (_.isNil(count) && bufq.byteLength>=4) {
        count = bufq.consume(4);
      }
      if (_.isNil(height) && bufq.byteLength>=4) {
        height = bufq.consume(4);
      }
      if (_.isNil(width) && bufq.byteLength>=4) {
        width = bufq.consume(4);
      }
      while (bufq.byteLength > 0) {
        // ... consume image data
      }
    })

