import {Readable} from "stream"

// see: https://stackoverflow.com/questions/14269233/node-js-how-to-read-a-stream-into-a-buffer
export async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>()
    // put all the stream chunks into an array
    stream.on("data", (chunk: any) => _buf.push(chunk))
    // then put them together when it's finished
    stream.on("end", () => resolve(Buffer.concat(_buf)))
    stream.on("error", (err: any) => reject(`error converting stream - ${err}`))
  })
}
