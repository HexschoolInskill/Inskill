module.exports = {
  apps: [
    {
      name: 'inskill',
      script: '.output/server/index.mjs',
      autorestart: true,
      exec_mode: 'fork',
      watch: true,
      instances: '1', // 負載平衡模式下的 cpu 數量 or max
      //   max_memory_restart: '2G', //緩存了多少記憶體重新整理
      port: 3000, // 指定伺服器上的 port 3000
      time: true
    }
  ]
}
