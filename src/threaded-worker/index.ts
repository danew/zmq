import {Processor} from "./processor"

async function main() {
  let processor = new Processor(1)
  await transform(processor, "Hello world!")
  await processor.stop()

  processor = new Processor()
  await transform(processor, "Hello world!")
  await processor.stop()
}

async function transform(processor: Processor, input: string) {
  console.log(`sending input '${input}'`)

  const start = process.hrtime()
  const output = await processor.process(input)
  const end = process.hrtime(start)

  console.log(`received output '${input}' -> '${output}' in ${end[0]}s`)
  console.log("---")
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})