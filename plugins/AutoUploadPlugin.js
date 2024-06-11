const { NodeSSH } = require('node-ssh')

class AutoUploadPlugin {
  constructor(options) {
    this.ssh = new NodeSSH()
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('AutoUploadPlugin', async (compilation, callback) => {
      // 获取输出的文件夹
      const outputPath = compilation.outputOptions.path

      // 连接服务器
      // node-ssh：npm i node-ssh -D
      await this.connectServer()

      // 原服务器目录
      const serverDir = this.options.remotePath
      await this.ssh.execCommand(`rm -rf ${serverDir}/*`)

      //上传文件到服务器
      await this.uploadFiles(outputPath, serverDir)

      // 关闭 ssh
      this.ssh.dispose()

      callback()
    })
  }

  async connectServer() {
    await this.ssh.connect({
      host: this.options.host,
      username: this.options.username,
      password: this.options.password,
    })
  }

  async uploadFiles(localPath, remotePath) {
    await this.ssh.putDirectory(localPath, remotePath, {
      recursive: true, // 递归
      concurrency: 10,
    })
  }
}

module.exports = AutoUploadPlugin
