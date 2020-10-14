import { build } from "gluegun"

const cli = build()
  .brand("dicegame")
  .src(__dirname, {
    commandFilePattern: ["*.js"],
    extensionFilePattern: ["*.js"],
  })
  .defaultCommand()
  .help()
  .create()

export default cli
