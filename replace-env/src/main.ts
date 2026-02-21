import * as core from '@actions/core'
import fs from 'node:fs/promises'
import path from 'node:path'

import getOptions, { Options, ReplacementPattern, validateOptions } from './options'
import { checkPath } from './utils'
import options from './options'

async function main() {
  const options: Options = getOptions()

  if (!validateOptions(options)) {
    process.exit(1)
  }

  let pattern = /\${\w+}/gi
  let matcher = /\${(?<var>\w+)}/i

  switch (options.pattern) {
    case ReplacementPattern.SingleDollarBrackets: {
      pattern = /\${\w+}/gi
      matcher = /\${(?<var>\w+)}/i
      break
    }
    case ReplacementPattern.DoubleDollarBrackets: {
      pattern = /\${{\w+}}/gi
      matcher = /\${{(?<var>\w+)}}/i
      break
    }
    case ReplacementPattern.DoubleUnderscore: {
      pattern = /__\w+__/gi
      matcher = /__(?<var>\w+)__/i
      break
    }
  }

  for (const inputFile of options.inputFiles) {
    core.info(`[replace-env] Processing input: ${inputFile}`)
    
    switch (checkPath(inputFile)) {
      case 'directory': {
        const resultDirectory = options.outputFile ?? inputFile

        if (resultDirectory !== inputFile) {
          await fs.mkdir(resultDirectory, { recursive: true })
        }

        await replaceInDirectory({
          pattern, matcher,
          inputDirectory: inputFile,
          failOnMissingEnv: options.failOnMissingEnv,
          resultDirectory,
        })
        break
      }
      case 'file': {
        await replaceFile({
          pattern, matcher,
          inputFile: inputFile,
          failOnMissingEnv: options.failOnMissingEnv,
          resultFile: options.outputFile ?? inputFile,
        })
        break
      }
      case 'otherwise': {
        throw new Error(`[replace-env] input_file '${inputFile}' does not exist or an error occured`)
      }
    }
  }
}

async function replaceInDirectory(
  { inputDirectory, resultDirectory, pattern, matcher, failOnMissingEnv }: {
    pattern: RegExp, matcher: RegExp, failOnMissingEnv: boolean,
    inputDirectory: string, resultDirectory: string
  },
) {
  const files = await fs.readdir(inputDirectory)

  core.info(`[replace-env] Replacing in directory ${inputDirectory} ...`)

  await Promise.all(
    files.map(async file => {
      const inputPath = path.join(inputDirectory, file)
      const resultPath = path.join(resultDirectory, file)
      const pathType = checkPath(inputPath)
      
      core.info(`[replace-env] Processing ${inputPath} (type: ${pathType})`)
      
      switch (pathType) {
        case 'directory': {
          await fs.mkdir(resultPath, { recursive: true })
          await replaceInDirectory({
            pattern, matcher,
            inputDirectory: inputPath,
            failOnMissingEnv,
            resultDirectory: resultPath,
        })
          break
        }
        case 'file': {
          await replaceFile({
            pattern, matcher,
            inputFile: inputPath,
            failOnMissingEnv,
            resultFile: resultPath,
        })
          break
        }
        case 'otherwise': {
          core.warning(`[replace-env] Skipping ${inputPath} as it is neither a file nor a directory.`)
          break
        }
      }
    }),
  )
}

async function replaceFile(
  { inputFile, pattern, matcher, failOnMissingEnv, resultFile }: {
    pattern: RegExp, matcher: RegExp, failOnMissingEnv: boolean,
    inputFile: string, resultFile: string
  },
) {
  const data = await fs.readFile(inputFile, 'utf8')
  const res = data.replace(pattern, (c) => {
    const match = c.match(matcher)

    if (match === null) {
      core.warning(`[replace-env] error happened, invalid match for ${c}: ${match}`)
      return c
    }

    let env = process.env[match[1]]

    if (typeof env === 'undefined') {
      if (failOnMissingEnv) {
        core.error(`[replace-env] Environment Variable ${match[1]} not found!`)
        throw new Error('[replace-env] Environment Variable ${match[1]} not found!')
      } else {
        core.warning(`[replace-env] Environment Variable ${match[1]} not found!`)
        env = c
      }
    } else {
      core.info(`[replace-env] Replacing Environment Variable ${match[1]}.`)
    }

    return env
  })

  await fs.writeFile(resultFile, res)
  core.info(`[replace-env] File ${resultFile} saved.`)
}

main()
  .catch((error) => core.setFailed(`${error}`))