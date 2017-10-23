// import fs from 'fs'
import path from 'path'
import ChildProcess from 'child_process'
// import { remote } from 'electron'
import properties from './jekyll-properties.json'

/**
 * constants
 */

const JEKYLL_T_NAME = 'traveling-jekyll'
// const JEKYLL_T_VERSION = '3.1.2b'
const Status = {
  RUNNING: 'running',
  STOPPED: 'stopped'
}

const local = {
  process: null
}

/**
 * Vuex
 */

const state = {
  status: Status.STOPPED
}

const getters = {
  process: state => {
    return local.process
  }
}

const mutations = {
  SERVER_STOPPED (state) {
    state.status = Status.STOPPED
  },
  SERVER_RUNNING (state) {
    state.status = Status.RUNNING
  }
}

const actions = {
  serve ({ commit, state }, directory) {
    let binary = properties.binExecPath.replace('{binaryName}', getBinaryName())
    local.process = ChildProcess.spawn(path.join(__dirname, '..', '..', '..', '..', binary), buildCommandArgs(directory)) // './'+binary
    commit('SERVER_RUNNING')
  },
  stop ({ commit, state }) {
    if (state.status === Status.RUNNING) {
      local.process.kill('SIGINT')
      local.process = null
      commit('SERVER_STOPPED')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  Status
}

/**
 * Private methods
 */

function buildCommandArgs (directory) {
  var args = ['serve', '-s', directory, '-d', path.join(directory, '_site')]
  // Object.keys(local.config).forEach(function(arg){
  //   args.push('--'+arg)
  //   args.push(local.config[arg])
  // })
  return args
}

function getBinaryName () {
  return JEKYLL_T_NAME + '-'/* + JEKYLL_T_VERSION + '-' */+ getSystemName()
}

function getSystemName () {
  let { platform, arch } = process
  let osName = ''

  switch (platform) {
    case 'win32':
      osName = 'win'
      break
    case 'darwin':
      osName = 'osx'
      break
    default:
      osName = 'linux'
      if (arch === 'x64') {
        osName += '-x86_64'
      } else {
        osName += '-x86'
      }
      break
  }
  return osName
}
